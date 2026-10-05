import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { SerieExecutada } from './ExercutarTreinoProps'
import toast from 'react-hot-toast'

export type ReqExecutarTreinoProps = {
    duracao: number,
    seriesExecutadas: SerieExecutada[],
    inicio: Date
}

const useExecutarTreino = (id : number) => {

    const {
        mutate: executarTreino,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation({
        mutationFn: (dados:ReqExecutarTreinoProps) => api.post(`/dashboard/treinos/executarTreino/${id}`, dados),
        onSuccess: (res) => {
            toast.success('Treino realizado com sucesso')
        },
        onError: (error) => {
            console.log(error)
        }
    })

  return {
    executarTreino,
    isSuccess,
    isError,
    isPending,
    error
  }
}

export default useExecutarTreino
