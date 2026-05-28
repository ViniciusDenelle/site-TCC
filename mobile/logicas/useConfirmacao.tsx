import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import useCadastro from './cadastro/useCadastro'
import Toast from 'react-native-toast-message'

type UseCadastroReturn = ReturnType<typeof useCadastro>
type emailMutation = Pick<UseCadastroReturn, 'emailMutation'>

type EmailMutation = {
    mutate: (
        dados: {
            email?: string
            tipo?: string
        },
        options?: {
            onError?: (error: any) => void
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
    emailMutation: EmailMutation,
    dados: Dados = {}
) => {

    const {
        email,
        tipo
    } = dados

    const {
        mutate: enviarEmail,
        isSuccess,
        isPending,
        isError
    } = emailMutation

    const [erros, setErros] = useState<Erros>({})

    function enviarEmailHandler() {

        enviarEmail({
                email,
                tipo
            },{
                onError: (error) => {
                    console.log(error)
                    const erros =
                        error?.response?.data?.errors

                    Toast.show({
                        type: 'error',
                        text1: erros[0]
                    })

                    if (erros) {
                        setErros(erros)
                    }
                },

                onSuccess: data => {
                    console.log(data)

                    setErros({})

                    Toast.show({
                        type: 'success',
                        text1: 'successo ao enviar email'
                    })
                }
            })
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