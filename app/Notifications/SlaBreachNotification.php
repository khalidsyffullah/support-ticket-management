<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Ticket;

class SlaBreachNotification extends Notification
{
    use Queueable;

    protected $ticket;
    protected $message;

    public function __construct(Ticket $ticket, $message)
    {
        $this->ticket = $ticket;
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'ticket_id' => $this->ticket->id,
            'ticket_uid' => $this->ticket->uid,
            'message' => $this->message,
        ];
    }
}
