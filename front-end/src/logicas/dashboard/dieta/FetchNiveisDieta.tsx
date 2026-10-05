import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { NivelDieta } from './DietaProps';

const useFetchNiveisDieta = () => {

    const {
        data: niveis,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        NivelDieta[]
    >({
        queryKey: ['niveis-dieta'],

        queryFn: async () => {
            const res = await api.get('/dashboard/dietas/niveis')
            return res.data
        }
    })

    return {
        niveis,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useFetchNiveisDieta