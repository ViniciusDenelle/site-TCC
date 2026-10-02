<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dieta extends Model
{
    protected $fillable = [
        'user_id', 'nome', 'descricao', 'objetivo', 'nivel', 'duracao',
        'meta_agua', 'meta_calorias', 'meta_proteinas', 'meta_carboidratos',
        'meta_gorduras', 'observacoes_finais',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function refeicoes(): HasMany
    {
        return $this->hasMany(Refeicao::class)->orderBy('ordem');
    }
}