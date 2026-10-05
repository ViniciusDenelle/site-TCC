import { isAxiosError } from 'axios'

/**
 * Converte qualquer erro de requisição em um texto amigável para o usuário.
 * Entende os dois formatos do back-end: { mensagem } (controllers)
 * e { message, errors: { campo: [..] } } (validação do Laravel, status 422).
 */
export function mensagemDeErro(error: unknown, padrao = 'Erro inesperado. Tente novamente') {
    if (!isAxiosError(error)) return padrao

    if (!error.response) {
        return 'Não foi possível conectar ao servidor'
    }

    const dados = error.response.data

    if (typeof dados?.mensagem === 'string') return dados.mensagem

    if (dados?.errors && typeof dados.errors === 'object') {
        const primeiro = Object.values(dados.errors)[0]
        if (Array.isArray(primeiro) && primeiro[0]) return String(primeiro[0])
    }

    if (typeof dados?.message === 'string') return dados.message

    return padrao
}