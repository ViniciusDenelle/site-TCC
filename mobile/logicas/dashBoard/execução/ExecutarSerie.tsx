import { useMutation } from '@tanstack/react-query'

import api from '../../../api'

export type SerieExecutada = {
    exercicioId: number
    serie: number
    repeticoes: number
    carga: number
}

export type ReqExecutarTreinoProps = {
    duracao: number
    seriesExecutadas: SerieExecutada[]
}

const useExecutarTreino = (id: number) => {

    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error,
    } = useMutation({
        mutationFn: async (
            dados: ReqExecutarTreinoProps
        ) => {

            const response = await api.post(
                `/dashboard/treinos/executarTreino/${id}`,
                dados
            )

            return response.data
        },

        onSuccess: (data) => {
            console.log('Treino executado:', data)
        },

        onError: (error) => {
            console.log('Erro ao executar treino:', error)
        },
    })

    const executarTreinoHandler = (
        dados: ReqExecutarTreinoProps
    ) => {
        mutate(dados)
    }

    return {
        executarTreinoHandler,
        isSuccess,
        isError,
        isPending,
        error,
    }
}

export default useExecutarTreino