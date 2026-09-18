import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

export type ExerciciosInfo = {
  id: number;
  repsMin: number;
  repsMax: number;
  sets: number;
  peso: number;
  descanso: number;
};

export type ReqTreinoProps = {
  nome: string;
  descricao?: string;
  exercicios: ExerciciosInfo[];
};

type CriarTreinoProps = ReqTreinoProps & {
  id: number;
};

const useCriarTreino = ({
  id,
  nome,
  descricao,
  exercicios,
}: CriarTreinoProps) => {
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
      api.post(
        `/dashboard/treinos/treino/${id}`,
        dados
      ),

    onSuccess: (res) => {
      console.log('Treino criado:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao criar treino:', error);
    },
  });

  const criarTreinoHandler = () => {
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
    criarTreinoHandler,
  };
};

export default useCriarTreino;