import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { FichaPayload } from './CriarFicha'
import { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useUpdateFicha = (id:string|number) => {

    const navigate = useNavigate()

    const {
        mutate: editarFicha,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError,
        FichaPayload
    >({
        mutationFn: async (payload:FichaPayload) => {
            const res = await api.put(`dashboard/treinos/ficha/${id}`, payload)
            return res.data
        },
        onSuccess: (res) => {
            navigate(`/dashboard/treino/verFicha/${res.data.id}`)
            toast.success('Ficha atualizada com sucesso')
        },
        onError: (error) => {
            console.log(error)
        }
    })


  return {
        isSuccess,
        isError,
        isPending,
        editarFicha
  }
}

export default useUpdateFicha
