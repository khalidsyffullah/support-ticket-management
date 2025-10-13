<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Ticket;
use App\Models\Comment;

class NewCommentNotification extends Notification
{
    use Queueable;

    protected $ticket;
    protected $comment;

    public function __construct(Ticket $ticket, Comment $comment)
    {
        $this->ticket = $ticket;
        $this->comment = $comment;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'comments_count' => 1,
            'ticket_id' => $this->ticket->id,
            'ticket_uid' => $this->ticket->uid,
            'ticket_subject' => $this->ticket->subject,
            'commenter_name' => $this->comment->user->name,
        ];
    }
}
