import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import api from '../../../../api'

export type ReqFichaProps = {
    nome: string,
    diasSemana: number[]
    divisao: string[]
    descricao: string
}

const useCriarFicha = ({
    nome, 
    diasSemana, 
    divisao, 
    descricao
} : ReqFichaProps) => {
    
    const {
        mutate,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError,
        ReqFichaProps
    >({
        mutationFn: (dados:ReqFichaProps) => api.post('/dashboard/treinos/ficha', dados),
        onSuccess: (dados) => {
            console.log(dados)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const criarFichaHandler = () => {
        mutate({
            nome: nome,
            diasSemana: diasSemana,
            divisao: divisao,
            descricao: descricao
        })
    }

    return {
        isSuccess,
        isError,
        isPending,
        criarFichaHandler
    }
}

export default useCriarFicha
