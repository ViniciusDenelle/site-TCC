import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import api from '../../../../api'

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

const useCriarTreino = ({
    id,
    nome,
    descricao,
    exercicios
} : ReqTreinoProps & {id: number}) => {


    const {
        mutate,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError,
        ReqTreinoProps
    >({
        mutationFn: (dados:ReqTreinoProps) => api.post(`dashboard/treinos/treino/${id}`, dados),
        onSuccess: (res) => {
            console.log(res.data)
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const criarTreinoHandler = () => {
        mutate({
            nome: nome,
            descricao: descricao,
            exercicios: exercicios
        })
    }

  return {
        isSuccess,
        isError,
        isPending,
        criarTreinoHandler
  }
}

export default useCriarTreino
