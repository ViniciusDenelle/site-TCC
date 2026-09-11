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
    sets: number;
    repeticoes_minimas: number;
    repeticoes_maximas: number;
    peso: number;
    descanso: number;
};

// tipagens/Exercicio.ts
export type MusculoDoExercicio = {
    id: number;
    nome: string;
    tipo: {
        id: number; // 1 = Primário, 2 = Secundário
        nome: 'Primário' | 'Secundário';
    };
};

export type EquipamentoDoExercicio = {
    id: number;
    nome: string;
};

export type Exercicio = {
    id: number;
    nome: string;
    descricao: string;
    foco: { id: number; nome: string };
    nivel: { id: number; nome: string };
    tipo: { id: number; nome: string };
    musculos: MusculoDoExercicio[];
    equipamentos: EquipamentoDoExercicio[];
};
