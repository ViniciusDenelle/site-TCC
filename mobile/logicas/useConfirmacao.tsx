import { useEffect, useState } from 'react'
import useCadastro from './cadastro/useCadastro'
import Toast from 'react-native-toast-message'

type UseCadastroReturn = ReturnType<typeof useCadastro>
type EmailMutation = Pick<UseCadastroReturn, 'emailMutation'>['emailMutation']

type ErrorApi = {
  response?: {
    data?: {
      message?: string
      errors?: Record<string, string[]>
    }
  }
}

type EmailMutationType = {
  mutate: (
    dados: {
      email?: string
      tipo?: string
    },
    options?: {
      onError?: (error: ErrorApi) => void
      onSuccess?: (data: any) => void
    }
  ) => void
  isSuccess: boolean
  isPending: boolean
  isError: boolean
}

type Dados = {
  email?: string
  tipo?: 'cadastro' | 'login'
}

type Erros = Record<string, string[]>

const useConfirmacao = (
  emailMutation: EmailMutationType,
  dados: Dados = {}
) => {
  const { email, tipo } = dados

  const {
    mutate: enviarEmail,
    isSuccess,
    isPending,
    isError
  } = emailMutation

  const [erros, setErros] = useState<Erros>({})

  function enviarEmailHandler() {
    enviarEmail(
      {
        email,
        tipo
      },
      {
        onError: (error) => {
          const errosApi = error?.response?.data?.errors

          if (errosApi) {
            setErros(errosApi)

            const primeiraChave = Object.keys(errosApi)[0]
            const primeiraMensagem = errosApi[primeiraChave]?.[0]

            Toast.show({
              type: 'error',
              text1: primeiraMensagem || 'Erro ao enviar código'
            })
          } else {
            Toast.show({
              type: 'error',
              text1: error?.response?.data?.message || 'Erro ao enviar código'
            })
          }
        },
        onSuccess: () => {
          setErros({})

          Toast.show({
            type: 'success',
            text1: 'Código enviado com sucesso'
          })
        }
      }
    )
  }

  const [contagem, setContagem] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      setContagem(30)
    }
  }, [isSuccess])

  useEffect(() => {
    if (contagem <= 0) return

    const interval = setInterval(() => {
      setContagem(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [contagem])

  return {
    enviarEmailHandler,
    isSuccess,
    isLoading: isPending,
    isError,
    contagem,
    erros
  }
}

export default useConfirmacao