import React, { useState } from 'react'
import BotaoTerciario from '../../../botoes/BotaoTerciario'
import useExecutarTreinoContext from '../../../../contextos/ExecutarTreinoContexto'
import { Ban, ClockPlus, Pause, Play, Plus, TimerOff, TimerReset } from 'lucide-react'
import CardHorizontal from '../../../CardHorizontal'
import Texto from '../../../organizacao/Texto'
import InputSimples from '../../../inputs/InputSimples'
import BotaoSecundario from '../../../botoes/BotaoSecundario'

const PlayerComandoTimer = () => {

    const {
        exercicioExecucao
    } = useExecutarTreinoContext()

    const [menuTempo, setMenuTempo] = useState<boolean>(false)
    const [tempoPrev, setTempoPrev] = useState<number>(exercicioExecucao.timer.tempo)

    return (
        <>
            <div className="relative flex items-center">

                {menuTempo && (
                    <div className="absolute bottom-full left-0
                     pb-1">

                        <CardHorizontal className=''>
                            <div className="flex flex-col gap-1">
                                <Texto className='truncate'>
                                    Novo tempo (segundos):
                                </Texto>

                                <div className="flex items-center">
                                    <InputSimples 
                                        tipo='number'
                                        placeholder='novo tempo'
                                        minimo={1}
                                        maximo={100000}
                                        valor={String(tempoPrev)}
                                        onChange={ev => setTempoPrev(Number(ev.target.value))}
                                        classeAdicional='w-full rounded-r-none h-8'
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
                                </div>
                            </div>
                        </CardHorizontal>

                    </div>
                )}

                <BotaoTerciario
                    icone={ClockPlus}
                    tamanhoIcone="md"
                    onClick={() => {
                        exercicioExecucao.timer.pausar()
                        setMenuTempo(prev => !prev)
                    }}
                />
            </div>

            <div className="flex w-2/3 gap-1 justify-around items-center">

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


            </div>

            <BotaoTerciario
                icone={Ban}
                tamanhoIcone="md"
                onClick={exercicioExecucao.timer.parar}
            />
        </>
    )
}

export default PlayerComandoTimer
