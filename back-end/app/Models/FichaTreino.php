<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FichaTreino extends Model
{
    protected $table = 'fichas_treino';
    protected $fillable = [
        'nome', 
        'descricao', 
        'user_id'
    ];

    public function divisoes(): HasMany
    {
        return $this->hasMany(DivisaoFicha::class);
    }

    public function dias(): HasMany
    {
        return $this->hasMany(DiaFicha::class);
    }
}