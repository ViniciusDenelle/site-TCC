import type {
  UseMutationResult
} from '@tanstack/react-query'

import type {
  AxiosError
} from 'axios'

export type DadosCadastro = {
  nome: string
  email: string
  senha: string
  genero: string
  peso: number
  tipoPeso: 'kilos' | 'libras'
  pesoFinal: number
  altura: number
  dataDeNascimento: string
  nivelAtividade: number | null
  objetivo: string
  experiencia: string
  calDiaria: number
  tempo: {
    semanas: number
    meses: number
    previsao: string
  }
  veloPerda: number
  codigoConfirmacao: string
}

export type ErrosCampo =
  Partial<
    Record<
      keyof DadosCadastro,
      string
    >
  >

export type RespostaCadastro = {
  message: string
}

export type ErroApi = {
  errors?: Partial<
    Record<
      keyof DadosCadastro,
      string[]
    >
  >
}

export type CadastroInfo =
  DadosCadastro & {
    idade: number
    TMB: number
    GET: number
  }

export type EmailMutation = {
  mutate: (
    dados: {
      email?: string
      tipo?: string
    },
    options?: {
      onError?: (
        error: AxiosError<ErroApi>
      ) => void

      onSuccess?: (
        data: RespostaCadastro
      ) => void
    }
  ) => void

  isSuccess: boolean
  isPending: boolean
  isError: boolean
}

export type UseCadastroReturn = {
  dados: DadosCadastro

  mudarDados: <
    K extends keyof DadosCadastro
  >(
    campo: K,
    valor: DadosCadastro[K]
  ) => void

  errosCampo: ErrosCampo

  podeSeguir: (
    passo: string
  ) => boolean

  idade: number
  TMB: number
  GET: number

  parseNumero: (
    valor: string
  ) => number

  emailMutation: EmailMutation

  cadastrarMutation:
    UseMutationResult<
      RespostaCadastro,
      AxiosError<ErroApi>,
      CadastroInfo
    >

  cadastroHandler: () => void
}