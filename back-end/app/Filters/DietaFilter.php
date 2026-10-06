<?php

namespace App\Filters;

use Illuminate\Http\Request;

class DietaFilter
{
    public static function apply($query, Request $request)
    {
        return $query
            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })

            ->when($request->objetivos, function ($q, $objetivos) {
                $q->whereIn('objetivo_id', $objetivos);
            })

            ->when($request->niveis, function ($q, $niveis) {
                $q->whereIn('nivel_id', $niveis);
            });
    }
}