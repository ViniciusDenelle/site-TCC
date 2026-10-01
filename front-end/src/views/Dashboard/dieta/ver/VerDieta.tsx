import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Utensils,
    Clock,
    Flame,
    Dumbbell,
    Wheat,
    CircleDollarSign,
} from 'lucide-react'

import Texto from '../../../../componentes/organizacao/Texto'
import CardHorizontal from '../../../../componentes/CardHorizontal'

import dietasMock from '../../../../logicas/dashboard/dieta/DietaMock'

const VerDieta = () => {
    const { id } = useParams<{ id: string }>()

    const dieta = dietasMock.find((item) => item.id === id)

    const [diaSelecionado, setDiaSelecionado] = useState('segunda')

    if (!dieta) {
        return (
            <div className="w-full">
                <Texto>Dieta não encontrada.</Texto>
            </div>
        )
    }

    const diaAtual = dieta.dias.find(
        (dia) => dia.id === diaSelecionado
    )

    if (!diaAtual) {
        return (
            <div className="w-full">
                <Texto>Dia não encontrado.</Texto>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto flex flex-col gap-5">

                {/* CABEÇALHO */}
                <div className="flex flex-col gap-3">

                    <div className="w-full flex justify-center">
                        <div className="size-24 sm:size-28 flex items-center justify-center rounded-3xl bg-destaque-p-claro/10 border border-destaque-p-claro/20 p-5">
                            <Utensils
                                className="size-full text-destaque-p-claro"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Texto
                            tipo="titulo"
                            className="text-t-primaria"
                        >
                            {dieta.nome}
                        </Texto>

                        <Texto
                            tipo="subtexto"
                            className="text-t-terciaria mt-1"
                        >
                            {dieta.descricao}
                        </Texto>
                    </div>

                    {/* TAGS */}
                    <div className="flex justify-center gap-2 flex-wrap mt-1">

                        <div className="rounded-full bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-1">
                            <Texto
                                tipo="subtexto"
                                className="!text-xs text-destaque-p-claro font-medium"
                            >
                                {dieta.objetivo}
                            </Texto>
                        </div>

                        <div className="rounded-full bg-base-secundaria border border-base-terciaria/30 px-3 py-1">
                            <Texto
                                tipo="subtexto"
                                className="!text-xs text-t-primaria font-medium"
                            >
                                {dieta.nivel}
                            </Texto>
                        </div>

                        <div className="rounded-full bg-base-secundaria border border-base-terciaria/30 px-3 py-1">
                            <Texto
                                tipo="subtexto"
                                className="!text-xs text-t-primaria font-medium"
                            >
                                {dieta.duracao}
                            </Texto>
                        </div>

                    </div>
                </div>

                {/* META DIÁRIA */}
                <div className="flex flex-col gap-3">

                    <Texto
                        tipo="titulo"
                        className="font-thin"
                    >
                        Meta diária
                    </Texto>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                        {/* CALORIAS */}
                        <div className="rounded-2xl border border-destaque-p-claro/20 bg-destaque-p-claro/5 p-4">

                            <div className="flex items-center gap-2 mb-3">

                                <div className="flex size-9 items-center justify-center rounded-xl bg-destaque-p-claro/10">
                                    <Flame className="size-5 text-destaque-p-claro" />
                                </div>

                                <Texto
                                    tipo="subtexto"
                                    className="text-t-terciaria"
                                >
                                    Calorias
                                </Texto>

                            </div>

                            <Texto
                                tipo="subtitulo"
                                className="text-t-primaria"
                            >
                                {dieta.meta.calorias}
                            </Texto>

                            <Texto
                                tipo="subtexto"
                                className="text-t-terciaria !text-xs"
                            >
                                kcal por dia
                            </Texto>

                        </div>

                        {/* PROTEÍNAS */}
                        <div className="rounded-2xl border border-base-terciaria/30 bg-base-secundaria p-4">

                            <div className="flex items-center gap-2 mb-3">

                                <div className="flex size-9 items-center justify-center rounded-xl bg-base-terciaria/30">
                                    <Dumbbell className="size-5 text-t-primaria" />
                                </div>

                                <Texto
                                    tipo="subtexto"
                                    className="text-t-terciaria"
                                >
                                    Proteínas
                                </Texto>

                            </div>

                            <Texto
                                tipo="subtitulo"
                                className="text-t-primaria"
                            >
                                {dieta.meta.proteinas}g
                            </Texto>

                            <Texto
                                tipo="subtexto"
                                className="text-t-terciaria !text-xs"
                            >
                                por dia
                            </Texto>

                        </div>

                        {/* CARBOIDRATOS */}
                        <div className="rounded-2xl border border-base-terciaria/30 bg-base-secundaria p-4">

                            <div className="flex items-center gap-2 mb-3">

                                <div className="flex size-9 items-center justify-center rounded-xl bg-base-terciaria/30">
                                    <Wheat className="size-5 text-t-primaria" />
                                </div>

                                <Texto
                                    tipo="subtexto"
                                    className="text-t-terciaria"
                                >
                                    Carboidratos
                                </Texto>

                            </div>

                            <Texto
                                tipo="subtitulo"
                                className="text-t-primaria"
                            >
                                {dieta.meta.carboidratos}g
                            </Texto>

                            <Texto
                                tipo="subtexto"
                                className="text-t-terciaria !text-xs"
                            >
                                por dia
                            </Texto>

                        </div>

                        {/* GORDURAS */}
                        <div className="rounded-2xl border border-base-terciaria/30 bg-base-secundaria p-4">

                            <div className="flex items-center gap-2 mb-3">

                                <div className="flex size-9 items-center justify-center rounded-xl bg-base-terciaria/30">
                                    <CircleDollarSign className="size-5 text-t-primaria" />
                                </div>

                                <Texto
                                    tipo="subtexto"
                                    className="text-t-terciaria"
                                >
                                    Gorduras
                                </Texto>

                            </div>

                            <Texto
                                tipo="subtitulo"
                                className="text-t-primaria"
                            >
                                {dieta.meta.gorduras}g
                            </Texto>

                            <Texto
                                tipo="subtexto"
                                className="text-t-terciaria !text-xs"
                            >
                                por dia
                            </Texto>

                        </div>

                    </div>
                </div>

                {/* PLANO SEMANAL */}
                <div className="flex flex-col gap-3">

                    <Texto
                        tipo="titulo"
                        className="font-thin"
                    >
                        Plano semanal
                    </Texto>

                    <div className="flex gap-2 overflow-x-auto pb-2">

                        {dieta.dias.map((dia) => (
                            <button
                                key={dia.id}
                                onClick={() =>
                                    setDiaSelecionado(dia.id)
                                }
                                className={`
                                    shrink-0 rounded-xl px-4 py-2
                                    border transition-all duration-200
                                    ${
                                        diaSelecionado === dia.id
                                            ? 'bg-destaque-p-claro text-black border-destaque-p-claro shadow-lg shadow-destaque-p-claro/10'
                                            : 'bg-base-secundaria text-t-primaria border-base-terciaria/30 hover:border-destaque-p-claro/40'
                                    }
                                `}
                            >
                                <Texto
                                    tipo="subtexto"
                                    className={
                                        diaSelecionado === dia.id
                                            ? 'text-black font-semibold'
                                            : ''
                                    }
                                >
                                    {dia.nome.replace('-feira', '')}
                                </Texto>
                            </button>
                        ))}

                    </div>
                </div>

                {/* DIA ATUAL */}
                <div className="flex items-center justify-between">

                    <Texto
                        tipo="titulo"
                        className="font-thin"
                    >
                        {diaAtual.nome}
                    </Texto>

                    <div className="rounded-full bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-1">

                        <Texto
                            tipo="subtexto"
                            className="!text-xs text-destaque-p-claro"
                        >
                            {diaAtual.refeicoes.length} refeições
                        </Texto>

                    </div>

                </div>

                {/* REFEIÇÕES */}
                <div className="flex flex-col gap-4">

                    {diaAtual.refeicoes.length === 0 ? (

                        <CardHorizontal>
                            <Texto className="opacity-60">
                                Nenhuma refeição cadastrada para este dia.
                            </Texto>
                        </CardHorizontal>

                    ) : (

                        diaAtual.refeicoes.map((refeicao) => {

                            const total =
                                refeicao.alimentos.reduce(
                                    (acc, alimento) => ({
                                        calorias:
                                            acc.calorias +
                                            alimento.calorias,

                                        proteinas:
                                            acc.proteinas +
                                            alimento.proteinas,

                                        carboidratos:
                                            acc.carboidratos +
                                            alimento.carboidratos,

                                        gorduras:
                                            acc.gorduras +
                                            alimento.gorduras,
                                    }),
                                    {
                                        calorias: 0,
                                        proteinas: 0,
                                        carboidratos: 0,
                                        gorduras: 0,
                                    }
                                )

                            return (
                                <div
                                    key={refeicao.id}
                                    className="rounded-3xl bg-base-secundaria border border-base-terciaria/30 overflow-hidden shadow-lg"
                                >

                                    {/* CABEÇALHO DA REFEIÇÃO */}
                                    <div className="flex items-center justify-between gap-3 p-4 border-b border-base-terciaria/20">

                                        <div className="flex items-center gap-3">

                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/10">
                                                <Utensils className="size-5 text-destaque-p-claro" />
                                            </div>

                                            <div>

                                                <Texto tipo="subtitulo">
                                                    {refeicao.nome}
                                                </Texto>

                                                <div className="flex items-center gap-1 mt-0.5">

                                                    <Clock className="size-4 text-t-terciaria" />

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="text-t-terciaria"
                                                    >
                                                        {refeicao.horario}
                                                    </Texto>

                                                </div>

                                            </div>

                                        </div>

                                        {/* TOTAL */}
                                        <div className="rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-2 shrink-0">

                                            <Texto
                                                tipo="subtexto"
                                                className="text-destaque-p-claro font-semibold"
                                            >
                                                {total.calorias} kcal
                                            </Texto>

                                        </div>

                                    </div>

                                    {/* TABELA */}
                                    <div className="p-4">

                                        <div className="overflow-x-auto">

                                            <div className="min-w-[650px]">

                                                {/* CABEÇALHO DA TABELA */}
                                                <div className="grid grid-cols-[2fr_1fr_80px_80px_80px_80px] gap-2 px-3 py-2 rounded-xl bg-base-terciaria/20">

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-t-terciaria"
                                                    >
                                                        Alimento
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-t-terciaria"
                                                    >
                                                        Quantidade
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-destaque-p-claro"
                                                    >
                                                        kcal
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-t-terciaria"
                                                    >
                                                        Prot.
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-t-terciaria"
                                                    >
                                                        Carb.
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="!text-xs text-t-terciaria"
                                                    >
                                                        Gord.
                                                    </Texto>

                                                </div>

                                                {/* ALIMENTOS */}
                                                {refeicao.alimentos.map(
                                                    (alimento) => (
                                                        <div
                                                            key={alimento.id}
                                                            className="grid grid-cols-[2fr_1fr_80px_80px_80px_80px] gap-2 items-center px-3 py-3 border-b border-base-terciaria/10 hover:bg-base-terciaria/5 transition-colors"
                                                        >

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="font-medium text-t-primaria"
                                                            >
                                                                {alimento.nome}
                                                            </Texto>

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="text-t-terciaria"
                                                            >
                                                                {alimento.quantidade}
                                                            </Texto>

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="text-destaque-p-claro font-medium"
                                                            >
                                                                {alimento.calorias}
                                                            </Texto>

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="text-t-primaria"
                                                            >
                                                                {alimento.proteinas}g
                                                            </Texto>

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="text-t-primaria"
                                                            >
                                                                {alimento.carboidratos}g
                                                            </Texto>

                                                            <Texto
                                                                tipo="subtexto"
                                                                className="text-t-primaria"
                                                            >
                                                                {alimento.gorduras}g
                                                            </Texto>

                                                        </div>
                                                    )
                                                )}

                                                {/* TOTAL DA TABELA */}
                                                <div className="grid grid-cols-[2fr_1fr_80px_80px_80px_80px] gap-2 items-center px-3 py-3 mt-2 rounded-xl bg-destaque-p-claro/5 border border-destaque-p-claro/10">

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="font-semibold text-t-primaria"
                                                    >
                                                        Total
                                                    </Texto>

                                                    <span />

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="text-destaque-p-claro font-semibold"
                                                    >
                                                        {total.calorias}
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="font-semibold text-t-primaria"
                                                    >
                                                        {total.proteinas}g
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="font-semibold text-t-primaria"
                                                    >
                                                        {total.carboidratos}g
                                                    </Texto>

                                                    <Texto
                                                        tipo="subtexto"
                                                        className="font-semibold text-t-primaria"
                                                    >
                                                        {total.gorduras}g
                                                    </Texto>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    )}

                </div>

            </div>
        </div>
    )
}

export default VerDieta