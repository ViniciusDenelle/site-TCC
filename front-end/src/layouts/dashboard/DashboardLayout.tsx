import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChartBarIncreasing, Cog, Flame, Home, Info, Lightbulb, LogOut, LucideIcon, Newspaper, Palette, TextAlignJustify, UserCircle, Weight, X, Zap } from "lucide-react"
import { ReactNode, useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import TemaContexto from "../../contextos/TemaContexto"
import BotaoSecundario from "../../componentes/BotaoSecundario"
import useFetchUsuario from "../../logicas/querys/FetchUsuario"
import LinkSimples from "../../componentes/LinkSimples"
import CardHorizontal from "../../componentes/CardHorizontal"
import CardPaleta from "../../componentes/CardPaleta"
import LinkNavDashboard from "../../componentes/LinkNavDashboard"
import BotaoPrimario from "../../componentes/BotaoPrimario"
import useLogout from "../../logicas/querys/Logout"
// import { UsuarioProvider } from "../contextos/UsuarioContexto"

const DashboardLayout = () => {
    const {
        isError,
        isPending,
        dadosUsuario
    } = useFetchUsuario()
    const token = localStorage.getItem('token')
    if (isPending) return (<p>pera ai</p>)
    if (!token || isError) navigation.navigate('/login')

    const [tema, alterarTema] = useContext(TemaContexto)

    const nav = [
        {
            icone: Home,
            legenda: 'Home',
            to: 'home'
        },
        {
            icone: Weight,
            legenda: 'treinos',
            to: 'treinos'
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

    const {logout} = useLogout()


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

                                <div onClick={abrirMenu}
                                className="absolute top-1/2 left-full -translate-1/2 w-10 cursor-pointer">
                                    <CardHorizontal className="relative rounded-full w-10 h-10">
                                        <div className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center">
                                            <X/>
                                        </div>
                                    </CardHorizontal>
                                </div>
                                <CardHorizontal>
                                    <div className="flex gap-2 items-center">
                                        <LinkSimples to="/perfil" classeAdicional="flex gap-1 items-center">
                                            <div className="size-10 rounded-full overflow-hidden">
                                                <UserCircle size={40} strokeWidth={1.5} />
                                            </div>

                                            <h1 className="text-lg">
                                                {dadosUsuario.nome}
                                            </h1>
                                        
                                        </LinkSimples>
                                    </div>
                                </CardHorizontal>

                                <div className="flex flex-col gap-4 w-full mt-5">
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Cog size={30} /> configurações

                                        </div>
                                    </LinkSimples>
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Newspaper size={30} /> novidades

                                        </div>
                                    </LinkSimples>
                                    <LinkSimples to="/">
                                        <div className="flex w-full gap-2 items-center">
                                            <Info size={30} /> sobre

                                        </div>
                                    </LinkSimples>
                                </div>

                                <div className="absolute bottom-5 flex justify-center
                                items-center w-full gap-4">



                                    <BotaoSecundario
                                        onClick={abrirPaleta}>


                                        paleta <Palette />
                                    </BotaoSecundario>
                                    <BotaoPrimario 
                                        tipo="vazio"
                                        onClick={logout}
                                    >
                                        logout <LogOut />
                                    </BotaoPrimario>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </header>

            {menuAberto && (
                <div className="fixed inset-0 bg-black/50 z-110"
                    onClick={() => setMenuAberto(false)} />
            )}


            {paletaAberta && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-2000"
                        onClick={() => setPaletaAberta(false)}
                    />

                    <div className="fixed top-1/2 left-1/2 -translate-1/2
                    z-2010">
                        <CardHorizontal>
                            <div className="flex flex-col gap-2 text-slate-200 text-lg">
                                <div className="ml-auto">
                                    <X
                                        className="cursor-pointer"
                                        onClick={() => setPaletaAberta(false)}
                                    />
                                </div>
                                <LinkSimples to="/paletas" classeAdicional="flex">
                                    escolha mais paletas <ArrowRight />
                                </LinkSimples>

                                <CardHorizontal>
                                    <div className="flex items-center justify-between">
                                        <BotaoSecundario
                                            onClick={() => alterarTema('light')}
                                            tipo={tema === 'light' ? 'cheio' : 'vazio'}
                                            disabled={tema === 'light'}
                                            redondo
                                        >
                                            claro
                                        </BotaoSecundario>
                                        <BotaoSecundario
                                            onClick={() => alterarTema('dark')}
                                            tipo={tema === 'dark' ? 'cheio' : 'vazio'}
                                            disabled={tema === 'dark'}
                                            redondo
                                        >
                                            escuro
                                        </BotaoSecundario>
                                    </div>
                                </CardHorizontal>

                                <CardPaleta
                                    corBase='base-primaria'
                                    corComplementar='destaque-s-escuro'
                                    corPrimaria='destaque-p-escuro'
                                />
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
                gap-5 shrink-0 overflow-y-visible h-15">

                    {nav.map(item => (
                        <LinkNavDashboard
                            key={item.to}
                            icone={item.icone}
                            legenda={item.legenda}
                            to={item.to}
                        />
                    ))}

                </div>

            </nav>

        </>

    )
}

export default DashboardLayout      