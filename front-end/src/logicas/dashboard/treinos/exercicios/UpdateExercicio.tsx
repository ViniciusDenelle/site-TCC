import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export type ReqExercicioProps = {
    nome: string
    descricao?: string
}

const useUpdateExercicio = (id:string|number) => {

    const navigate = useNavigate()

    const {
        mutate: editarExercicio,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation<
        AxiosResponse,
        AxiosError,
        ReqExercicioProps
    >({
        mutationFn: async (dados) => {
            const res = await api.put(`/dashboard/treinos/exercicio/${id}`, dados)
            return res.data
        },
            

        onSuccess: (res) => {
            toast.success('exercicio atualizado com sucesso')
            navigate(`/dashboard/treino/verExercicio/${res.data.id}`)
        },

        onError: (error) => {
            console.log(error)
        }
    })
  
    return {
        editarExercicio,
        isSuccess,
        isError,
        isPending,
        error
    }
}

export default useUpdateExercicio