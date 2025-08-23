<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketForwardingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'old_department_id',
        'new_department_id',
        'requested_by',
        'status',
    ];
}