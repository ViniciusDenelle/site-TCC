<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FichaTreino extends Model
{
    protected $table = 'fichas_treino';
    protected $fillable = [
        'user_id',
        'nome',
        'descricao',
        'imagem',
    ];

    public function criador()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function usuariosQueAdicionaram()
    {
        return $this->belongsToMany(User::class, 'ficha_usuario', 'ficha_treino_id', 'user_id')
            ->withTimestamps();
    }

    public function divisoes(): HasMany
    {
        return $this->hasMany(DivisaoFicha::class);
    }

    public function dias(): HasMany
    {
        return $this->hasMany(DiaFicha::class);
    }
}