import { Dumbbell, Plus, PlusCircle, Trash } from "lucide-react"
import { AnimatePresence, motion, PanInfo } from "motion/react"
import useExecutarTreinoContext from "../../../../contextos/ExecutarTreinoContexto"
import CardHorizontal from "../../../CardHorizontal"
import Texto from "../../../organizacao/Texto"
import WrapperIcone from "../../../organizacao/WrapperIcone"
import OpcoesMenuPlayer from "../../../organizacao/opcoesMenuPlayer"
import { Dispatch, SetStateAction } from "react"
import { ResExercicioProps } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio"
import BotaoPrimario from "../../../botoes/BotaoPrimario"
import { ResTreinoProps } from "../../../../logicas/dashboard/treinos/treino/TreinoProps"
import useDeleteTreino from "../../../../logicas/dashboard/treinos/treino/DeleteTreino"

type MenuTreinoProps = {
    menuAberto: boolean
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    treino: ResTreinoProps
}

const MenuTreino = ({
    treino,
    menuAberto,
    setMenuAberto
}: MenuTreinoProps) => {

    function aoSoltarArrasto(_: any, info: PanInfo) {
        const arrastouBastante = info.offset.y > 100
        const arrastouRapido = info.velocity.y > 500

        if (arrastouBastante || arrastouRapido) {
            setMenuAberto(false)
        }
    }

    const {
        deletarTreino
    } = useDeleteTreino(treino.id)

    const opcoes = [
        {
            titulo: 'Deletar Treino',
            icone: Trash,
            corIcone: 'text-red-600',
            tipo: 'botao' as 'link' | 'botao',
            onclick: () => deletarTreino()
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
                        drag="y"
                        dragDirectionLock
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={aoSoltarArrasto}
                    >
                        <CardHorizontal className="h-full">
                            <div className="flex flex-col gap-4">

                                <div className="w-10 h-1 rounded-full bg-t-terciaria/50 mx-auto mt-2" />

                                {/* opcoes */}

                                {opcoes.map(opcao => (
                                    <OpcoesMenuPlayer 
                                        nome={opcao.titulo}
                                        tipo={opcao.tipo}
                                        onclick={opcao.onclick}
                                        icone={opcao.icone}
                                        corIcone={opcao.corIcone}
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

export default MenuTreino