import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '@/api'
import { Badge } from './exercicios/FetchExercicio'

type BadgeProps = 'tiposTreino' | 'tiposExercicio' | 'musculos' | 'equipamentos' | 'niveis' | 'focos' 

const useFetchBadge = (tipo:BadgeProps) => {

    const {
        data,
        isSuccess,
        isPending,
        isError,
        error
    } = useQuery<
        Badge[]
    >({
        queryKey: ['badges', tipo],
        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/badges/${tipo}`)
            return res.data.data
        }
    })

  return {
    data,
    isSuccess,
    isPending,
    isError,
    error
  }
}

export default useFetchBadge
