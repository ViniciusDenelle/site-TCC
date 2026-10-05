import { Dispatch, SetStateAction } from "react"
import { Badge, ResExercicioProps } from "../exercicios/FetchExercicio"
import { UseSelecaoComDadosProps } from "../selecionaveis/useSelecaoComDados";
import { UseSelecaoUnicaProps } from "../selecionaveis/useSelecaoUnica";
import { SerieExecutada } from "../execução/ExercutarTreinoProps";

// hooks/formularios/TreinoProps.ts

export interface MetadadoExercicio {
    sets: number;
    repeticoes_minimas: number;
    repeticoes_maximas: number;
    peso: number;
    descanso: number;
}

export interface useTreinoFormProps {
    nome: string;
    setNome: (nome: string) => void;
    descricao: string;
    setDescricao: (descricao: string) => void;
    exercicios: UseSelecaoComDadosProps<ResExercicioProps, MetadadoExercicio>;
    tipo: UseSelecaoUnicaProps<Badge>
    foco: UseSelecaoUnicaProps<Badge>
    adicionarExercicio: (exercicio: ResExercicioProps) => void;
    atualizarMetadadoExercicio: (
        id: number,
        campo: keyof MetadadoExercicio,
        valor: number
    ) => void;
    montarPayload: () => CriarTreinoPayload
}

export interface CriarTreinoPayload {
    nome: string;
    descricao?: string;
    foco_id: number;
    tipo_id: number;
    exercicios: {
        exercicio_id: number;
        ordem: number;
        sets: number;
        repeticoes_minimas: number;
        repeticoes_maximas: number;
        peso: number;
        descanso: number;
    }[];
}

export type ExercicioDoTreino = {
    id: number; // id do registro pivot (ExercicioTreino)
    ordem: number;
    sets: number;
    repeticoes_minimas: number;
    repeticoes_maximas: number;
    peso: number;
    descanso: number;
    exercicio: {
        id: number;
        nome: string;
        descricao: string;
        imagem: string | null;
    } | null;
};

export type TempoEstimado = {
    minutos: number;
    segundos: number;
    segundos_totais: number;
};

export type ResTreinoProps = {
    id: number;
    nome: string;
    descricao: string;
    calorias_estimadas: number;
    tempo_estimado: TempoEstimado;
    tipo: { id: number; nome: string };
    foco: { id: number; nome: string };
    nivel: { id: number; nome: string };
    exercicios: ExercicioDoTreino[];
};

export type ExercicioDaSessao = {
    exercicio_treino_id: number;
    exercicio: { id: number; nome: string } | null;
    ordem: number;
    planejado: {
        sets: number;
        repeticoes_minimas: number;
        repeticoes_maximas: number;
        peso: number;
    };
    series_executadas: SerieExecutada[];
};

export type SessaoTreino = {
    id: number;
    iniciado_em: string;
    finalizado_em: string | null;
    duracao: number | null;
    exercicios: ExercicioDaSessao[];
};
