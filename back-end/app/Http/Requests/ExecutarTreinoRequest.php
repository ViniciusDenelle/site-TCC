<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExecutarTreinoRequest extends FormRequest
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
            'duracao' => 'required|integer|min:1',

            'seriesExecutadas' => 'required|array|min:1',
            'seriesExecutadas.*.id' => 'required|integer|exists:exercicios_treino,id',
            'seriesExecutadas.*.serie' => 'required|integer|min:1',
            'seriesExecutadas.*.peso' => 'required|numeric|min:0',
            'seriesExecutadas.*.repeticoes' => 'required|integer|min:0',
            'seriesExecutadas.*.concluida' => 'required|boolean',
        ];
    }
}
