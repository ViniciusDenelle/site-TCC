import { ChartBarIncreasing, CogIcon, Flame, Hammer, Home, InfoIcon, NewspaperIcon, UserCircle, Weight } from "lucide-react"

export const nav = [
    {
        icone: Home,
        legenda: 'Home',
        to: '/dashboard/',
        end: false
    },
    {
        icone: Weight,
        legenda: 'treinos',
        to: '/dashboard/treino/MeusTreinos',
        end: false
    },
    {
        icone: Flame,
        legenda: 'dieta',
        to: '/dashboard/dieta',
        end: false
    },
    {
        icone: ChartBarIncreasing,
        legenda: 'progresso',
        to: '/dashboard/progresso',
        end: false
    },
]

export const menu = [
    {
        legenda: 'Sobre Nós',
        to: '/dashboard/sobre-nos',
        icone: InfoIcon,
        end: false
    },
    {
        legenda: 'Página Inicial',
        to: '/',
        icone: Hammer,
        end: true
    }
]