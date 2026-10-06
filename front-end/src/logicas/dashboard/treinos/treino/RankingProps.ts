export type TipoRanking = 'PESO' | 'REPETICOES' | 'TEMPO'

export interface ExercicioOpcaoProps {
    id: number
    nome: string
    tipo: TipoRanking
}

export interface PosicaoRankingProps {
    posicao: number
    user_id: number
    nome: string
    valor: number        
    repeticoes: number
    data: string
    voce: boolean
}

export interface ResRankingExercicioProps {
    exercicio: {
        id: number
        nome: string
        tipo: TipoRanking
    }
    total_participantes: number
    ranking: PosicaoRankingProps[]
    minha_posicao: PosicaoRankingProps | null
}