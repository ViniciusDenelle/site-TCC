import { Cog, Dumbbell, Plus, PlusCircle, Settings, Trash } from "lucide-react"
import { AnimatePresence, motion, PanInfo } from "motion/react"
import CardHorizontal from "../../../CardHorizontal"
import Texto from "../../../organizacao/Texto"
import WrapperIcone from "../../../organizacao/WrapperIcone"
import OpcoesMenuPlayer from "../../../organizacao/opcoesMenuPlayer"
import { Dispatch, SetStateAction } from "react"
import BotaoPrimario from "../../../botoes/BotaoPrimario"
import { ResTreinoProps } from "../../../../logicas/dashboard/treinos/treino/TreinoProps"
import useDeleteTreino from "../../../../logicas/dashboard/treinos/treino/DeleteTreino"
import MenuLayout from "./MenuLayout"
import BotaoTerciario from "../../../botoes/BotaoTerciario"
import useDeleteFicha from "../../../../logicas/dashboard/treinos/fichas/DeleteFicha"
import Dieta from "../../../../logicas/dashboard/dieta/DietaProps"
import useAdicionarDieta from "../../../../logicas/dashboard/dieta/dieta/AdcionarDieta"

type MenuDietaProps = {
    menuAberto: boolean
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    dieta: Dieta
}

const MenuDieta = ({
    dieta,
    menuAberto,
    setMenuAberto,
}: MenuDietaProps) => {

    const {
        mutate
    } = useAdicionarDieta()

    const opcoesBotao = [
        {
            titulo: 'Deletar dieta',
            icone: Trash,
            corIcone: 'text-red-600',
            onclick: () => console.log('deletar')
        },
        {
            titulo: 'Adcionar a biblioteca',
            icone: Plus,
            corIcone: 'text-destaque-s-claro',
            onclick: () => mutate(dieta.id)
        },
        
    ]

    const opcoesLink = [
        {
            titulo: 'Editar dieta',
            icone: Settings,
            to:  `/dashboard/treino/editarDieta/${dieta.id}`,
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

                    <Texto tipo="titulo" className="font-thin text-t-primaria">
                        {dieta?.nome}
                    </Texto>

                    {opcoesBotao.map(opcao => (
                        <OpcoesMenuPlayer
                            key={opcao.titulo}
                            nome={opcao.titulo}
                            onclick={opcao.onclick}
                            icone={opcao.icone}
                            corIcone={opcao.corIcone}
                        />
                    ))}

                    {opcoesLink.map(opcao => (
                        <OpcoesMenuPlayer
                            key={opcao.titulo}
                            nome={opcao.titulo}
                            to={opcao.to}
                            icone={opcao.icone}
                            corIcone={opcao.corIcone}
                            tipo="link"
                        />
                    ))}
                </MenuLayout>

            )}
        </AnimatePresence>
    )
}

export default MenuDieta