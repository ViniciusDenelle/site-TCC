import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { ResFichaProps } from './ShowFicha'

const useFetchFichas = () => {

    const {
        data: fichas,
        isSuccess,
        isError,
        isPending
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ResFichaProps
    >({
        queryKey: ['fichas'],
        queryFn: async () => {
            const res = await api.get('dashboard/treinos/ficha')
            return res.data.data
        }
    })

  return {
        fichas,
        isSuccess,
        isError,
        isPending
  }
}

export default useFetchFichas
