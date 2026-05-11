import { useContext } from 'react'
import { View, Text } from 'react-native'
import { CalendarClock, Flame } from 'lucide-react-native'

import useMetas from '../../../logicas/cadastro/useMetas'
import useCadastro from '@/logicas/cadastro/useCadastro'
import InputSimples from '@/componentes/InputSimples'
import InputRange from '@/componentes/InputRange'
import InputRadio from '@/componentes/InputRadio'
import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import Texto from '@/componentes/Texto'
import useTema from '@/contextos/TemaContexto'
import useCadastroContext from '@/contextos/CadastroContexto'
import { router } from 'expo-router'

const Metas = () => {

    const {
        dados,
        mudarDados,
        GET,
        errosCampo,
        parseNumero,
        podeSeguir
    } = useCadastroContext()

    const {
        calorias,
        tempoEstimado,
        minMaxPeso
    } = useMetas({dados, GET, mudarDados})

    const {
        peso,
        pesoFinal,
        veloPerda,
        objetivo,
    } = dados

    const {
        temaAtual,
        formatarCor
    } = useTema()

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

    const corIcone = formatarCor(temaAtual['--color-t-secundaria'], 1)

    function proximo()
    {
        router.push('/cadastro/passo5')
    }

    return (
        <CadastroLayout
            proximo={proximo}
            podeProximo={podeSeguir(4)}
        >
            <View className="flex flex-col w-full gap-2">

                <View className='mx-auto'>
                    <Texto variante='titulo'>
                        defina suas metas
                    </Texto>
                </View>

                {/* cards topo */}
                <View className="flex flex-col gap-2 w-full">

                    <View className="flex flex-row items-center gap-2 p-3 
                    h-20 rounded-lg bg-base-terciaria w-full">

                        <CalendarClock color={corIcone} size={20} />

                        <View className="flex flex-col">
                            <Texto >
                                tempo estimado
                            </Texto>

                            <Texto>
                                {tempoEstimado.meses} meses e {tempoEstimado.semanas} semanas
                            </Texto>

                            <Texto>
                                previsão: {tempoEstimado.previsao}
                            </Texto>
                        </View>

                    </View>

                    <View className="flex flex-row items-center gap-2 p-3 
                    h-20 rounded-lg bg-base-terciaria w-full">

                        <Flame color={corIcone} size={20} />

                        <View className="flex flex-col">
                            <Texto >
                                calorias diarias
                            </Texto>

                            <Texto>
                                {calorias.calorias} kcal
                            </Texto>

                            {objetivo !== 'manter_peso' ? (
                                <Texto>
                                    {objetivo === 'perder_peso' ? 'defict' : 'superavit'} de {calorias.diff} kcal
                                </Texto>
                            ) : null}
                        </View>

                    </View>

                </View>

                {/* peso meta */}
                <View className="flex flex-col gap-4 w-full mb-5">

                    <View className="relative flex flex-row justify-between items-center w-full">

                        <Texto className="text-lg text-gray-600">
                            meta de peso:
                        </Texto>

                        <View className="absolute -bottom-4 left-0 flex flex-row gap-1">

                            {pesoFinal < minMaxPeso.maxRec && pesoFinal > minMaxPeso.minRec ? (
                                <Texto className="text-green-500 text-xs">
                                    recomendado
                                </Texto>
                            ) : (
                                <Texto className="text-red-500 text-xs">
                                    não recomendado
                                </Texto>
                            )}

                            {errosCampo['pesoFinal'] && (
                                <Texto className="text-red-500 text-xs">
                                    {errosCampo['pesoFinal']}
                                </Texto>
                            )}

                        </View>
                        
                        <View className='w-20'>
                            <InputSimples
                                className="w-20"
                                tipo="number"
                                valor={String(pesoFinal)}
                                onChange={valor => mudarDados('pesoFinal', parseNumero(valor))}
                            />
                        </View>
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
                        <Texto>{minMaxPeso.min}</Texto>
                        <Texto>
                            {Math.round((minMaxPeso.max + minMaxPeso.min) / 2)}
                        </Texto>
                        <Texto>{minMaxPeso.max}</Texto>
                    </View>

                </View>

                {/* velocidade */}
                <View className="flex flex-col gap-4">

                    <Texto className="text-lg text-gray-600">
                        velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
                    </Texto>

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
                                        <Texto>{radio.valor}kg/sem</Texto>
                                    </View>

                                    <Texto className="text-sm">
                                        {radio.nome}
                                    </Texto>

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