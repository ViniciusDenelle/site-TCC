<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerfilUsuario extends Model
{
    protected $fillable = [
        'user_id',
        'genero',
        'peso',
        'tipo_do_peso',
        'altura',
        'idade',
        'data_de_nascimento',
        'nivel_de_atividade',
        'experiencia',
    ];
}
