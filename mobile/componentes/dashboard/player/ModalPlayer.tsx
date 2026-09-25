import { Dumbbell, Hourglass } from "lucide-react-native"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import ModalPlayerComando from "./comando/ModalPlayerComando"
import ModalPlayerHeader from "./ModalPlayerHeader"
import ModalPlayerDescricao from "./ModalPlayerDescrição"
import ModalPlayerCarga from "./ModalPlayerCarga"
import TImerCircular from "../../TImers/TImerCircular"
import Texto from "../../organizacao/Texto"
import { segundosParaMinutos } from "../../../logicas/tempo/useSegundosParaMinutos"
import { View } from "react-native"

const ModalPlayer = ({
    SetModalPlayerAberto,
    setModalPlayerAberto,
}) => {
    const fecharModal = setModalPlayerAberto ?? SetModalPlayerAberto

    const {
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    /*info: qual, criador, treino, exercicio, musculo, equipamento
    , carga(geral), seu ou de outra pessoa, descrição, imagem ou video.

    fila de exercicios, começar
    , pausar e continuar execução e timer
    , peso reps e sets 
    
    remover adcionar ou mudar ordem do exercicio da fila,

    */

    return (
        <View className="absolute inset-0 bg-base-primaria z-50 min-h-screen">
            <View className="absolute w-full h-screen bg-linear-to-b from-destaque-s-claro/30 to-base-primaria" />

            <View className="relative w-11/12 mx-auto h-full">

                <ModalPlayerHeader
                    setModalPlayerAberto={fecharModal}
                />

                {/* todo */}
                {exercicioExecucao.timer.ativo ? (
                    <View className="absolute h-screen flex flex-col w-full justify-center items-center">
                        <View>

                            <TImerCircular
                                tempo={exercicioExecucao.timer.tempo}
                                tempoInicial={exercicioData.descanso}
                                size={250}
                                strokeWidth={10}
                            />
                            <View className="absolute top-1/2 left-1/2 -translate-1/2 flex justify-center">
                                <Texto tipo="titulo" className="text-3xl text-t-primaria flex-row items-center">
                                    <Hourglass className="animate-pulse"/>{segundosParaMinutos(exercicioExecucao.timer.tempo)}
                                </Texto>
                            </View>
                            
                        </View>
                    </View>
                    
                ) : (
                    <View className="absolute w-full h-65 left-1/2 top-10 
                    -translate-x-1/2 bg-base-terciaria rounded-lg">

                        <Dumbbell className="size-full" />
                    </View>
                )}


                <ModalPlayerComando />

                <View className="absolute top-full left-0 w-full h-60 flex flex-col gap-4">
                    {/* <PlayerInfoCarga /> */}
                    {(exercicioData?.exercicio?.descricao !== ''
                        && exercicioData?.exercicio?.descricao !== null) && (
                            <ModalPlayerDescricao
                                descricao={exercicioData.exercicio.descricao}
                            />
                        )}
                    <ModalPlayerCarga />
                </View>
            </View>

        </View>
    )
}

export default ModalPlayer