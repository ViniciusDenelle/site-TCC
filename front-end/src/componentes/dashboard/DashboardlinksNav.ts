import { ChartBarIncreasing, CogIcon, Flame, Home, InfoIcon, NewspaperIcon, UserCircle, Weight } from "lucide-react"

export const nav = [
    {
        icone: Home,
        legenda: 'Home',
        to: '/dashboard/'
    },
    {
        icone: Weight,
        legenda: 'treinos',
        to: '/dashboard/treino'
    },
    {
        icone: Flame,
        legenda: 'dieta',
        to: '/dashboard/dieta'
    },
    {
        icone: ChartBarIncreasing,
        legenda: 'progresso',
        to: '/dashboard/progresso'
    },
    {
        icone: UserCircle,
        legenda: 'perfil',
        to: '/dashboard/perfil'
    },
]

export const menu = [
    {
        legenda: 'Configurações',
        to: '/dashboard',
        icone: CogIcon,
    },
    {
        legenda: 'Sobre Nós',
        to: '/dashboard/sobre-nos',
        icone: InfoIcon,
    },
    {
        legenda: 'Novidades',
        to: '/dashboard',
        icone: NewspaperIcon,
    }
]