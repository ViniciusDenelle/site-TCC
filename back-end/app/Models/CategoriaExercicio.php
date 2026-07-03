<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriaExercicio extends Model
{
    protected $table = 'categorias_exercicio';

    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->hasMany(
            Exercicio::class,
            'categoria_id',
            'id'
        );
    }
}