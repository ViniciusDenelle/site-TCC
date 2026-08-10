import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { SerieExecutada } from './ExercutarTreinoProps'

export type ReqExecutarTreinoProps = {
    duracao: number,
    seriesExecutadas: SerieExecutada[]
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
