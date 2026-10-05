// Formato devolvido pelo back-end em UsuarioResource
// (login, cadastro e GET /usuario). Campos do perfil podem vir null
// quando o usuário ainda não completou o cadastro.
export type Usuario = {
    id: number
    nome: string
    email: string

    genero: string | null
    peso: number | null
    tipoPeso: 'kilos' | 'libras' | null
    altura: number | null
    dataDeNascimento: string | null
    nivelDeAtividade: number | null
    experiencia: string | null
    idade: number | null

    pesoIdeal: number | null
    objetivo: string | null
    veloPerda: number | null

    caloriasDiarias: number | null
    TMB: number | null
    GET: number | null
}

export type RespostaLogin = {
    usuario: Usuario
    token: string
}