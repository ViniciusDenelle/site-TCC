<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FichaTreino extends Model
{
    protected $table = 'fichas_treino';

    protected $fillable = [
        'nome',
        'descricao'
    ];

    public function dias(): HasMany
    {
        return $this->hasMany(DiaFicha::class);
    }

    public function divisoes(): HasMany
    {
        return $this->hasMany(DivisaoFicha::class);
    }

    public function treinos(): HasMany
    {
        return $this->hasMany(Treino::class);
    }
}