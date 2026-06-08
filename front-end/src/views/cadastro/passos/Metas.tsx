import { useContext } from 'react'
import { motion } from 'motion/react'
import { CalendarClock, Flame } from 'lucide-react'
import type { ChangeEvent } from 'react'

import InputSimples from '../../../componentes/InputSimples'
import RadioCustomizado from '../../../componentes/RadioCustomizado'

import CadastroContext from '../../../contextos/CadastroContexto'
import useMetas from '../../../logicas/cadastro/useMetas'
import type { UseCadastroReturn } from '../../../logicas/cadastro/useCadastro'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import InputRange from '../../../componentes/InputRange'

const Metas = () => {
  const {
    dados,
    mudarDados,
    GET,
    errosCampo
  } = useCadastroContexto()

  const { 
    calorias, 
    tempoEstimado,
     minMaxPeso 
  } = useMetas(dados, mudarDados, GET)
  const { peso, veloPerda, pesoIdeal, objetivo } = dados

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
    }
  ].map(velo => ({
    ...velo,
    valor: parseFloat((Number(peso) * velo.base).toFixed(2))
  }))

  const isRecomendado = Number(pesoIdeal) <= minMaxPeso.maxRec && Number(pesoIdeal) >= minMaxPeso.minRec
  const erroPesoFinal = errosCampo.pesoIdeal ? errosCampo.pesoIdeal[0] : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col w-full gap-2"
    >
      <h2 className="mx-auto text-lg text-t-primaria font-semibold">
        defina suas metas
      </h2>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* Tempo Estimado */}
        <div className="flex items-center gap-1 p-2 h-20 sm:h-25 rounded-lg bg-base-terciaria w-full ring-2 ring-base-terciaria">
          <CalendarClock />
          <div className="flex flex-col text-sm">
            <h2 className="text-t-secundaria">tempo estimado</h2>
            <p className="flex sm:flex-col text-base">
              <span>{tempoEstimado.meses} meses e</span>
              <span>{tempoEstimado.semanas} semanas</span>
            </p>
            <span>previsão: {tempoEstimado.previsao}</span>
          </div>
        </div>

        {/* Calorias Diárias */}
        <div className="flex items-center gap-1 px-2 h-20 sm:h-25 rounded-lg bg-base-terciaria w-full ring-2 ring-base-terciaria">
          <Flame />
          <div className="flex flex-col text-sm">
            <h2 className="text-t-secundaria">calorias diarias</h2>
            <p className="text-base">{calorias.calorias} kcal</p>
            {objetivo !== 'manter_peso' && (
              <span className="flex gap-1">
                <p>{objetivo === 'perder_peso' ? 'deficit' : 'superavit'}</p>
                de {calorias.diff} kcal
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta de Peso */}
      <div className="flex flex-col gap-4 w-full mb-5">
        <div className="relative flex justify-between items-center w-full">
          <h2 className="text-lg text-t-secundaria">
            meta de peso:
            <div className="absolute -bottom-3 left-0 flex items-center text-xs gap-1">
              <span className={isRecomendado ? 'text-emerald-500' : 'text-red-500'}>
                {isRecomendado ? 'recomendado' : 'não recomendado'}
              </span>
              {erroPesoFinal && (
                <span className="text-red-500">{erroPesoFinal}</span>
              )}
            </div>
          </h2>

          <InputSimples
            classeAdicional="w-20"
            tipo="number"
            valor={pesoIdeal}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => 
              mudarDados('pesoIdeal', Number(ev.target.value))
            }
          />
        </div>

        <div className="relative w-full">
          <InputRange
            valor={Number(pesoIdeal)}
            min={minMaxPeso.min}
            max={minMaxPeso.max}
            recomendadoMin={minMaxPeso.minRec}
            recomendadoMax={minMaxPeso.maxRec}
            classeAdicionalThumb={isRecomendado && `bg-green-500 hover:bg-green-400`}
            classeAdicionalRange={isRecomendado && `bg-green-600`} 
            onChange={(value: number) => mudarDados('pesoIdeal', value)}
          />

          <div className="absolute -bottom-8 left-0 flex justify-between w-full">
            <span>{minMaxPeso.min}</span>
            <span>{Math.round((minMaxPeso.max + minMaxPeso.min) / 2)}</span>
            <span>{minMaxPeso.max}</span>
          </div>
        </div>
      </div>

      {/* Velocidade de Perda / Ganho */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg text-t-secundaria">
          velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
        </h2>

        <div className="grid grid-rows-2 grid-cols-2 gap-2 w-full">
          {velocidadePerda.map(radio => (
            <RadioCustomizado
              key={radio.nome}
              name="velocidadePerda"
              valor={radio.valor}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => 
                mudarDados('veloPerda', Number(ev.target.value))
              }
              classeAdicional="w-full flex-col items-start h-15 px-2"
              checked={veloPerda === radio.valor}
              semBolinha
            >
              <h3 className="flex items-center gap-1">
                <span className={`block size-3 rounded-full ${radio.cor}`} />
                {radio.valor}kg/sem
              </h3>
              <p className="text-sm">{radio.nome}</p>
            </RadioCustomizado>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Metas