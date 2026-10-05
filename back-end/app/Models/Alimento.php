<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alimento extends Model
{
    protected $fillable = [
        'nome',
        'porcao_descricao',
        'porcao_gramas',
        'calorias',
        'proteinas',
        'carboidratos',
        'gorduras',
    ];

    public function refeicoes()
    {
        return $this->belongsToMany(Refeicao::class, 'refeicao_alimento')
            ->withPivot('quantidade_porcoes')
            ->withTimestamps();
    }
}