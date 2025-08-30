<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sla extends Model
{
    use HasFactory;

    protected $fillable = [
        'priority_id',
        'response_time',
        'resolution_time',
    ];

    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }
}
