<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;

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

    public function update(UpdateUsuarioRequest $request)
    {
        $user = $request->user();
        $dados = $request->validated();

        DB::transaction(function () use ($user, $dados) {
            // 1. Atualiza tabela 'users'
            
            $user->update([
                'name' => $dados['nome'],
                'email' => $dados['email'],
            ]);

            // 2. Atualiza/Cria 'perfil_usuarios'
            $user->perfil()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'genero' => $dados['genero'],
                    'peso' => $dados['peso'],
                    'tipo_do_peso' => $dados['tipoPeso'],
                    'altura' => $dados['altura'],
                    'idade' => $dados['idade'],
                    'data_de_nascimento' => $dados['dataDeNascimento'],
                    'nivel_de_atividade' => $dados['nivelAtividade'],
                    'experiencia' => $dados['experiencia'],
                ]
            );

            // 3. Atualiza/Cria 'objetivos_usuarios'
            $user->objetivos()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'tipo' => $dados['objetivo'],
                    'peso_ideal' => $dados['pesoIdeal'],
                    'peso_minimo' => $dados['pesoMinimo'] ?? null,
                    'peso_maximo' => $dados['pesoMaximo'] ?? null,
                    'velocidade' => $dados['veloPerda'],
                    'comeco' => now(),
                    'termino' => $dados['tempo']['previsao'],
                    'duracao' => $dados['tempo']['semanas'] ?? null,
                ]
            );

            // 4. Atualiza/Cria 'metricas_usuarios'
            $user->metricas()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'peso' => $dados['peso'],
                    'calorias_diarias' => (int) $dados['calDiaria'],
                    'TMB' => (int) $dados['TMB'],
                    'GET' => (int) $dados['GET'],
                ]
            );
        });

        return response()->json([
            'message' => 'Perfil e métricas atualizados com sucesso!',
            'usuario' => $user->load(['perfil', 'objetivos', 'metricas'])
        ]);
    }
}
