import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

const useDeleteExercicio = (id: number) => {
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
        `/dashboard/treinos/exercicio/${id}`
      ),

    onSuccess: (res) => {
      console.log('Exercício deletado:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao deletar exercício:', error);
    },
  });

  const deletarExercicioHandler = () => {
    mutate();
  };

  return {
    deletarExercicioHandler,
    isSuccess,
    isError,
    isPending,
  };
};

export default useDeleteExercicio;