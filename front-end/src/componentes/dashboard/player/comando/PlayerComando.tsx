
import React from 'react'
import BotaoTerciario from '../../../botoes/BotaoTerciario'
import { CheckCircle, SkipBack, SkipForward } from 'lucide-react'
import useExecutarTreinoContext from '../../../../contextos/ExecutarTreinoContexto'

const PlayerComando = ({
    concluida
}) => {

    const {
        podeAvancar,
        proximoExercicio,
        exercicioExecucao,
        exercicioAnterior,
        podeVoltar
    } = useExecutarTreinoContext()

  return (
    <div className="flex justify-around w-full">
        <BotaoTerciario 
            icone={SkipBack}
            tamanhoIcone='lg'
            onClick={() => {
                if (podeVoltar) exercicioAnterior()
            }}
            iconeClassName={!podeVoltar && `text-t-terciaria/60`}
        />

        {!concluida && (
            <BotaoTerciario 
                icone={CheckCircle}
                tamanhoIcone='lg'
                onClick={() => {
                    exercicioExecucao.timer.reiniciar()
                }}
            />
        )}

        <BotaoTerciario 
            icone={SkipForward}
            tamanhoIcone='lg'
            onClick={() => {
                if (podeAvancar) proximoExercicio()
            }}
            iconeClassName={!podeAvancar && `text-t-terciaria/60`}
        />
    </div>
  )
}

export default PlayerComando
