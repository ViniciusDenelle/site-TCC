// components/treino/ExercicioSelecionadoCard.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BotaoTerciario from './botoes/BotaoTerciario';
import Texto from './organizacao/Texto';
import CardHorizontal from './CardHorizontal';
import InputSimples from './inputs/InputSimples';
import { MetadadoExercicio, TipoExecucao } from '../logicas/dashboard/treinos/treino/TreinoProps';

interface ExercicioSelecionadoCardProps {
    id: number;
    nome: string;
    metadado: MetadadoExercicio;
    onAtualizarMetadado: (campo: keyof MetadadoExercicio, valor: number | string) => void;
    onAlternarTipoExecucao: (tipo: TipoExecucao) => void;
}

const ExercicioSelecionadoCard = ({
    id,
    nome,
    metadado,
    onAtualizarMetadado,
    onAlternarTipoExecucao,
}: ExercicioSelecionadoCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const [expandido, setExpandido] = useState(false)

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='overflow-x-hidden'
        >
            <CardHorizontal>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Texto tipo="subtitulo">{nome}</Texto>

                        <div className="flex gap-2">

                            <BotaoTerciario
                                icone={ChevronDown}
                                tamanhoIcone="lg"
                                onClick={() => setExpandido(prev => !prev)}
                                classeAdicional={`transition-transform ${expandido ? 'rotate-180' : ''}`}
                            />

                            <button
                                type="button"
                                className="cursor-grab active:cursor-grabbing p-1 touch-none"
                                {...attributes}
                                {...listeners}
                            >
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-12a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {expandido && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col gap-3 pt-3">

                                    <div className="flex gap-2">
                                        <div className="flex flex-col w-1/3">
                                            <Texto tipo="subtexto" className="opacity-60 mb-1">Séries</Texto>
                                            <InputSimples
                                                tipo="number"
                                                valor={String(metadado.sets)}
                                                onChange={e => onAtualizarMetadado('sets', Number(e.target.value))}
                                                classeAdicional='w-full'
                                            />
                                        </div>

                                        <div>
                                            <Texto tipo="subtexto" className="opacity-60 mb-1">Tipo</Texto>
                                            <div className="flex gap-2">
                                                <BotaoTerciario
                                                    texto="Repetições"
                                                    onClick={() => onAlternarTipoExecucao('repeticoes')}
                                                    classeAdicional={metadado.tipo_execucao === 'repeticoes' ? 'border-primaria bg-primaria/10' : ''}
                                                />
                                                <BotaoTerciario
                                                    texto="Tempo"
                                                    onClick={() => onAlternarTipoExecucao('tempo')}
                                                    classeAdicional={metadado.tipo_execucao === 'tempo' ? 'border-primaria bg-primaria/10' : ''}
                                                />
                                            </div>
                                        </div>

                                        {metadado.tipo_execucao === 'repeticoes' ? (
                                            <div>
                                                <Texto tipo="subtexto" className="opacity-60 mb-1">Repetições</Texto>
                                                <div className="flex items-center gap-2">
                                                    <InputSimples tipo="number" valor={metadado.repeticoes_minimas ?? ''} onChange={e => onAtualizarMetadado('repeticoes_minimas', Number(e.target.value))} />
                                                    <Texto className="opacity-50">até</Texto>
                                                    <InputSimples tipo="number" valor={metadado.repeticoes_maximas ?? ''} onChange={e => onAtualizarMetadado('repeticoes_maximas', Number(e.target.value))} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <Texto tipo="subtexto" className="opacity-60 mb-1">Duração (segundos)</Texto>
                                                <InputSimples tipo="number" valor={metadado.duracao_segundos ?? ''} onChange={e => onAtualizarMetadado('duracao_segundos', Number(e.target.value))} />
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex gap-2'>
                                        <div className="flex flex-col w-1/2">
                                            <Texto tipo="subtexto" className="opacity-60 mb-1">Peso (kg)</Texto>
                                            <InputSimples
                                                tipo="number"
                                                valor={String(metadado.peso)}
                                                onChange={e => onAtualizarMetadado('peso', Number(e.target.value))}
                                                classeAdicional='w-full'
                                            />
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <Texto tipo="subtexto" className="opacity-60 mb-1">Descanso (s)</Texto>
                                            <InputSimples
                                                tipo="number"
                                                valor={String(metadado.descanso)}
                                                onChange={e => onAtualizarMetadado('descanso', Number(e.target.value))}
                                                classeAdicional='w-full'
                                            />
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </CardHorizontal>
        </div>
    );
}

export default ExercicioSelecionadoCard