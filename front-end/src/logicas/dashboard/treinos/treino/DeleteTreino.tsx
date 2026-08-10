import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'

const useDeleteTreino = (id: number) => {

    const {
        mutate,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError
    >({
        mutationFn: () =>
            api.delete(`dashboard/treinos/treino/${id}`),

        onSuccess: (res) => {
            console.log(res.data)
        },

        onError: (error) => {
            console.log(error)
        }
    })

    const deletarTreinoHandler = () => {
        mutate()
    }

    return {
        isSuccess,
        isError,
        isPending,
        deletarTreinoHandler
    }
}

export default useDeleteTreino