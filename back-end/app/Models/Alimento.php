<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Alimento extends Model
{
    protected $fillable = [
        'refeicao_id', 'nome', 'quantidade',
        'calorias', 'proteinas', 'carboidratos', 'gorduras',
    ];

    public function refeicao(): BelongsTo
    {
        return $this->belongsTo(Refeicao::class);
    }
}