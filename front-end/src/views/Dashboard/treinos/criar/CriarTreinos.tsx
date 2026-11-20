import { ArrowDownAZ, ChevronDown, Image, ImagePlus, Minus, Plus } from "lucide-react"
import CardHorizontal from "../../../../componentes/CardHorizontal"
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone"
import Texto from "../../../../componentes/organizacao/Texto"
import InputSimples from "../../../../componentes/inputs/InputSimples"
import InputTextarea from "../../../../componentes/inputs/InputTextarea"
import useFetchBadgesCompartilhadas from "../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas"
import React, { useState } from "react"
import BotaoTerciario from "../../../../componentes/botoes/BotaoTerciario"
import useExercicioForm from "../../../../logicas/dashboard/treinos/exercicios/useExercicioForm"
import { Badge } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio"
import BotaoPrimario from "../../../../componentes/botoes/BotaoPrimario"
import useCriarExercicio from "../../../../logicas/dashboard/treinos/exercicios/CriarExercicio"
import useFetchBadge from "../../../../logicas/dashboard/treinos/FetchBadge"
import { ErrosValidacao, ResBadges, RespostaErroLaravel } from "../../../../logicas/dashboard/treinos/exercicios/exercicoProps"
import { AxiosError } from "axios"
import useTreinoForm from "../../../../logicas/dashboard/treinos/treino/useTreinoForm"
import Exercicios from "../Exercicios"
import PesquisarExercicios from "../pesquisar/PesquisarExercicios"
import ExercicioSelecionadoCard from "../../../../componentes/ExercicioSelecionadoCard"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from "../../../../componentes/organizacao/SortableItem"
import SecaoBadges from "../../../../componentes/SecaoBadges"
import useCriarTreino from "../../../../logicas/dashboard/treinos/treino/CriarTreino"
import InputImagem from "../../../../componentes/inputs/InputImagem"


const CriarTreinos = () => {

    const {
        secoes,
        isPending,
        isSuccess,
    } = useFetchBadgesCompartilhadas('treino')

    const {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios,
        adicionarExercicio,
        atualizarMetadadoExercicio,
        alternarTipoExecucao, // <- isso precisa estar aqui
        tipo,
        foco,
        montarPayload,
        popularFormulario,
        imagem,
        imagemAtual,
        trocarImagem, 
    } = useTreinoForm();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = exercicios.selecionados.findIndex(e => e.id === active.id);
            const newIndex = exercicios.selecionados.findIndex(e => e.id === over.id);

            exercicios.reordenar(oldIndex, newIndex);
        }
    }

    const comportamentoPorTipo: Record<string, { isSelecionado: (id: number) => boolean; onToggle: (item: Badge) => void }> = {
        focos: {
            isSelecionado: foco.isSelecionado,
            onToggle: foco.selecionar
        },
        tipos: {
            isSelecionado: tipo.isSelecionado,
            onToggle: tipo.selecionar
        },
    };

    const chaveErroPorTipo = {
        tipos: 'tipo_id',
        focos: 'foco_id',
    };

    const limiteItems = 6

    const {
        mutate,
        error,
        isError,
    } = useCriarTreino()

    const erros = isError ? ((error as AxiosError<RespostaErroLaravel>).response?.data.errors ?? {}) : {}

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col h-full gap-2 divide-base-terciaria">

                    <div className="w-full md:w-6/10 mx-auto">
                        <InputImagem 
                            valor={imagem}
                            urlAtual={imagemAtual}
                            onChange={trocarImagem}
                            placeholder="adicione uma imagem do treino"
                        />
                    </div>

                    <Texto tipo="titulo" className="font-thin">
                        nome do Treino
                    </Texto>

                    <div className="flex flex-col">
                        <InputSimples
                            tipo="text"
                            valor={nome}
                            onChange={ev => setNome(ev.target.value)}
                            placeholder="nome do treino"

                        />
                        {/* {erros.nome && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.nome?.[0]}
                            </Texto>
                        )} */}
                    </div>

                    <Texto tipo="titulo" className="font-thin">
                        Descrição
                    </Texto>

                    <div className="flex flex-col">
                        <InputTextarea
                            valor={descricao}
                            onChange={ev => setDescricao(ev.target.value)}
                            classeAdicional="h-20"
                            placeholder="descrição é opcional"
                        />
                        {/* {erros.descricao && (
                                <Texto tipo="subtexto" className="text-red-500">
                                    *{erros.descricao?.[0]}
                                </Texto>
                            )} */}

                    </div>

                    {!isSuccess ? (
                        <Texto className="animate-pulse">procurando filtros</Texto>
                    ) : secoes.map(secao => (
                        secao.dados && (
                            <SecaoBadges
                                limiteItems={limiteItems}
                                key={secao.tipo}
                                titulo={secao.titulo}
                                itens={secao.dados}
                                error={erros[chaveErroPorTipo[secao.tipo]]?.[0] ?? []}
                                {...comportamentoPorTipo[secao.tipo]}
                            />
                        )
                    ))}

                    <div className="flex flex-col gap-2 overflow-x-hidden">
                        {exercicios?.selecionados.length > 0 ? (
                            <>
                                <Texto tipo="titulo" className="font-thin">
                                    Exercicios Selecionados
                                </Texto>

                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={exercicios.selecionados.map(e => e.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="overflow-hidden flex flex-col gap-2">
                                            {exercicios.selecionados.map(exercicio => (
                                                <ExercicioSelecionadoCard
                                                    key={exercicio.id}
                                                    id={exercicio.id}
                                                    nome={exercicio.nome}
                                                    onAtualizarMetadado={(campo, valor) =>
                                                        atualizarMetadadoExercicio(exercicio.id, campo, valor)
                                                    }
                                                    onAlternarTipoExecucao={(tipo) =>
                                                        alternarTipoExecucao(exercicio.id, tipo)
                                                    }
                                                    metadado={exercicio.metadado}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </>
                        ) : (
                            <Texto>
                                nenhum exercicios adcionado
                            </Texto>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">

                        <Texto tipo="titulo" className="font-thin">
                            Adcionar exercicios
                        </Texto>

                        <PesquisarExercicios
                            adcionarExercicio={adicionarExercicio}
                        />

                    </div>


                    <BotaoPrimario
                        texto="salvar"
                        icone={Plus}
                        onClick={() => mutate(montarPayload())}
                    />

                </div>
            </div>
        </div>
    )
}

export default CriarTreinos