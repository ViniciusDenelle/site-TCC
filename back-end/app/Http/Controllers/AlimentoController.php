<?php

namespace App\Http\Controllers;

use App\Filters\AlimentoFilter;
use App\Http\Requests\AlimentoRequest;
use App\Http\Resources\AlimentoResource;
use App\Models\Alimento;
use Illuminate\Http\Request;

class AlimentoController extends Controller
{
    public function fetch(Request $request)
    {
        $alimentos = AlimentoFilter::apply(Alimento::query(), $request)
            ->orderBy('nome')
            ->paginate(20);

        return AlimentoResource::collection($alimentos);
    }

    public function show(Alimento $alimento)
    {
        return new AlimentoResource($alimento);
    }

    public function store(AlimentoRequest $request)
    {
        $alimento = Alimento::create($request->validated());

        return new AlimentoResource($alimento);
    }
}