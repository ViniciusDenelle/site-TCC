import { Dumbbell, Hourglass, Square, Timer } from "lucide-react"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import ModalPlayerComando from "./comando/ModalPlayerComando"
import ModalPlayerHeader from "./ModalPlayerHeader"
import ModalPlayerDescricao from "./ModalPlayerDescrição"
import ModalPlayerCarga from "./ModalPlayerCarga"
import TImerCircular from "../../TImers/TImerCircular"
import { segundosParaMinutos } from "../../../logicas/tempo/useSegundosParaMinutos"
import BotaoSecundario from "../../botoes/BotaoSecundario"

const ModalPlayer = () => {
    const {
        temTreinoAtivo,
        exercicioData,
        exercicioExecucao,
        modalAberto,
        setModalAberto
    } = useExecutarTreinoContext()

    if (!modalAberto || !temTreinoAtivo || !exercicioData) {
        return null;
    }

    const descricaoExercicio = exercicioData?.exercicio?.descricao;

    const emDescanso = exercicioExecucao?.timer?.ativo;
    const emExecucaoTempo = exercicioExecucao?.isometrico && exercicioExecucao?.timerExecucao?.ativo;
    
    return (
        <div className="fixed inset-0 bg-base-primaria z-1000000 min-h-screen md:h-full overflow-scroll 
        lg:relative lg:inset-auto lg:w-full">
            <div className="absolute w-full h-screen bg-linear-to-b from-destaque-s-claro/30 to-base-primaria" />

            <div className="relative w-9/10 mx-auto h-full ">

                <ModalPlayerHeader
                    setModalPlayerAberto={setModalAberto}
                />

                {emDescanso ? (
                    <div className=" h-screen flex flex-col w-full justify-center items-center">
                        <div>
                            <TImerCircular
                                tempo={exercicioExecucao.timer.tempo}
                                tempoInicial={exercicioData?.descanso ?? 0}
                                size={250}
                                strokeWidth={10}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex justify-center">
                                <h1 className="text-3xl text-t-primaria flex items-center">
                                    <Hourglass className="animate-pulse mr-2" />
                                    {segundosParaMinutos(exercicioExecucao.timer.tempo)}
                                </h1>
                            </div>
                        </div>
                    </div>
                ) : emExecucaoTempo ? (
                <div className=" flex flex-col w-full justify-center items-center gap-6 ring mb-50 bg-black">
                    <div className="">
                        <TImerCircular
                            tempo={exercicioExecucao.timerExecucao.tempo}
                            tempoInicial={exercicioExecucao.duracaoAlvo}
                            size={250}
                            strokeWidth={10}
                        />
                        <div className="flex flex-col items-center gap-1">
                            <h1 className="text-3xl text-t-primaria flex items-center">
                                <Timer className="animate-pulse mr-2" />
                                {segundosParaMinutos(exercicioExecucao.timerExecucao.tempo)}
                            </h1>
                            <span className="text-sm text-t-terciaria opacity-70">segure a posição</span>
                        </div>
                    </div>

                    <div className="relative z-1000001">
                        <BotaoSecundario
                            icone={Square}
                            onClick={exercicioExecucao.encerrarExecucaoAntecipada}
                        />
                    </div>
                </div>
                ) : (
                <div className=" w-full h-65  bg-base-terciaria rounded-lg mb-32">
                    {exercicioData?.exercicio?.imagem ? (
                        <img src={(exercicioData.exercicio.imagem)} alt={exercicioData.exercicio.nome} className="size-full" />
                    ) : (
                        <Dumbbell className="size-full" />
                    )}
                </div>
                )}

                <ModalPlayerComando />

                <div className=" w-full h-60 flex flex-col gap-4">
                    {Boolean(descricaoExercicio) && (
                        <ModalPlayerDescricao
                            descricao={descricaoExercicio}
                        />
                    )}
                    <ModalPlayerCarga />
                </div>
            </div>
        </div>
    )
}

export default ModalPlayer