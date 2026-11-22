import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useDeleteTreino = (id: number) => {

    const navigate = useNavigate()

    const {
        mutate: deletarTreino,
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
            toast.success('treino deletado com sucesso')
            navigate('/dashboard/treino/MeusTreinos')
        },

        onError: (error) => {
            console.log(error)
        }
    })

    return {
        isSuccess,
        isError,
        isPending,
        deletarTreino
    }
}

export default useDeleteTreino