// logicas/progresso/Medidas.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../../api';

export type TipoMedida = 'cintura' | 'peito' | 'braco' | 'coxa' | 'quadril' | 'gordura';

export type MedidaCorporal = {
    id: number;
    tipo: TipoMedida;
    valor: number;
    data: string; // AAAA-MM-DD
};

export type NovasMedidas = {
    data?: string; // AAAA-MM-DD (se não vier, usa hoje)
    medidas: { tipo: TipoMedida; valor: number | string }[];
};

export const MEDIDAS_CONFIG: Record<TipoMedida, { nome: string; unidade: string; placeholder: string }> = {
    cintura: { nome: 'Cintura', unidade: 'cm', placeholder: 'ex: 82' },
    peito: { nome: 'Peito', unidade: 'cm', placeholder: 'ex: 100' },
    braco: { nome: 'Braço', unidade: 'cm', placeholder: 'ex: 35' },
    coxa: { nome: 'Coxa', unidade: 'cm', placeholder: 'ex: 58' },
    quadril: { nome: 'Quadril', unidade: 'cm', placeholder: 'ex: 98' },
    gordura: { nome: '% de gordura', unidade: '%', placeholder: 'ex: 18' },
};

export const TIPOS_MEDIDA = Object.keys(MEDIDAS_CONFIG) as TipoMedida[];

// Última medição de cada tipo
export function useFetchMedidas() {
    const query = useQuery<MedidaCorporal[], AxiosError>({
        queryKey: ['progresso', 'medidas'],
        queryFn: async () => {
            const res = await api.get('/dashboard/progresso/medidas');
            return res.data.data;
        },
    });

    return {
        medidas: query.data ?? [],
        isPending: query.isPending,
        isError: query.isError,
    };
}

/**
 * Normaliza o que vai para a API:
 * - valor sempre como número (aceita "82,5" digitado com vírgula)
 * - descarta itens sem valor numérico válido
 * - data sempre no formato AAAA-MM-DD (hoje, no fuso local, se não vier)
 */
function montarPayload(dados: NovasMedidas) {
    const medidas = dados.medidas
        .map((m) => ({
            tipo: m.tipo,
            valor: typeof m.valor === 'number' ? m.valor : Number(String(m.valor).trim().replace(',', '.')),
        }))
        .filter((m) => Number.isFinite(m.valor));

    return {
        data: dados.data || new Date().toLocaleDateString('en-CA'),
        medidas,
    };
}

export function useRegistrarMedidas() {
    const queryClient = useQueryClient();

    const mutation = useMutation<unknown, AxiosError, NovasMedidas>({
        mutationFn: async (dados) => {
            const res = await api.post('/dashboard/progresso/medidas', montarPayload(dados));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['progresso', 'medidas'] });
        },
    });

    return {
        registrarMedidas: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}