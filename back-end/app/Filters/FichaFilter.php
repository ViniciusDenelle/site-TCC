<?php

namespace App\Filters;

use Illuminate\Http\Request;

class FichaFilter
{
    public static function apply($query, Request $request)
    {
        return $query
            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })

            ->when($request->divisoes, function ($q, $divisoes) {
                $q->whereHas('divisoes', function ($q2) use ($divisoes) {
                    $q2->whereIn('divisao', $divisoes);
                });
            });
    }
}