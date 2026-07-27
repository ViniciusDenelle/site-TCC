import { CheckCircle, Pause } from "lucide-react"
import CardHorizontal from "../../CardHorizontal"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"

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
            <div
                className="w-[95%] mx-auto mb-1 flex items-center 
                justify-center"
            >

                <CardHorizontal>
                    <div className="relative flex gap-2">

                        <div 
                            onClick={() => setModalPlayer(true)}
                            className="absolute inset-0 z-10 cursor-pointer"
                        />
                        
                        <div className="size-10 bg-base-terciaria">

                        </div>

                        <div className="flex flex-col w-2/4 overflow-hidden">
                            <Texto 
                                tipo="subtitulo" 
                                className="truncate text-t-primaria"
                            >
                                {exercicioData?.exercicio?.nome} {exercicioExecucao?.serieAtual}/{exercicioData?.sets}
                            </Texto>
                            <div className="flex gap-1">
                            <Texto className="truncate">
                                {exercicioData.repsMin} a {exercicioData?.repsMax}
                            </Texto>
                            <Texto className="truncate">
                                com {exercicioExecucao?.peso} kg
                            </Texto>

                            </div>
                        </div>

                        <div className="flex justify-end items-center w-1/4 z-20">
                            <div onClick={exercicioExecucao.executarSerie}>
                                <WrapperIcone>
                                    <CheckCircle/>
                                </WrapperIcone>
                            </div>
                        </div>

                    </div>
                </CardHorizontal>

            </div>
        )
    }
}

export default PlayerInferior