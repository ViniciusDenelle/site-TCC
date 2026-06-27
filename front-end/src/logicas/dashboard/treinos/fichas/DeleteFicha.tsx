import { useMutation } from '@tanstack/react-query'
import React from 'react'
import api from '../../../../api'
import { AxiosError, AxiosResponse } from 'axios'

const useDeleteFicha = (id:number) => {

    const {
        mutate,
        isSuccess,
        isError,
        isPending
    } = useMutation<
        AxiosResponse,
        AxiosError
    >({
        mutationFn: () => api.delete(`dashboard/treinos/ficha/${id}`),
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const deleteFichaHandler = () =>{
        mutate()
    }

  return {
        isSuccess,
        isError,
        isPending,
        deleteFichaHandler
  }
}

export default useDeleteFicha
