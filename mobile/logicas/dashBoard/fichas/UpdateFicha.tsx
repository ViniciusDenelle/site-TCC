import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

import { ReqFichaProps } from './CriarFicha';

type UpdateFichaProps = ReqFichaProps & {
  id: number;
};

const useUpdateFicha = ({
  id,
  nome,
  diasSemana,
  divisao,
  descricao,
}: UpdateFichaProps) => {
  const {
    mutate,
    isSuccess,
    isError,
    isPending,
  } = useMutation<
    AxiosResponse,
    AxiosError,
    UpdateFichaProps
  >({
    mutationFn: (dados: UpdateFichaProps) =>
      api.put(
        `/dashboard/treinos/ficha/${id}`,
        dados
      ),

    onSuccess: (res) => {
      console.log('Ficha atualizada:', res.data);
    },

    onError: (error) => {
      console.log(
        'Erro ao atualizar ficha:',
        error
      );
    },
  });

  const updateFichaHandler = () => {
    mutate({
      id,
      nome,
      descricao,
      diasSemana,
      divisao,
    });
  };

  return {
    isSuccess,
    isError,
    isPending,
    updateFichaHandler,
  };
};

export default useUpdateFicha;