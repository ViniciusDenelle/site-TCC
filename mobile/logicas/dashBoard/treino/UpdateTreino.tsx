import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

import { ReqTreinoProps } from './CriarTreino';

type UpdateTreinoProps = ReqTreinoProps & {
  id: number;
};

const useUpdateTreino = ({
  id,
  nome,
  descricao,
  exercicios,
}: UpdateTreinoProps) => {
  const {
    mutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<
    AxiosResponse,
    AxiosError,
    ReqTreinoProps
  >({
    mutationFn: (dados: ReqTreinoProps) =>
      api.put(
        `/dashboard/treinos/treino/${id}`,
        dados
      ),

    onSuccess: (res) => {
      console.log('Treino atualizado:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao atualizar treino:', error);
    },
  });

  const atualizarTreinoHandler = () => {
    mutate({
      nome,
      descricao,
      exercicios,
    });
  };

  return {
    isSuccess,
    isError,
    isPending,
    atualizarTreinoHandler,
  };
};

export default useUpdateTreino;