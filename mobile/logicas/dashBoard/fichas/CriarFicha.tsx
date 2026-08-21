import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

export type ReqFichaProps = {
  nome: string;
  diasSemana: number[];
  divisao: string[];
  descricao: string;
};

const useCriarFicha = ({
  nome,
  diasSemana,
  divisao,
  descricao,
}: ReqFichaProps) => {
  const {
    mutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<
    AxiosResponse,
    AxiosError,
    ReqFichaProps
  >({
    mutationFn: (dados: ReqFichaProps) =>
      api.post(
        '/dashboard/treinos/ficha',
        dados
      ),

    onSuccess: (res) => {
      console.log('Ficha criada:', res.data);
    },

    onError: (error) => {
      console.log('Erro ao criar ficha:', error);
    },
  });

  const criarFichaHandler = () => {
    mutate({
      nome,
      diasSemana,
      divisao,
      descricao,
    });
  };

  return {
    isSuccess,
    isError,
    isPending,
    criarFichaHandler,
  };
};

export default useCriarFicha;