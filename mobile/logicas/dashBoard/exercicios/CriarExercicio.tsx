import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

export type ReqExercicioProps = {
  nome: string;
  descricao?: string;
};

const useCriarExercicio = ({
  nome,
  descricao,
}: ReqExercicioProps) => {
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
      api.post(
        '/dashboard/treinos/exercicio',
        dados
      ),

    onSuccess: (res) => {
      console.log('Exercício criado:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao criar exercício:', error);
    },
  });

  const criarExercicioHandler = () => {
    mutate({
      nome,
      descricao,
    });
  };

  return {
    criarExercicioHandler,
    isSuccess,
    isError,
    isPending,
  };
};

export default useCriarExercicio;