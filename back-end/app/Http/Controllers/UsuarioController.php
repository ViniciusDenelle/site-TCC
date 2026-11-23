<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AtualizarPerfilRequest;
use App\Http\Resources\UsuarioResource;
use App\Mail\CodigoConfirmacaoMail;
use App\Models\EmailConfirmacao;
use App\Services\ImagemService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

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

        if (!$usuario) {
            return response([
                'mensagem' => 'usuario não encontrado'
            ], 401);
        }

        $usuario->currentAccessToken()->delete();

        return response([
            'mensagem' => 'logout realizado com sucesso'
        ]);
    }

    public function update(AtualizarPerfilRequest $request, ImagemService $imagens)
    {
        $dados = $request->validated();
        $user = $request->user();

        /*
         * 1) Confirmação por código: só quando e-mail ou senha mudam.
         *    Vem ANTES de salvar a foto, para não deixar arquivo órfão se o código estiver errado.
         */
        $mudaEmail = strcasecmp($dados['email'], $user->email) !== 0;
        $mudaSenha = !empty($dados['senha']);

        $confirmacao = null;

        if ($mudaEmail || $mudaSenha) {
            // mesmo destino usado em enviarCodigoPerfil: o e-mail atual da conta
            $destino = $user->email;

            $confirmacao = EmailConfirmacao::where('codigo', $dados['codigoConfirmacao'] ?? '')
                ->where('email', $destino)
                ->where('tipo', 'perfil')
                ->where('expiracao', '>', now())
                ->first();

            if (!$confirmacao) {
                // 422 com "errors": o front mostra a mensagem no campo do código
                throw ValidationException::withMessages([
                    'codigoConfirmacao' => 'código errado ou expirado',
                ]);
            }
        }

        /*
         * 2) Foto
         */
        $fotoAntiga = $user->perfil?->foto;

        $novaFoto = $request->hasFile('foto')
            ? $imagens->salvar($request->file('foto'), 'perfis')
            : null;

        $apagarFoto = !$novaFoto && $request->boolean('remover_foto');

        $campoFoto = [];
        if ($novaFoto) $campoFoto = ['foto' => $novaFoto];
        elseif ($apagarFoto) $campoFoto = ['foto' => null];

        /*
         * 3) Salvar tudo
         */
        try {
            DB::transaction(function () use ($user, $dados, $campoFoto, $confirmacao) {
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

                // o código só vale uma vez
                $confirmacao?->delete();
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

    public function enviarCodigoPerfil(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'tipo' => 'required|in:email,senha',
        ]);

        // o destino é decidido AQUI, não pelo front: sempre o e-mail atual da conta,
        // tanto para trocar o e-mail quanto para trocar a senha
        $destino = $user->email;

        EmailConfirmacao::where('email', $destino)->where('tipo', 'perfil')->delete();

        $codigo = (string) random_int(100000, 999999);

        // se a coluna "tipo" for um enum, inclua o valor 'perfil' na migration
        EmailConfirmacao::create([
            'codigo'    => $codigo,
            'email'     => $destino,
            'tipo'      => 'perfil',
            'expiracao' => now()->addMinutes(20),
        ]);

        // Substituição do Mail::raw pelo Mailable estruturado:
        Mail::to($destino)->send(new CodigoConfirmacaoMail($codigo));

        return response()->json(['mensagem' => 'sucesso']);
    }
}
