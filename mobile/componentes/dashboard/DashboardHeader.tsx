import { LogOut, Menu, Palette, UserCircle, X } from "lucide-react-native"
import BotaoSecundario from "../botoes/BotaoSecundario"
import CardHorizontal from "../CardHorizontal"
import LinkSimples from "../links/LinkSimples"
import WrapperIcone from "../organizacao/WrapperIcone"
import Texto from "../organizacao/Texto"
import BotaoPrimario from "../botoes/BotaoPrimario"
import { Pressable, View } from "react-native"

const DashboardHeader = ({
    abrirMenu,
    menuAberto,
    abrirPaleta,
    logout,
    linksNav,
    linksMenu
}) => {

    return (
        <View className="absolute top-0 left-0 z-50 w-full text-t-terciaria">

            <View className="mx-auto px-2 pt-2">

                <View className="relative flex-row justify-between w-full p-2">
                    <BotaoSecundario
                        onClick={abrirMenu}
                        classeAdicional="lg:hidden"
                        icone={Menu}
                    />
                    {/* titulo */}

                </View>

                {menuAberto && (
                    <View className="absolute left-0 top-0 h-screen w-72 bg-base-secundaria/90 px-2 pt-10">
                        <Pressable onPress={abrirMenu} className="absolute right-2 top-2 z-10">
                            <CardHorizontal className="h-10 w-10 items-center justify-center rounded-full px-0 py-0">
                                <X />
                            </CardHorizontal>
                        </Pressable>

                        <CardHorizontal>
                            <View className="flex-row gap-2 items-center">
                                <LinkSimples to="/perfil" classeAdicional="flex-row gap-1 items-center">
                                    <WrapperIcone tamanho="lg">
                                        <UserCircle className="size-full" />
                                    </WrapperIcone>
                                </LinkSimples>
                            </View>
                        </CardHorizontal>

                        <View className="flex flex-col gap-4 w-full mt-5">
                            <CardHorizontal className="hidden md:flex">
                                <View className="flex flex-col gap-4">
                                    {linksNav.map(link => (
                                        <LinkSimples key={link.legenda} to={link.to}>
                                            <View className="flex-row w-full gap-2 items-center">
                                                <WrapperIcone>
                                                    <link.icone className="size-full" />
                                                </WrapperIcone>
                                                <Texto tipo="titulo" className="font-medium">
                                                    {link.legenda}
                                                </Texto>
                                            </View>
                                        </LinkSimples>
                                    ))}
                                </View>
                            </CardHorizontal>

                            {linksMenu.map(link => (
                                <LinkSimples key={link.legenda} to={link.to}>
                                    <View className="flex-row w-full gap-2 items-center">
                                        <WrapperIcone>
                                            <link.icone className="size-full" />
                                        </WrapperIcone>
                                        <Texto tipo="titulo" className="font-medium">
                                            {link.legenda}
                                        </Texto>
                                    </View>
                                </LinkSimples>
                            ))}
                        </View>

                        <View className="absolute bottom-5 flex-row justify-center items-center w-full gap-4">
                            <BotaoSecundario
                                onClick={abrirPaleta}
                                texto="paleta"
                                icone={Palette}
                            />

                            <BotaoPrimario
                                tipo="vazio"
                                onClick={logout}
                                texto="logout"
                                icone={LogOut}
                            />
                        </View>
                    </View>
                )}

            </View>

        </View>
    )
}

export default DashboardHeader