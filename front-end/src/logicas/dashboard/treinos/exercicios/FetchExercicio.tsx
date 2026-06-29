import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'

export type ResExercicioProps = {
    id: number
    nome: string
    descricao: string | null
}

const useFetchExercicios = () => {

    const {
        data: exercicios,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ResExercicioProps[]
    >({
        queryKey: ['exercicios'],

        queryFn: async () => {
            const res = await api.get('/dashboard/treinos/exercicio')
            return res.data.data
        }
    })

    return {
        exercicios,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useFetchExercicios