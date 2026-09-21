export interface Alimento {
    id: string
    nome: string
    quantidade: string
    calorias: number
    proteinas: number
    carboidratos: number
    gorduras: number
}

export interface Refeicao {
    id: string
    nome: string
    horario: string
    alimentos: Alimento[]
}

export interface DiaDieta {
    id: string
    nome: string
    refeicoes: Refeicao[]
}

export interface Dieta {
    id: string
    nome: string
    descricao: string
    objetivo: string
    nivel: string
    duracao: string

    meta: {
        calorias: number
        proteinas: number
        carboidratos: number
        gorduras: number
    }

    dias: DiaDieta[]
}

/* =========================================================
   DIAS E REFEIÇÕES — DADOS DE EXEMPLO
   ========================================================= */

const diasMock: DiaDieta[] = [

    {
        id: 'segunda',
        nome: 'Segunda-feira',

        refeicoes: [
            {
                id: 'seg-cafe',
                nome: 'Café da manhã',
                horario: '07:00',

                alimentos: [
                    {
                        id: '1',
                        nome: 'Ovos',
                        quantidade: '3 unidades',
                        calorias: 210,
                        proteinas: 18,
                        carboidratos: 1,
                        gorduras: 15,
                    },
                    {
                        id: '2',
                        nome: 'Aveia',
                        quantidade: '50 g',
                        calorias: 190,
                        proteinas: 6,
                        carboidratos: 32,
                        gorduras: 4,
                    },
                    {
                        id: '3',
                        nome: 'Banana',
                        quantidade: '1 unidade',
                        calorias: 90,
                        proteinas: 1,
                        carboidratos: 23,
                        gorduras: 0,
                    },
                ],
            },

            {
                id: 'seg-almoco',
                nome: 'Almoço',
                horario: '12:00',

                alimentos: [
                    {
                        id: '4',
                        nome: 'Peito de frango',
                        quantidade: '150 g',
                        calorias: 250,
                        proteinas: 46,
                        carboidratos: 0,
                        gorduras: 5,
                    },
                    {
                        id: '5',
                        nome: 'Arroz',
                        quantidade: '150 g',
                        calorias: 195,
                        proteinas: 4,
                        carboidratos: 42,
                        gorduras: 0,
                    },
                    {
                        id: '6',
                        nome: 'Feijão',
                        quantidade: '100 g',
                        calorias: 75,
                        proteinas: 5,
                        carboidratos: 14,
                        gorduras: 1,
                    },
                    {
                        id: '7',
                        nome: 'Salada',
                        quantidade: '100 g',
                        calorias: 30,
                        proteinas: 2,
                        carboidratos: 5,
                        gorduras: 0,
                    },
                ],
            },

            {
                id: 'seg-lanche',
                nome: 'Lanche da tarde',
                horario: '16:00',

                alimentos: [
                    {
                        id: '8',
                        nome: 'Iogurte natural',
                        quantidade: '170 g',
                        calorias: 100,
                        proteinas: 8,
                        carboidratos: 10,
                        gorduras: 3,
                    },
                    {
                        id: '9',
                        nome: 'Frutas',
                        quantidade: '150 g',
                        calorias: 90,
                        proteinas: 1,
                        carboidratos: 22,
                        gorduras: 0,
                    },
                ],
            },

            {
                id: 'seg-jantar',
                nome: 'Jantar',
                horario: '20:00',

                alimentos: [
                    {
                        id: '10',
                        nome: 'Peito de frango',
                        quantidade: '150 g',
                        calorias: 250,
                        proteinas: 46,
                        carboidratos: 0,
                        gorduras: 5,
                    },
                    {
                        id: '11',
                        nome: 'Batata',
                        quantidade: '200 g',
                        calorias: 170,
                        proteinas: 4,
                        carboidratos: 38,
                        gorduras: 0,
                    },
                    {
                        id: '12',
                        nome: 'Legumes',
                        quantidade: '150 g',
                        calorias: 70,
                        proteinas: 3,
                        carboidratos: 12,
                        gorduras: 1,
                    },
                ],
            },
        ],
    },

    {
        id: 'terca',
        nome: 'Terça-feira',

        refeicoes: [
            {
                id: 'ter-cafe',
                nome: 'Café da manhã',
                horario: '07:00',

                alimentos: [
                    {
                        id: '13',
                        nome: 'Pão integral',
                        quantidade: '2 fatias',
                        calorias: 140,
                        proteinas: 6,
                        carboidratos: 24,
                        gorduras: 2,
                    },
                    {
                        id: '14',
                        nome: 'Ovos',
                        quantidade: '2 unidades',
                        calorias: 140,
                        proteinas: 12,
                        carboidratos: 1,
                        gorduras: 10,
                    },
                    {
                        id: '15',
                        nome: 'Mamão',
                        quantidade: '150 g',
                        calorias: 60,
                        proteinas: 1,
                        carboidratos: 15,
                        gorduras: 0,
                    },
                ],
            },

            {
                id: 'ter-almoco',
                nome: 'Almoço',
                horario: '12:00',

                alimentos: [
                    {
                        id: '16',
                        nome: 'Carne bovina',
                        quantidade: '150 g',
                        calorias: 280,
                        proteinas: 40,
                        carboidratos: 0,
                        gorduras: 12,
                    },
                    {
                        id: '17',
                        nome: 'Arroz',
                        quantidade: '150 g',
                        calorias: 195,
                        proteinas: 4,
                        carboidratos: 42,
                        gorduras: 0,
                    },
                    {
                        id: '18',
                        nome: 'Feijão',
                        quantidade: '100 g',
                        calorias: 75,
                        proteinas: 5,
                        carboidratos: 14,
                        gorduras: 1,
                    },
                ],
            },

            {
                id: 'ter-lanche',
                nome: 'Lanche da tarde',
                horario: '16:00',

                alimentos: [
                    {
                        id: '19',
                        nome: 'Iogurte natural',
                        quantidade: '170 g',
                        calorias: 100,
                        proteinas: 8,
                        carboidratos: 10,
                        gorduras: 3,
                    },
                    {
                        id: '20',
                        nome: 'Banana',
                        quantidade: '1 unidade',
                        calorias: 90,
                        proteinas: 1,
                        carboidratos: 23,
                        gorduras: 0,
                    },
                ],
            },

            {
                id: 'ter-jantar',
                nome: 'Jantar',
                horario: '20:00',

                alimentos: [
                    {
                        id: '21',
                        nome: 'Peito de frango',
                        quantidade: '150 g',
                        calorias: 250,
                        proteinas: 46,
                        carboidratos: 0,
                        gorduras: 5,
                    },
                    {
                        id: '22',
                        nome: 'Batata-doce',
                        quantidade: '180 g',
                        calorias: 155,
                        proteinas: 3,
                        carboidratos: 36,
                        gorduras: 0,
                    },
                ],
            },
        ],
    },

    {
        id: 'quarta',
        nome: 'Quarta-feira',
        refeicoes: [],
    },

    {
        id: 'quinta',
        nome: 'Quinta-feira',
        refeicoes: [],
    },

    {
        id: 'sexta',
        nome: 'Sexta-feira',
        refeicoes: [],
    },

    {
        id: 'sabado',
        nome: 'Sábado',
        refeicoes: [],
    },

    {
        id: 'domingo',
        nome: 'Domingo',
        refeicoes: [],
    },
]


/* =========================================================
   DIETAS
   ========================================================= */

const dietasMock: Dieta[] = [

    {
        id: '1',

        nome: 'Plano Alimentar — Definição',

        descricao:
            'Plano alimentar estruturado para o objetivo selecionado.',

        objetivo: 'Definição',

        nivel: 'Intermediário',

        duracao: '8 semanas',

        meta: {
            calorias: 2200,
            proteinas: 160,
            carboidratos: 240,
            gorduras: 70,
        },

        dias: diasMock,
    },

    {
        id: '2',

        nome: 'Bulking Limpo',

        descricao:
            'Plano alimentar com foco em ganho de massa e desempenho.',

        objetivo: 'Ganho de massa',

        nivel: 'Intermediário',

        duracao: '12 semanas',

        meta: {
            calorias: 2800,
            proteinas: 180,
            carboidratos: 320,
            gorduras: 80,
        },

        dias: diasMock,
    },

    {
        id: '3',

        nome: 'Manutenção Atlética',

        descricao:
            'Plano alimentar voltado para manutenção e desempenho.',

        objetivo: 'Manutenção',

        nivel: 'Todos',

        duracao: 'Contínuo',

        meta: {
            calorias: 2400,
            proteinas: 160,
            carboidratos: 280,
            gorduras: 75,
        },

        dias: diasMock,
    },

    {
        id: '4',

        nome: 'Low Carb + Proteína',

        descricao:
            'Plano alimentar com maior concentração de proteínas.',

        objetivo: 'Recomposição',

        nivel: 'Avançado',

        duracao: '6 semanas',

        meta: {
            calorias: 2100,
            proteinas: 175,
            carboidratos: 180,
            gorduras: 80,
        },

        dias: diasMock,
    },
]

export default dietasMock