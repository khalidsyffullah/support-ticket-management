<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TicketForwardingRequested extends Notification
{
    use Queueable;

    public $ticket;
    public $forwardingRequest;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ticket, $forwardingRequest)
    {
        $this->ticket = $ticket;
        $this->forwardingRequest = $forwardingRequest;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'ticket_uid' => $this->ticket->uid,
            'forwarding_request_id' => $this->forwardingRequest->id,
            'message' => 'Ticket #' . $this->ticket->uid . ' has a pending forwarding request.',
            'url' => route('tickets.edit', $this->ticket->uid),
        ];
    }
}