<?php

namespace App\Http\Controllers;

use App\Filters\ExercicioFilter;
use App\Http\Requests\ExercicioRequest;
use App\Http\Resources\ExercicioResource;
use App\Models\Exercicio;
use App\Services\ImagemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExercicioController extends Controller
{
    private const RELACOES = ['criador', 'tipo', 'nivel', 'foco', 'musculos', 'equipamentos'];

    public function create(ExercicioRequest $request, ImagemService $imagens)
    {
        $dados = $request->validated();

        // o arquivo é salvo antes da transação; se ela falhar, ele é apagado
        $caminhoImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'exercicios')
            : null;

        try {
            $exercicio = DB::transaction(function () use ($dados, $request, $caminhoImagem) {
                $exercicio = Exercicio::create([
                    'user_id'   => $request->user()->id,
                    'nome'      => $dados['nome'],
                    'descricao' => $dados['descricao'] ?? null,
                    'tipo_id'   => $dados['tipo_id'] ?? null,
                    'nivel_id'  => $dados['nivel_id'] ?? null,
                    'foco_id'   => $dados['foco_id'] ?? null,
                    'imagem'    => $caminhoImagem,
                ]);

                // multipart: tudo chega como string, então o tipo é convertido
                foreach ($dados['musculos'] ?? [] as $musculo) {
                    $exercicio->musculos()->attach($musculo['id'], ['tipo' => (int) $musculo['tipo']]);
                }

                if (!empty($dados['equipamentos'])) {
                    $exercicio->equipamentos()->attach($dados['equipamentos']);
                }

                return $exercicio;
            });
        } catch (\Throwable $e) {
            $imagens->remover($caminhoImagem);
            throw $e;
        }

        return new ExercicioResource($exercicio->load(self::RELACOES));
    }

    public function show(Exercicio $exercicio)
    {
        return new ExercicioResource($exercicio->load(self::RELACOES));
    }

    public function fetch(Request $request)
    {
        $query = Exercicio::query()->with(self::RELACOES);

        $query = ExercicioFilter::apply($query, $request);

        return ExercicioResource::collection($query->paginate(10));
    }

    public function update(ExercicioRequest $request, Exercicio $exercicio, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $exercicio);

        $dados = $request->validated();

        $imagemAntiga = $exercicio->imagem;

        $novaImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'exercicios')
            : null;

        $apagarImagem = !$novaImagem && $request->boolean('remover_imagem');

        $campos = [
            'nome'      => $dados['nome'],
            'descricao' => $dados['descricao'] ?? null,
            'tipo_id'   => $dados['tipo_id'] ?? null,
            'nivel_id'  => $dados['nivel_id'] ?? null,
            'foco_id'   => $dados['foco_id'] ?? null,
        ];

        // sem arquivo novo e sem pedido de remoção, a imagem atual não é tocada
        if ($novaImagem) $campos['imagem'] = $novaImagem;
        elseif ($apagarImagem) $campos['imagem'] = null;

        try {
            DB::transaction(function () use ($exercicio, $dados, $campos) {
                $exercicio->update($campos);

                $musculosSync = [];
                foreach ($dados['musculos'] ?? [] as $musculo) {
                    $musculosSync[$musculo['id']] = ['tipo' => (int) $musculo['tipo']];
                }
                $exercicio->musculos()->sync($musculosSync);

                // em multipart um array vazio não é enviado; o ?? [] limpa os equipamentos
                $exercicio->equipamentos()->sync($dados['equipamentos'] ?? []);
            });
        } catch (\Throwable $e) {
            $imagens->remover($novaImagem);   // desfaz o upload novo
            throw $e;
        }

        // só apaga o arquivo antigo depois que o banco foi salvo com sucesso
        if ($novaImagem || $apagarImagem) {
            $imagens->remover($imagemAntiga);
        }

        return new ExercicioResource($exercicio->load(self::RELACOES));
    }

    public function delete(Request $request, Exercicio $exercicio, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $exercicio);

        $caminho = $exercicio->imagem;

        $exercicio->delete();
        $imagens->remover($caminho);

        return response()->json([
            'message' => 'Exercício deletado com sucesso.'
        ]);
    }

    public function meusCriados(Request $request)
    {
        $exercicios = $request->user()
            ->exerciciosCriados()
            ->with(self::RELACOES)
            ->latest()
            ->paginate(10);

        return ExercicioResource::collection($exercicios);
    }

    public function meusAdicionados(Request $request)
    {
        $exercicios = $request->user()
            ->exerciciosAdicionados()
            ->with(self::RELACOES)
            ->latest()
            ->paginate(10);

        return ExercicioResource::collection($exercicios);
    }

    public function adcionar(Exercicio $exercicio, Request $request)
    {
        // syncWithoutDetaching evita duplicar se o usuário clicar duas vezes
        $request->user()->exerciciosAdicionados()->syncWithoutDetaching([$exercicio->id]);

        return response()->json([
            'message' => 'Exercício adicionado com sucesso.'
        ]);
    }

    private function autorizarCriador(Request $request, Exercicio $exercicio): void
    {
        abort_if(
            $exercicio->user_id !== $request->user()->id,
            403,
            'Você não pode alterar este exercício.'
        );
    }
}