<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NivelExercicio extends Model
{
    protected $table = 'niveis_exercicio';

    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->hasMany(
            Exercicio::class,
            'nivel_id',
            'id'
        );
    }
}