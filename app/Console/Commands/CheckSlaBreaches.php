<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TicketSla;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\SlaBreachNotification;
use Carbon\Carbon;

class CheckSlaBreaches extends Command
{
    protected $signature = 'sla:check';
    protected $description = 'Check for SLA breaches and send notifications.';

    public function handle()
    {
        $activeSlas = TicketSla::where('status', 'active')->with(['ticket', 'sla', 'user'])->get();

        foreach ($activeSlas as $ticketSla) {
            $ticket = $ticketSla->ticket;
            $sla = $ticketSla->sla;
            $assignedUser = $ticketSla->user;
            $teamHead = $ticket->department->teamHead(); // Assuming you have a teamHead relationship on the Department model

            if (!$ticket || !$sla || !$assignedUser) {
                continue;
            }

            $now = Carbon::now();
            $startTime = Carbon::parse($ticketSla->response_sla_starts_at);

            // Response time check
            $responseTimeEnd = $startTime->copy()->addMinutes($sla->response_time);
            $responseWarningTime = $responseTimeEnd->copy()->subMinutes(5);

            if ($now->between($responseWarningTime, $responseTimeEnd) && $ticket->status->slug === 'pending' && is_null($ticketSla->response_warning_sent_at)) {
                $message = 'SLA Response Warning: Ticket #' . $ticket->uid . ' is nearing its response time limit.';
                $assignedUser->notify(new SlaBreachNotification($ticket, $message));
                if ($teamHead) {
                    $teamHead->notify(new SlaBreachNotification($ticket, $message));
                }
                $ticketSla->update(['response_warning_sent_at' => $now]);
            }

            // Resolution time check
            $resolutionTimeEnd = $startTime->copy()->addMinutes($sla->resolution_time);
            $resolutionWarningTime = $resolutionTimeEnd->copy()->subMinutes(30);

            if ($now->between($resolutionWarningTime, $resolutionTimeEnd) && $ticket->status->slug !== 'completed' && is_null($ticketSla->resolution_warning_sent_at)) {
                $message = 'SLA Resolution Warning: Ticket #' . $ticket->uid . ' is nearing its resolution time limit.';
                $assignedUser->notify(new SlaBreachNotification($ticket, $message));
                if ($teamHead) {
                    $teamHead->notify(new SlaBreachNotification($ticket, $message));
                }
                $ticketSla->update(['resolution_warning_sent_at' => $now]);
            }

            // SLA Breach check
            if ($now->gt($resolutionTimeEnd) && $ticket->status->slug !== 'completed' && is_null($ticketSla->breached_at)) {
                $ticketSla->update(['status' => 'breached', 'breached_at' => $now, 'breach_notification_sent_at' => $now]);

                $message = 'SLA Breach: Ticket #' . $ticket->uid . ' has breached its resolution time.';
                $adminUsers = User::whereHas('role', function ($query) {
                    $query->where('slug', 'admin');
                })->get();

                foreach ($adminUsers as $admin) {
                    $admin->notify(new SlaBreachNotification($ticket, $message));
                }

                if ($teamHead) {
                    $teamHead->notify(new SlaBreachNotification($ticket, $message));
                }

                $assignedUser->notify(new SlaBreachNotification($ticket, $message));
            }
        }

        $this->info('SLA breach check complete.');
    }
}
