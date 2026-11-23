import { Dispatch, SetStateAction, useState } from "react"
import { Check, Eye, Pencil, Plus, Trash, Trash2 } from "lucide-react"
import Texto from "../../../organizacao/Texto"
import OpcoesMenuPlayer from "../../../organizacao/opcoesMenuPlayer"
import Dieta from "../../../../logicas/dashboard/dieta/DietaProps"
import MenuLayout from "./MenuLayout"

type MenuDietaProps = {
    menuAberto: boolean
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    dieta: Dieta
    podeEditar?: boolean
    adicionar?: (dieta: Dieta) => void | Promise<void>
    remover?: (dieta: Dieta) => void | Promise<void>
    deletar?: (dieta: Dieta) => void | Promise<void>
}

type Acao = 'adicionar' | 'remover' | 'deletar'
type Status = 'parado' | 'carregando' | 'ok' | 'erro'

const MenuDieta = ({
    menuAberto,
    setMenuAberto,
    dieta,
    podeEditar = false,
    adicionar,
    remover,
    deletar
}: MenuDietaProps) => {

    const [acao, setAcao] = useState<Acao | null>(null)
    const [status, setStatus] = useState<Status>('parado')

    const executar = async (
        qual: Acao,
        funcao: (dieta: Dieta) => void | Promise<void>
    ) => {
        if (status === 'carregando') return

        setAcao(qual)
        setStatus('carregando')

        try {
            await funcao(dieta)
            setStatus('ok')

            setTimeout(() => {
                setMenuAberto(false)
                setStatus('parado')
                setAcao(null)
            }, 900)
        } catch {
            setStatus('erro')
        }
    }

    const textoAdicionar =
        acao === 'adicionar' && status === 'carregando' ? 'Salvando...'
            : acao === 'adicionar' && status === 'ok' ? 'Dieta salva!'
                : 'Adicionar às minhas dietas'

    const textoRemover =
        acao === 'remover' && status === 'carregando' ? 'Removendo...'
            : acao === 'remover' && status === 'ok' ? 'Dieta removida!'
                : 'Remover das minhas dietas'

    const textoDeletar =
        acao === 'deletar' && status === 'carregando' ? 'Excluindo...'
            : acao === 'deletar' && status === 'ok' ? 'Dieta excluída!'
                : 'Excluir dieta'

    return (
        <MenuLayout
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
        >
            <Texto tipo="titulo" className="font-thin text-t-primaria">
                {dieta?.nome}
            </Texto>

            <OpcoesMenuPlayer
                tipo="link"
                to={`/dashboard/dieta/verDieta/${dieta.id}`}
                nome="Ver dieta"
                icone={Eye}
                corIcone="text-blue-500"
            />

            {podeEditar && (
                <OpcoesMenuPlayer
                    tipo="link"
                    to={`/dashboard/dieta/editarDieta/${dieta.id}`}
                    nome="Modificar dieta"
                    icone={Pencil}
                    corIcone="text-amber-500"
                />
            )}

            {adicionar && (
                <OpcoesMenuPlayer
                    nome={textoAdicionar}
                    icone={acao === 'adicionar' && status === 'ok' ? Check : Plus}
                    corIcone="text-destaque-p-medio"
                    onclick={() => executar('adicionar', adicionar)}
                />
            )}

            {remover && (
                <OpcoesMenuPlayer
                    nome={textoRemover}
                    icone={acao === 'remover' && status === 'ok' ? Check : Trash}
                    corIcone="text-red-600"
                    onclick={() => executar('remover', remover)}
                />
            )}

            {/* Só quem criou a dieta pode excluí-la */}
            {podeEditar && deletar && (
                <OpcoesMenuPlayer
                    nome={textoDeletar}
                    icone={acao === 'deletar' && status === 'ok' ? Check : Trash2}
                    corIcone="text-red-600"
                    onclick={() => executar('deletar', deletar)}
                />
            )}

            {status === 'erro' && (
                <Texto tipo="subtexto" className="text-red-400">
                    Não foi possível concluir. Tente de novo.
                </Texto>
            )}
        </MenuLayout>
    )
}

export default MenuDieta