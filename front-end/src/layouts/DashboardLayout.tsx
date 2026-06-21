import { AnimatePresence, motion } from "framer-motion"
import { ChartBarIncreasing, Flame, Home, Lightbulb, LucideIcon, UserCircle, Weight } from "lucide-react"
import { useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import TemaContexto from "../contextos/TemaContexto"
import BotaoSecundario from "../componentes/BotaoSecundario"
import useFetchUsuario from "../logicas/querys/FetchUsuario"
// import { UsuarioProvider } from "../contextos/UsuarioContexto"

type LinkNavDashboardProps = {
    icone: LucideIcon,
    legenda: string,
    to: string
}

const LinkNavDashboard = ({
    icone: Icone,
    legenda,
    to
}: LinkNavDashboardProps) => {

    return (
        <NavLink
            to={to}
        >
            {({ isActive }) => (
                <div
                    className={`group flex flex-col items-center justify-center
                    shrink-0 rounded-full p-3
                    ${isActive 
                        ? `bg-base-terciaria/30 backdrop-blur-md size-18`
                        : `size-16`}`}
                >
                    <Icone
                        size={25}
                        className={`transition-all duration-300
                            ${isActive
                            ? `text-destaque-s-medio group-hover:text-destaque-s-escuro`
                            : `text-t-terciaria group-hover:text-t-primaria`}`}
                    />

                        <span className={`text-xs transition-colors duration-300 font-semibold
                            ${isActive 
                                ? `text-destaque-s-medio 
                                group-hover:text-destaque-s-escuro`
                                : `text-t-terciaria group-hover:text-t-secundaria`
                            }`}>
                            {legenda}
                        </span>
                    {/* {isActive && (
                    )} */}

                </div>

            )}
        </NavLink>
    )
}

const DashboardLayout = () => {
    const {
        isError,
        isPending
    } = useFetchUsuario()
    const token = localStorage.getItem('token')
    if(isPending) return (<p>pera ai</p>)
    if(!token || isError) navigation.navigate('/login')

    const [tema ,alterarTema] = useContext(TemaContexto)

    const nav = [
        {
            icone: Home,
            legenda: 'Home',
            to: '/dashboard'
        },
        {
            icone: Weight,
            legenda: 'treinos',
            to: '/treinos'
        },
        {
            icone: Flame,
            legenda: 'dieta',
            to: '/dieta'
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



    return (

        <>
            <Outlet />

            <nav className="absolute z-100 bottom-5 left-1/2 -translate-x-1/2 
            border-base-secundaria border-2 rounded-full bg-base-secundaria/60 
            py-1 px-5 w-[95%] backdrop-blur-md">

                <div className="flex items-center justify-between
                gap-5 shrink-0 overflow-y-visible h-12">

                    {nav.map(item => (
                        <LinkNavDashboard
                            icone={item.icone}
                            legenda={item.legenda}
                            to={item.to}
                        />
                    ))}
                    {/* <BotaoSecundario
                        tipo="vazio"
                        onClick={alterarTema}
                    >
                        <Lightbulb />
                    </BotaoSecundario> */}

                </div>

            </nav>

        </>

    )
}

export default DashboardLayout      