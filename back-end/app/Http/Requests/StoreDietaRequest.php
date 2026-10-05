<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDietaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

        return [
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'objetivo' => ['nullable', 'string', 'max:255'],
            'nivel' => ['nullable', 'string', 'max:255'],
            'duracao' => ['nullable', 'string', 'max:255'],
            'meta_agua' => ['nullable', 'numeric', 'min:0', 'max:99'],
            'meta_calorias' => ['nullable', 'integer', 'min:0'],
            'meta_proteinas' => ['nullable', 'numeric', 'min:0'],
            'meta_carboidratos' => ['nullable', 'numeric', 'min:0'],
            'meta_gorduras' => ['nullable', 'numeric', 'min:0'],
            'observacoes_finais' => ['nullable', 'string'],

            'refeicoes' => ['nullable', 'array'],
            'refeicoes.*.dia_semana' => ['required', Rule::in($dias)],
            'refeicoes.*.nome' => ['required', 'string', 'max:255'],
            'refeicoes.*.horario' => ['nullable', 'date_format:H:i'],
            'refeicoes.*.ordem' => ['nullable', 'integer', 'min:0'],

            'refeicoes.*.alimentos' => ['nullable', 'array'],
            'refeicoes.*.alimentos.*.nome' => ['required', 'string', 'max:255'],
            'refeicoes.*.alimentos.*.quantidade' => ['nullable', 'string', 'max:255'],
            'refeicoes.*.alimentos.*.calorias' => ['nullable', 'numeric', 'min:0'],
            'refeicoes.*.alimentos.*.proteinas' => ['nullable', 'numeric', 'min:0'],
            'refeicoes.*.alimentos.*.carboidratos' => ['nullable', 'numeric', 'min:0'],
            'refeicoes.*.alimentos.*.gorduras' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Informe o nome da dieta.',
            'refeicoes.*.nome.required' => 'Toda refeição precisa de um nome.',
            'refeicoes.*.alimentos.*.nome.required' => 'Todo alimento precisa de um nome.',
        ];
    }
}