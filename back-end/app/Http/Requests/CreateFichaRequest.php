<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFichaRequest extends FormRequest
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
            'descricao' => 'nullable',
            'diasSemana' => 'required|array|min:1',
            'diasSemana.*' => 'integer|between:0,6',
            'divisao' => 'required|array|min:1',
            'divisao.*' => 'string'
        ];
    }
}
