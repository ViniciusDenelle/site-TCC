import { ChartBarIncreasing, Cog, Flame, Home, Info, Newspaper, UserCircle, Weight } from "lucide-react-native"

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
        icone: Cog,
    },
    {
        legenda: 'Sobre',
        to: '/',
        icone: Info,
    },
    {
        legenda: 'Novidades',
        to: '/',
        icone: Newspaper,
    }
]