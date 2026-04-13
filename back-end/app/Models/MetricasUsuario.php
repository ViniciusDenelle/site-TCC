<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetricasUsuario extends Model
{
    protected $fillable = [
        'user_id',
        'peso',
        'calorias_diarias',
        'GET',
        'TMB'
    ];
}
