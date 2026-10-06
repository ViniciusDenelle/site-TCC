// logicas/dashboard/dietas/useCriarDieta.ts
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';

const useCriarDieta = () => {
    const { mutate, isSuccess, isError, isPending, error } = useMutation<
        AxiosResponse,
        AxiosError,
        ReturnType<typeof import('./useDietaForm').default> extends never ? any : any
    >({
        mutationFn: (dados: any) => api.post('/dashboard/dietas/dieta', dados),
    });

    return { mutate, isSuccess, isError, isPending, error };
};

export default useCriarDieta;