<?php

namespace App\Filters;

use Illuminate\Http\Request;

class AlimentoFilter
{
    public static function apply($query, Request $request)
    {
        return $query
            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })

            ->when($request->calorias_min, fn ($q, $min) => $q->where('calorias', '>=', $min))
            ->when($request->calorias_max, fn ($q, $max) => $q->where('calorias', '<=', $max))

            ->when($request->proteinas_min, fn ($q, $min) => $q->where('proteinas', '>=', $min))
            ->when($request->proteinas_max, fn ($q, $max) => $q->where('proteinas', '<=', $max))

            ->when($request->carboidratos_min, fn ($q, $min) => $q->where('carboidratos', '>=', $min))
            ->when($request->carboidratos_max, fn ($q, $max) => $q->where('carboidratos', '<=', $max))

            ->when($request->gorduras_min, fn ($q, $min) => $q->where('gorduras', '>=', $min))
            ->when($request->gorduras_max, fn ($q, $max) => $q->where('gorduras', '<=', $max));
    }
}