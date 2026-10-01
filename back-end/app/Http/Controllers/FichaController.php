<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFichaRequest;
use App\Http\Resources\FichaResource;
use App\Models\FichaTreino;
use Illuminate\Support\Facades\DB;
use App\Filters\FichaFilter;
use Illuminate\Http\Request;

class FichaController extends Controller
{
    private const DIAS_SEMANA = [
        'domingo' => 0,
        'segunda' => 1,
        'terca' => 2,
        'quarta' => 3,
        'quinta' => 4,
        'sexta' => 5,
        'sabado' => 6,
    ];

    public function create(CreateFichaRequest $request)
    {
        $dados = $request->validated();

        $ficha = DB::transaction(function () use ($dados, $request) {
            $ficha = FichaTreino::create([
                'user_id' => $request->user()->id,
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
                'user_id' => $request->user()->id,
            ]);

            foreach ($dados['divisoes'] as $ordem => $divisaoDados) {
                $divisao = $ficha->divisoes()->create([
                    'divisao' => $divisaoDados['nome'],
                    'ordem' => $ordem,
                ]);

                \App\Models\Treino::whereIn('id', $divisaoDados['treino_ids'])
                    ->update(['divisao_ficha_id' => $divisao->id]);
            }

            foreach ($dados['dias'] as $diaSemana => $treinoId) {
                $ficha->dias()->create([
                    'dia_semana' => self::DIAS_SEMANA[$diaSemana],
                    'treino_id' => $treinoId,
                ]);
            }

            return $ficha;
        });

        return new FichaResource($ficha->load([
            'criador',
            'dias.treino', 
            'divisoes.treinos'
        ]));
    }

    public function show(FichaTreino $ficha)
    {
        return new FichaResource($ficha->load(['dias.treino', 'divisoes.treinos']));
    }

    public function fetch(Request $request)
    {
        $fichas = FichaFilter::apply(
            FichaTreino::query()
                ->where('user_id', $request->user()->id)
                ->with([
                    'criador',
                    'dias.treino', 
                    'divisoes.treinos'
                ]),
            $request
        )
            ->latest()
            ->paginate(5);

        return FichaResource::collection($fichas);
    }

    public function update(CreateFichaRequest $request, FichaTreino $ficha)
    {
        $dados = $request->validated();

        $ficha = DB::transaction(function () use ($dados, $ficha) {
            $ficha->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
            ]);

            // desvincula treinos das divisões antigas antes de apagar as divisões
            \App\Models\Treino::whereIn('divisao_ficha_id', $ficha->divisoes()->pluck('id'))
                ->update(['divisao_ficha_id' => null]);

            $ficha->divisoes()->delete();
            $ficha->dias()->delete();

            foreach ($dados['divisoes'] as $ordem => $divisaoDados) {
                $divisao = $ficha->divisoes()->create([
                    'divisao' => $divisaoDados['nome'],
                    'ordem' => $ordem,
                ]);

                \App\Models\Treino::whereIn('id', $divisaoDados['treino_ids'])
                    ->update(['divisao_ficha_id' => $divisao->id]);
            }

            foreach ($dados['dias'] as $diaSemana => $treinoId) {
                $ficha->dias()->create([
                    'dia_semana' => self::DIAS_SEMANA[$diaSemana],
                    'treino_id' => $treinoId,
                ]);
            }

            return $ficha;
        });

        return new FichaResource($ficha->load(['dias.treino', 'divisoes.treinos']));
    }

    public function delete(FichaTreino $ficha)
    {
        DB::transaction(function () use ($ficha) {
            \App\Models\Treino::whereIn('divisao_ficha_id', $ficha->divisoes()->pluck('id'))
                ->update(['divisao_ficha_id' => null]);

            $ficha->dias()->delete();
            $ficha->divisoes()->delete();
            $ficha->delete();
        });

        return response()->json(['mensagem' => 'ficha deletada com sucesso']);
    }

    public function meusCriados(Request $request)
    {
        $fichas = $request->user()
            ->fichasCriados()
            ->with([
                    'criador',
                    'dias.treino', 
                    'divisoes.treinos'
                ])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($fichas);
    }

    public function meusAdicionados(Request $request)
    {
        $fichas = $request->user()
            ->fichasAdicionados()
            ->with([
                    'criador',
                    'dias.treino', 
                    'divisoes.treinos'
                ])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($fichas);
    }
}