<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipamento extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->belongsToMany(
            Exercicio::class,
            'exercicio_equipamento',
            'equipamento_id',
            'exercicio_id'
        );
    }
}