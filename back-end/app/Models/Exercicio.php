<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercicio extends Model
{
    protected $fillable = [
        'nome',
        'descricao'
    ];

    public function treinos()
    {
        return $this->hasMany(ExercicioTreino::class);
    }
}
