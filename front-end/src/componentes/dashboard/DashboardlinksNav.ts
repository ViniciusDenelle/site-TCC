import { ChartBarIncreasing, CogIcon, Flame, Home, InfoIcon, NewspaperIcon, UserCircle, Weight } from "lucide-react"

export const nav = [
    {
        icone: Home,
        legenda: 'Home',
        to: 'home'
    },
    {
        icone: Weight,
        legenda: 'treinos',
        to: 'treino'
    },
    {
        icone: Flame,
        legenda: 'dieta',
        to: 'dietas'
    },
    {
        icone: ChartBarIncreasing,
        legenda: 'progresso',
        to: '/progresso'
    },
    {
        icone: UserCircle,
        legenda: 'perfil',
        to: '/perfil'
    },

]

export const menu = [
    {
        legenda: 'Configurações',
        to: '/',
        icone: CogIcon,
    },
    {
        legenda: 'Sobre',
        to: '/',
        icone: InfoIcon,
    },
    {
        legenda: 'Novidades',
        to: '/',
        icone: NewspaperIcon,
    }
]