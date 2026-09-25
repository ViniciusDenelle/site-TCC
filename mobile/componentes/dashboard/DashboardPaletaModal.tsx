import { ArrowRight, X } from "lucide-react-native"
import CardHorizontal from "../CardHorizontal"
import LinkSimples from "../links/LinkSimples"
import BotaoSecundario from "../botoes/BotaoSecundario"
import CardPaleta from "../CardPaleta"
import { Pressable, View } from "react-native"

const DashbaordPaletaModal = ({
    setPaletaAberta,
    alterarTema,
    tema
}) => {

    return (
        <>
            <Pressable
                className="absolute inset-0 bg-black/50 z-20"
                onPress={() => setPaletaAberta(false)}
            />

            <View className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                <CardHorizontal>
                    <View className="flex flex-col gap-2 text-slate-200 text-lg">
                        <Pressable className="ml-auto" onPress={() => setPaletaAberta(false)}>
                            <X />
                        </Pressable>
                        <LinkSimples to="/paletas" classeAdicional="flex">
                            escolha mais paletas <ArrowRight />
                        </LinkSimples>

                        <CardHorizontal>
                            <View className="flex-row items-center justify-between">
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
                            </View>
                        </CardHorizontal>

                        <CardPaleta
                            corBase='base-primaria'
                            corComplementar='destaque-s-escuro'
                            corPrimaria='destaque-p-escuro'
                        />
                    </View>
                </CardHorizontal>
            </View>
        </>

    )
}

export default DashbaordPaletaModal