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
            'nome' => 'required|string',
            'descricao' => 'nullable|string',
            'exercicios' => 'required|array',

            'exercicios.*.id' => 'required|integer',
            'exercicios.*.repsMin' => 'required|integer',
            'exercicios.*.repsMax' => 'required|integer',
            'exercicios.*.sets' => 'required|integer',
            'exercicios.*.peso' => 'required|numeric',
            'exercicios.*.descanso' => 'required|integer',
            
        ];
    }
}
