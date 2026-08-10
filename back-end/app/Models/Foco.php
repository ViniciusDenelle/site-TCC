<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Foco extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function exercicios()
    {
        return $this->hasMany(
            Exercicio::class,
            'foco_id',
            'id'
        );
    }
}