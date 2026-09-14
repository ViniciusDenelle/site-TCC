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
import { Ficha } from "../../../../logicas/dashboard/treinos/fichas/FichaProps"
import useDeleteFicha from "../../../../logicas/dashboard/treinos/fichas/DeleteFicha"

type MenuFichaProps = {
    menuAberto: boolean
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    ficha: Ficha
    adicionar?: (ficha:Ficha) => void 
}

const MenuFicha = ({
    ficha,
    menuAberto,
    setMenuAberto,
    adicionar
}: MenuFichaProps) => {


    const {
        deletarFicha
    } = useDeleteFicha(ficha.id)

    const opcoesBotao = [
        {
            titulo: 'Deletar Ficha',
            icone: Trash,
            corIcone: 'text-red-600',
            onclick: () => deletarFicha()
        },
        
    ]

    const opcoesLink = [
        {
            titulo: 'Editar ficha',
            icone: Settings,
            to:  `/dashboard/treino/editarFicha/${ficha.id}`,
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
                        {ficha?.nome}
                    </Texto>

                    {adicionar && (
                        <BotaoPrimario 
                            icone={Plus}
                            texto="Adcionar a Ficha"
                            onClick={() => adicionar(ficha)}
                            tipo="vazio"
                        />
                    )}

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

export default MenuFicha