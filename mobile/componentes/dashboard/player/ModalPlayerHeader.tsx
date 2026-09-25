import { X } from "lucide-react-native"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import { Pressable, View } from "react-native"

const ModalPlayerHeader = ({setModalPlayerAberto}) => {

    const {
        treino,
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    return (
        <View className="absolute top-0 left-0 z-10 flex-row w-full items-center justify-between">
            <Pressable onPress={() => setModalPlayerAberto(false)}>
                <WrapperIcone>
                    <X />
                </WrapperIcone>
            </Pressable>

            <Texto tipo="titulo" className="font-medium">
                de {treino?.nome ?? 'Treino'}
            </Texto>
        </View>
    )
}

export default ModalPlayerHeader
