import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { CriarTreinoPayload, ResTreinoProps } from './TreinoProps'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const useUpdateTreino = (id:string) => {

    const navigate = useNavigate()

    const {
        mutate: editarTreino,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation<
        AxiosResponse,
        AxiosError,
        CriarTreinoPayload
    >({
        mutationFn: (dados: CriarTreinoPayload) =>
            api.put(`dashboard/treinos/treino/${id}`, dados),

        onSuccess: (res) => {
            toast.success('exercicio editado com sucesso')
            navigate(`/dashboard/treinos/verTreino/${id}`);
            
        },

        onError: (error) => {
            console.log(error)
        }
    })

    return {
        isSuccess,
        isError,
        isPending,
        editarTreino,
        error
    }
}

export default useUpdateTreino