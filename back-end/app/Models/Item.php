<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = [
        'user_id',
        'nome',
    ];

    public function users(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
}
