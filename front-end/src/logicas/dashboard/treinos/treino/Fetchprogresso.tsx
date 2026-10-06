import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../../../api'
import { AxiosError } from 'axios'


/* ===================================================== */
/* TIPOS (batem com o que cada gráfico espera)            */
/* ===================================================== */

export interface ResumoProgressoProps {
    pesoAtual: number | null
    variacaoPeso: number | null
    inicioPeso: number | null
    mediaSemanal: number | null
    tendencia: string
    treinosNoMes: number
    variacaoTreinos: number
    cargaMaxima: number | null
    variacaoCarga: number | null
    totalTreinos: number
}

export interface PontoPesoProps {
    data: string
    valor: number
}

export interface FrequenciaDiaProps {
    dia: string
    qtd: number
}

export interface CargaExercicioProps {
    nome: string
    cargaInicial: number
    cargaAtual: number
}

export interface SeriesExercicioProps {
    nome: string
    seriesIniciais: number
    seriesAtuais: number
}


/* ===================================================== */
/* HOOKS                                                  */
/* ===================================================== */

export const useFetchResumoProgresso = (dias: number) => {
    const { data: resumo, isPending, isError } = useQuery<ResumoProgressoProps, AxiosError>({
        queryKey: ['progresso', 'resumo', dias],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/resumo', { params: { dias } })
            return res.data.data
        },
    })

    return { resumo, isPending, isError }
}

export const useFetchPesoProgresso = (dias: number) => {
    const { data: historicoPeso, isPending, isError } = useQuery<PontoPesoProps[], AxiosError>({
        queryKey: ['progresso', 'peso', dias],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/peso', { params: { dias } })
            return res.data.data
        },
    })

    return { historicoPeso, isPending, isError }
}

export const useFetchFrequenciaProgresso = (dias = 7) => {
    const { data: frequencia, isPending, isError } = useQuery<FrequenciaDiaProps[], AxiosError>({
        queryKey: ['progresso', 'frequencia', dias],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/frequencia', { params: { dias } })
            return res.data.data
        },
    })

    return { frequencia, isPending, isError }
}

export const useFetchCargasProgresso = (dias: number) => {
    const { data: cargas, isPending, isError } = useQuery<CargaExercicioProps[], AxiosError>({
        queryKey: ['progresso', 'cargas', dias],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/cargas', { params: { dias } })
            return res.data.data
        },
    })

    return { cargas, isPending, isError }
}

export const useFetchSeriesProgresso = (dias: number) => {
    const { data: series, isPending, isError } = useQuery<SeriesExercicioProps[], AxiosError>({
        queryKey: ['progresso', 'series', dias],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/series', { params: { dias } })
            return res.data.data
        },
    })

    return { series, isPending, isError }
}

/** Registra o peso de hoje e atualiza todos os dados de progresso na tela. */
export const useRegistrarPeso = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending, isError } = useMutation<unknown, AxiosError, number>({
        mutationFn: (peso) => api.post('/dashboard/progresso/peso', { peso }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['progresso'] }),
    })

    return { registrarPeso: mutate, isPending, isError }
}