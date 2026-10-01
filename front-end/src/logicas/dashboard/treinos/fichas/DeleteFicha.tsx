import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const useDeleteFicha = (id:number) => {

    const navigate = useNavigate()

    const {
        mutate: deletarFicha,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError
    >({
        mutationFn: () => api.delete(`dashboard/treinos/ficha/${id}`),
        onSuccess: (res) => {
            toast.success('Ficha deletada com sucesso')
            navigate(-1)
        },
        onError: (error) => {
            console.log(error)
        }
    })

  return {
        isSuccess,
        isError,
        isPending,
        deletarFicha
  }
}

export default useDeleteFicha
