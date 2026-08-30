import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../../../api'
import { ExercicioPayload } from './exercicoProps'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useCriarExercicio = () => {

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
            const res = await api.post('/dashboard/treinos/exercicio', dados)
            return res.data
        },

        onSuccess: (res) => {
            toast.success('exercicio criado com sucesso')
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