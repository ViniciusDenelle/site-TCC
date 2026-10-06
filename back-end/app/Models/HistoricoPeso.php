<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoricoPeso extends Model
{
    protected $table = 'historico_pesos';

    protected $fillable = ['user_id', 'peso', 'registrado_em'];

    protected $casts = [
        'peso' => 'float',
        'registrado_em' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Registra o peso de hoje. Se já existir um registro hoje, atualiza.
     * Use também ao atualizar o perfil do usuário.
     */
    public static function registrar(int $userId, float $peso): self
    {
        return self::updateOrCreate(
            [
                'user_id' => $userId,
                'registrado_em' => today()->toDateString(),
            ],
            ['peso' => $peso]
        );
    }
}