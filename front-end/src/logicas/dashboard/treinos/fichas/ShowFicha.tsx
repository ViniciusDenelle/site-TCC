import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { Ficha } from './FichaProps'

const useShowFicha = (id: number|string) => {
    
    const {
        data: ficha,
        isSuccess,
        isError,
        isPending
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Ficha
    >({
        queryKey: ['ficha', id],
        queryFn: async () => {
            const res = await api.get(`dashboard/treinos/ficha/${id}`)
            return res.data.data
        },
        enabled: !!id
    })

  return {
        ficha,
        isSuccess,
        isError,
        isPending
  }
}

export default useShowFicha
