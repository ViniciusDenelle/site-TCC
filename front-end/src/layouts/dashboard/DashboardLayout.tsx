import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChartBarIncreasing, CheckCircle, Cog, CogIcon, DotSquare, Flame, Home, Info, InfoIcon, Lightbulb, LogOut, LogOutIcon, LucideIcon, Newspaper, NewspaperIcon, Palette, Pause, PauseCircle, Redo, SkipBack, SkipForward, TextAlignJustify, UserCircle, Weight, X, Zap } from "lucide-react"
import { ReactNode, useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom"
import TemaContexto from "../../contextos/TemaContexto"
import BotaoSecundario from "../../componentes/botoes/BotaoSecundario"
import useFetchUsuario from "../../logicas/usuario/FetchUsuario"
import LinkSimples from "../../componentes/links/LinkSimples"
import CardHorizontal from "../../componentes/CardHorizontal"
import CardPaleta from "../../componentes/CardPaleta"
import LinkNavDashboard from "../../componentes/links/LinkNavDashboard"
import BotaoPrimario from "../../componentes/botoes/BotaoPrimario"
import useLogout from "../../logicas/usuario/Logout"
import Texto from "../../componentes/organizacao/Texto"
import WrapperIcone from "../../componentes/organizacao/WrapperIcone"
import InputSimples from "../../componentes/inputs/InputSimples"
import useExecutarTreinoContext, { TreinoProvider } from "../../contextos/ExecutarTreinoContexto"
import DashboardHeader from "../../componentes/dashboard/DashboardHeader"
import DashbaordPaletaModal from "../../componentes/dashboard/DashboardPaletaModal"
import DashboardMenuInferior from "../../componentes/dashboard/DashboardMenuInferior"
import { menu, nav } from "../../componentes/dashboard/DashboardlinksNav"
import ModalPlayer from "../../componentes/dashboard/player/ModalPlayer"
import MenuPlayer from "../../componentes/dashboard/player/menus/MenuPlayer"
// import { UsuarioProvider } from "../contextos/UsuarioContexto"

const DashboardLayout = () => {
    const {
        isError,
        isPending,
        dadosUsuario
    } = useFetchUsuario()
    const token = localStorage.getItem('token')


    const [tema, alterarTema] = useContext(TemaContexto)


    const [menuAberto, setMenuAberto] = useState<boolean>(false)
    const [paletaAberta, setPaletaAberta] = useState<boolean>(false)

    function abrirMenu() {
        setMenuAberto(prev => !prev)
    }

    const abrirPaleta = () => {
        setPaletaAberta(prev => !prev)
    }

    const navigation = useNavigate()

    const { logout } = useLogout()

    const [modalPlayer, setModalPlayer] = useState<boolean>(false)
    
    if (isPending) return
    if (isError) return
    if (!token) navigation('/login')


    return (

        <>
            <TreinoProvider>
                <DashboardHeader
                    abrirMenu={abrirMenu}
                    menuAberto={menuAberto}
                    logout={logout}
                    linksNav={nav}
                    linksMenu={menu}
                    abrirPaleta={abrirPaleta}
                />

                {menuAberto && (
                    <div className="fixed inset-0 bg-black/50 z-110"
                        onClick={() => setMenuAberto(false)} />
                )}


                {paletaAberta && (
                    <>
                        <DashbaordPaletaModal
                            setPaletaAberta={setPaletaAberta}
                            tema={tema}
                            alterarTema={alterarTema}
                        />
                    </>
                )}

                {modalPlayer && (
                    <ModalPlayer 
                        SetModalPlayerAberto={setModalPlayer}
                    />
                )}

                <Outlet />
                

                <DashboardMenuInferior 
                    setModalPlayer={setModalPlayer}
                    linksNav={nav}
                />
            </TreinoProvider>

        </>

    )
}

export default DashboardLayout      