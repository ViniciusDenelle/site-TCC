<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlimentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'porcao_descricao' => ['required', 'string', 'max:255'],
            'porcao_gramas' => ['required', 'integer', 'min:1'],
            'calorias' => ['required', 'integer', 'min:0'],
            'proteinas' => ['required', 'numeric', 'min:0'],
            'carboidratos' => ['required', 'numeric', 'min:0'],
            'gorduras' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do alimento é obrigatório.',
            'porcao_descricao.required' => 'Descreva a porção de referência (ex: "1 unidade", "1 fatia").',
            'porcao_gramas.required' => 'Informe o peso da porção em gramas.',
            'porcao_gramas.min' => 'O peso da porção precisa ser maior que zero.',
            'calorias.required' => 'Informe as calorias da porção.',
            'proteinas.required' => 'Informe as proteínas da porção.',
            'carboidratos.required' => 'Informe os carboidratos da porção.',
            'gorduras.required' => 'Informe as gorduras da porção.',
        ];
    }
}