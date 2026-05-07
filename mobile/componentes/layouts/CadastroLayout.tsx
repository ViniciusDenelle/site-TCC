import useTema from "@/contextos/TemaContexto"
import { vars } from "nativewind"
import { ReactNode } from "react"
import { View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import BotaoPrimario from "../BotaoPrimario"
import { BlurView } from 'expo-blur'
import BotaoSecundario from "../BotaoSecundario"
import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"

 
 type props = {
    children: ReactNode,
    proximo: () => void | null
 }

 const CadastroLayout = ({
    proximo,
    children
 } : props) => {
    const { temaAtual } = useTema()
    const coresGradiente = {
        destaque: temaAtual['--color-destaque-p-escuro'],
        base: temaAtual['--color-base-primaria'], 
    }

    const router = useRouter()

    const formatColor = (color: string, opacidade: number) => {
        const formatted = color.replace(/\s+/g, ', ')
        return `rgba(${formatted}, ${opacidade})`
    }

    return (
        <View style={vars(temaAtual)} className="h-full w-full bg-base-primaria">

            <LinearGradient
                colors={[
                    formatColor(coresGradiente.base, 1),
                    formatColor(coresGradiente.base, 1)
                ]}
                start={{x:0 , y: 1.5}}
                end={{x: 0, y:0}}
                style={{ flex: 1 }}
            >
                <View className="h-full w-full flex justify-center items-center">

                    

                        <View className="flex flex-col gap-2 h-auto p-5 
                        bg-base-secundaria rounded-lg  w-[90%]">
                            <View className='w-12'>
                                <BotaoSecundario
                                className='border-0'
                                onPress={() => router.back()}
                                >
                                <ArrowLeft color={formatColor(temaAtual['--color-t-secundaria'], 1)} size={16} />
                                </BotaoSecundario>

                            </View>

                            {children}
                        
                            
                            <BotaoPrimario
                                onPress={proximo ?? null}
                                tipo="cheio"
                                className="mt-5"
                            >
                                proximo
                            </BotaoPrimario>
                            
                        </View>
                    

                </View>
            </LinearGradient>

            
        </View>
    )
 }

 export default CadastroLayout