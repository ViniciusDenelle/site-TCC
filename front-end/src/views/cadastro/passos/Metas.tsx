import { useContext } from 'react'
import { motion } from 'motion/react'
import { CalendarClock, Flame } from 'lucide-react'
import type { ChangeEvent } from 'react'

import InputSimples from '../../../componentes/inputs/InputSimples'
import RadioCustomizado from '../../../componentes/inputs/RadioCustomizado'

import CadastroContext from '../../../contextos/CadastroContexto'
import useMetas from '../../../logicas/cadastro/useMetas'
import type { UseCadastroReturn } from '../../../logicas/cadastro/useCadastro'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import InputRange from '../../../componentes/inputs/InputRange'
import Texto from '../../../componentes/organizacao/Texto'
import WrapperIcone from '../../../componentes/organizacao/WrapperIcone'
import CardHorizontal from '../../../componentes/CardHorizontal'

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
      <Texto tipo='subtitulo' className='text-t-primaria mx-auto' >
         Defina suas metas
      </Texto>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* Tempo Estimado */}
        <CardHorizontal>
          <div className="flex items-center gap-1 h-full truncate">
              <WrapperIcone tamanho='md'>
            <CalendarClock className='size-full'/>
          </WrapperIcone>

          <div className="flex flex-col text-sm">
            <Texto className='text-t-primaria'>
              Tempo estimado
            </Texto>
            <p className="flex sm:flex-col text-base">
              <Texto tipo='subtexto'>
                {tempoEstimado.meses} meses e
              </Texto>
              
              <Texto tipo='subtexto'>
                {tempoEstimado.semanas} semanas
              </Texto>
            </p>
            
            <Texto tipo='subtexto'>
                previsão: {tempoEstimado.previsao}
              </Texto>
          </div>
          </div>
        </CardHorizontal>
        
        <CardHorizontal>
          <div className="flex items-center gap-1 h-full">
            <WrapperIcone tamanho='md'>
              <Flame className='size-full'/>
            </WrapperIcone>

            <div className="flex flex-col">
              <Texto className='text-t-primaria truncate'>
                Calorias diarias
              </Texto>
              <Texto tipo='subtexto'>
                {calorias.calorias} Kcal
              </Texto>
              {objetivo !== 'manter_peso' && (
                <Texto tipo='subtexto'>
                  {objetivo === 'perder_peso' ? 'deficit' : 'superavit'} de {calorias.diff} kcal
                </Texto>
              )}
            </div>
          </div>
        </CardHorizontal>
      </div>
      {/* Meta de Peso */ }
  <div className="flex flex-col gap-4 w-full mb-5">
    <div className="relative flex justify-between items-center w-full">
      <Texto tipo='subtitulo' className='text-t-primaria'>
        meta de peso:
        <div className="absolute -bottom-3 left-0 flex items-center text-xs gap-1">
          <Texto 
            tipo='subtexto' 
            className={`${isRecomendado ? 'text-emerald-500' : 'text-red-500'} font-normal`}
          >
            {isRecomendado ? 'recomendado' : 'não recomendado'}
          </Texto>
          
          {erroPesoFinal && (
            <span className="text-red-500">{erroPesoFinal}</span>
          )}
        </div>
      </Texto>

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

  {/* Velocidade de Perda / Ganho */ }
  <div className="flex flex-col gap-4">
    <Texto tipo='subtitulo' className='text-t-primaria'>
      Velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
    </Texto>
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
    </motion.div >
  )
}

export default Metas