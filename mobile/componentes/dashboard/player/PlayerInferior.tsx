import { CheckCircle } from "lucide-react-native"
import CardHorizontal from "../../CardHorizontal"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import { Pressable, View } from "react-native"

const PlayerInferior = ({
    setModalPlayer
}) => {

    const {
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        setOrdem
    } = useExecutarTreinoContext()

    if (treinoQuery.isPending) {

    } else {
        return (
            <View className="mx-auto mb-1 w-[95%] items-center justify-center">

                <CardHorizontal>
                    <View className="relative flex-row gap-2">

                        <Pressable
                            onPress={() => setModalPlayer(true)}
                            className="absolute inset-0 z-10"
                        />
                        
                        <View className="size-10 bg-base-terciaria" />

                        <View className="flex flex-col w-2/4 overflow-hidden">
                            <Texto 
                                tipo="subtitulo" 
                                className="truncate text-t-primaria"
                            >
                                {exercicioData?.exercicio?.nome} {exercicioExecucao?.serieAtual}/{exercicioData?.sets}
                            </Texto>
                            <View className="flex-row gap-1">
                            <Texto className="truncate">
                                {exercicioData.repsMin} a {exercicioData?.repsMax}
                            </Texto>
                            <Texto className="truncate">
                                com {exercicioExecucao?.peso} kg
                            </Texto>

                            </View>
                        </View>

                        <View className="flex w-1/4 items-center justify-end z-20">
                            <Pressable onPress={exercicioExecucao.executarSerie}>
                                <WrapperIcone>
                                    <CheckCircle/>
                                </WrapperIcone>
                            </Pressable>
                        </View>

                    </View>
                </CardHorizontal>

            </View>
        )
    }
}

export default PlayerInferior