import useTema from "@/contextos/TemaContexto"
import { vars } from "nativewind"
import { ReactNode } from "react"
import { View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import BotaoPrimario from "../BotaoPrimario"
import { BlurView } from 'expo-blur'
import BotaoSecundario from "../BotaoSecundario"
import { useRouter } from "expo-router"
import { ArrowLeft, Lightbulb } from "lucide-react-native"

 
 type props = {
    children: ReactNode,
    proximo?: () => void | null,
    podeProximo?: boolean
 }

 const CadastroLayout = ({
    proximo,
    podeProximo,
    children
 } : props) => {

    const { 
        temaAtual, 
        formatarCor,
        tema,
        setTema
    } = useTema()

    const coresGradiente = {
        destaque: temaAtual['--color-destaque-p-escuro'],
        base: temaAtual['--color-base-primaria'], 
    }

    const router = useRouter()

    const corIcone = formatarCor(temaAtual['--color-t-secundaria'], 1)

    function mudarTema() {
        const novoTema = tema === 'light' ? 'dark' : 'light'
        setTema(novoTema)
    }

    function handleProximo()
    {
        if (podeProximo) proximo?.()
    }

    return (
        <View style={vars(temaAtual)} className="h-full w-full bg-base-primaria">

                <View className="relative h-full w-full flex justify-center items-center">

                    <View className="absolute top-8 right-5 flex">
                        <BotaoPrimario
                            className="border-transparent"
                            onPress={mudarTema}
                        >
                            <Lightbulb color={corIcone}/>
                        </BotaoPrimario>
                    </View>
                    

                        <View className="flex flex-col gap-2 h-auto p-5 
                        bg-base-secundaria rounded-lg  w-[90%]">
                            <View className='w-12'>
                                <BotaoSecundario
                                className='border-transparent'
                                onPress={() => router.back()}
                                >
                                <ArrowLeft color={corIcone} size={16} />
                                </BotaoSecundario>

                            </View>

                            {children}
                        
                            
                            <BotaoPrimario
                                onPress={ handleProximo ?? null}
                                tipo="cheio"
                                className="mt-5"
                                disabled={!podeProximo}
                            >
                                proximo
                            </BotaoPrimario>
                            
                        </View>
                    

                </View>
            
        </View>
    )
 }

 export default CadastroLayout