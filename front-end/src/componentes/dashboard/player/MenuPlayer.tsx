import { Dumbbell, PlusCircle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import useExecutarTreinoContext from "../../../contextos/ExecutarTreinoContexto"
import CardHorizontal from "../../CardHorizontal"
import Texto from "../../organizacao/Texto"
import WrapperIcone from "../../organizacao/WrapperIcone"
import OpcoesMenuPlayer from "../../organizacao/opcoesMenuPlayer"
import { Dispatch, SetStateAction } from "react"
import { ResExercicioProps } from "../../../logicas/dashboard/treinos/exercicios/FetchExercicio"

type MenuPlayerProps = {
    menuAberto: boolean,
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    exercicio: ResExercicioProps
    adcionar: () => void
}

const MenuPlayer = ({
    menuAberto,
    setMenuAberto,
    exercicio,
    adcionar
}: MenuPlayerProps) => {

    const opcoesExercicio = [
        {
            nome: 'adcionar a treino',
            tipo: 'link',
            icone: PlusCircle
        }
    ]

    return (
        <AnimatePresence>
            {menuAberto && (
                <>
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 backdrop-blur-xs z-10000"
                        onClick={() => setMenuAberto(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />

                    <motion.div
                        key="modal"
                        className="fixed top-1/2 left-0 w-full h-1/2 z-10000 backdrop-blur-xs"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        <CardHorizontal className="h-full">
                            <div className="flex flex-col gap-4">

                                <div className="flex gap-2 item-center">
                                    <div className="size-10">
                                        <WrapperIcone tamanho="xl">
                                            <Dumbbell className="size-full" />
                                        </WrapperIcone>
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                        <Texto tipo="titulo" className="font-thin text-t-primaria">
                                            {exercicio.nome}
                                        </Texto>
                                        
                                    </div>
                                </div>

                                {/* opções */}
                                {opcoesExercicio.map(opcao => (
                                    <OpcoesMenuPlayer
                                        key={opcao.nome}
                                        icone={opcao.icone}
                                        nome={opcao.nome}
                                    />
                                ))}

                            </div>
                        </CardHorizontal>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default MenuPlayer