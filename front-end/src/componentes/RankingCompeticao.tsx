import { useEffect, useState } from 'react'
import { Trophy, Dumbbell, Medal, ChevronDown } from 'lucide-react'
import useFetchExerciciosRanking from '../logicas/dashboard/treinos/treino/FetchExerciciosRanking'
import useFetchRankingExercicio from '../logicas/dashboard/treinos/treino/FetchRankingExercicio'
import { PosicaoRankingProps } from '../logicas/dashboard/treinos/treino/RankingProps'

const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

const formatarPeso = (peso: number) =>
    peso.toLocaleString('pt-BR', { maximumFractionDigits: 1 })


function LinhaRanking({ item }: { item: PosicaoRankingProps }) {
    return (
        <div
            className={`
                flex items-center gap-4
                rounded-xl border p-4
                transition-all
                ${
                    item.voce
                        ? 'border-destaque-p-medio/50 bg-destaque-p-medio/5'
                        : 'border-base-terciaria bg-base-secundaria hover:border-destaque-p-medio/30'
                }
            `}
        >
            {/* POSIÇÃO */}
            <div
                className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${
                        item.posicao === 1
                            ? 'bg-destaque-p-medio/10 text-destaque-p-medio'
                            : 'bg-base-terciaria text-t-secundaria'
                    }
                `}
            >
                {item.posicao === 1 ? (
                    <Trophy size={18} />
                ) : item.posicao === 2 ? (
                    <Medal size={18} />
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

                <div className="mt-1 flex items-center gap-3 text-xs text-t-secundaria">
                    <span>{item.repeticoes} repetições</span>
                    <span>•</span>
                    <span>{formatarData(item.data)}</span>
                </div>
            </div>

            {/* PESO */}
            <div className="text-right">
                <p className="text-lg font-bold text-destaque-p-medio">
                    {formatarPeso(item.peso)} kg
                </p>
                <p className="text-[10px] text-t-secundaria">melhor marca</p>
            </div>
        </div>
    )
}


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
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-t-secundaria">Carregando exercícios...</p>
            </div>
        )
    }

    if (erroLista) {
        return (
            <div className="rounded-xl border border-base-terciaria bg-base-secundaria p-6">
                <p className="text-sm text-t-secundaria">
                    Não foi possível carregar os exercícios.
                </p>
            </div>
        )
    }

    if (!exercicios?.length) {
        return (
            <div className="rounded-xl border border-base-terciaria bg-base-secundaria p-6">
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                    <Trophy size={32} className="text-t-secundaria" />
                    <h2 className="font-semibold text-t-primaria">
                        Nenhum treino realizado
                    </h2>
                    <p className="text-sm text-t-secundaria">
                        Conclua um treino para entrar no ranking dos exercícios.
                    </p>
                </div>
            </div>
        )
    }


    // Usuário está fora do top exibido? Mostra a posição dele no final.
    const voceForaDoTop =
        ranking?.minha_posicao &&
        !ranking.ranking.some((r) => r.voce)


    return (
        <section className="w-full">

            {/* CABEÇALHO */}
            <div className="mb-6 flex items-center gap-3">
                <div
                    className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-xl
                        bg-destaque-p-medio/10
                        text-destaque-p-medio
                    "
                >
                    <Trophy size={22} />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-t-primaria">
                        Ranking
                    </h1>
                    <p className="text-sm text-t-secundaria">
                        Compare sua melhor marca com a de outros usuários
                    </p>
                </div>
            </div>


            {/* SELETOR DE EXERCÍCIO */}
            <div className="mb-6">
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
                            bg-base-secundaria
                            px-4 py-3 pr-10
                            text-sm font-semibold text-t-primaria
                            outline-none
                            focus:border-destaque-p-medio/50
                        "
                    >
                        {exercicios.map((ex) => (
                            <option key={ex.id} value={ex.id}>
                                {ex.nome}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-t-secundaria"
                    />
                </div>
            </div>


            {/* RESULTADO */}
            {carregandoRanking ? (
                <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-t-secundaria">Carregando ranking...</p>
                </div>
            ) : erroRanking || !ranking ? (
                <div className="rounded-xl border border-base-terciaria bg-base-secundaria p-6">
                    <p className="text-sm text-t-secundaria">
                        Não foi possível carregar o ranking deste exercício.
                    </p>
                </div>
            ) : (
                <div className={isFetching ? 'opacity-60 transition-opacity' : ''}>

                    <p className="mb-3 text-xs text-t-secundaria">
                        {ranking.total_participantes}{' '}
                        {ranking.total_participantes === 1
                            ? 'participante'
                            : 'participantes'}
                    </p>

                    {ranking.ranking.length === 0 ? (
                        <div className="rounded-xl border border-base-terciaria bg-base-secundaria p-6 text-center">
                            <p className="text-sm text-t-secundaria">
                                Ninguém registrou este exercício ainda.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {ranking.ranking.map((item) => (
                                <LinhaRanking key={item.user_id} item={item} />
                            ))}

                            {voceForaDoTop && ranking.minha_posicao && (
                                <>
                                    <p className="py-1 text-center text-t-secundaria">
                                        •••
                                    </p>
                                    <LinhaRanking item={ranking.minha_posicao} />
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

        </section>
    )
}