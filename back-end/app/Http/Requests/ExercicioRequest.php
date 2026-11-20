<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExercicioRequest extends FormRequest
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
            'imagem'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'remover_imagem' => 'nullable|boolean',
            'tipo_id' => ['required', 'integer', 'exists:tipos_exercicio,id'],
            'nivel_id' => ['required', 'integer', 'exists:niveis_exercicio,id'],
            'foco_id' => ['required', 'integer', 'exists:focos,id'],

            'musculos' => ['required', 'array', 'min:1'],
            'musculos.*.id' => ['required', 'integer', 'exists:musculos,id'],
            'musculos.*.tipo' => ['required', 'integer', 'in:1,2'],

            'equipamentos' => ['nullable', 'array'],
            'equipamentos.*' => ['integer', 'exists:equipamentos,id'],
        ];
    }

    public function messages(): array
    {
        return [
            // nome
            'nome.required' => 'O nome do exercício é obrigatório.',
            'nome.string' => 'O nome do exercício deve ser um texto.',
            'nome.max' => 'O nome do exercício não pode ter mais de 255 caracteres.',

            // descricao
            'descricao.string' => 'A descrição deve ser um texto.',

            // tipo_id
            'tipo_id.required' => 'Selecione o tipo do exercício.',
            'tipo_id.integer' => 'O tipo do exercício é inválido.',
            'tipo_id.exists' => 'O tipo de exercício selecionado é inválido.',

            // nivel_id
            'nivel_id.required' => 'Selecione o nível do exercício.',
            'nivel_id.integer' => 'O nível do exercício é inválido.',
            'nivel_id.exists' => 'O nível de exercício selecionado é inválido.',

            // foco_id
            'foco_id.required' => 'Selecione o foco do exercício.',
            'foco_id.integer' => 'O foco do exercício é inválido.',
            'foco_id.exists' => 'O foco selecionado é inválido.',

            // musculos
            'musculos.required' => 'Selecione pelo menos um músculo para o exercício.',
            'musculos.array' => 'Os músculos informados são inválidos.',
            'musculos.min' => 'Selecione pelo menos um músculo para o exercício.',
            'musculos.*.id.required' => 'Cada músculo precisa de um identificador válido.',
            'musculos.*.id.integer' => 'O identificador do músculo é inválido.',
            'musculos.*.id.exists' => 'Um dos músculos selecionados não existe no banco de dados.',
            'musculos.*.tipo.required' => 'Informe se o músculo é primário ou secundário.',
            'musculos.*.tipo.integer' => 'O tipo do músculo é inválido.',
            'musculos.*.tipo.in' => 'O tipo do músculo deve ser 1 (Primário) ou 2 (Secundário).',

            // equipamentos
            'equipamentos.array' => 'Os equipamentos informados são inválidos.',
            'equipamentos.*.integer' => 'O identificador do equipamento é inválido.',
            'equipamentos.*.exists' => 'Um dos equipamentos selecionados é inválido.',
        ];
    }
}
