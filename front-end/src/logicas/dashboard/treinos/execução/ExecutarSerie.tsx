import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'

export type SeriesExecutadas = {
    id: number,
    serie: number,
    peso: number,
    repeticoes: number,
    concluida: boolean
}

export type ReqExecutarTreinoProps = {
    duracao: number,
    seriesExecutadas: SeriesExecutadas[]
}

const useExecutarTreino = (id : number) => {

    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation({
        mutationFn: (dados:ReqExecutarTreinoProps) => api.post(`/dashboard/treinos/executarTreino/${id}`, dados),
        onSuccess: (res) => {
            console.log(res.data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const executarTreinohandler = (dados:ReqExecutarTreinoProps) => {
        mutate(dados)
    }


  return {
    executarTreinohandler,
    isSuccess,
    isError,
    isPending,
    error
  }
}

export default useExecutarTreino
