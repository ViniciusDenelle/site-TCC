import React, { useState } from 'react'
import BotaoTerciario from '../../../botoes/BotaoTerciario'
import useExecutarTreinoContext from '../../../../contextos/ExecutarTreinoContexto'
import { Ban, ClockPlus, Pause, Play, Plus, TimerOff, TimerReset } from 'lucide-react-native'
import CardHorizontal from '../../../CardHorizontal'
import Texto from '../../../organizacao/Texto'
import InputSimples from '../../../inputs/InputSimples'
import BotaoSecundario from '../../../botoes/BotaoSecundario'
import { View } from 'react-native'

const PlayerComandoTimer = () => {

    const {
        exercicioExecucao
    } = useExecutarTreinoContext()

    const [menuTempo, setMenuTempo] = useState<boolean>(false)
    const [tempoPrev, setTempoPrev] = useState<number>(exercicioExecucao.timer.tempo)

    return (
        <>
            <View className="relative flex-row items-center">

                {menuTempo && (
                    <View className="absolute bottom-full left-0
                     pb-1">

                        <CardHorizontal className=''>
                            <View className="flex flex-col gap-1">
                                <Texto className='truncate'>
                                    Novo tempo (segundos):
                                </Texto>

                                <View className="flex-row items-center">
                                    <InputSimples 
                                        tipo='number'
                                        placeholder='novo tempo'
                                        minimo={1}
                                        maximo={100000}
                                        valor={String(tempoPrev)}
                                        onChange={valor => setTempoPrev(Number(valor))}
                                        className='w-full rounded-r-none h-8'
                                    />
                                    <BotaoSecundario 
                                        icone={Plus}
                                        onClick={() => {
                                            exercicioExecucao.timer.definirTempo(tempoPrev)
                                            setMenuTempo(false)
                                            exercicioExecucao.timer.iniciar()
                                        }}
                                        classeAdicional='rounded-l-none'
                                    />
                                </View>
                            </View>
                        </CardHorizontal>

                    </View>
                )}

                <BotaoTerciario
                    icone={ClockPlus}
                    tamanhoIcone="md"
                    onClick={() => {
                        exercicioExecucao.timer.pausar()
                        setMenuTempo(prev => !prev)
                    }}
                />
            </View>

            <View className="flex w-2/3 flex-row gap-1 justify-around items-center">

                <BotaoTerciario
                    icone={TimerReset}
                    tamanhoIcone="lg"
                    onClick={exercicioExecucao.timer.reiniciar}
                />

                <BotaoTerciario
                    icone={
                        exercicioExecucao.timer.rodando
                            ? Pause : Play
                    }
                    tamanhoIcone="xl"
                    onClick={
                        exercicioExecucao.timer.rodando
                            ? exercicioExecucao.timer.pausar
                            : exercicioExecucao.timer.iniciar
                    }
                />

                <BotaoTerciario
                    icone={TimerOff}
                    tamanhoIcone="lg"
                    onClick={exercicioExecucao.timer.finalizar}
                />


            </View>

            <BotaoTerciario
                icone={Ban}
                tamanhoIcone="md"
                onClick={exercicioExecucao.timer.parar}
            />
        </>
    )
}

export default PlayerComandoTimer
