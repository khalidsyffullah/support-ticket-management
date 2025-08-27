<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNotificationAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_notification_id',
        'name',
        'path',
    ];

    public function userNotification()
    {
        return $this->belongsTo(UserNotification::class);
    }
}
