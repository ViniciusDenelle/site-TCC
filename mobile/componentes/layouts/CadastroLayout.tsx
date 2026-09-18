import useTema from "@/contextos/TemaContexto"
import { vars } from "nativewind"
import { ReactNode } from "react"
import { View } from "react-native"
import BotaoPrimario from "../BotaoPrimario"
import BotaoSecundario from "../BotaoSecundario"
import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"

 
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
    } = useTema()

    const router = useRouter()

    const corIcone = formatarCor(temaAtual['--color-t-secundaria'], 1)

    function handleProximo()
    {
        if (podeProximo) proximo?.()
    }

    return (
        <View style={vars(temaAtual)} className="h-full w-full bg-base-primaria">

                <View className="relative h-full w-full flex justify-center items-center">

                    <View className="absolute top-8 right-5 flex">
                        
                    </View>
                    

                        <View className="flex flex-col gap-2 h-auto p-5 
                        bg-base-secundaria rounded-lg  w-[90%]">
                            <View className='w-full flex flex-row justify-between'>
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