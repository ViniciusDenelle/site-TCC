import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import api from '../../api'


const BASE = '/dashboard/progresso'

/* ===================== TIPOS ===================== */
export interface ResumoProgressoProps {
    pesoAtual: number | null
    inicioPeso: number | null
    variacaoPeso: number | null
    mediaSemanal: number | null
    tendencia: string
    treinosNoMes: number
    variacaoTreinos: number
    totalTreinos: number
    cargaMaxima: number | null
    variacaoCarga: number | null
}

export interface HistoricoPesoProps {
    data: string
    valor: number
}

export interface FrequenciaProps {
    dia: string
    qtd: number
}

export interface CargaExercicioProps {
    nome: string
    cargaInicial: number
    cargaAtual: number
}

export interface RepeticoesExercicioProps {
    nome: string
    repeticoesIniciais: number
    repeticoesAtuais: number
}

export interface NovoPesoProps {
    peso: number
    data?: string // yyyy-mm-dd
}

/* ===================== QUERIES ===================== */
export const useFetchResumoProgresso = (dias: number) => {
    const { data: resumo, isPending, isError, error } = useQuery<ResumoProgressoProps, AxiosError>({
        queryKey: ['progresso', 'resumo', dias],
        queryFn: async () => (await api.get(`${BASE}/resumo`, { params: { dias } })).data.data,
    })

    return { resumo, isPending, isError, error }
}

export const useFetchPesoProgresso = (dias: number) => {
    const { data: historicoPeso, isPending, isError, error } = useQuery<HistoricoPesoProps[], AxiosError>({
        queryKey: ['progresso', 'peso', dias],
        queryFn: async () => (await api.get(`${BASE}/peso`, { params: { dias } })).data.data,
    })

    return { historicoPeso, isPending, isError, error }
}

export const useFetchFrequenciaProgresso = (dias: number) => {
    const { data: frequencia, isPending, isError, error } = useQuery<FrequenciaProps[], AxiosError>({
        queryKey: ['progresso', 'frequencia', dias],
        queryFn: async () => (await api.get(`${BASE}/frequencia`, { params: { dias } })).data.data,
    })

    return { frequencia, isPending, isError, error }
}

export const useFetchCargasProgresso = (dias: number) => {
    const { data: cargas, isPending, isError, error } = useQuery<CargaExercicioProps[], AxiosError>({
        queryKey: ['progresso', 'cargas', dias],
        queryFn: async () => (await api.get(`${BASE}/cargas`, { params: { dias } })).data.data,
    })

    return { cargas, isPending, isError, error }
}

export const useFetchRepeticoesProgresso = (dias: number) => {
    const { data: repeticoes, isPending, isError, error } = useQuery<RepeticoesExercicioProps[], AxiosError>({
        queryKey: ['progresso', 'repeticoes', dias],
        queryFn: async () => (await api.get(`${BASE}/repeticoes`, { params: { dias } })).data.data,
    })

    return { repeticoes, isPending, isError, error }
}

/* ===================== MUTATION ===================== */
export const useRegistrarPeso = () => {
    const queryClient = useQueryClient()

    const { mutate: registrarPeso, isPending, isError, error } = useMutation<unknown, AxiosError, NovoPesoProps>({
        mutationFn: async (novo) => (await api.post(`${BASE}/peso`, novo)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['progresso'] })
        },
    })

    return { registrarPeso, isPending, isError, error }
}