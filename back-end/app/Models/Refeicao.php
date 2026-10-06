<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refeicao extends Model
{
    protected $table = 'refeicoes';
    protected $fillable = [
        'dieta_id',
        'nome',
        'dia_semana',
        'horario',
        'ordem',
    ];

    protected $casts = [
        'horario' => 'datetime:H:i',
    ];

    public function dieta()
    {
        return $this->belongsTo(Dieta::class);
    }

    public function alimentos()
    {
        return $this->belongsToMany(Alimento::class, 'refeicao_alimento')
            ->withPivot('quantidade_gramas')
            ->withTimestamps();
    }
}