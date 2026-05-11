import React from 'react'
import { View } from 'react-native'

import useCadastroContext from '@/contextos/CadastroContexto'

import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import Texto from '@/componentes/Texto'

import {
    Activity,
    Cake,
    CalendarClock,
    Clock,
    Flame,
    Footprints,
    GraduationCap,
    HeartPulse,
    Ruler,
    Target,
    Utensils,
    VenusAndMars,
    Weight,
    WeightTilde
} from 'lucide-react-native'
import useTema from '@/contextos/TemaContexto'

const ExibirInfo = () => {
    const {
        dados,
        GET,
        idade
    } = useCadastroContext()

    const {
        genero,
        peso,
        tipoPeso,
        pesoFinal,
        altura,
        nivelAtividade,
        objetivo,
        experiencia,
        calDiaria,
        tempo,
        veloPerda
    } = dados

    const {temaAtual, formatarCor} = useTema()

    const niveis: Record<string, string> = {
        '1.2': 'sedentario',
        '1.375': 'leve',
        '1.55': 'moderado',
        '1.75': 'intenso'
    }

    const atividadeNome =
        niveis[String(nivelAtividade)] || ''

    function proximo()
    {

    }

    const corIcone = formatarCor(temaAtual['--color-t-secundaria'], 1)

    return (
        <CadastroLayout
            proximo={proximo}
            podeProximo
        >

            <View className="flex flex-col gap-2">

                <Texto variante='legenda' className="mx-auto text-lg font-semibold text-t-primaria">
                    suas informações
                </Texto>

                {/* bloco 1 */}
                <View
                    className="flex flex-col p-4 rounded-xl
                    bg-base-terciaria border border-base-quaternaria"
                >

                    <View className="flex flex-row justify-between py-1">

                        <View className="flex flex-row items-center gap-1">
                            <VenusAndMars
                                size={18}
                                color={corIcone}
                            />

                            <Texto variante='legenda'>
                                genero:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {genero}
                            </Texto>
                        </View>

                        <View className="flex flex-row items-center gap-1">
                            <Cake
                                size={18}
                                color={corIcone}
                            />

                            <Texto variante='legenda'>
                                idade:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {idade}
                            </Texto>
                        </View>

                    </View>

                    <View className="flex flex-row justify-between py-1 
                    border-t border-base-quaternaria">

                        <View className="flex flex-row items-center gap-1">
                            <Weight
                                size={18}
                                color={corIcone}
                            />

                            <Texto variante='legenda'>
                                peso:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {peso} {tipoPeso}
                            </Texto>
                        </View>

                        <View className="flex flex-row items-center gap-1">
                            <Ruler
                                size={18}
                                color={corIcone}
                            />

                            <Texto variante='legenda'>
                                altura:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {altura} cm
                            </Texto>
                        </View>

                    </View>

                </View>

                {/* bloco 2 */}
                <View
                    className="flex flex-row rounded-xl
                    bg-base-terciaria border border-base-quaternaria"
                >

                    {/* esquerda */}
                    <View className="flex-1 gap-3 p-4 ">

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                atividade:
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <Activity
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {atividadeNome}
                                </Texto>
                            </View>
                        </View>

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                objetivo:
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <Target
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {objetivo.replace('_', ' ')}
                                </Texto>
                            </View>
                        </View>

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                experiencia:
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <GraduationCap
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {experiencia}
                                </Texto>
                            </View>
                        </View>

                    </View>

                    {/* direita */}
                    <View className="flex-1 gap-3 p-4 border-l border-base-quaternaria">

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                gasto calorico total:
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <Flame
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {GET} kcal
                                </Texto>
                            </View>
                        </View>

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                calorias diarias:
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <Footprints
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {calDiaria} kcal
                                </Texto>
                            </View>
                        </View>

                        <View className="gap-1">
                            <Texto variante='legenda'>
                                velocidade de {
                                    objetivo === 'perder_peso'
                                        ? 'perda'
                                        : 'ganho'
                                }
                            </Texto>

                            <View className="flex flex-row items-center gap-1">
                                <HeartPulse
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda' className="text-t-primaria">
                                    {veloPerda}kg/semana
                                </Texto>
                            </View>
                        </View>

                    </View>

                </View>

                {/* bloco 3 */}
                <View
                    className="flex flex-col p-2 rounded-xl
                    bg-base-terciaria border border-base-quaternaria"
                >

                    <View className="flex flex-row pb-2 justify-between">

                        <View className="flex flex-row items-center gap-1">
                            <WeightTilde
                                size={18}
                                color={corIcone}
                            />

                            <Texto variante='legenda'>
                                peso final:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {pesoFinal} kg
                            </Texto>
                        </View>

                        {objetivo === 'perder_peso' ? (
                            <View className="flex flex-row items-center gap-1">

                                <Footprints
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda'>
                                    peso a perder:
                                </Texto>

                                <Texto variante='legenda' className="text-t-primaria">
                                    {peso - pesoFinal} kg
                                </Texto>

                            </View>
                        ) : (
                            <View className="flex flex-row items-center gap-1">

                                <Utensils
                                    size={18}
                                    color={corIcone}
                                />

                                <Texto variante='legenda'>
                                    peso a ganhar:
                                </Texto>

                                <Texto variante='legenda' className="text-t-primaria">
                                    {pesoFinal - peso} kg
                                </Texto>

                            </View>
                        )}

                    </View>

                    <View className="flex flex-row py-2 gap-2 border-t border-base-quaternaria">

                        <Clock
                            size={18}
                            color={corIcone}
                        />

                        <View>
                            <Texto variante='legenda'>
                                tempo estimado:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {tempo.meses} meses e {tempo.semanas} semanas
                            </Texto>
                        </View>

                    </View>

                    <View className="flex flex-row pt-2 gap-2 border-t border-base-quaternaria">

                        <CalendarClock
                            size={18}
                            color={corIcone}
                        />

                        <View>
                            <Texto variante='legenda'>
                                previsão de termino:
                            </Texto>

                            <Texto variante='legenda' className="text-t-primaria">
                                {tempo.previsao}
                            </Texto>
                        </View>

                    </View>

                </View>

            </View>

        </CadastroLayout>
    )
}

export default ExibirInfo