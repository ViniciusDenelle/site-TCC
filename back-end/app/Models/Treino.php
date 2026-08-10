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

    public function categoria()
    {
        return $this->belongsTo(
            CategoriaExercicio::class,
            'categoria_id',
            'id'
        );
    }

    public function nivel()
    {
        return $this->belongsTo(
            NivelExercicio::class,
            'nivel_id',
            'id'
        );
    }

    public function tipo()
    {
        return $this->belongsTo(
            Foco::class,
            'foco_id',
            'id'
        );
    }

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
