import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { ImagePlus, RotateCcw, Save } from "lucide-react"

import CardHorizontal from "../../../../componentes/CardHorizontal"
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone"
import Texto from "../../../../componentes/organizacao/Texto"
import InputSimples from "../../../../componentes/inputs/InputSimples"
import InputTextarea from "../../../../componentes/inputs/InputTextarea"
import BotaoPrimario from "../../../../componentes/botoes/BotaoPrimario"
import SecaoBadges from "../../../../componentes/SecaoBadges"

import useFetchBadgesCompartilhadas from "../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas"
import useExercicioForm from "../../../../logicas/dashboard/treinos/exercicios/useExercicioForm"
import { Badge } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio"
import { ErrosValidacao, ResBadges, RespostaErroLaravel } from "../../../../logicas/dashboard/treinos/exercicios/exercicoProps"
import useShowExercicio from "../../../../logicas/dashboard/treinos/exercicios/ShowExercicio"
import useUpdateExercicio from "../../../../logicas/dashboard/treinos/exercicios/UpdateExercicio"
import { AxiosError } from "axios"
import BotaoTerciario from "../../../../componentes/botoes/BotaoTerciario"

const EditarExercicio = () => {
    const { id } = useParams<{ id: string }>()

    // Busca dados do exercício pelo ID da rota
    const { 
        exercicio, 
        isPending: carregandoExercicio, 
        isSuccess: exercicioCarregado 
    } = useShowExercicio(id || '')

    // Busca as seções de badges disponíveis
    const { 
        secoes, 
        isSuccess: badgesCarregadas 
    } = useFetchBadgesCompartilhadas('exercicio')

    // Gerenciador de estado do formulário
    const {
        nome,
        setNome,
        descricao,
        setDescricao,
        tipo,
        nivel,
        foco,
        equipamentos,
        musculos,
        montarPayload,
        preencherFormulario
    } = useExercicioForm()

    // Preenche o formulário quando os dados do exercício terminarem de carregar
    useEffect(() => {
        if (exercicioCarregado && exercicio) {
            preencherFormulario(exercicio)
        }
    }, [exercicioCarregado, exercicio])

    // Hook de atualização
    const { 
        editarExercicio, 
        isError, 
        error, 
        isPending 
    } = useUpdateExercicio(id || '')

    const erros = isError ? ((error as AxiosError<RespostaErroLaravel>).response?.data.errors ?? {}) : {}

    const comportamentoPorTipo: Record<string, { isSelecionado: (id: number) => boolean; onToggle: (item: Badge) => void }> = {
        musculos: {
            isSelecionado: musculos.isSelecionado,
            onToggle: (item) => musculos.toggle(item, 1)
        },
        equipamentos: {
            isSelecionado: equipamentos.isSelecionado,
            onToggle: equipamentos.toggle
        },
        niveis: {
            isSelecionado: nivel.isSelecionado,
            onToggle: nivel.selecionar
        },
        focos: {
            isSelecionado: foco.isSelecionado,
            onToggle: foco.selecionar
        },
        tipos: {
            isSelecionado: tipo.isSelecionado,
            onToggle: tipo.selecionar
        },
    }

    const chaveErroPorTipo: Record<keyof ResBadges, keyof ErrosValidacao> = {
        tipos: 'tipo_id',
        niveis: 'nivel_id',
        focos: 'foco_id',
        musculos: 'musculos',
        equipamentos: 'equipamentos',
    }

    const limiteItems = 6

    if (carregandoExercicio) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Texto className="animate-pulse">Carregando dados do exercício...</Texto>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col h-full gap-2 divide-base-terciaria">

                    <BotaoTerciario 
                        icone={RotateCcw}
                        classeAdicional="ml-auto"
                        onClick={() => preencherFormulario(exercicio)}
                    />

                    <Texto tipo="titulo" className="font-thin">
                        Editar imagem
                    </Texto>
                    <CardHorizontal>
                        <div className="flex items-center justify-center h-20">
                            <WrapperIcone>
                                <ImagePlus className="size-full" />
                            </WrapperIcone>
                        </div>
                    </CardHorizontal>

                    <Texto tipo="titulo" className="font-thin">
                        Nome do exercício
                    </Texto>

                    <div className="flex flex-col">
                        <InputSimples
                            tipo="text"
                            valor={nome}
                            onChange={ev => setNome(ev.target.value)}
                            placeholder="Nome do exercício"
                        />
                        {erros.nome && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.nome?.[0]}
                            </Texto>
                        )}
                    </div>

                    <Texto tipo="titulo" className="font-thin">
                        Descrição
                    </Texto>
                    
                    <div className="flex flex-col">
                        <InputTextarea
                            valor={descricao}
                            onChange={ev => setDescricao(ev.target.value)}
                            classeAdicional="h-20"
                            placeholder="Descrição é opcional"
                        />
                        {erros.descricao && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.descricao?.[0]}
                            </Texto>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {!badgesCarregadas ? (
                            <Texto className="animate-pulse">Carregando filtros...</Texto>
                        ) : secoes.map(secao => (
                            <SecaoBadges
                                limiteItems={limiteItems}
                                key={secao.tipo}
                                titulo={secao.titulo}
                                itens={secao.dados}
                                error={erros[chaveErroPorTipo[secao.tipo]]?.[0]}
                                {...comportamentoPorTipo[secao.tipo]}
                            />
                        ))}
                    </div>

                    <BotaoPrimario
                        texto={isPending ? "Salvando..." : "Salvar Alterações"}
                        icone={Save}
                        onClick={() => editarExercicio(montarPayload())}
                    />

                </div>
            </div>
        </div>
    )
}

export default EditarExercicio