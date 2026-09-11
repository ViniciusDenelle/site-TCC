import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import api from '../../../../api'
import { CriarTreinoPayload } from './TreinoProps'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export type exerciciosInfo = {
    id: number
    repsMin: number,
    repsMax: number,
    sets: number,
    peso: number,
    descanso: number
}

export type ReqTreinoProps = {
    nome: string,
    descricao?: string,
    exercicios: exerciciosInfo[]
}

const useCriarTreino = () => {

    const navigate = useNavigate()

    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation<
        AxiosResponse,
        AxiosError,
        CriarTreinoPayload
    >({
        mutationFn: async (dados:CriarTreinoPayload) => {
            const res =  await api.post(`dashboard/treinos/treino`, dados)
            return res.data
        } ,onSuccess: (res) => {
            console.log(res)
            toast.success('treino criado com sucesso')
            navigate('/dashboard/treino/verTreino/' + res.data.id)
        },
        onError:(error) => {
            console.log(error)
        }
    })

  return {
        isSuccess,
        isError,
        isPending,
        error,
        mutate
  }
}

export default useCriarTreino
