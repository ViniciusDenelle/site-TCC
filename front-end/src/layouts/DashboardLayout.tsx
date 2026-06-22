import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChartBarIncreasing, Cog, Flame, Home, Info, Lightbulb, LogOut, LucideIcon, Newspaper, Palette, TextAlignJustify, UserCircle, Weight, X, Zap } from "lucide-react"
import { ReactNode, useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import TemaContexto from "../contextos/TemaContexto"
import BotaoSecundario from "../componentes/BotaoSecundario"
import useFetchUsuario from "../logicas/querys/FetchUsuario"
import LinkSimples from "../componentes/LinkSimples"
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

type CardHorizontalProps = {
    children: ReactNode
}

const CardHorizontal = ({
    children
} : CardHorizontalProps) => {

    return (
        <div className="w-full p-2 border-2 border-base-terciaria rounded-2xl
        bg-base-terciaria/30 backdrop-blur-md 
        transition-colors duration-200 text-t-terciaria">
            {children}
        </div>
    )
}

const DashboardLayout = () => {
    const {
        isError,
        isPending
    } = useFetchUsuario()
    const token = localStorage.getItem('token')
    if (isPending) return (<p>pera ai</p>)
    if (!token || isError) navigation.navigate('/login')

    const [tema, alterarTema] = useContext(TemaContexto)

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
    // header
    const navMenuAberto = `
        rounded-t-xl border-t-2 border-x-2
        lg:rounded-full lg:border-2
    `

    const animacaoMenu = {

        invisivel: {
            x: -280,

        },

        visivel: {
            x: 0,

        }
    }


    const [menuAberto, setMenuAberto] = useState<boolean>(false)
    const [paletaAberta, setPaletaAberta] = useState<boolean>(false)

    function abrirMenu() {
        setMenuAberto(prev => !prev)
    }

    const abrirPaleta = () => {
        setPaletaAberta(prev => !prev)
    }


    return (

        <>
            <header className="absolute top-0 left-0 w-full z-1000 text-t-terciaria">

                <div className="container mx-auto px-2">

                    <nav
                        className={`
                          relative flex justify-between
                          w-full p-2
                        `}
                    >
                        <BotaoSecundario
                        onClick={abrirMenu}
                        classeAdicional="
                            ring-transparent
                            hover:ring-transparent
                            lg:hidden
                        "
                        >
                            <TextAlignJustify />
                        </BotaoSecundario>
                        {/* titulo */}
                        <NavLink
                            to="/"
                            className="
                            text-xl font-bold
                            flex text-t-primaria
                            transition-colors duration-200
                          "
                        >


                        </NavLink>

                        <div
                            className="
                            hidden gap-2 items-center lg:flex
                          "
                        >


                        </div>

                        {/* mobile */}



                    </nav>
                    <AnimatePresence>

                        {menuAberto && (

                            <motion.div
                                variants={animacaoMenu}
                                initial="invisivel"
                                animate="visivel"
                                exit="invisivel"
                                transition={{ duration: 0.2 }}
                                className="
                                    absolute left-0 h-screen w-70 top-0
                                    bg-base-secundaria/80 backdrop-blur-3xl
                                    text-t-terciaria border-base-terciaria
                                    pt-10 px-2 text-lg"
                            >
                                <CardHorizontal>
                                    <div className="flex gap-2 items-center">
                                        <div className="size-10 rounded-full overflow-hidden">
                                            <UserCircle size={40} strokeWidth={1.5}/>
                                        </div>

                                        <h1 className="text-lg">
                                            seu nome 
                                        </h1>
                                    </div>
                                </CardHorizontal>

                                <div className="flex flex-col gap-4 w-full mt-5">
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Cog size={30}/> configurações

                                        </div>
                                    </LinkSimples>
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Newspaper size={30}/> novidades

                                        </div>
                                    </LinkSimples>
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Info size={30}/> sobre

                                        </div>
                                    </LinkSimples>
                                </div>

                                <div className="absolute bottom-5 flex justify-center
                                items-center w-full gap-4">
                                    
                                    

                                    <BotaoSecundario
                                    onClick={abrirPaleta}>


                                        paleta <Palette/>
                                    </BotaoSecundario>
                                    <BotaoSecundario tipo="cheio">
                                        logout <LogOut/>
                                    </BotaoSecundario>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </header>
            
            {menuAberto && (
                <div className="fixed inset-0 bg-black/50 z-110"
                onClick={() => setMenuAberto(false)}/>
            )}


            {paletaAberta && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-2000"
                        onClick={() => setPaletaAberta(false)}
                    />

                    <div className="fixed top-1/2 left-1/2 -translate-1/2
                    z-2010">
                        <CardHorizontal>
                            <div className="flex flex-col gap-2 text-slate-200">
                                <div className="ml-auto">
                                    <X 
                                        className="cursor-pointer"
                                        onClick={() => setPaletaAberta(false)}
                                    />
                                </div>
                                <LinkSimples to="/paletas" classeAdicional="flex">
                                    escolha mais paletas <ArrowRight/>
                                </LinkSimples>

                                <CardHorizontal>
                                    <div className="flex items-center justify-between">
                                        <BotaoSecundario 
                                            onClick={() => alterarTema('light')}
                                            tipo={tema === 'light' ? 'cheio' : 'vazio'}
                                            disabled={tema === 'light'}
                                        >
                                            claro
                                        </BotaoSecundario>
                                        <BotaoSecundario 
                                            onClick={() => alterarTema('dark')}
                                            tipo={tema === 'dark' ? 'cheio' : 'vazio'}
                                            disabled={tema === 'dark'}
                                        >
                                            escuro
                                        </BotaoSecundario>
                                    </div>
                                </CardHorizontal>

                                <div className="size-20 rounded-md overflow-hidden 
                                grid grid-cols-2 grid-row-2 border-2 
                                border-base-terciaria">
                                    <div className="col-span-2 bg-base-primaria"/>
                                    <div className="bg-destaque-s-escuro"/>
                                    <div className="bg-destaque-p-medio"/>
                                </div>
                            </div>
                        </CardHorizontal>
                    </div>                            
                </>
            )}

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