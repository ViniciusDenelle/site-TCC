<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SerieExecutada extends Model
{
    protected $table = 'series_executadas';

    protected $fillable = [
        'sessao_treino_id',
        'exercicio_treino_id',
        'serie',
        'peso',
        'repeticoes',
        'concluida'
    ];

    protected $casts = [
        'concluida' => 'boolean'
    ];

    public function sessao()
    {
        return $this->belongsTo(SessaoTreino::class,'sessao_treino_id',
        'id');
    }

    public function exercicioTreino()
    {
        return $this->belongsTo(ExercicioTreino::class);
    }
}
