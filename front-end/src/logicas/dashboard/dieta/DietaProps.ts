export interface Alimento {
    id: string;
    nome: string;
    quantidade: string;
}

export interface Refeicao {
    id: string;
    nome: string;
    horario: string;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
    alimentos: Alimento[];
}

export interface Dieta {
    id: string;
    nome: string;
    descricao: string;
    objetivo: string;
    nivel: string;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
    duracao: string;
    refeicoes: Refeicao[];
}