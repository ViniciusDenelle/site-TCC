import { useState } from 'react'
import BotaoTerciario from '../../../botoes/BotaoTerciario'
import useExecutarTreinoContext from '../../../../contextos/ExecutarTreinoContexto'
import { Ban, ClockPlus, Pause, Play, Plus, TimerOff, TimerReset } from 'lucide-react'
import CardHorizontal from '../../../CardHorizontal'
import Texto from '../../../organizacao/Texto'
import InputSimples from '../../../inputs/InputSimples'
import BotaoSecundario from '../../../botoes/BotaoSecundario'
import { UseTimerReturn } from '../../../../logicas/useTimer'

type Props = {
    timer: UseTimerReturn;
    permitirAjusteManual?: boolean; // ClockPlus — não faz sentido durante execução isométrica
    onFinalizarAntecipado?: () => void; // substitui timer.finalizar() quando precisa registrar progresso parcial
}

const PlayerComandoTimer = ({
    timer,
    permitirAjusteManual = true,
    onFinalizarAntecipado,
}: Props) => {

    const [menuTempo, setMenuTempo] = useState<boolean>(false)
    const [tempoPrev, setTempoPrev] = useState<number>(timer.tempo)

    return (
        <>
            {permitirAjusteManual && (
                <div className="relative flex items-center">

                    {menuTempo && (
                        <div className="absolute bottom-full left-0 pb-1">
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
                                                timer.definirTempo(tempoPrev)
                                                setMenuTempo(false)
                                                timer.iniciar()
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
                            timer.pausar()
                            setMenuTempo(prev => !prev)
                        }}
                    />
                </div>
            )}

            <div className="flex w-2/3 gap-1 justify-around items-center">

                <BotaoTerciario
                    icone={TimerReset}
                    tamanhoIcone="lg"
                    onClick={timer.reiniciar}
                />

                <BotaoTerciario
                    icone={timer.rodando ? Pause : Play}
                    tamanhoIcone="xl"
                    onClick={timer.rodando ? timer.pausar : timer.iniciar}
                />

                <BotaoTerciario
                    icone={TimerOff}
                    tamanhoIcone="lg"
                    onClick={onFinalizarAntecipado ?? timer.finalizar}
                />

            </div>

            <BotaoTerciario
                icone={Ban}
                tamanhoIcone="md"
                onClick={timer.parar}
            />
        </>
    )
}

export default PlayerComandoTimer