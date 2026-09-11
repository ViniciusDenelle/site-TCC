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
import MenuLayout from "./MenuLayout"

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
                <MenuLayout
                    menuAberto={menuAberto}
                    setMenuAberto={setMenuAberto}
                >   
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
                </MenuLayout>

            )}
        </AnimatePresence>
    )
}

export default MenuTreino