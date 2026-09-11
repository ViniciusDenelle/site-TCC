import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { Exercicio } from './exercicoProps'

const useShowExercicio = (id: number | string) => {

    const {
        data: exercicio,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Exercicio
    >({
        queryKey: ['exercicio', id],

        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/exercicio/${id}`)
            return res.data.data
        },

        enabled: !!id
    })

    return {
        exercicio,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useShowExercicio