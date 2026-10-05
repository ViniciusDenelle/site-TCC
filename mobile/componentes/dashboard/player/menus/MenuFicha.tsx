import { Plus, Settings, Trash } from "lucide-react-native"
import Texto from "../../../organizacao/Texto"
import OpcoesMenuPlayer from "../../../organizacao/opcoesMenuPlayer"
import { Dispatch, SetStateAction } from "react"
import BotaoPrimario from "../../../botoes/BotaoPrimario"
import MenuLayout from "./MenuLayout"
import { Ficha } from "../../../../logicas/dashboard/treinos/fichas/FichaProps"
import useDeleteFicha from "../../../../logicas/dashBoard/fichas/DeleteFicha"

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
        deleteFichaHandler: deletarFicha
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
        menuAberto ? (
            <MenuLayout
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
            >   
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
        ) : null
    )
}

export default MenuFicha