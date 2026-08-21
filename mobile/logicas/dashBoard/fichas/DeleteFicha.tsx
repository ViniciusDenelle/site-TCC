import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

const useDeleteFicha = (id: number) => {
  const {
    mutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<
    AxiosResponse,
    AxiosError
  >({
    mutationFn: () =>
      api.delete(
        `/dashboard/treinos/ficha/${id}`
      ),

    onSuccess: (res) => {
      console.log('Ficha deletada:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao deletar ficha:', error);
    },
  });

  const deleteFichaHandler = () => {
    mutate();
  };

  return {
    isSuccess,
    isError,
    isPending,
    deleteFichaHandler,
  };
};

export default useDeleteFicha;