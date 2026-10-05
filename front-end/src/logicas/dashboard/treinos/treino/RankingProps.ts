export interface ExercicioOpcaoProps {
    id: number
    nome: string
}

export interface PosicaoRankingProps {
    posicao: number
    user_id: number
    nome: string
    peso: number
    repeticoes: number
    data: string
    voce: boolean
}

export interface ResRankingExercicioProps {
    exercicio: {
        id: number
        nome: string
    }
    total_participantes: number
    ranking: PosicaoRankingProps[]
    minha_posicao: PosicaoRankingProps | null
}