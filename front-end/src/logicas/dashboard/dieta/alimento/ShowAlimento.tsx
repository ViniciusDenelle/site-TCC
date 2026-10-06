import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import { Alimento } from '../DietaProps';

const useShowAlimento = (id?: number) => {

    const {
        data: alimento,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Alimento
    >({
        queryKey: ['alimento', id],

        queryFn: async () => {
            const res = await api.get(`/dashboard/dietas/alimentos/${id}`)
            return res.data
        },

        enabled: !!id
    })

    return {
        alimento,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useShowAlimento