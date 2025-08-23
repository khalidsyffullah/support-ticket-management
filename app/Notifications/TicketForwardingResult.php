<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TicketForwardingResult extends Notification
{
    use Queueable;

    public $ticket;
    public $result;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ticket, $result)
    {
        $this->ticket = $ticket;
        $this->result = $result;
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
            'message' => 'Ticket #' . $this->ticket->uid . ' forwarding request has been ' . $this->result,
        ];
    }
}