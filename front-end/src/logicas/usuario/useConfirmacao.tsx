import { UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ErrosCampoCadastro } from '../cadastro/useCadastro'

type DadosProps = {
    email?: string
    tipo?: string
}

type ErrorResponse = {
    response?: {
        data?: {
            errors?: ErrosCampoCadastro
        }
    }
}

type EmailMutationProps =  UseMutationResult<any, AxiosError, {
            email?: string
            tipo?: string
        }
    >



const useConfirmacao = (
    emailMutation: EmailMutationProps,
    dados: DadosProps = {}
) => {

    const [erros, setErros] = useState<ErrosCampoCadastro>({})
    const [contagem, setContagem] = useState<number>(0)

    const enviarEmailHandler = (): void => {

        emailMutation.mutate(
            {
                email: dados.email,
                tipo: dados.tipo,
            },
            {
                onError: (error: ErrorResponse) => {

                    const erros = error.response?.data?.errors

                    if (erros) {
                        setErros(erros)
                    }

                    toast.error('houve um problema ao enviar o email')
                },

                onSuccess: () => {
                    setErros({})
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
        isPending: emailMutation.isPending,
        isError: emailMutation.isError,
        contagem,
        erros
    }
}

export default useConfirmacao