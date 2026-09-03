<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'senha' => ['nullable', 'string', 'min:8'],
            'genero' => ['required', 'string'],
            'peso' => ['required', 'numeric', 'gt:0'],
            'tipoPeso' => ['required', Rule::in(['kilos', 'libras'])],
            'pesoIdeal' => ['required', 'numeric', 'gt:0'],
            'pesoMinimo' => ['nullable', 'numeric'],
            'pesoMaximo' => ['nullable', 'numeric'],
            'altura' => ['required', 'numeric', 'gt:0'],
            'dataDeNascimento' => ['required', 'date'],
            'idade' => ['required', 'numeric'],
            'nivelAtividade' => ['required', 'numeric'],
            'objetivo' => ['required', 'string'],
            'experiencia' => ['required', 'string'],
            'TMB' => ['required', 'numeric'],
            'GET' => ['required', 'numeric'],
            'calDiaria' => ['required', 'numeric'],
            'veloPerda' => ['required', 'numeric'],
            
            // Objeto tempo
            'tempo' => ['required', 'array'],
            'tempo.semanas' => ['nullable', 'numeric'],
            'tempo.meses' => ['nullable', 'numeric'],
            'tempo.previsao' => ['required', 'date'],
        ];
    }
}