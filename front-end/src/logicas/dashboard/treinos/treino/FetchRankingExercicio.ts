import { useQuery } from '@tanstack/react-query'
import api from '../../../../api'
import { AxiosError } from 'axios'
import { ResRankingExercicioProps } from './RankingProps'


const useFetchRankingExercicio = (exercicioId: number | null) => {
    const {
        data: ranking,
        isPending,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useQuery<ResRankingExercicioProps, AxiosError>({
        queryKey: ['ranking', 'exercicio', exercicioId],
        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/ranking/exercicios/${exercicioId}`)
            return res.data.data
        },
        enabled: exercicioId !== null,
    })

    return {
        ranking,
        isPending,
        isFetching,
        isSuccess,
        isError,
        error,
    }
}

export default useFetchRankingExercicio