<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercicio extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'categoria_id',
        'nivel_id',
        'tipo_id'
    ];

    public function tipo()
    {
        return $this->belongsTo(
            TipoExercicio::class,
            'tipo_id',
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

    public function foco()
    {
        return $this->belongsTo(
            Foco::class,
            'foco_id',
            'id'
        );
    }

    public function musculos()
    {
        return $this->belongsToMany(
            Musculo::class,
            'exercicio_musculo',
            'exercicio_id',
            'musculo_id'
        )->withPivot('tipo');
    }

    public function equipamentos()
    {
        return $this->belongsToMany(
            Equipamento::class,
            'exercicio_equipamento',
            'exercicio_id',
            'equipamento_id'
        );
    }

    public function treinos()
    {
        return $this->hasMany(
            ExercicioTreino::class,
            'exercicio_id',
            'id'
        );
    }
}