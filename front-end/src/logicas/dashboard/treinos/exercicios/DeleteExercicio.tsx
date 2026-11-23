import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const   useDeleteExercicio = (id: number) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        mutate: deletarExercicio,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError
    >({
        mutationFn: async () => {
            const res = await api.delete(`/dashboard/treinos/exercicio/${id}`)
            return res.data
        },

        onSuccess: (res) => {
            toast.success('Exercicio removido com sucesso')
            navigate('/dashboard/treino/MeusTreinos')
            queryClient.invalidateQueries({ queryKey: ['exercicios'] })
        },

        onError: (error) => {
            console.log(error)
        }
    })

    
    return {
        deletarExercicio,
        isSuccess,
        isError,
        isPending
    }
}

export default useDeleteExercicio