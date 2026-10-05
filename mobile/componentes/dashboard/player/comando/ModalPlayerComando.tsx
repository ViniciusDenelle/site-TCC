import Texto from "../../../organizacao/Texto"
import useExecutarTreinoContext from "../../../../contextos/ExecutarTreinoContexto"
import PlayerComandoTimer from "./PlayerComandoTimer"
import { View } from "react-native"

const ModalPlayerComando = () => {

    const {
        treino,
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    return (
        <View className="absolute bottom-0 left-0 w-full bg-base-primaria/95 pb-5">
            <View className="flex flex-col gap-2">
                <View className="flex flex-col">
                    {exercicioExecucao.timer.ativo ? (
                        <Texto tipo="titulo" className="text-t-primaria">
                            Descanso de {exercicioData.descanso} segundos
                        </Texto>
                    ) : (
                        <>
                            <View className="flex-row gap-2 items-center">
                                <Texto tipo="titulo" className="text-t-primaria">
                                    {exercicioExecucao.serieAtual} de {exercicioData.sets} series
                                </Texto>

                                <Texto tipo="subtitulo">
                                    {exercicioData.exercicio.nome}
                                </Texto>
                            </View>
                            <Texto>
                                feito por vinicius
                            </Texto>
                        </>
                    )}
                </View>

                <View className="flex-row justify-between items-center">
                    {exercicioExecucao.timer.ativo ? <PlayerComandoTimer /> : null}
                </View>
            </View>
        </View>
    )
}

export default ModalPlayerComando
