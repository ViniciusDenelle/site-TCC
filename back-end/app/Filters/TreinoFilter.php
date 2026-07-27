<?php

namespace App\Filters;

use Illuminate\Http\Request;

class TreinoFilter
{
    public static function apply($query, Request $request)
    {
        return $query

            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })

            ->when($request->categorias, function ($q, $categorias) {
                $q->whereIn('categoria_id', $categorias);
            })

            ->when($request->niveis, function ($q, $niveis) {
                $q->whereIn('nivel_id', $niveis);
            })

            ->when($request->tipos, function ($q, $tipos) {
                $q->whereIn('tipo_id', $tipos);
            })

            ->when($request->focos, function ($q, $focos) {
                $q->whereIn('foco_id', $focos);
            })

            ->when($request->musculos, function ($q, $musculos) {

                foreach ($musculos as $musculo) {

                    $q->whereHas('exercicios.musculos', function ($q2) use ($musculo) {

                        $q2->where('musculos.id', $musculo);

                    });

                }

            })

            ->when($request->equipamentos, function ($q, $equipamentos) {

                foreach ($equipamentos as $equipamento) {

                    $q->whereHas('exercicios.equipamentos', function ($q2) use ($equipamento) {

                        $q2->where('equipamentos.id', $equipamento);

                    });

                }

            });

    }
}