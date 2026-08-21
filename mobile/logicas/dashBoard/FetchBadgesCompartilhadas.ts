import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import api from '@/api'
import { Badge } from './exercicios/FetchExercicio'

type ResBadges = {
    musculos: Badge[]
    equipamentos: Badge[]
    niveis: Badge[]
    focos: Badge[]
}

const useFetchBadgesCompartilhadas = () => {

    const {
        data,
        isSuccess,
        isPending,
        isError,
        error
    } = useQuery<
        ResBadges
    >({
        queryKey: ['badges'],
        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/badges`)
            return res.data
        }
    })

    const secoes = useMemo(() => {
        if(!data) return 

        return [
            {
                titulo: 'Músculos',
                tipo: 'musculos' as const,
                dados: data.musculos,
                render: 'checkbox' as const
            },
            {
                titulo: 'Equipamentos',
                tipo: 'equipamentos' as const,
                dados: data.equipamentos,
                render: 'checkbox' as const
            },
            {
                titulo: 'Níveis',
                tipo: 'niveis' as const,
                dados: data.niveis,
                render: 'checkbox' as const
            },
            {
                titulo: 'Focos',
                tipo: 'focos' as const,
                dados: data.focos,
                render: 'checkbox' as const
            },
        ]
    }, [data])

    return {
        data,
        isSuccess,
        isPending,
        isError,
        error,
        secoes
    }
}

export default useFetchBadgesCompartilhadas
