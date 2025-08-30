<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketSla extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'sla_id',
        'user_id',
        'status',
        'paused_at',
        'breached_at',
        'resolution_sla_ends_at',
        'response_sla_starts_at',
        'total_sla_time',
        'response_warning_sent_at',
        'resolution_warning_sent_at',
        'breach_notification_sent_at',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function sla()
    {
        return $this->belongsTo(Sla::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
