import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { ResExercicioProps } from './FetchExercicio'

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
        ResExercicioProps
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