import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import api from '../../../../api'
import { CriarTreinoPayload } from './TreinoProps'

const useCriarTreino = () => {


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
        mutationFn: (dados:CriarTreinoPayload) => api.post(`dashboard/treinos/treino`, dados),
        onSuccess: (res) => {
            console.log(res.data)
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
