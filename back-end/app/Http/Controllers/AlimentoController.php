<?php

namespace App\Http\Controllers;

use App\Filters\AlimentoFilter;
use App\Http\Requests\AlimentoRequest;
use App\Http\Resources\AlimentoResource;
use App\Models\Alimento;
use App\Services\ImagemService;
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

    public function store(AlimentoRequest $request, ImagemService $imagens)
    {
        // imagem e remover_imagem não são colunas: ficam de fora do create()
        $dados = collect($request->validated())
            ->except(['imagem', 'remover_imagem'])
            ->all();

        if ($request->hasFile('imagem')) {
            $dados['imagem'] = $imagens->salvar($request->file('imagem'), 'alimentos');
        }

        try {
            $alimento = Alimento::create($dados);
        } catch (\Throwable $e) {
            $imagens->remover($dados['imagem'] ?? null);   // não deixa arquivo órfão
            throw $e;
        }

        return new AlimentoResource($alimento);
    }

    public function update(AlimentoRequest $request, Alimento $alimento, ImagemService $imagens)
    {
        $dados = collect($request->validated())
            ->except(['imagem', 'remover_imagem'])
            ->all();

        $imagemAntiga = $alimento->imagem;

        $novaImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'alimentos')
            : null;

        $apagarImagem = !$novaImagem && $request->boolean('remover_imagem');

        // sem arquivo novo e sem pedido de remoção, a imagem atual não é tocada
        if ($novaImagem) $dados['imagem'] = $novaImagem;
        elseif ($apagarImagem) $dados['imagem'] = null;

        try {
            $alimento->update($dados);
        } catch (\Throwable $e) {
            $imagens->remover($novaImagem);   // desfaz o upload novo
            throw $e;
        }

        // só apaga o arquivo antigo depois que o banco foi salvo
        if ($novaImagem || $apagarImagem) {
            $imagens->remover($imagemAntiga);
        }

        return new AlimentoResource($alimento);
    }

    public function delete(Alimento $alimento, ImagemService $imagens)
    {
        $caminho = $alimento->imagem;

        $alimento->delete();
        $imagens->remover($caminho);

        return response()->json(['message' => 'Alimento deletado com sucesso.']);
    }
}