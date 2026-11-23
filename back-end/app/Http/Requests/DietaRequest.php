<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DietaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string', 'max:1000'],

            'refeicoes' => ['nullable', 'array'],
            'refeicoes.*.nome' => ['required', 'string', 'max:255'],
            'refeicoes.*.dia_semana' => ['required', 'integer', 'between:0,6'],
            'refeicoes.*.horario' => ['nullable', 'date_format:H:i'],
            'refeicoes.*.ordem' => ['nullable', 'integer', 'min:0'],

            'refeicoes.*.alimentos' => ['nullable', 'array'],
            'refeicoes.*.alimentos.*.alimento_id' => ['required', 'integer', 'exists:alimentos,id'],
            'refeicoes.*.alimentos.*.quantidade_gramas' => ['required', 'numeric', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Informe o nome da dieta.',
            'nome.max' => 'O nome da dieta pode ter no máximo 255 caracteres.',
            'descricao.max' => 'A descrição pode ter no máximo 1000 caracteres.',

            'refeicoes.*.nome.required' => 'Toda refeição precisa de um nome.',
            'refeicoes.*.dia_semana.required' => 'Toda refeição precisa de um dia da semana.',
            'refeicoes.*.dia_semana.between' => 'O dia da semana deve ser de 0 (domingo) a 6 (sábado).',
            'refeicoes.*.horario.date_format' => 'O horário deve estar no formato HH:MM.',

            'refeicoes.*.alimentos.*.alimento_id.required' => 'Alimento inválido na refeição.',
            'refeicoes.*.alimentos.*.alimento_id.exists' => 'Um dos alimentos escolhidos não existe mais.',
            'refeicoes.*.alimentos.*.quantidade_gramas.required' => 'Informe a quantidade em gramas de cada alimento.',
            'refeicoes.*.alimentos.*.quantidade_gramas.min' => 'A quantidade de cada alimento deve ser de pelo menos 1 grama.',
        ];
    }
}