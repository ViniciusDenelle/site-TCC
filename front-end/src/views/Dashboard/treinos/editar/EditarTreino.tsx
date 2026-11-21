import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, ImagePlus, RefreshCcw } from "lucide-react";
import { AxiosError } from "axios";
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

import Texto from "../../../../componentes/organizacao/Texto";
import CardHorizontal from "../../../../componentes/CardHorizontal";
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone";
import InputSimples from "../../../../componentes/inputs/InputSimples";
import InputTextarea from "../../../../componentes/inputs/InputTextarea";
import SecaoBadges from "../../../../componentes/SecaoBadges";
import ExercicioSelecionadoCard from "../../../../componentes/ExercicioSelecionadoCard";
import PesquisarExercicios from "../pesquisar/PesquisarExercicios";
import BotaoPrimario from "../../../../componentes/botoes/BotaoPrimario";

import useFetchBadgesCompartilhadas from "../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas";
import useTreinoForm from "../../../../logicas/dashboard/treinos/treino/useTreinoForm";
import useShowTreino from "../../../../logicas/dashboard/treinos/treino/ShowTreino";
import { Badge } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio";
import { RespostaErroLaravel } from "../../../../logicas/dashboard/treinos/exercicios/exercicoProps";
import useUpdateTreino from "../../../../logicas/dashboard/treinos/treino/UpdateTreino";
import BotaoTerciario from "../../../../componentes/botoes/BotaoTerciario";
import InputImagem from "../../../../componentes/inputs/InputImagem";

const EditarTreino = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        treino,
        isPending: carregandoTreino,
        isError: erroTreino,
    } = useShowTreino(id);

    const {
        secoes,
        isSuccess: badgesCarregadas,
    } = useFetchBadgesCompartilhadas('treino');

    const {
        editarTreino,
        isPending,
        isError,
        error
    } = useUpdateTreino(id);

    const {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios,
        adicionarExercicio,
        atualizarMetadadoExercicio,
        alternarTipoExecucao,
        tipo,
        foco,
        montarPayload,
        popularFormulario,
        imagem,
        imagemAtual,
        trocarImagem
    } = useTreinoForm();

    // Popula o formulário automaticamente quando o treino é carregado da API
    useEffect(() => {
        if (treino) {
            popularFormulario(treino);
        }
    }, [treino?.id]);

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

    const limiteItems = 6;
    const erros = isError ? ((error as AxiosError<RespostaErroLaravel>).response?.data.errors ?? {}) : {};

    if (carregandoTreino) {
        return <Texto className="animate-pulse">Carregando dados do treino...</Texto>;
    }

    if (erroTreino || !treino) {
        return <Texto>Treino não encontrado.</Texto>;
    }

    const handleSalvar = () => {
        editarTreino(montarPayload());
    };

    console.log(montarPayload());

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col h-full gap-2 divide-base-terciaria">

                    <BotaoTerciario
                        onClick={() => popularFormulario(treino)}
                        icone={RefreshCcw}
                        classeAdicional="ml-auto"
                    />

                    <div className="w-full md:w-6/10 mx-auto">
                        <InputImagem 
                            valor={imagem}
                            urlAtual={imagemAtual}
                            onChange={trocarImagem}
                            placeholder="adicione uma imagem do treino"
                        />
                    </div>

                    <Texto tipo="titulo" className="font-thin">
                        Nome do Treino
                    </Texto>

                    <div className="flex flex-col">
                        <InputSimples
                            tipo="text"
                            valor={nome}
                            onChange={ev => setNome(ev.target.value)}
                            placeholder="Nome do treino"
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
                        {erros.descricao?.[0] && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.descricao?.[0]}
                            </Texto>
                        )}
                    </div>

                    {!badgesCarregadas ? (
                        <Texto className="animate-pulse">Carregando categorias...</Texto>
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
                                    Exercícios Selecionados
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
                            <Texto>Nenhum exercício selecionado</Texto>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Texto tipo="titulo" className="font-thin">
                            Adicionar Exercícios
                        </Texto>

                        <PesquisarExercicios
                            adcionarExercicio={adicionarExercicio}
                        />
                    </div>

                    <BotaoPrimario
                        texto={isPending ? "Salvando..." : "Salvar Alterações"}
                        icone={Plus}
                        onClick={handleSalvar}
                        disabled={isPending}
                    />

                </div>
            </div>
        </div>
    );
};

export default EditarTreino;