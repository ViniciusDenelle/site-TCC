import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, RotateCcw, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    DndContext,
    useDraggable,
    useDroppable,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import Texto from '../../../../componentes/organizacao/Texto';
import InputSimples from '../../../../componentes/inputs/InputSimples';
import InputTextarea from '../../../../componentes/inputs/InputTextarea';
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario';
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario';
import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario';
import PesquisarTreinos from '../pesquisar/PesquisarTreino';
import useFichaTreinoForm from '../../../../logicas/dashboard/treinos/fichas/useFichaTreinoForm';
import useShowFicha from '../../../../logicas/dashboard/treinos/fichas/ShowFicha';
import useUpdateFicha from '../../../../logicas/dashboard/treinos/fichas/UpdateFicha';
import DiaDropzone from '../../../../componentes/dashboard/treino/DIaDropzone';
import TreinoArrastavel from '../../../../componentes/dashboard/treino/TreinoArrastavel';
import { nomesDias } from '../../../../logicas/dashboard/treinos/fichas/nomesDias';

const EditarFicha = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { 
        ficha, 
        isPending: isPendingFicha, 
        isError: isErrorFicha 
    } = useShowFicha(id);

    const {
        nome, setNome,
        descricao, setDescricao,
        divisoes, adicionarDivisao, removerDivisao,
        treinosPorDivisao, atualizarTreinosDaDivisao,
        dias, definirTreinoNoDia, diasDaSemana,
        todosOsTreinosSelecionados,
        montarPayload,
        preencherFormulario,
    } = useFichaTreinoForm();

    const [hidratado, setHidratado] = useState(false);

    useEffect(() => {
        if (ficha && !hidratado) {
            preencherFormulario(ficha);
            setHidratado(true);
        }
    }, [ficha, hidratado]);

    const [nomeNovaDivisao, setNomeNovaDivisao] = useState('');
    const [divisaoBuscandoTreino, setDivisaoBuscandoTreino] = useState<string | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    function handleAdicionarDivisao() {
        if (!nomeNovaDivisao.trim()) return;
        adicionarDivisao(nomeNovaDivisao.trim());
        setNomeNovaDivisao('');
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const treinoId = active.data.current?.treinoId as number | undefined;
        const dia = over.data.current?.dia as string | undefined;

        if (treinoId != null && dia) {
            definirTreinoNoDia(dia as any, treinoId);
        }
    }

    function infoDoTreinoNoDia(dia: string) {
        const treinoId = dias[dia as keyof typeof dias];
        if (!treinoId) return { treinoNome: null, divisaoNome: null };

        for (const divisao of divisoes) {
            const treino = (treinosPorDivisao[divisao.id] ?? []).find(t => t.id === treinoId);
            if (treino) return { treinoNome: treino.nome, divisaoNome: divisao.nome };
        }
        return { treinoNome: null, divisaoNome: null };
    }

    const { editarFicha } = useUpdateFicha(Number(id));

    
    if (isPendingFicha) {
        return <Texto className="animate-pulse">carregando ficha...</Texto>;
    }

    if (isErrorFicha || !ficha) {
        return <Texto>Ficha não encontrada.</Texto>;
    }

    console.log(montarPayload())

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="min-h-screen w-full">
                <div className="container mx-auto flex flex-col gap-3">

                    <BotaoTerciario 
                        icone={RotateCcw}
                        classeAdicional='ml-auto'
                        onClick={() => preencherFormulario(ficha)}
                    />

                    <Texto tipo="titulo" className="font-thin">Nome da ficha</Texto>
                    <InputSimples tipo="text" valor={nome} onChange={e => setNome(e.target.value)} placeholder="nome da ficha" />

                    <Texto tipo="titulo" className="font-thin">Descrição</Texto>
                    <InputTextarea valor={descricao} onChange={e => setDescricao(e.target.value)} classeAdicional="h-20" placeholder="descrição é opcional" />

                    <Texto tipo="titulo" className="font-thin mt-2">Divisões</Texto>

                    <div className="flex">
                        <InputSimples
                            tipo="text"
                            valor={nomeNovaDivisao}
                            onChange={e => setNomeNovaDivisao(e.target.value)}
                            placeholder="ex: Superior, Push..."
                            classeAdicional='w-full rounded-r-none'
                        />
                        <BotaoSecundario icone={Plus} onClick={handleAdicionarDivisao} classeAdicional='rounded-l-none' tipo='cheio' />
                    </div>

                    {divisoes.map(divisao => (
                        <div className='w-full p-3 rounded-2xl bg-base-terciaria/70 shadow-md shadow-gray-900/20' key={divisao.id}>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Texto tipo="subtitulo">{divisao.nome}</Texto>
                                    <button onClick={() => removerDivisao(divisao.id)}>
                                        <X className="size-4 opacity-60" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {(treinosPorDivisao[divisao.id] ?? []).map(treino => (
                                        <TreinoArrastavel key={treino.id} id={treino.id} nome={treino.nome} idDivisao={divisao.id} />
                                    ))}
                                </div>

                                <BotaoTerciario
                                    texto="adicionar treino"
                                    icone={Plus}
                                    onClick={() => setDivisaoBuscandoTreino(divisao.id)}
                                    classeAdicional='flex items-center justify-center gap-2'
                                />

                                {divisaoBuscandoTreino === divisao.id && (
                                    <div className="mt-2">
                                        <PesquisarTreinos
                                            adicionarTreino={(treino) => {
                                                atualizarTreinosDaDivisao(divisao.id, [
                                                    ...(treinosPorDivisao[divisao.id] ?? []),
                                                    treino,
                                                ]);
                                                setDivisaoBuscandoTreino(null);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {divisoes.length > 0 && (
                        <>
                            <Texto tipo="titulo" className="font-thin mt-2">Calendário semanal</Texto>

                            <div className="flex flex-col gap-2">
                                {diasDaSemana.map(dia => {
                                    const { treinoNome, divisaoNome } = infoDoTreinoNoDia(dia);
                                    return (
                                        <DiaDropzone
                                            key={dia}
                                            dia={dia}
                                            label={nomesDias[dia]}
                                            treinoNome={treinoNome}
                                            divisaoNome={divisaoNome}
                                            onLimpar={() => definirTreinoNoDia(dia, null)}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    )}

                    <BotaoPrimario 
                        texto="salvar alterações" 
                        icone={Plus} 
                        onClick={() => editarFicha(montarPayload())} 
                    />

                </div>
            </div>
        </DndContext>
    );
};

export default EditarFicha;