<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ObjetivoUsuario;
use App\Models\MetricasUsuario;
use App\Models\EmailConfirmacao;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function cadastroEmail(Request $request)
    {

        try {
            $emailValido = $request->validate([
                'email' => 'required'
            ]);
    
            EmailConfirmacao::create([
                'codigo' => '12345',
                'email' => 'email@teste',
                'expiracao' => now()->addMinutes(5)
            ]);
    
            Mail::raw("Seu código é: 12345", function ($message) use ($request) {
                $message->to('videnelle@gmail.com')
                        ->subject('Seu código de login');
            });
    
            return response()->json([
                'menssagem' => 'sucesso'
            ]);
         } catch (\Exception $e) {
            return response()->json([
                'erro' => $e->getMessage()
            ], 500);
        }
    }

    public function cadastro(Request $request)
    {   
        $email = EmailConfirmacao::where('codigo', $request->codigoConfirmacao )->first();

        if (!$email) return;


        // $dados = $request->validated();

        // $usuario = User::create([
        //     'name' => $dados['nome'],
        //     'email' => $dados['email'],
        //     'password' => $dados['senha'],
        //     'role_id' => 1
        // ]);

        // $usuario->perfil()->create([
        //     'genero' => $dados['genero'],
        //     'peso' => $dados['peso'],
        //     'tipo_do_peso' => $dados['tipoPeso'],
        //     'altura' => $dados['altura'],
        //     'idade' => $dados['idade'],
        //     'data_de_nascimento' => $dados['dataDeNascimento'],
        //     'nivel_de_atividade' => $dados['nivelAtividade'],
        //     'experiencia' => $dados['experiencia'],
        // ]);

        // $usuario->objetivos()->create([
        //     'tipo' => $dados['objetivo'],
        //     'peso_ideal' => $dados['pesoFinal'],
        //     'velocidade' => 0.55,
        //     'comeco' => now(),
        //     'termino' => now(),
        //     'duracao' => $dados['duracao']
        // ]);

        // $usuario->metricas()->create([
        //     'peso' => $dados['peso'],
        //     'calorias_diarias' => $dados['calDiaria'],
        //     'GET' => $dados['GET'],
        //     'TMB' => $dados['TMB']
        // ]);

        return response()->json($email);
    }

}
