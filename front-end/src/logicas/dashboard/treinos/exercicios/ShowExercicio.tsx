import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'

export type ResExercicioProps = {
    id: number
    nome: string
    descricao: string | null
}

const useShowExercicio = (id: number) => {

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