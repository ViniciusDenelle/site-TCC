import Texto from "../../../organizacao/Texto"
import useExecutarTreinoContext from "../../../../contextos/ExecutarTreinoContexto"
import PlayerComandoTimer from "./PlayerComandoTimer"
import PlayerComando from "./PlayerComando"

const ModalPlayerComando = () => {

    const {
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    const emDescanso = exercicioExecucao.timer.ativo
    const emExecucaoTempo = exercicioExecucao.isometrico && exercicioExecucao.timerExecucao.ativo

    return (
        <div className="w-full bg-linear-to-t pb-5">

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    {emDescanso ? (
                        <Texto tipo="titulo" className="text-t-primaria">
                            Descanso de {exercicioData.descanso} segundos
                        </Texto>
                    ) : emExecucaoTempo ? (
                        <Texto tipo="titulo" className="text-t-primaria">
                            Segure a posição
                        </Texto>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Texto tipo="titulo" className="text-t-primaria">
                                {exercicioExecucao.concluida
                                ? `Exercicio Concluido`
                                : `${exercicioExecucao.serieAtual - 1} de ${exercicioData.sets} series`}
                            </Texto>
                            <Texto tipo="subtitulo">
                                {exercicioData.exercicio.nome}
                            </Texto>
                        </div>
                    )}
                </div>

                <div className="flex justify-between place-items-center">
                    {emDescanso ? (
                        <PlayerComandoTimer timer={exercicioExecucao.timer} />
                    ) : emExecucaoTempo ? (
                        <PlayerComandoTimer
                            timer={exercicioExecucao.timerExecucao}
                            permitirAjusteManual={false}
                            onFinalizarAntecipado={exercicioExecucao.encerrarExecucaoAntecipada}
                        />
                    ) : (
                        <PlayerComando
                            concluida={exercicioExecucao.concluida}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default ModalPlayerComando