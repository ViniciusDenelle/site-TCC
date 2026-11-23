// logicas/dashboard/dieta/DietaProps.ts

type Alimento = {
    id: number;
    nome: string;
    imagem?: string | null;
    porcao_descricao: string;
    porcao_gramas: number | null;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
};

type AlimentoNaRefeicao = {
    id: number;
    nome: string;
    porcao_descricao: string;
    porcao_gramas: number | null;
    quantidade_gramas: number;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
};

type RefeicaoDaDieta = {
    id: number;
    nome: string;
    dia_semana: number;
    horario: string | null;
    alimentos: AlimentoNaRefeicao[];
};

type Dieta = {
    id: number;
    user_id: number | null; // quem criou a dieta
    nome: string;
    descricao: string;
    imagem?: string | null;
    refeicoes: RefeicaoDaDieta[];
};

export default Dieta;
export type { Alimento, AlimentoNaRefeicao, RefeicaoDaDieta };