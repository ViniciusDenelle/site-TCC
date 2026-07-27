import { Ban, Check, ClockPlus, Pause, PauseCircle, Play, Redo, RotateCcw, SkipBack, SkipForward, TimerOff, TimerReset } from "lucide-react"
import WrapperIcone from "../../../organizacao/WrapperIcone"
import Texto from "../../../organizacao/Texto"
import useExecutarTreinoContext from "../../../../contextos/ExecutarTreinoContexto"
import BotaoPrimario from "../../../botoes/BotaoPrimario"
import BotaoTerciario from "../../../botoes/BotaoTerciario"
import PlayerComandoTimer from "./PlayerComandoTimer"

const ModalPlayerComando = () => {

    const {
        treino,
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    return (
        <div className="absolute bottom-0 left-0  
                        w-full bg-linear-to-t pb-5
                        from-base-primaria to-transparent">

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    {exercicioExecucao.timer.ativo ? (
                        <Texto tipo="titulo" className="text-t-primaria">
                            Descanso de {exercicioData.descanso} segundos
                        </Texto>
                    ) : (
                        <>
                            <div className="flex gap-2 items-center">

                                <Texto tipo="titulo" className="text-t-primaria">
                                    {exercicioExecucao.serieAtual} de {exercicioData.sets} series
                                </Texto>

                                <Texto tipo="subtitulo">
                                    {exercicioData.exercicio.nome} {exercicioExecucao.timer.tempo}
                                </Texto>
                            </div>
                            <Texto>
                                feito por vinicius
                            </Texto>
                        </>
                    )}

                </div>

                <div className="flex justify-between place-items-center">
                    {exercicioExecucao.timer.ativo ? (
                        <PlayerComandoTimer />
                    ) : (
                        <></>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ModalPlayerComando
