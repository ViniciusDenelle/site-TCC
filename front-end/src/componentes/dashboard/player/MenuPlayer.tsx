import { Dumbbell, PlusCircle } from "lucide-react"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import CardHorizontal from "../../CardHorizontal"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import OpcoesMenuPlayer from "../../organizacao/opcoesMenuPlayer"

const MenuPlayer = () => {
    
    const {
        treino,
        exercicioData
    } = useExecutarTreinoContext()

    const opcoesExercicio = [
        {
            nome: 'adcionar a treino',
            tipo: 'link',
            icone: PlusCircle
        }
    ]

    return (
        <>
            {true && (
                <>
                
                    <div className="absolute inset-0 bg-black/50 z-10000"/>

                    <div className="absolute top-1/2 left-0 w-full h-1/2 z-10000">
                        <CardHorizontal className="h-full">
                            <div className="flex flex-col gap-4">

                                <div className="flex gap-2 item-center">
                                    <div className="size-10">
                                        <WrapperIcone tamanho="xl">
                                            <Dumbbell className="size-full"/>
                                        </WrapperIcone>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Texto tipo="titulo" className="font-thin text-t-primaria">
                                            {exercicioData.exercicio.nome}
                                        </Texto>
                                        <Texto>
                                            {treino.nome}
                                        </Texto>
                                    </div>
                                </div>

                                {/* opções */}
                                {opcoesExercicio.map(opcao => (
                                    <OpcoesMenuPlayer 
                                        icone={opcao.icone}
                                        nome={opcao.nome}
                                    />
                                ))}

                            </div>
                        </CardHorizontal>
                    </div>
                </>
            )}
        </>
    )
}

export default MenuPlayer