import { Dumbbell, Plus, PlusCircle, Settings, Trash } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import useExecutarTreinoContext from "../../../../contextos/ExecutarTreinoContexto"
import CardHorizontal from "../../../CardHorizontal"
import Texto from "../../../organizacao/Texto"
import WrapperIcone from "../../../organizacao/WrapperIcone"
import OpcoesMenuPlayer from "../../../organizacao/opcoesMenuPlayer"
import { Dispatch, SetStateAction, useMemo } from "react"
import { ResExercicioProps } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio"
import BotaoPrimario from "../../../botoes/BotaoPrimario"
import MenuLayout from "./MenuLayout"
import useDeleteExercicio from "../../../../logicas/dashboard/treinos/exercicios/DeleteExercicio"
import useFetchUsuario from "../../../../logicas/usuario/FetchUsuario"
import useAdcionarExercicio from "../../../../logicas/dashboard/treinos/exercicios/AdcionarExercicio"

type MenuPlayerProps = {
    menuAberto: boolean,
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    exercicio: ResExercicioProps
    adcionar?: (exercicio: ResExercicioProps) => void
}

const MenuPlayer = ({
    menuAberto,
    setMenuAberto,
    exercicio,
    adcionar
}: MenuPlayerProps) => {

    const {
        deletarExercicio
    } = useDeleteExercicio(exercicio.id)

    const {
        AdcionarExercicio
    } = useAdcionarExercicio(exercicio.id)

    const opcoesLink = [
        {
            nome: 'Atualizar exercicio',
            icone: Settings,
            to: '/dashboard/treino/editarExercicio/' + exercicio?.id,
            corIcone: 'text-blue-500',
            publico: false
        },
        {
            nome: 'Adcionar a treino já existente',
            tipo: 'link',
            icone: PlusCircle,
            publico: true
        },
    ]

    const opcoesBotao = [
        {
            nome: 'Remover Exercicio',
            icone: Trash,
            tipo: 'botao',
            onclick: () => deletarExercicio(),
            corIcone: 'text-red-600',
            publico: false
        },
        {
            nome: 'Adcionar à biblioteca',
            icone: Plus,
            tipo: 'botao',
            onclick: () => AdcionarExercicio(),
            publico: true
        },
    ]

    const {
        dadosUsuario
    } = useFetchUsuario()

    const ExercicioProrio = useMemo(() => {
        return exercicio.criador.id === dadosUsuario.id
    }, [])

    return (
        <AnimatePresence>
            {menuAberto && (
                <MenuLayout
                    menuAberto={menuAberto}
                    setMenuAberto={setMenuAberto}
                >
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
                    {adcionar && (
                        <BotaoPrimario
                            icone={Plus}
                            texto="Adcionar a este treino"
                            tipo="vazio"
                            classeAdicional="gap-4"
                            tipoFonte="titulo"
                            tamanhoIcone="lg"
                            textoClassName="font-thin"
                            onClick={() => {
                                adcionar(exercicio)
                                setMenuAberto(false)
                            }}
                        />
                    )}
                    {opcoesBotao.map(opcao => (
                        !opcao.publico ? (
                            ExercicioProrio && (
                                <OpcoesMenuPlayer
                                    tipo="botao"
                                    nome={opcao.nome}
                                    onclick={opcao.onclick}
                                    corIcone={opcao.corIcone}
                                    icone={opcao.icone}
                                />
                            )
                        ) : (
                            <OpcoesMenuPlayer
                                tipo="botao"
                                nome={opcao.nome}
                                onclick={opcao.onclick}
                                corIcone={opcao.corIcone}
                                icone={opcao.icone}
                            />
                        )
                    ))}


                    {opcoesLink.map(opcao => (
                        !opcao.publico ? (
                            ExercicioProrio && (
                                <OpcoesMenuPlayer
                                    key={opcao.nome}
                                    to={opcao.to}
                                    icone={opcao.icone}
                                    nome={opcao.nome}
                                    tipo="link"
                                    corIcone={opcao.corIcone ?? ''}
                                />
                            )
                        ) : (
                            <OpcoesMenuPlayer
                                key={opcao.nome}
                                to={opcao.to}
                                icone={opcao.icone}
                                nome={opcao.nome}
                                tipo="link"
                                corIcone={opcao.corIcone ?? ''}
                            />
                        )
                    ))}

                </MenuLayout>
            )}
        </AnimatePresence>
    )
}

export default MenuPlayer