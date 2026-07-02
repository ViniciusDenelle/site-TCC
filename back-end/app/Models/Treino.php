<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treino extends Model
{
    protected $fillable = [
        'ficha_treino_id',
        'nome',
        'descricao',
        'tempo_medio',
        'calorias_medias'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ficha()
    {
        return $this->belongsTo(FichaTreino::class);
    }

    public function exercicios()
    {
        return $this->hasMany(ExercicioTreino::class);
    }

    public function sessoes()
    {
        return $this->hasMany(SessaoTreino::class);
    }
}
