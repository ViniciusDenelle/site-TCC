import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useCadastro from './cadastro/useCadastro'

const useConfirmacao = (emailMutation, dados = {}) => {

    const {
        email,
        tipo
    } = dados || {}

    const {
        mutate: enviarEmail,
        isSuccess,
        isLoading,
        isError,
    } = emailMutation

    const [erros, setErros] = useState([])

    function enviarEmailHandler() {
        enviarEmail({
            email: email,
            tipo: tipo,
        }, {
            onError: (error) => {
                const erros = error.response?.data?.errors
                if(erros){
                    setErros(erros)
                }
            },
            onSuccess: (data) => {
                console.log(data)
                setErros([])
                toast.success('email enviado com sucesso')
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
        isLoading,
        isError,
        contagem,
        erros
    }
}

export default useConfirmacao