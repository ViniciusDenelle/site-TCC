import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { CriarTreinoPayload, ResTreinoProps } from './TreinoProps'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { paraFormData } from '../../../paraFormData'

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
        mutationFn: async (dados: CriarTreinoPayload) => {
            const res = await api.post(`dashboard/treinos/treino/${id}`, paraFormData({ ...dados, _method: 'PUT' }))
            return res.data
        },
            
        onSuccess: (res) => {
            toast.success('treino editado com sucesso')
            navigate('/dashboard/treino/verTreino/' + res.data.id)
            
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