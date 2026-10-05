// logicas/dashboard/treinos/historico/useFetchHistorico.ts
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api';
import { SessaoTreino } from './TreinoProps';

function useFetchTreinoHistorico(treinoId: number, pagina: number) {

    const {
        data: historico,
        isSuccess,
        isError,
        isPending
    } = useQuery<{ data: SessaoTreino[]; meta: any }>({
        queryKey: ['historico-treino', treinoId, pagina],
        queryFn: async () => {
            const res = await api.get(`/dashboard/treinos/treino/${treinoId}/historico`, {
                params: { page: pagina },
            });
            return res.data;
        },
    });

    return {
        historico,
        isSuccess,
        isError,
        isPending
    }
}

export default useFetchTreinoHistorico;