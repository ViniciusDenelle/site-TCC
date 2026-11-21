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

        // não há confirmação por código de e-mail na edição
        unset($rules['codigoConfirmacao']);

        $rules['foto'] = 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048';
        $rules['remover_foto'] = 'nullable|boolean';

        return $rules;
    }
}