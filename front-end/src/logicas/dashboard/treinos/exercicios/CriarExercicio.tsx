import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { ExercicioPayload } from './exercicoProps'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { paraFormData } from '../../../paraFormData'
import { useNavigate } from 'react-router-dom'

const useCriarExercicio = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation<
        AxiosResponse,
        AxiosError,
        ExercicioPayload
    >({
        mutationFn: async (dados) =>{
            const res = await api.post('/dashboard/treinos/exercicio', paraFormData(dados))
            return res.data
        },

        onSuccess: (res) => {
             queryClient.invalidateQueries({ queryKey: ['exercicios'] })
            toast.success('exercicio criado com sucesso')
            navigate(`/dashboard/treino/verExercicio/${res.data.id}`)
        },
        onError: () => {
            toast.error('houve um erro ao criar o exercicio')
        }
    })

    return {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    }
}

export default useCriarExercicio