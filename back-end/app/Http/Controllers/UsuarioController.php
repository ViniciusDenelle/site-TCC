<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;

class UsuarioController extends Controller
{
    public function fetch(Request $request)
    {
        $usuario = $request->user()->load(['perfil', 'objetivo', 'metricas']);

        return new UsuarioResource($usuario);
    }
}
