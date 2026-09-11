import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const   useDeleteExercicio = (id: number) => {

    const navigate = useNavigate()

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
            toast.success('Treino removido com sucesso')
            navigate(-1)
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