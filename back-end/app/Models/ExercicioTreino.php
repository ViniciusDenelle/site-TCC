<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExercicioTreino extends Model
{
    protected $table = 'exercicios_treino';

    protected $fillable = [
        'exercicio_id',
        'treino_id',
        'ordem',
        'repeticoes_minimas',
        'repeticoes_maximas',
        'sets',
        'peso',
        'descanso'
    ];

    public function exercicio()
    {
        return $this->belongsTo(Exercicio::class);
    }

    public function treino()
    {
        return $this->belongsTo(Treino::class);
    }
}
