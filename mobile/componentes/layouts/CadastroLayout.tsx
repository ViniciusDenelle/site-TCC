import useTema from "@/contextos/TemaContexto"
import { vars } from "nativewind"
import { ReactNode } from "react"
import { View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

 
 type props = {
    children: ReactNode
 }

 const CadastroLayout = ({
    children
 } : props) => {
    const { temaAtual } = useTema()
    const coresGradiente = {
        destaque: temaAtual['--color-destaque-p-medio'],
        base: temaAtual['--color-base-primaria'], 
    }

    return (
        <View style={vars(temaAtual)} className="h-full w-full bg-base-primaria">

            <LinearGradient
                colors={[
                    coresGradiente.destaque,
                    coresGradiente.base
                ]}
                start={{x:0 , y: 0}}
                end={{x: 0, y:0}}
                style={{ flex: 1 }}
            >

            </LinearGradient>

            <View className="h-full w-full flex justify-center items-center">

                <View className="flex h-auto rounded-lg bg-base-secundaria border-2 border-base-terciaria">
                    {children}
                </View>

            </View>
            
        </View>
    )
 }

 export default CadastroLayout