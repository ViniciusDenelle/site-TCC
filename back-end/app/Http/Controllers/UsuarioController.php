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
}
