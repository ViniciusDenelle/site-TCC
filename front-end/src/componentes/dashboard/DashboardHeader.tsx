import { LogOutIcon, Palette, TextAlignJustify, UserCircle, X } from "lucide-react"
import BotaoSecundario from "../botoes/BotaoSecundario"
import { AnimatePresence } from "framer-motion"
import CardHorizontal from "../CardHorizontal"
import LinkSimples from "../links/LinkSimples"
import WrapperIcone from "../organizacao/WrapperIcone"
import Texto from "../organizacao/Texto"
import BotaoPrimario from "../botoes/BotaoPrimario"
import {motion} from 'framer-motion'
import useFetchUsuario from "../../logicas/usuario/FetchUsuario"

const DashboardHeader = ({
    abrirMenu,
    menuAberto,
    abrirPaleta,
    logout,
    linksNav,
    linksMenu
}) => {

    const animacaoMenu = {

        invisivel: {
            x: -280,
        },

        visivel: {
            x: 0,
        }
    }

    const { dadosUsuario } = useFetchUsuario()
    console.log('dadosUsuario', dadosUsuario)

    return (
        <header className="fixed top-0 left-0 z-1000 text-t-terciaria">

            <div className="container mx-auto px-2 ">

                <BotaoSecundario
                        onClick={abrirMenu}
                        classeAdicional="ring-transparent mt-2
                                hover:ring-transparentlg:hidden"
                        icone={TextAlignJustify}
                    />
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
                                    <LinkSimples to="/dashboard" className="flex gap-1 items-center">
                                        {dadosUsuario?.foto ? (
                                            <div className="size-15 rounded-full object-cover border-2 border-t-terciaria/50 p-1">
                                                <img src={dadosUsuario.foto} alt="" className="size-full rounded-full object-cover" />
                                            </div>
                                        ) : (
                                            <WrapperIcone tamanho="lg">
                                                <UserCircle className="size-full" />
                                            </WrapperIcone>
                                        )}
                                    </LinkSimples>

                                    <Texto tipo="titulo" className="font-medium">
                                        {dadosUsuario?.nome}
                                    </Texto>
                                </div>
                            
                            </CardHorizontal>

                            <div className="flex flex-col gap-4 w-full mt-5">
                                {/* link do menu */}
                                <CardHorizontal className="hidden md:flex">
                                    <div className="flex flex-col gap-4">
                                        {linksNav.map(link => (
                                            <LinkSimples key={link.legenda} end={link.end} to={link.to}>
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
                                {linksMenu.map(link => (
                                    <LinkSimples key={link.legenda} end={link.end} to={link.to}>
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
    )
}

export default DashboardHeader