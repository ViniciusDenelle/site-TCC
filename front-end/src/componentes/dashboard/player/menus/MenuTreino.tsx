import { Cog, Dumbbell, Plus, PlusCircle, Trash } from "lucide-react"
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

    const opcoesBotao = [
        {
            titulo: 'Deletar Treino',
            icone: Trash,
            corIcone: 'text-red-600',
            onclick: () => deletarTreino()
        },
        
    ]

    const opcoesLink = [
        {
            titulo: 'Atualizar treino',
            icone: Cog,
            to:  `atualizarTreino/${treino.id}`,
            corIcone: 'text-blue-500'
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

                    {opcoesBotao.map(opcao => (
                        <OpcoesMenuPlayer
                            nome={opcao.titulo}
                            onclick={opcao.onclick}
                            icone={opcao.icone}
                            corIcone={opcao.corIcone}
                        />
                    ))}

                    {opcoesLink.map(opcao => (
                        <OpcoesMenuPlayer
                            nome={opcao.titulo}
                            to={opcao.to}
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