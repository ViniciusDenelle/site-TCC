import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'

export type ResFichaProps = {
    nome: string,
    descricao?: string,
    diasSemana: number[],
    divisao: string[]
}

const useShowFicha = (id: number) => {
    
    const {
        data: dadosFicha,
        isSuccess,
        isError,
        isPending
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ResFichaProps
    >({
        queryKey: ['ficha', id],
        queryFn: async () => {
            const res = await api.get(`dashboard/treinos/ficha/${id}`)
            return res.data.data
        },
        enabled: !!id
    })

  return {
        dadosFicha,
        isSuccess,
        isError,
        isPending
  }
}

export default useShowFicha
