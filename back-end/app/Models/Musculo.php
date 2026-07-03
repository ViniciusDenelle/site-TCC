<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Musculo extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->belongsToMany(
            Exercicio::class,
            'exercicio_musculo',
            'musculo_id',
            'exercicio_id'
        )->withPivot('tipo');
    }
}