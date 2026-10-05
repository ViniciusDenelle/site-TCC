import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import useFetchTreinoHistorico from '../../../logicas/dashboard/treinos/treino/FetchTreinoHistorico';
import Texto from '../../organizacao/Texto';
import CardHorizontal from '../../CardHorizontal';
import Paginacao from '../../outros/Paginacao';

function formatarData(iso: string) {
    return new Date(iso).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
}

const HistoricoTreino = () => {
    const { id } = useParams<{ id: string }>();
    const [pagina, setPagina] = useState(1);

    const { 
        historico, 
        isPending 
    } = useFetchTreinoHistorico(Number(id), pagina);

    if (isPending) {
        return <Texto className="animate-pulse">carregando histórico...</Texto>;
    }

    if (!historico || historico.data.length === 0) {
        return <Texto>Nenhuma sessão concluída ainda.</Texto>;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {historico.data.map(sessao => (
                <CardHorizontal key={sessao.id}>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Texto tipo="subtitulo">{formatarData(sessao.iniciado_em)}</Texto>
                            {sessao.duracao && (
                                <Texto tipo="subtexto" className="opacity-60">
                                    {Math.floor(sessao.duracao / 60)} min
                                </Texto>
                            )}
                        </div>

                        {sessao.exercicios.map(ex => (
                            <div key={ex.exercicio_treino_id} className="flex flex-col gap-1">
                                <Texto tipo="paragrafo" className="font-semibold">
                                    {ex.exercicio?.nome ?? 'Exercício removido'}
                                </Texto>

                                <div className="flex flex-col gap-0.5">
                                    {ex.series_executadas.map(serie => (
                                        <div key={serie.serie} className="flex items-center gap-2 text-xs">
                                            {serie.concluida ? (
                                                <Check className="size-3 text-verde" />
                                            ) : (
                                                <X className="size-3 text-erro" />
                                            )}
                                            <Texto tipo="subtexto">
                                                Série {serie.serie}: {serie.peso}kg x {serie.repeticoes} reps
                                            </Texto>
                                            <Texto tipo="subtexto" className="opacity-40">
                                                (alvo: {ex.planejado.peso}kg x {ex.planejado.repeticoes_minimas}-{ex.planejado.repeticoes_maximas})
                                            </Texto>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardHorizontal>
            ))}

            <Paginacao pagina={pagina} setPagina={setPagina} meta={historico.meta} />
        </div>
    );
};

export default HistoricoTreino;