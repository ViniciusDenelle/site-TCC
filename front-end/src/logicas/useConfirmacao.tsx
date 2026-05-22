import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type DadosProps = {
    email?: string
    tipo?: string
}

type ErrorResponse = {
    response?: {
        data?: {
            errors?: string[]
        }
    }
}

type EmailMutationProps = {
    mutate: (
        data: {
            email: string
            tipo?: string
        },
        options?: {
            onError?: (error: ErrorResponse) => void
            onSuccess?: (data: unknown) => void
        }
    ) => void

    isSuccess: boolean
    isLoading: boolean
    isError: boolean
}

const useConfirmacao = (
    emailMutation: EmailMutationProps,
    dados: DadosProps = {}
) => {

    const [erros, setErros] = useState<string[]>([])
    const [contagem, setContagem] = useState<number>(0)

    const enviarEmailHandler = (): void => {

        if (!dados.email) return

        emailMutation.mutate(
            {
                email: dados.email,
                tipo: dados. tipo,
            },
            {
                onError: (error: ErrorResponse) => {

                    const erros = error.response?.data?.errors

                    if (erros) {
                        setErros(erros)
                    }
                },

                onSuccess: () => {
                    setErros([])
                    toast.success('email enviado com sucesso')
                    setContagem(30)
                }
            }
        )
    }

    useEffect(() => {
        if (emailMutation.isSuccess) {
            setContagem(30)
        }
    }, [emailMutation.isSuccess])

    useEffect(() => {
        if (contagem <= 0) return

        const interval = setInterval(() => {
            setContagem(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [contagem])

    return {
        enviarEmailHandler,
        isSuccess: emailMutation.isSuccess,
        isLoading: emailMutation.isLoading,
        isError: emailMutation.isError,
        contagem,
        erros
    }
}

export default useConfirmacao