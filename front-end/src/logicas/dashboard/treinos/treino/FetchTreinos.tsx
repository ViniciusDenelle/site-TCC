import { useQuery } from '@tanstack/react-query'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'

export type Exercicio = {
    id: number
    nome: string
    descricao: string
}

export type ResExercicioTreinoProps = {
    id: number
    ordem: number

    repsMin: number
    repsMax: number
    sets: number
    peso: number
    descanso: number

    exercicio: Exercicio
}

export type ResTreinoProps = {
    id: number
    nome: string
    descricao: string | null

    exercicios: ResExercicioTreinoProps[]
}

const useFetchTreinos = () => {
    const {
        data: treinos,
        isPending,
        isSuccess,
        isError,
        error,
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ResTreinoProps[]
    >({
        queryKey: ['treinos'],
        queryFn: async () => {
            const res = await api.get('/dashboard/treinos/treino')

            return res.data.data
        },
    })

    return {
        treinos,
        isPending,
        isSuccess,
        isError,
        error,
    }
}

export default useFetchTreinos