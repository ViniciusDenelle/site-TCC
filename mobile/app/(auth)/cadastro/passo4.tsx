import { useContext } from 'react'
import { View, Text } from 'react-native'
import { CalendarClock, Flame } from 'lucide-react-native'

import useMetas from '../../../logicas/cadastro/useMetas'
import useCadastro from '@/logicas/cadastro/useCadastro'
import InputSimples from '@/componentes/InputSimples'
import InputRange from '@/componentes/InputRange'
import InputRadio from '@/componentes/InputRadio'
import CadastroLayout from '@/componentes/layouts/CadastroLayout'

const Metas = () => {

    const {
        dados,
        mudarDados,
        GET,
        errosCampo,
        parseNumero
    } = useCadastro()

    const {
        calorias,
        tempoEstimado,
        minMaxPeso
    } = useMetas({dados, GET})

    const {
        peso,
        pesoFinal,
        veloPerda,
        objetivo,
    } = dados

    const velocidadePerda = [
        {
            nome: 'lento',
            base: objetivo === 'perder_peso' ? 0.005 : 0.0025,
            cor: 'bg-emerald-400'
        },
        {
            nome: 'moderado',
            base: objetivo === 'perder_peso' ? 0.00675 : 0.0035,
            cor: 'bg-indigo-500'
        },
        {
            nome: 'rápido',
            base: objetivo === 'perder_peso' ? 0.0085 : 0.0045,
            cor: 'bg-amber-400'
        },
        {
            nome: 'intenso',
            base: objetivo === 'perder_peso' ? 0.012 : 0.0065,
            cor: 'bg-rose-500'
        },
    ].map(velo => ({
        ...velo,
        valor: parseFloat((peso * velo.base).toFixed(2))
    }))

    function proximo()
    {

    }

    return (
        <CadastroLayout
            proximo={proximo}
        >
            <View className="flex flex-col w-full gap-2">

                <Text className="mx-auto text-lg text-gray-700 font-semibold">
                    defina suas metas {GET}
                </Text>

                {/* cards topo */}
                <View className="flex flex-col gap-2 w-full">

                    <View className="flex flex-row items-center gap-2 p-3 h-20 rounded-lg bg-gray-100 w-full">

                        <CalendarClock color="#000" size={20} />

                        <View className="flex flex-col">
                            <Text className="text-gray-600 text-sm">
                                tempo estimado
                            </Text>

                            <Text className="text-base">
                                {tempoEstimado.meses} meses e {tempoEstimado.semanas} semanas
                            </Text>

                            <Text>
                                previsão: {tempoEstimado.previsao}
                            </Text>
                        </View>

                    </View>

                    <View className="flex flex-row items-center gap-2 p-3 h-20 rounded-lg bg-gray-100 w-full">

                        <Flame color="#000" size={20} />

                        <View className="flex flex-col">
                            <Text className="text-gray-600 text-sm">
                                calorias diarias
                            </Text>

                            <Text className="text-base">
                                {calorias.calorias} kcal
                            </Text>

                            {objetivo !== 'manter_peso' ? (
                                <Text>
                                    {objetivo === 'perder_peso' ? 'defict' : 'superavit'} de {calorias.diff} kcal
                                </Text>
                            ) : null}
                        </View>

                    </View>

                </View>

                {/* peso meta */}
                <View className="flex flex-col gap-4 w-full mb-5">

                    <View className="relative flex flex-row justify-around items-center w-full">

                        <Text className="text-lg text-gray-600">
                            meta de peso:
                        </Text>

                        <View className="absolute -bottom-4 left-0 flex flex-row gap-1">

                            {pesoFinal < minMaxPeso.maxRec && pesoFinal > minMaxPeso.minRec ? (
                                <Text className="text-green-500 text-xs">
                                    recomendado
                                </Text>
                            ) : (
                                <Text className="text-red-500 text-xs">
                                    não recomendado
                                </Text>
                            )}

                            {errosCampo['pesoFinal'] && (
                                <Text className="text-red-500 text-xs">
                                    {errosCampo['pesoFinal']}
                                </Text>
                            )}

                        </View>

                        <InputSimples
                            className="w-20"
                            tipo="number"
                            valor={String(pesoFinal)}
                            onChange={valor => mudarDados('pesoFinal', parseNumero(valor))}
                        />
                    </View>


                    <InputRange
                        valor={pesoFinal}
                        min={minMaxPeso.min}
                        max={minMaxPeso.max}
                        onChange={value => mudarDados('pesoFinal', value)}
                        recomendadoMin={minMaxPeso.minRec}
                        recomendadoMax={minMaxPeso.maxRec}
                    />

                    <View className="flex flex-row justify-between w-full">
                        <Text>{minMaxPeso.min}</Text>
                        <Text>
                            {Math.round((minMaxPeso.max + minMaxPeso.min) / 2)}
                        </Text>
                        <Text>{minMaxPeso.max}</Text>
                    </View>

                </View>

                {/* velocidade */}
                <View className="flex flex-col gap-4">

                    <Text className="text-lg text-gray-600">
                        velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
                    </Text>

                    <View className="grid grid-cols-2 gap-2 w-full">

                        {velocidadePerda.map(radio => {

                            return (
                                <InputRadio
                                    key={radio.nome}
                                    valor={String(radio.valor)}
                                    onChange={valor => mudarDados('veloPerda', parseNumero(valor))}
                                    className="w-full flex-col items-start h-15 px-2"
                                    semBolinha={true}
                                    selecionado={String(veloPerda)}
                                >

                                    <View className="flex flex-row items-center gap-1">
                                        <View className={`w-3 h-3 rounded-full ${radio.cor}`} />
                                        <Text>{radio.valor}kg/sem</Text>
                                    </View>

                                    <Text className="text-sm">
                                        {radio.nome}
                                    </Text>

                                </InputRadio>
                            )
                        })}

                    </View>

                </View>

            </View>

        </CadastroLayout>
    )
}

export default Metas