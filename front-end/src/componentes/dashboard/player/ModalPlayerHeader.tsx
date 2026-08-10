import { X } from "lucide-react"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"

const ModalPlayerHeader = ({setModalPlayerAberto}) => {

    const {
        treino,
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    return (
        <div className="absolute top-0 left-0
        flex w-full items-center justify-between z-100
        ">
            <div onClick={() => setModalPlayerAberto(false)}>
                <WrapperIcone>
                    <X />
                </WrapperIcone>
                
            </div>

            <Texto tipo="titulo" className="font-medium">
                de {treino.nome}
            </Texto>

            {/* <WrapperIcone>
                
            </WrapperIcone> */}
        </div>
    )
}

export default ModalPlayerHeader
