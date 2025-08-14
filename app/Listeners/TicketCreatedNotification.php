<?php

namespace App\Listeners;

use App\Events\TicketCreated;
use App\Mail\SendMailFromHtml;
use App\Models\EmailTemplate;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Notifications\NewTicketNotification;
use Illuminate\Support\Facades\Notification;

class TicketCreatedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\TicketCreated  $event
     * @return void
     */
    public function handle(TicketCreated $event) {


        $data = $event->data;
        $ticket = Ticket::with(['user', 'ticketType'])->find($data['ticket_id']);


        if (!$ticket) return;

        $notifications = app('App\HelpDesk')->getSettingsEmailNotifications();
        $ticket_slug = !empty($data['password']) ? 'create_ticket_new_customer' : 'create_ticket_dashboard';

        $recipient = $this->getRecipient($ticket);

        $this->sendInAppNotification($ticket);

        if (!$recipient || empty($notifications[$ticket_slug])) return;

        // Send email notification
        if ($template = EmailTemplate::where('slug', $ticket_slug)->first()) {
            $this->sendMailWithTemplate($template, $ticket, $recipient, $data['password'] ?? '');
        }
    }

private function sendInAppNotification($ticket) {
    $recipient = $this->getRecipient($ticket);

    try {
        if ($recipient) {
            Notification::send($recipient, new NewTicketNotification($ticket));
        }
    } catch (\Exception $e) {
        Log::error('Failed to notify recipient: ' . $e->getMessage());
    }

    $admins = User::whereHas('role', fn ($q) => $q->where('slug', 'like', '%admin%'))
        ->when($recipient, fn ($q) => $q->where('id', '<>', $recipient->id))
        ->get();

    try {
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new NewTicketNotification($ticket));
        }
    } catch (\Exception $e) {
        Log::error('Failed to notify admins: ' . $e->getMessage());
    }
}

    private function getRecipient(Ticket $ticket): ?User
    {
        if ($ticket->user) {
            return $ticket->user;
        }

        $setting = Setting::where('slug', 'default_recipient')->first();
        if ($setting && $setting->value) {
            return User::find($setting->value);
        }

        $adminRole = Role::where('slug', 'like', '%admin%')->first();
        return $adminRole
            ? User::where('role_id', $adminRole->id)->orderBy('id')->first()
            : User::orderBy('role_id')->first();
    }

    private function sendMailWithTemplate($template, $ticket, $user, $password = '')
    {
        $template = $template->html;
        $variables = [
            'name' => $user->first_name,
            'email' => $user->email,
            'password' => $password ?? '',
            'url' => config('app.url').'/dashboard/tickets/'.$ticket->uid,
            'sender_name' => 'Manager',
            'ticket_id' => $ticket->id,
            'uid' => $ticket->uid,
            'subject' => $ticket->subject,
            'type' => $ticket->ticketType ? $ticket->ticketType->name: '',
        ];
        if (preg_match_all("/{(.*?)}/", $template, $m)) {
            foreach ($m[1] as $i => $varname) {
                $template = str_replace($m[0][$i], sprintf($variables[$m[1][$i]], $varname), $template);
            }
        }
        $messageData = ['html' => $template, 'subject' => '[Ticket#'.$ticket->uid.'] - '.$ticket->subject];
        if(config('queue.enable')){
            Mail::to($user->email)->queue(new SendMailFromHtml($messageData));
        }else{
            Mail::to($user->email)->send(new SendMailFromHtml($messageData));
        }
    }
}
