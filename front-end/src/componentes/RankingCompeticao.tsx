import { useEffect, useState, ReactNode } from 'react'
import { Trophy, Dumbbell, Medal, ChevronDown } from 'lucide-react'
import CardHorizontal from './CardHorizontal'
import Texto from './organizacao/Texto'
import useFetchExerciciosRanking from '../logicas/dashboard/treinos/treino/FetchExerciciosRanking'
import useFetchRankingExercicio from '../logicas/dashboard/treinos/treino/FetchRankingExercicio'
import {
    PosicaoRankingProps,
    TipoRanking,
} from '../logicas/dashboard/treinos/treino/RankingProps'


const CONFIG_TIPO: Record<TipoRanking, { regra: string; rotulo: string; sufixo: string }> = {
    PESO: {
        regra: 'Vence quem levantou mais carga',
        rotulo: 'melhor marca',
        sufixo: '',
    },
    REPETICOES: {
        regra: 'Vence quem fez mais repetições',
        rotulo: 'máx. de repetições',
        sufixo: 'repetições',
    },
    TEMPO: {
        regra: 'Vence quem aguentou mais tempo',
        rotulo: 'maior tempo',
        sufixo: 'tempo',
    },
}

const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

const formatarTempo = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60)
    const segundos = Math.round(totalSegundos % 60)

    if (minutos === 0) return `${segundos}s`

    return `${minutos}min ${String(segundos).padStart(2, '0')}s`
}

const formatarValor = (tipo: TipoRanking, valor: number) => {
    if (tipo === 'TEMPO') return formatarTempo(valor)

    if (tipo === 'REPETICOES') {
        return `${Math.round(valor)} ${Math.round(valor) === 1 ? 'rep' : 'reps'}`
    }

    return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kg`
}


/* ===================================================== */
/* CARD (moldura do ranking, igual aos outros cards)      */
/* ===================================================== */

function CardRanking({
    regra,
    selo,
    children,
}: {
    regra?: string
    selo?: string
    children: ReactNode
}) {
    return (
        <CardHorizontal className="flex flex-col gap-4 p-6">

            <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-base-terciaria text-amber-400 shrink-0">
                        <Trophy size={22} />
                    </div>

                    <div className="flex flex-col">

                        <Texto
                            tipo="titulo"
                            className="text-t-primaria text-lg font-semibold"
                        >
                            Ranking
                        </Texto>

                        {regra && (
                            <Texto
                                tipo="paragrafo"
                                className="text-xs text-gray-400"
                            >
                                {regra}
                            </Texto>
                        )}

                    </div>

                </div>

                {selo && (
                    <div className="px-3 py-1 rounded-lg bg-base-terciaria border border-base-terciaria shrink-0">
                        <Texto
                            tipo="subtitulo"
                            className="text-xs text-t-secundaria"
                        >
                            {selo}
                        </Texto>
                    </div>
                )}

            </div>

            {children}

        </CardHorizontal>
    )
}


/* ===================================================== */
/* LINHA DO RANKING (com animações de hover)              */
/* ===================================================== */

function LinhaRanking({
    item,
    tipo,
}: {
    item: PosicaoRankingProps
    tipo: TipoRanking
}) {
    return (
        <div
            className={`
                group relative overflow-hidden
                flex items-center gap-4
                rounded-xl border p-3.5
                cursor-default
                transition-all duration-200 ease-out
                hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-black/20
                active:translate-y-0 active:scale-[0.99]
                motion-reduce:transform-none motion-reduce:transition-none
                ${
                    item.voce
                        ? 'border-destaque-p-medio/50 bg-destaque-p-medio/5 hover:bg-destaque-p-medio/10'
                        : 'border-base-terciaria bg-base-terciaria/50 hover:border-destaque-p-medio/50 hover:bg-base-terciaria'
                }
            `}
        >
            {/* BARRA DE DESTAQUE (cresce no hover) */}
            <span
                className="
                    absolute left-0 top-0 h-full w-1
                    origin-center scale-y-0
                    bg-destaque-p-medio
                    transition-transform duration-200 ease-out
                    group-hover:scale-y-100
                    motion-reduce:transition-none
                "
            />

            {/* POSIÇÃO */}
            <div
                className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-lg
                    transition-all duration-200 ease-out
                    group-hover:scale-110
                    motion-reduce:transform-none motion-reduce:transition-none
                    ${
                        item.posicao === 1
                            ? 'bg-destaque-p-medio/10 text-destaque-p-medio'
                            : 'bg-base-terciaria text-t-secundaria group-hover:bg-destaque-p-medio/10 group-hover:text-destaque-p-medio'
                    }
                `}
            >
                {item.posicao === 1 ? (
                    <Trophy
                        size={18}
                        className="transition-transform duration-300 group-hover:-rotate-12 motion-reduce:transform-none"
                    />
                ) : item.posicao === 2 ? (
                    <Medal
                        size={18}
                        className="transition-transform duration-300 group-hover:rotate-12 motion-reduce:transform-none"
                    />
                ) : (
                    <span className="text-sm font-bold">{item.posicao}</span>
                )}
            </div>

            {/* USUÁRIO */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h2 className="truncate font-semibold text-t-primaria">
                        {item.nome}
                    </h2>

                    {item.voce && (
                        <span className="shrink-0 rounded-md bg-destaque-p-medio/10 px-2 py-0.5 text-[10px] font-bold text-destaque-p-medio">
                            VOCÊ
                        </span>
                    )}
                </div>

                <div className="mt-1 flex items-center gap-3 text-xs text-t-secundaria transition-colors duration-200 group-hover:text-t-primaria/70">
                    {tipo === 'PESO' && (
                        <>
                            <span>{item.repeticoes} repetições</span>
                            <span>•</span>
                        </>
                    )}
                    <span>{formatarData(item.data)}</span>
                </div>
            </div>

            {/* RESULTADO */}
            <div
                className="
                    origin-right text-right
                    transition-transform duration-200 ease-out
                    group-hover:scale-105
                    motion-reduce:transform-none motion-reduce:transition-none
                "
            >
                <p className="text-lg font-bold text-destaque-p-medio">
                    {formatarValor(tipo, item.valor)}
                </p>
                <p className="text-[10px] text-t-secundaria">
                    {CONFIG_TIPO[tipo].rotulo}
                </p>
            </div>
        </div>
    )
}


/* ===================================================== */
/* COMPONENTE PRINCIPAL                                   */
/* ===================================================== */

export default function RankingCompeticao() {

    const [exercicioId, setExercicioId] = useState<number | null>(null)

    const {
        exercicios,
        isPending: carregandoLista,
        isError: erroLista,
    } = useFetchExerciciosRanking()

    // Seleciona automaticamente o primeiro exercício da lista
    useEffect(() => {
        if (exercicioId === null && exercicios?.length) {
            setExercicioId(exercicios[0].id)
        }
    }, [exercicios, exercicioId])

    const {
        ranking,
        isPending: carregandoRanking,
        isError: erroRanking,
        isFetching,
    } = useFetchRankingExercicio(exercicioId)


    if (carregandoLista) {
        return (
            <CardRanking>
                <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-sm text-t-secundaria">
                        Carregando exercícios...
                    </p>
                </div>
            </CardRanking>
        )
    }

    if (erroLista) {
        return (
            <CardRanking>
                <p className="text-sm text-t-secundaria">
                    Não foi possível carregar os exercícios.
                </p>
            </CardRanking>
        )
    }

    if (!exercicios?.length) {
        return (
            <CardRanking>
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                    <Trophy size={32} className="text-t-secundaria" />
                    <h2 className="font-semibold text-t-primaria">
                        Nenhum exercício disponível
                    </h2>
                    <p className="text-sm text-t-secundaria">
                        Conclua um treino para entrar no ranking dos exercícios.
                    </p>
                </div>
            </CardRanking>
        )
    }


    // Tipo do exercício selecionado (usa a lista enquanto o ranking ainda carrega)
    const tipo: TipoRanking =
        ranking?.exercicio.tipo ??
        exercicios.find((ex) => ex.id === exercicioId)?.tipo ??
        'PESO'

    // Usuário está fora do top exibido? Mostra a posição dele no final.
    const voceForaDoTop =
        ranking?.minha_posicao &&
        !ranking.ranking.some((r) => r.voce)

    const selo = ranking
        ? `${ranking.total_participantes} ${
              ranking.total_participantes === 1 ? 'participante' : 'participantes'
          }`
        : undefined


    return (
        <CardRanking regra={CONFIG_TIPO[tipo].regra} selo={selo}>

            {/* SELETOR DE EXERCÍCIO */}
            <div>
                <label
                    htmlFor="exercicio-ranking"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-t-secundaria"
                >
                    <Dumbbell size={14} className="text-destaque-p-medio" />
                    Exercício
                </label>

                <div className="relative">
                    <select
                        id="exercicio-ranking"
                        value={exercicioId ?? ''}
                        onChange={(e) => setExercicioId(Number(e.target.value))}
                        className="
                            w-full appearance-none
                            rounded-xl
                            border border-base-terciaria
                            bg-base-terciaria/50
                            px-4 py-3 pr-10
                            text-sm font-semibold text-t-primaria
                            outline-none
                            focus:border-destaque-p-medio/50
                        "
                    >
                        {exercicios.map((ex) => {
                            const sufixo = CONFIG_TIPO[ex.tipo].sufixo

                            return (
                                <option key={ex.id} value={ex.id}>
                                    {ex.nome}
                                    {sufixo ? ` (${sufixo})` : ''}
                                </option>
                            )
                        })}
                    </select>

                    <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-t-secundaria"
                    />
                </div>
            </div>


            {/* RESULTADO */}
            {carregandoRanking ? (
                <div className="flex min-h-[160px] items-center justify-center">
                    <p className="text-sm text-t-secundaria">
                        Carregando ranking...
                    </p>
                </div>
            ) : erroRanking || !ranking ? (
                <p className="text-sm text-t-secundaria">
                    Não foi possível carregar o ranking deste exercício.
                </p>
            ) : ranking.ranking.length === 0 ? (
                <div className="rounded-xl border border-dashed border-base-terciaria p-6 text-center">
                    <p className="text-sm text-t-secundaria">
                        Ninguém registrou este exercício ainda.
                    </p>
                </div>
            ) : (
                <div
                    className={`
                        max-h-96 space-y-2.5 overflow-y-auto p-1
                        ${isFetching ? 'opacity-60 transition-opacity' : ''}
                    `}
                >
                    {ranking.ranking.map((item) => (
                        <LinhaRanking
                            key={item.user_id}
                            item={item}
                            tipo={tipo}
                        />
                    ))}

                    {voceForaDoTop && ranking.minha_posicao && (
                        <>
                            <p className="py-1 text-center text-t-secundaria">
                                •••
                            </p>
                            <LinhaRanking
                                item={ranking.minha_posicao}
                                tipo={tipo}
                            />
                        </>
                    )}
                </div>
            )}

        </CardRanking>
    )
}
