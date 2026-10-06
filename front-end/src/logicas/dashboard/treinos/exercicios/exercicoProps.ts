import { Badge } from "./FetchExercicio";

// tipagens/ExercicioPayload.ts
export type ExercicioPayload = {
    nome: string;
    descricao: string;
    tipo_id: number | null;
    nivel_id: number | null;
    foco_id: number | null;
    musculos: { id: number; tipo: 1 | 2 }[];
    equipamentos: number[];
};

export type ResBadges = {
    musculos: Badge[]
    equipamentos: Badge[]
    niveis: Badge[]
    focos: Badge[]
    tipos: Badge[]
}

export type ErrosValidacao = Partial<Record<keyof ExercicioPayload, string[]>>;

export type RespostaErroLaravel = {
    message: string;
    errors: ErrosValidacao;
};

export type MetadadoExercicio = {
    tipo_execucao: 'repeticoes' | 'tempo';
    sets: number;
    repeticoes_minimas: number | null;
    repeticoes_maximas: number | null;
    duracao_segundos: number | null;
    peso: number;
    descanso: number;
};
