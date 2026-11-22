// logicas/dashboard/dietas/useCriarDieta.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { paraFormData } from '../../paraFormData';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCriarDieta = () => {
    
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { mutate, isSuccess, isError, isPending, error } = useMutation<
        AxiosResponse,
        AxiosError,
        ReturnType<typeof import('./useDietaForm').default> extends never ? any : any
    >({
        mutationFn: async (dados: any) => {
            const res = await api.post('/dashboard/dietas/dieta', paraFormData(dados));
            return res.data;
        },
        onSuccess: (res) => {
            console.log('res', res);
            toast.success('Dieta criada com sucesso');
            queryClient.invalidateQueries({ queryKey: ['dietas'] });
            navigate('/dashboard/dieta/verDieta/' + res.data.id);
        }
    });

    return { mutate, isSuccess, isError, isPending, error };
};

export default useCriarDieta;