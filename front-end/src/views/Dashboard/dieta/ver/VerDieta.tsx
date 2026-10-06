import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Utensils, Clock, Flame, Dumbbell, Wheat, Droplet, TrendingUp, TrendingDown } from 'lucide-react'
import Texto from '../../../../componentes/organizacao/Texto'
import CardHorizontal from '../../../../componentes/CardHorizontal'
import useFetchUsuario from '../../../../logicas/usuario/FetchUsuario'
import useShowDieta from '../../../../logicas/dashboard/dieta/dieta/ShowDieta'

const nomesDias: Record<number, string> = {
    0: 'Domingo', 1: 'Segunda', 2: 'Terça', 3: 'Quarta',
    4: 'Quinta', 5: 'Sexta', 6: 'Sábado',
}

const nomesDiasAbrev: Record<number, string> = {
    0: 'D', 1: 'S', 2: 'T', 3: 'Q', 4: 'Q', 5: 'S', 6: 'S',
}

const ordemDias = [1, 2, 3, 4, 5, 6, 0] // segunda a domingo

function somarMacros(alimentos: { calorias: number; proteinas: number; carboidratos: number; gorduras: number }[]) {
    return alimentos.reduce(
        (acc, a) => ({
            calorias: acc.calorias + a.calorias,
            proteinas: acc.proteinas + a.proteinas,
            carboidratos: acc.carboidratos + a.carboidratos,
            gorduras: acc.gorduras + a.gorduras,
        }),
        { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
    )
}

const VerDieta = () => {
    const { id } = useParams<{ id: string }>()
    const { dieta, isPending, isError } = useShowDieta(id)
    const { dadosUsuario } = useFetchUsuario()

    const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null)

    console.log(dieta)

    const totaisPorDia = useMemo(() => {
        if (!dieta) return {}

        const mapa: Record<number, ReturnType<typeof somarMacros>> = {}
        ordemDias.forEach(dia => {
            const refeicoesDoDia = dieta.refeicoes.filter(r => r.dia_semana === dia)
            const alimentos = refeicoesDoDia.flatMap(r => r.alimentos)
            mapa[dia] = somarMacros(alimentos)
        })
        return mapa
    }, [dieta])

    if (isPending) {
        return <Texto className="animate-pulse">carregando dieta...</Texto>
    }

    if (isError || !dieta) {
        return <Texto>Dieta não encontrada.</Texto>
    }

    const diasComRefeicao = ordemDias.filter(dia => dieta.refeicoes.some(r => r.dia_semana === dia))
    const diaAtivo = diaSelecionado ?? diasComRefeicao[0] ?? null

    const refeicoesDoDia = dieta.refeicoes
        .filter(r => r.dia_semana === diaAtivo)
        .sort((a, b) => (a.horario ?? '').localeCompare(b.horario ?? ''))

    const totalDoDia = diaAtivo !== null ? totaisPorDia[diaAtivo] : somarMacros([])

    const calProt = totalDoDia.proteinas * 4
    const calCarb = totalDoDia.carboidratos * 4
    const calGord = totalDoDia.gorduras * 9
    const calTotal = calProt + calCarb + calGord

    const percProt = calTotal > 0 ? Math.round((calProt / calTotal) * 100) : 0
    const percCarb = calTotal > 0 ? Math.round((calCarb / calTotal) * 100) : 0
    const percGord = calTotal > 0 ? Math.round((calGord / calTotal) * 100) : 0

    const metaCalorias = dadosUsuario?.caloriasDiarias
    const diferencaMeta = metaCalorias ? Math.round(totalDoDia.calorias - metaCalorias) : null

    const maiorCaloriaSemana = Math.max(1, ...Object.values(totaisPorDia).map(t => t.calorias))

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto flex flex-col gap-5">

                {/* CABEÇALHO */}
                <div className="flex flex-col gap-3">
                    <div className="w-full flex justify-center">
                        <div className="size-24 flex items-center justify-center rounded-3xl bg-base-secundaria p-5">
                            <Utensils className="size-full text-destaque-p-claro" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="text-center">
                        <Texto tipo="titulo" className="text-t-primaria">{dieta.nome}</Texto>
                        {dieta.descricao && (
                            <Texto tipo="subtexto" className="text-t-terciaria mt-1">{dieta.descricao}</Texto>
                        )}
                    </div>

                    <div className="flex justify-center gap-2 flex-wrap">
                        <div className="rounded-full bg-base-secundaria px-3 py-1">
                            <Texto tipo="subtexto" className=" text-destaque-p-claro font-medium">
                                {dieta.objetivo.nome}
                            </Texto>
                        </div>
                        <div className="rounded-full bg-base-secundaria border border-base-terciaria/30 px-3 py-1">
                            <Texto tipo="subtexto" className=" text-t-primaria font-medium">
                                {dieta.nivel.nome}
                            </Texto>
                        </div>
                    </div>
                </div>

                {diasComRefeicao.length === 0 ? (
                    <Texto className="opacity-60">Nenhuma refeição cadastrada ainda.</Texto>
                ) : (
                    <>
                        {/* VISÃO SEMANAL RESUMIDA */}
                        <div className="flex flex-col gap-2">
                            <Texto tipo="titulo" className="font-thin">Visão semanal</Texto>
                            <CardHorizontal>
                                <div className="flex gap-2 items-end h-20">
                                    {ordemDias.map(dia => {
                                        const totalDia = totaisPorDia[dia]?.calorias ?? 0
                                        const altura = totalDia > 0 ? Math.max(8, (totalDia / maiorCaloriaSemana) * 100) : 0
                                        const temRefeicao = diasComRefeicao.includes(dia)

                                        return (
                                            <button
                                                key={dia}
                                                onClick={() => temRefeicao && setDiaSelecionado(dia)}
                                                disabled={!temRefeicao}
                                                className="flex-1 flex flex-col items-center justify-end gap-1 h-full"
                                            >
                                                <div
                                                    style={{ height: `${altura}%` }}
                                                    className={`w-full rounded-md transition-all ${diaAtivo === dia
                                                        ? 'bg-destaque-p-claro'
                                                        : temRefeicao
                                                            ? 'bg-destaque-p-claro/30'
                                                            : 'bg-base-terciaria/20'
                                                        }`}
                                                />
                                                <Texto tipo="subtexto" className="opacity-60">
                                                    {nomesDiasAbrev[dia]}
                                                </Texto>
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardHorizontal>
                        </div>

                        {/* SELETOR DE DIAS */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {diasComRefeicao.map(dia => (
                                <button
                                    key={dia}
                                    onClick={() => setDiaSelecionado(dia)}
                                    className={`shrink-0 rounded-xl px-4 py-2 border transition-all duration-200
                                        ${diaAtivo === dia
                                            ? 'bg-destaque-p-claro text-black border-destaque-p-claro'
                                            : 'bg-base-secundaria text-t-primaria border-base-terciaria/30'}`}
                                >
                                    <Texto tipo="subtexto" className={diaAtivo === dia ? 'text-black font-semibold' : ''}>
                                        {nomesDias[dia]}
                                    </Texto>
                                </button>
                            ))}
                        </div>

                        {/* RESUMO DO DIA */}
                        <div className="flex flex-col gap-3">
                            <Texto tipo="titulo" className="font-thin">
                                {diaAtivo !== null ? nomesDias[diaAtivo] : ''}
                            </Texto>

                            <div className="grid grid-cols-2 gap-3">
                                <CardHorizontal>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flame className="size-5 text-destaque-p-claro" />
                                        <Texto tipo="subtexto" className="text-t-terciaria">Calorias</Texto>
                                    </div>
                                    <Texto tipo="subtitulo" className="text-t-primaria">
                                        {Math.round(totalDoDia.calorias)} kcal
                                    </Texto>

                                    {diferencaMeta !== null && (
                                        <div className="flex items-center gap-1 mt-1">
                                            {diferencaMeta > 0 ? (
                                                <TrendingUp className="size-3.5 text-amber-500" />
                                            ) : (
                                                <TrendingDown className="size-3.5 text-sky-500" />
                                            )}
                                            <Texto tipo="subtexto" className=" text-t-terciaria">
                                                {diferencaMeta > 0 ? '+' : ''}{diferencaMeta} kcal da sua meta ({metaCalorias})
                                            </Texto>
                                        </div>
                                    )}
                                </CardHorizontal>

                                <CardHorizontal>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Dumbbell className="size-5 text-t-primaria" />
                                        <Texto tipo="subtexto" className="text-t-terciaria">Proteínas</Texto>
                                    </div>
                                    <Texto tipo="subtitulo" className="text-t-primaria">
                                        {Math.round(totalDoDia.proteinas)}g
                                    </Texto>
                                </CardHorizontal>
                            </div>

                            {/* DISTRIBUIÇÃO DE MACROS */}
                            <CardHorizontal>
                                <div className="flex flex-col gap-2">
                                    <Texto tipo="subtexto" className="opacity-70">Distribuição de macros</Texto>

                                    <div className="flex h-3 rounded-full overflow-hidden bg-base-terciaria/20">
                                        <div style={{ width: `${percProt}%` }} className="bg-red-500" />
                                        <div style={{ width: `${percCarb}%` }} className="bg-emerald-500" />
                                        <div style={{ width: `${percGord}%` }} className="bg-amber-500" />
                                    </div>

                                    <div className="flex justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <span className="size-2 rounded-full bg-destaque-p-claro" />
                                            <Texto tipo="subtexto">Prot. {percProt}% ({Math.round(totalDoDia.proteinas)}g)</Texto>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="size-2 rounded-full bg-destaque-s-medio" />
                                            <Texto tipo="subtexto">Carb. {percCarb}% ({Math.round(totalDoDia.carboidratos)}g)</Texto>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="size-2 rounded-full bg-amber-500" />
                                            <Texto tipo="subtexto">Gord. {percGord}% ({Math.round(totalDoDia.gorduras)}g)</Texto>
                                        </div>
                                    </div>
                                </div>
                            </CardHorizontal>
                        </div>

                        {/* REFEIÇÕES */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Texto tipo="titulo" className="font-thin">Refeições</Texto>
                                <div className="rounded-full bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-1">
                                    <Texto tipo="subtexto" className=" text-destaque-p-claro">
                                        {refeicoesDoDia.length} refeições
                                    </Texto>
                                </div>
                            </div>

                            {refeicoesDoDia.map(refeicao => {
                                const totalRefeicao = somarMacros(refeicao.alimentos)

                                return (
                                    <div key={refeicao.id} className="rounded-3xl bg-base-secundaria border border-base-terciaria/30 overflow-hidden">

                                        <div className="flex items-center justify-between gap-3 p-4 border-b border-base-terciaria/20">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/10">
                                                    <Utensils className="size-5 text-destaque-p-claro" />
                                                </div>
                                                <div>
                                                    <Texto tipo="subtitulo">{refeicao.nome}</Texto>
                                                    {refeicao.horario && (
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <Clock className="size-4 text-t-terciaria" />
                                                            <Texto tipo="subtexto" className="text-t-terciaria">{refeicao.horario}</Texto>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-2 shrink-0">
                                                <Texto tipo="subtexto" className="text-destaque-p-claro font-semibold">
                                                    {Math.round(totalRefeicao.calorias)} kcal
                                                </Texto>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 p-4">
                                            {refeicao.alimentos.map(alimento => (
                                                <div key={alimento.id} className="flex items-center justify-between gap-2 py-1 border-b border-base-terciaria/10 last:border-0">
                                                    <div className="flex flex-col min-w-0">
                                                        <Texto tipo="subtexto" className="font-medium text-t-primaria truncate">
                                                            {alimento.nome}
                                                        </Texto>
                                                        <Texto tipo="subtexto" className=" opacity-50">
                                                            {alimento.quantidade_gramas}g
                                                        </Texto>
                                                    </div>

                                                    <div className="flex items-center gap-3 shrink-0 text-xs">
                                                        <Texto tipo="subtexto" className="text-destaque-p-claro font-medium">
                                                            {alimento.calorias} kcal
                                                        </Texto>
                                                        <Texto tipo="subtexto" className="opacity-60">P {alimento.proteinas}g</Texto>
                                                        <Texto tipo="subtexto" className="opacity-60">C {alimento.carboidratos}g</Texto>
                                                        <Texto tipo="subtexto" className="opacity-60">G {alimento.gorduras}g</Texto>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="flex items-center justify-between pt-2 mt-1 border-t border-destaque-p-claro/10">
                                                <Texto tipo="subtexto" className="font-semibold">Total</Texto>
                                                <div className="flex items-center gap-3 text-xs">
                                                    <Texto tipo="subtexto" className="text-destaque-p-claro font-semibold">
                                                        {Math.round(totalRefeicao.calorias)} kcal
                                                    </Texto>
                                                    <Texto tipo="subtexto" className="font-semibold">P {Math.round(totalRefeicao.proteinas)}g</Texto>
                                                    <Texto tipo="subtexto" className="font-semibold">C {Math.round(totalRefeicao.carboidratos)}g</Texto>
                                                    <Texto tipo="subtexto" className="font-semibold">G {Math.round(totalRefeicao.gorduras)}g</Texto>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default VerDieta