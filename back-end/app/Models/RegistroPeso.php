<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistroPeso extends Model
{
    protected $table = 'registros_peso';

    protected $fillable = ['user_id', 'peso', 'registrado_em'];

    protected $casts = [
        'peso' => 'float',
        'registrado_em' => 'date:Y-m-d',
    ];
}