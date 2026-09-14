import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { Ficha } from './FichaProps'

const useFetchFichas = (nome:string, pagina:number) => {

    const {
        data: fichas,
        isSuccess,
        isError,
        isPending
    } = useQuery({
        queryKey: ['fichas', nome, pagina],
        queryFn: async () => {
            const res = await api.get('/dashboard/treinos/ficha', {
                params: { nome: nome || undefined, page: pagina },
            });
            return res.data;
        },
    });

  return {
        fichas,
        isSuccess,
        isError,
        isPending
  }
}

export default useFetchFichas
