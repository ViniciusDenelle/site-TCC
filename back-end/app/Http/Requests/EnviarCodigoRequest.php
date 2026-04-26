<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EnviarCodigoRequest extends FormRequest
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
        $tipo = $this->input('tipo');
        return [
            'email' => [
                'required',
                'email',
                $tipo == 'cadastro' 
                ? 'unique:users,email'
                : 'exists:users,email'
            ],
            'tipo' => ['required', Rule::in(['cadastro', 'login'])]
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'seu email esta faltando',
            'email.email' => 'email invalido',
            'email.unique' => 'esse email já está sendo usado',
            'email.exists' => 'esse email não possui uma conta',
        ];
    }
}
