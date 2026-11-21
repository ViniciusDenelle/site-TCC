<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AtualizarPerfilRequest;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;
use App\Services\ImagemService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function fetch(Request $request)
    {
        $usuario = $request->user()->load(['perfil', 'objetivos', 'metricas']);

        return new UsuarioResource($usuario);
    }

    public function logout(Request $request) 
    {
        $usuario = $request->user();

        if(!$usuario)
        {
            return response([
                'mensaegm' =>  'usuario não encontrado'
            ], 401);
        }

        $usuario->currentAccessToken()->delete();

        return response([
            'mensagem' => 'logout realizado com sucesso'
        ]);
    }

    public function atualizar(AtualizarPerfilRequest $request, ImagemService $imagens)
    {
        $dados = $request->validated();
        $user = $request->user();

        $fotoAntiga = $user->perfil?->foto;

        $novaFoto = $request->hasFile('foto')
            ? $imagens->salvar($request->file('foto'), 'perfis')
            : null;

        $apagarFoto = !$novaFoto && $request->boolean('remover_foto');

        $campoFoto = [];
        if ($novaFoto) $campoFoto = ['foto' => $novaFoto];
        elseif ($apagarFoto) $campoFoto = ['foto' => null];

        try {
            DB::transaction(function () use ($user, $dados, $campoFoto) {
                // array_filter tira a senha quando ela não foi enviada
                $user->update(array_filter([
                    'name'     => $dados['nome'],
                    'email'    => $dados['email'],
                    'password' => $dados['senha'] ?? null,
                ]));

                $user->perfil()->update([
                    'genero'             => $dados['genero'],
                    'peso'               => $dados['peso'],
                    'tipo_do_peso'       => $dados['tipoPeso'],
                    'altura'             => $dados['altura'],
                    'idade'              => $dados['idade'],
                    'data_de_nascimento' => $dados['dataDeNascimento'],
                    'nivel_de_atividade' => $dados['nivelAtividade'],
                    'experiencia'        => $dados['experiencia'],
                ] + $campoFoto);

                $user->objetivos()->update([
                    'tipo'        => $dados['objetivo'],
                    'peso_ideal'  => $dados['pesoIdeal'],
                    // o multipart não envia null: sem ?? null o campo antigo não seria limpo
                    'peso_minimo' => $dados['pesoMinimo'] ?? null,
                    'peso_maximo' => $dados['pesoMaximo'] ?? null,
                    'velocidade'  => $dados['veloPerda'] ?? null,
                    'termino'     => $dados['objetivo'] !== 'manter_peso' && !empty($dados['termino'])
                        ? Carbon::createFromFormat('d/m/Y', $dados['termino'])->format('Y-m-d')
                        : null,
                    'duracao'     => $dados['duracao'] ?? null,
                ]);

                $user->metricas()->update([
                    'peso'             => $dados['peso'],
                    'calorias_diarias' => $dados['calDiaria'] ?? 0,
                    'GET'              => $dados['GET'],
                    'TMB'              => $dados['TMB'],
                ]);
            });
        } catch (\Throwable $e) {
            $imagens->remover($novaFoto);   // desfaz o upload novo
            throw $e;
        }

        // só apaga a foto antiga depois que o banco foi salvo
        if ($novaFoto || $apagarFoto) {
            $imagens->remover($fotoAntiga);
        }

        return response()->json([
            'usuario' => new UsuarioResource($user->fresh(['metricas', 'objetivos', 'perfil'])),
        ]);
    }
}
