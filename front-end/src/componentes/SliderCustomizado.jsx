import React from 'react'
import * as Slider from '@radix-ui/react-slider'
import { motion } from 'motion/react'

const SliderCustomizado = ({
    valor,
    mudarValor,
    min,
    max,
    step,
    recomendadoMax,
    recomendadoMin,
    classeAdcionalThumb,
    classeAdcionalTrack,
    classeAdcionalRange,
}) => {

   
    function porcentagem(val)
    {
      return ((val - min) / (max - min)) * 100
    }

    recomendadoMax = recomendadoMax > max ? max : recomendadoMax
    recomendadoMin = recomendadoMin < min ? min : recomendadoMin

    const esquerda = porcentagem(recomendadoMin)
    const largura = porcentagem(recomendadoMax) - esquerda

    const classeThumb = `
        block h-5 w-5 rounded-full bg-destaque-s-escuro 
        shadow cursor-pointer hover:bg-destaque-s-medio
    `

    const classeRange = `
        absolute h-full rounded-full bg-destaque-s-claro
    `

    const classeTrack = `
        relative h-2 w-full grow rounded-full bg-base-terciaria
    `

  return (
    <Slider.Root
        value={[valor]}
        onValueChange={value => mudarValor(value[0])}
        min={min ?? 1}
        max={max ?? 10}
        step={step ?? 1}
        className="relative flex items-center w-full h-full"
      >
        <Slider.Track className={`${classeTrack} ${classeAdcionalTrack ?? ``}`}>

          {recomendadoMax ? (
            <div className="absolute h-full bg-green-500/50 rounded-full"
              style={{
                left: `${esquerda}%`,
                width: `${largura}%`
              }}
            />
          ) : ''}

          <Slider.Range className={`${classeRange} ${classeAdcionalRange ?? ``}`} />
        </Slider.Track>

        <Slider.Thumb className={`${classeThumb} ${classeAdcionalThumb ?? ``}`} />

      </Slider.Root>
  )
}

export default SliderCustomizado