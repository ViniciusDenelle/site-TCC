<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TreinoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'foco_id' => 'required|integer|exists:focos,id',
            'tipo_id' => 'required|integer|exists:tipos_treino,id', // ajuste o nome da tabela se for diferente (ex: tipo_treinos)
            
            'exercicios' => 'required|array|min:1',
            'exercicios.*.exercicio_id' => 'required|integer|exists:exercicios,id',
            'exercicios.*.ordem' => 'required|integer|min:1',
            'exercicios.*.sets' => 'required|integer|min:1',
            'exercicios.*.repeticoes_minimas' => 'required|integer|min:0',
            'exercicios.*.repeticoes_maximas' => 'required|integer|gte:exercicios.*.repeticoes_minimas',
            'exercicios.*.peso' => 'required|numeric|min:0',
            'exercicios.*.descanso' => 'required|integer|min:0',
        ];
    }

    /**
     * Custom mensagens de erro de validação (opcional).
     */
    public function messages(): array
    {
        return [
            'foco_id.exists' => 'O foco selecionado é inválido.',
            'tipo_id.exists' => 'O tipo de treino selecionado é inválido.',
            'exercicios.*.exercicio_id.exists' => 'Um dos exercícios selecionados não existe no sistema.',
            'exercicios.*.repeticoes_maximas.gte' => 'As repetições máximas devem ser maiores ou iguais às repetições mínimas.',
        ];
    }
}