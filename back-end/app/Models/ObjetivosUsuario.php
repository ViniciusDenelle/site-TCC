<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObjetivosUsuario extends Model
{
    protected $fillable = [
        'user_id',
        'tipo',
        'peso_ideal',
        'velocidade',
        'comeco',
        'termino',
        'duracao'
    ];
}
