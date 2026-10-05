import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { ObjetivoDieta } from './DietaProps';

const useFetchObjetivosDieta = () => {

    const {
        data: objetivos,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ObjetivoDieta[]
    >({
        queryKey: ['objetivos-dieta'],

        queryFn: async () => {
            const res = await api.get('/dashboard/dietas/objetivos')
            return res.data
        }
    })

    return {
        objetivos,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useFetchObjetivosDieta