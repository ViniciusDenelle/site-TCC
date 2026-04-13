<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ObjetivoUsuario;
use App\Models\MetricasUsuario;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validado = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::create($validado);

        return response()->json($user);
    }

    public function cadastro(UsuarioRequest $request)
    {
        $dados = $request->validated();

        $usuario = User::create([
            'name' => $dados['nome'],
            'email' => $dados['email'],
            'password' => $dados['senha'],
            'role_id' => 1
        ]);

        $usuario->perfil()->create([
            'genero' => $dados['genero'],
            'peso' => $dados['peso'],
            'tipo_do_peso' => $dados['tipoPeso'],
            'altura' => $dados['altura'],
            'idade' => $dados['idade'],
            'data_de_nascimento' => $dados['dataDeNascimento'],
            'nivel_de_atividade' => $dados['nivelAtividade'],
            'experiencia' => $dados['experiencia'],
        ]);

        $usuario->objetivos()->create([
            'tipo' => $dados['objetivo'],
            'peso_ideal' => $dados['pesoFinal'],
            'velocidade' => $dados['veloPerda'],
            'comeco' => now(),
            'termino' => now(),
            'duracao' => $dados['duracao']
        ]);

        $usuario->metricas()->create([
            'peso' => $dados['peso'],
            'calorias_diarias' => $dados['calDiaria'],
            'GET' => $dados['GET'],
            'TMB' => $dados['TMB']
        ]);

        return response()->json($usuario);
    }
}
