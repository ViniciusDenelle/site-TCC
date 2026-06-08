<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EnviarCodigoRequest;
use App\Http\Requests\UsuarioRequest;
use Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ObjetivoUsuario;
use App\Models\MetricasUsuario;
use App\Models\EmailConfirmacao;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function cadastroEmail(EnviarCodigoRequest $request)
    {

        $dados = $request->validated();

        EmailConfirmacao::where('email', $dados['email'])->delete();

        $codigo = (string) random_int(100000, 999999);

        EmailConfirmacao::create([
            'codigo' => $codigo,
            'email' => $dados['email'],
            'tipo' => $dados['tipo'],
            'expiracao' => now()->addMinutes(20)
        ]);

        Mail::raw("Seu código é: {$codigo}", function ($message) use ($dados) {
            $message->to($dados['email'])
                ->subject('Seu código de login');
        });

        return response()->json([
            'mensagem' => 'sucesso'
        ]);

    }

    public function login(Request $request)
    {
        $dados = $request->validate([
            'email' => 'required|email',
            'senha' => 'required|string|min:4',
        ], [
            'email.required' => 'seu email está faltando',
            'senha.required' => 'sua senha está faltando',
            'email.email' => 'email invalido',
            'senha.min' => 'a senha prescisa de um minimo de 4 caracteres'
        ]);

        $user = User::where('email', $dados['email'])->first();

        if(!$user || !Hash::check($dados['senha'], $user->password))
            return response()->json([
                'mensagem' => 'validação deu erro'
            ], 401);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([$user, $token]);
    }

    public function recuperarSenha(Request $request)
    {
        $dados = $request->validate([
            'email' => 'required|exists:users,email',
            'senhaNova' => 'required',
            'codigo' => 'required' 
        ], [
            'email.required' => 'o email está faltando',
            'email.email' => 'email invalido',
            'senhaNova.required' => 'sua nova senha está faltando',
            'codigo.required' => 'o codigo está faltando'
        ]);

        $email = EmailConfirmacao::where('codigo', $dados['codigo'])
        ->where('email', $dados['email'])
        ->where('expiracao', '>', now())->first();

        if(!$email) return response()->json([
            'mensagem' => 'codigo de confirmação esta errado ou expirou'
        ]);

        $user = User::where('email', $dados['email'])->first();

        if (!$user) {
            return response()->json([
                'mensagem' => 'usuário não encontrado'
            ], 404);
        }

        $user->update([
            'password' => $dados['senhaNova']
        ]);

        $email->delete();

        return response()->json($user);
    }

    public function cadastro(UsuarioRequest $request)
    {
        
        $dados = $request->validated();
        
        $email = EmailConfirmacao::where('codigo', $dados['codigoConfirmacao'])
            ->where('email', $dados['email'])
            ->where('expiracao', '>', now())->first();

        if (!$email)
            return response()->json([
               'mensagem' => 'codigo esta errado ou expirou' ,
               'request' => $request->codigoConfirmacao,
               'dados' => $dados['codigoConfirmacao']
            ], 401);

        $usuario = DB::transaction(function () use ($dados, $email) {
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
                'peso_ideal' => $dados['pesoIdeal'],
                'peso_minimo' => $dados['pesoMinimo'],
                'peso_maximo' => $dados['pesoMaximo'],
                'velocidade' => $dados['veloPerda'],
                'comeco' => now(),
                'termino' => $dados['termino'],
                'duracao' => $dados['duracao']
            ]);
    
            $usuario->metricas()->create([
                'peso' => $dados['peso'],
                'calorias_diarias' => $dados['calDiaria'],
                'GET' => $dados['GET'],
                'TMB' => $dados['TMB']
            ]);
        });


        $email->delete();

        return response()->json( $usuario);
    }

}
