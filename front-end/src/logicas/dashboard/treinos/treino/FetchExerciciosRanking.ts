import { useQuery } from '@tanstack/react-query'
import api from '../../../../api'
import { AxiosError } from 'axios'
import { ExercicioOpcaoProps } from './RankingProps'


const useFetchExerciciosRanking = () => {
    const {
        data: exercicios,
        isPending,
        isSuccess,
        isError,
        error,
    } = useQuery<ExercicioOpcaoProps[], AxiosError>({
        queryKey: ['ranking', 'exercicios'],
        queryFn: async () => {
            const res = await api.get('/dashboard/treinos/ranking/exercicios')
            return res.data.data
        },
    })

    return {
        exercicios,
        isPending,
        isSuccess,
        isError,
        error,
    }
}

export default useFetchExerciciosRanking