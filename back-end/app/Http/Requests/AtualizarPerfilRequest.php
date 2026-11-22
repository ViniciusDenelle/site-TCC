<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

/**
 * Reaproveita as regras do cadastro (incluindo prepareForValidation, que calcula
 * duracao e termino a partir de "tempo") e muda só o que é diferente na edição.
 */
class AtualizarPerfilRequest extends UsuarioRequest
{
    public function rules(): array
    {
        $rules = parent::rules();

        // o e-mail do próprio usuário não conta como duplicado
        $rules['email'] = [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($this->user()->id),
        ];

        // senha só é enviada quando o usuário quer trocar
        $rules['senha'] = 'nullable|string|min:4';

        // código obrigatório só quando o e-mail ou a senha estão sendo trocados.
        // a conferência do código em si é feita no controller.
        $mudaEmail = strcasecmp((string) $this->input('email'), $this->user()->email) !== 0;
        $mudaSenha = filled($this->input('senha'));

        $rules['codigoConfirmacao'] = [
            ($mudaEmail || $mudaSenha) ? 'required' : 'nullable',
            'string',
        ];

        $rules['foto'] = 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048';
        $rules['remover_foto'] = 'nullable|boolean';

        return $rules;
    }
}