import { Dumbbell, Hourglass } from "lucide-react"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import ModalPlayerComando from "./comando/ModalPlayerComando"
import ModalPlayerHeader from "./ModalPlayerHeader"
import ModalPlayerDescricao from "./ModalPlayerDescrição"
import ModalPlayerCarga from "./ModalPlayerCarga"
import TImerCircular from "../../TImers/TImerCircular"
import Texto from "../../organizacao/Texto"
import { segundosParaMinutos } from "../../../logicas/tempo/useSegundosParaMinutos"
import WrapperIcone from "../../organizacao/WrapperIcone"

const ModalPlayer = ({
    SetModalPlayerAberto
}) => {
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
        <div className="fixed inset-0 bg-base-primaria
         z-1000000 min-h-screen overflow-scroll">
            <div className="absolute w-full h-screen
            bg-linear-to-b from-destaque-s-claro/30 to-base-primaria" />

            <div className="relative w-9/10 mx-auto h-full">

                <ModalPlayerHeader
                    setModalPlayerAberto={SetModalPlayerAberto}
                />

                {/* todo */}
                {exercicioExecucao.timer.ativo ? (
                    <div className="absolute h-screen flex flex-col w-full justify-center items-center">
                        <div className="">

                            <TImerCircular
                                tempo={exercicioExecucao.timer.tempo}
                                tempoInicial={exercicioData.descanso}
                                size={250}
                                strokeWidth={10}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex justify-center">
                                <h1 className="text-3xl text-t-primaria flex items-center">
                                    <Hourglass className="animate-pulse"/>{segundosParaMinutos(exercicioExecucao.timer.tempo)}
                                </h1>
                            </div>
                            
                        </div>
                    </div>
                    
                ) : (
                    <div className="absolute w-full h-65 left-1/2 top-10 
                    -translate-x-1/2 bg-base-terciaria rounded-lg">

                        <Dumbbell className="size-full" />
                    </div>
                )}


                <ModalPlayerComando />

                <div className="absolute top-full left-0 w-full h-60
                flex flex-col gap-4">
                    {/* <PlayerInfoCarga /> */}
                    {(exercicioData.exercicio.descricao !== ''
                        || exercicioData.exercicio.descricao !== null) && (
                            <ModalPlayerDescricao
                                descricao={exercicioData.exercicio.descricao}
                            />
                        )}
                    <ModalPlayerCarga />
                </div>
            </div>

        </div>
    )
}

export default ModalPlayer