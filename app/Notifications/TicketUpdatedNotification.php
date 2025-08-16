<?php

namespace App\Notifications;

use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class TicketUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $ticket;
    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Ticket $ticket, $message)
    {
        $this->ticket = $ticket;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $channels =  ['database'];

        if (config('broadcasting.connections.pusher.key') &&
            config('broadcasting.connections.pusher.secret') &&
            config('broadcasting.connections.pusher.app_id')) {
            $channels[] = 'broadcast';
        }

        return $channels;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'ticket_uid' => $this->ticket->uid,
            'ticket_subject' => $this->ticket->subject,
            'message' => $this->message,
            'url' => route('tickets.edit', $this->ticket->uid),
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'ticket_id' => $this->ticket->id,
            'ticket_uid' => $this->ticket->uid,
            'ticket_subject' => $this->ticket->subject,
            'message' => $this->message,
            'url' => route('tickets.edit', $this->ticket->uid),
        ]);
    }
}
