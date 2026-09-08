<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treino extends Model
{
    protected $fillable = [
        'user_id',
        'foco_id',
        'tipo_id',
        'nivel_id',
        'ficha_treino_id',
        'nome',
        'descricao',
        'tempo_medio',
        'calorias_medias'
    ];


    public function foco()
    {
        return $this->belongsTo(Foco::class, 'foco_id', 'id');
    }

    public function nivel()
    {
        return $this->belongsTo(NivelExercicio::class, 'nivel_id', 'id');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoTreino::class, 'tipo_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ficha()
    {
        return $this->belongsTo(FichaTreino::class, 'ficha_treino_id');
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