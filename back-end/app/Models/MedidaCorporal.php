<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedidaCorporal extends Model
{
    protected $table = 'medidas_corporais';

    public const TIPOS = ['cintura', 'peito', 'braco', 'coxa', 'quadril', 'gordura'];

    protected $fillable = [
        'user_id',
        'tipo',
        'valor',
        'data',
    ];

    protected $casts = [
        'valor' => 'float',
        'data' => 'date:Y-m-d',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}