
import { useQuery } from '@tanstack/react-query'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { ResTreinoProps } from './TreinoProps'



const useShowTreino = (id: number | string) => {
    const {
        data: treino,
        isPending,
        isSuccess,
        isError,
        error,
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ResTreinoProps
    >({
        queryKey: ['treino', id],
        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/treino/${id}`)
            return res.data.data
        },
        enabled: !!id,
    })

    return {
        treino,
        isPending,
        isSuccess,
        isError,
        error,
    }
}

export default useShowTreino