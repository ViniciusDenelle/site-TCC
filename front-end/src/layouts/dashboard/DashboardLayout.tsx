import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChartBarIncreasing, Cog, CogIcon, Flame, Home, Info, InfoIcon, Lightbulb, LogOut, LogOutIcon, LucideIcon, Newspaper, NewspaperIcon, Palette, TextAlignJustify, UserCircle, Weight, X, Zap } from "lucide-react"
import { ReactNode, useContext, useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import TemaContexto from "../../contextos/TemaContexto"
import BotaoSecundario from "../../componentes/botoes/BotaoSecundario"
import useFetchUsuario from "../../logicas/querys/FetchUsuario"
import LinkSimples from "../../componentes/links/LinkSimples"
import CardHorizontal from "../../componentes/CardHorizontal"
import CardPaleta from "../../componentes/CardPaleta"
import LinkNavDashboard from "../../componentes/links/LinkNavDashboard"
import BotaoPrimario from "../../componentes/botoes/BotaoPrimario"
import useLogout from "../../logicas/querys/Logout"
import Texto from "../../componentes/organizacao/Texto"
import WrapperIcone from "../../componentes/organizacao/WrapperIcone"
// import { UsuarioProvider } from "../contextos/UsuarioContexto"

const DashboardLayout = () => {
    const {
        isError,
        isPending,
        dadosUsuario
    } = useFetchUsuario()
    const token = localStorage.getItem('token')


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
            to: 'treino'
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

    const linksMenuHamburguer = [
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

    const { logout } = useLogout()

    if (isPending) return
    if (isError) return
    if (!token) navigation.navigate('/login')

    return (

        <>
            <header className="fixed top-0 left-0 w-full z-1000 text-t-terciaria">

                <div className="container mx-auto px-2">

                    <nav
                        className={`
                          relative flex justify-between
                          w-full p-2
                        `}
                    >
                        <BotaoSecundario
                            onClick={abrirMenu}
                            classeAdicional="ring-transparent 
                            hover:ring-transparentlg:hidden"
                            icone={TextAlignJustify}
                        />
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
                                            <X />
                                        </div>
                                    </CardHorizontal>
                                </div>
                                <CardHorizontal>
                                    <div className="flex gap-2 items-center">
                                        <LinkSimples to="/perfil" classeAdicional="flex gap-1 items-center">

                                            <WrapperIcone tamanho="lg">
                                                <UserCircle className="size-full" />
                                            </WrapperIcone>


                                            {/* <h1 className="text-lg">
                                                {dadosUsuario.nome}
                                            </h1> */}

                                        </LinkSimples>
                                    </div>
                                </CardHorizontal>

                                <div className="flex flex-col gap-4 w-full mt-5">
                                    {/* link do menu */}
                                    <CardHorizontal className="hidden md:flex">
                                        <div className="flex flex-col gap-4">
                                            {nav.map(link => (
                                                <LinkSimples key={link.legenda} to={link.to}>
                                                    <div className="flex w-full gap-2 items-center">
                                                        <WrapperIcone>
                                                            <link.icone className="size-full" />
                                                        </WrapperIcone>
                                                        <Texto tipo="titulo" className="font-medium">
                                                            {link.legenda}
                                                        </Texto>
                                                    </div>
                                                </LinkSimples>
                                            ))}
                                        </div>
                                    </CardHorizontal>
                                    {linksMenuHamburguer.map(link => (
                                        <LinkSimples key={link.legenda} to={link.to}>
                                            <div className="flex w-full gap-2 items-center">
                                                <WrapperIcone>
                                                    <link.icone className="size-full" />
                                                </WrapperIcone>
                                                <Texto tipo="titulo" className="font-medium">
                                                    {link.legenda}
                                                </Texto>
                                            </div>
                                        </LinkSimples>
                                    ))}

                                </div>

                                <div className="absolute bottom-5 flex justify-center
                                items-center w-full gap-4">



                                    <BotaoSecundario
                                        onClick={abrirPaleta}
                                        texto="paleta"
                                        icone={Palette}
                                    />

                                    <BotaoPrimario
                                        tipo="vazio"
                                        onClick={logout}
                                        texto="logout"
                                        icone={LogOutIcon}
                                    />

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
                                            texto="claro"
                                        />
                                        <BotaoSecundario
                                            onClick={() => alterarTema('dark')}
                                            tipo={tema === 'dark' ? 'cheio' : 'vazio'}
                                            disabled={tema === 'dark'}
                                            redondo
                                            texto="escuro"
                                       />
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

            <div className="fixed z-100 bottom-[1%] left-1/2 -translate-x-1/2 w-full md:hidden">
                <div className="container mx-auto">
                    <nav className="
                    border-base-terciaria border-3 rounded-full bg-base-terciaria/60 
                    py-1 px-5 w-full backdrop-blur-md text-base">

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
                </div>
            </div>

        </>

    )
}

export default DashboardLayout      