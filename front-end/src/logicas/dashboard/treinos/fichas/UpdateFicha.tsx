import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { ReqFichaProps } from './CriarFicha'
import { AxiosError, AxiosResponse } from 'axios'

type UpdateFichaProps = ReqFichaProps & {id: number}

const useUpdateFicha = ({
    id,
    nome, 
    diasSemana, 
    divisao, 
    descricao
} : UpdateFichaProps) => {

    const {
        mutate,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError,
        UpdateFichaProps
    >({
        mutationFn: (dados:UpdateFichaProps) => api.put(`dashboard/treinos/ficha/${id}`, dados),
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (error) => {
            console.log(error)
        }
    })


    const updateFichaHandler = () => {
        mutate({
            id: id,
            nome: nome,
            descricao: descricao,
            diasSemana: diasSemana,
            divisao: divisao,
        })
    }
  return {
        isSuccess,
        isError,
        isPending,
        updateFichaHandler
  }
}

export default useUpdateFicha
