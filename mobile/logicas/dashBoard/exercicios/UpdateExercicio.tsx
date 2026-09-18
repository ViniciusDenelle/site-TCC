import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

export type ReqExercicioProps = {
  nome: string;
  descricao?: string;
};

const useUpdateExercicio = ({
  id,
  nome,
  descricao,
}: ReqExercicioProps & { id: number }) => {
  const {
    mutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<
    AxiosResponse,
    AxiosError,
    ReqExercicioProps
  >({
    mutationFn: (dados: ReqExercicioProps) =>
      api.put(
        `/dashboard/treinos/exercicio/${id}`,
        dados
      ),

    onSuccess: (res) => {
      console.log(
        'Exercício atualizado:',
        res.data
      );
    },

    onError: (error) => {
      console.log(
        'Erro ao atualizar exercício:',
        error
      );
    },
  });

  const atualizarExercicioHandler = () => {
    mutate({
      nome,
      descricao,
    });
  };

  return {
    atualizarExercicioHandler,
    isSuccess,
    isError,
    isPending,
  };
};

export default useUpdateExercicio;