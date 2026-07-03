<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoExercicio extends Model
{
    protected $table = 'tipos_exercicio';

    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->hasMany(
            Exercicio::class,
            'tipo_id',
            'id'
        );
    }
}