import api from "@/api"
import { useMutation } from "@tanstack/react-query"
import { DadosCadastro } from "../cadastro/useCadastro"

type RetornoUsuario = {
    nome: string
    email: string
    senha: string
    genero: string
    peso: number
    tipo_peso: 'kilos' | 'libras'
    peso_ideal: number
    altura: number
    data_de_nascimento: string
    nivel_atividade: number | null,
    objetivo: string
    experiencia: string
    calDiaria: number
    veloPerda: number
    idade: number
    TMB: number
    GET: number
}

const useFetchUsuario = () => {

    const {
        mutate: fetchUsuario,
        isSuccess,
        isError,
        isPending
    } = useMutation<DadosCadastro>({
        mutationFn: () => api.get('/usuario'),
         onError: (error) => {
            console.log(error)
        }, 
        onSuccess: (res) => {
            console.log(res + 'sucesso')
        }
    })

    return {
        fetchUsuario,
        isSuccess,
        isError,
        isPending
    }
}

export default useFetchUsuario