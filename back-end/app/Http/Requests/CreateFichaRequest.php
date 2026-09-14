<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFichaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],

            'divisoes' => ['required', 'array', 'min:1'],
            'divisoes.*.nome' => ['required', 'string'],
            'divisoes.*.treino_ids' => ['required', 'array', 'min:1'],
            'divisoes.*.treino_ids.*' => ['integer', 'exists:treinos,id'],

            'dias' => ['required', 'array'],
            'dias.segunda' => ['nullable', 'integer'],
            'dias.terca' => ['nullable', 'integer'],
            'dias.quarta' => ['nullable', 'integer'],
            'dias.quinta' => ['nullable', 'integer'],
            'dias.sexta' => ['nullable', 'integer'],
            'dias.sabado' => ['nullable', 'integer'],
            'dias.domingo' => ['nullable', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da ficha é obrigatório.',
            'divisoes.required' => 'Adicione pelo menos uma divisão.',
            'divisoes.*.nome.required' => 'Toda divisão precisa de um nome.',
            'divisoes.*.treino_ids.required' => 'Toda divisão precisa de pelo menos um treino.',
            'divisoes.*.treino_ids.*.exists' => 'Um dos treinos selecionados não existe.',
        ];
    }
}