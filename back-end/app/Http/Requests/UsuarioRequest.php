<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $tempo = $this->input('tempo');

        if (!$tempo)
            return;

        $duracao = ($tempo['meses'] ?? 0) * 4 + ($tempo['semanas'] ?? 0);

        $this->merge([
            'duracao' => $duracao,
            'termino' => $tempo['previsao'] ?? null
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $objetivo = $this->input('objetivo');

        return [
            'nome' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'senha' => 'required|min:4',
            'genero' => 'required|string',
            'idade' => 'required|integer|max:120|min:1',
            'dataDeNascimento' => 'required|date',
            'peso' => 'required|integer|min:20|max:500',
            'pesoMinimo' => [
                $objetivo === 'manter_peso' ? 'required' : 'nullable',
                'numeric'
            ],
            'pesoMaximo' => [
                $objetivo === 'manter_peso' ? 'required' : 'nullable',
                'numeric'
            ],
            'pesoIdeal' => 'required|integer|min:20|max:500',
            'tipoPeso' => 'required|string',
            'altura' => 'required|integer|min:80',
            'nivelAtividade' => 'required|numeric',
            'objetivo' => 'required|string',
            'experiencia' => 'required|string',
            'TMB' => 'required|integer|min:200',
            'GET' => 'required|integer|min:200',
            'calDiaria' => 'integer',
            'duracao' => 'integer',
            'termino' => 'nullable',
            'veloPerda' => 'numeric',
            'codigoConfirmacao' => 'required|string',
            'foto'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Informe seu nome',
            'nome.max' => 'O nome deve ter no máximo 50 caracteres',

            'email.required' => 'Informe seu e-mail',
            'email.email' => 'Digite um e-mail válido',
            'email.unique' => 'Este e-mail já está cadastrado',

            'senha.required' => 'Informe uma senha',
            'senha.min' => 'A senha deve ter no mínimo 6 caracteres',

            'genero.required' => 'Informe seu gênero',

            'idade.required' => 'Informe sua idade',
            'idade.integer' => 'A idade deve ser um número válido',
            'idade.max' => 'A idade deve ser no máximo 120 anos',
            'idade.min' => 'A idade deve ser no mínimo 1 ano',

            'dataDeNascimento.required' => 'Informe sua data de nascimento',
            'dataDeNascimento.date' => 'Data de nascimento inválida',

            'peso.required' => 'Informe seu peso',
            'peso.integer' => 'O peso deve ser um número inteiro',
            'peso.min' => 'O peso deve ser no mínimo 20kg',
            'peso.max' => 'O peso deve ser no máximo 500kg',

            'pesoIdeal.required' => 'Informe seu peso final',
            'pesoIdeal.integer' => 'O peso final deve ser um número inteiro',
            'pesoIdeal.min' => 'O peso final deve ser no mínimo 20kg',
            'pesoIdeal.max' => 'O peso final deve ser no máximo 500kg',

            'tipoPeso.required' => 'Informe o tipo de peso (ex: kg)',

            'altura.required' => 'Informe sua altura',
            'altura.integer' => 'A altura deve ser um número inteiro',

            'nivelAtividade.required' => 'Informe seu nível de atividade',
            'nivelAtividade.numeric' => 'Nível de atividade inválido',

            'objetivo.required' => 'Informe seu objetivo',

            'experiencia.required' => 'Informe sua experiência',

            'TMB.required' => 'Erro ao calcular TMB',
            'TMB.integer' => 'TMB inválido',
            'TMB.min' => 'TMB muito baixo',

            'GET.required' => 'Erro ao calcular gasto energético',
            'GET.integer' => 'GET inválido',
            'GET.min' => 'GET muito baixo',

            'calDiaria.required' => 'Erro ao calcular calorias diárias',
            'calDiaria.integer' => 'Calorias inválidas',

            'duracao.required' => 'Erro ao calcular duração do plano',
            'duracao.integer' => 'Duração inválida',
            'duracao.min' => 'A duração deve ser maior que 0',

            'termino.required' => 'Informe a data de término',
            'termino.date' => 'Data de término inválida',

            'veloPerda.required' => 'Informe a velocidade de perda',
            'veloPerda.numeric' => 'Velocidade de perda inválida',
        ];
    }
}
