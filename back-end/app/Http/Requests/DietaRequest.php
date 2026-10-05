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
            'descricao' => ['nullable', 'string'],
            'objetivo_id' => ['required', 'integer', 'exists:objetivos_dieta,id'],
            'nivel_id' => ['required', 'integer', 'exists:niveis_dieta,id'],

            'refeicoes' => ['nullable', 'array'],
            'refeicoes.*.nome' => ['required_with:refeicoes', 'string', 'max:255'],
            'refeicoes.*.dia_semana' => ['required_with:refeicoes', 'integer', 'between:0,6'],
            'refeicoes.*.horario' => ['nullable', 'date_format:H:i'],
            'refeicoes.*.ordem' => ['nullable', 'integer'],

            'refeicoes.*.alimentos' => ['nullable', 'array'],
            'refeicoes.*.alimentos.*.alimento_id' => ['required', 'integer', 'exists:alimentos,id'],
            'refeicoes.*.alimentos.*.quantidade_porcoes' => ['required', 'numeric', 'min:0.1'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da dieta é obrigatório.',
            'objetivo_id.required' => 'Selecione o objetivo da dieta.',
            'objetivo_id.exists' => 'O objetivo selecionado é inválido.',
            'nivel_id.required' => 'Selecione o nível da dieta.',
            'nivel_id.exists' => 'O nível selecionado é inválido.',

            'refeicoes.*.nome.required_with' => 'Toda refeição precisa de um nome.',
            'refeicoes.*.dia_semana.required_with' => 'Toda refeição precisa de um dia da semana.',
            'refeicoes.*.dia_semana.between' => 'Dia da semana inválido.',
            'refeicoes.*.horario.date_format' => 'O horário deve estar no formato HH:MM.',

            'refeicoes.*.alimentos.*.alimento_id.exists' => 'Um dos alimentos selecionados não existe.',
            'refeicoes.*.alimentos.*.quantidade_porcoes.required' => 'Informe a quantidade de porções.',
            'refeicoes.*.alimentos.*.quantidade_porcoes.min' => 'A quantidade de porções deve ser maior que zero.',
        ];
    }
}