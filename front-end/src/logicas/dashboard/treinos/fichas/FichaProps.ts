import { Criador } from "../tipagens/GenericosProps";

// tipagens/FichaTreino.ts
export type DivisaoTemp = {
    id: string; // id temporário no client (uuid), não confundir com id do banco
    nome: string;
    treinos: { id: number; nome: string }[]; // treinos já existentes, selecionados
};

export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export type FichaTreinoPayload = {
    nome: string;
    descricao: string;
    divisoes: {
        nome: string;
        treino_ids: number[];
    }[];
    dias: Partial<Record<DiaSemana, number | null>>; // dia -> treino_id (null = descanso)
};


// tipagens/Ficha.ts
export type TreinoResumido = { id: number; nome: string };

export type DivisaoDaFicha = {
    id: number;
    nome: string;
    treinos: TreinoResumido[];
};


export type Ficha = {
    id: number;
    nome: string;
    criador: Criador
    descricao: string;
    divisoes: DivisaoDaFicha[];
    dias: Record<number, TreinoResumido | null>; // chave numérica (0-6), não nome
};
