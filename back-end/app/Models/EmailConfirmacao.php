<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailConfirmacao extends Model
{
    protected $fillable = [
        'codigo',
        'email',
        'expiracao'
    ];
}
