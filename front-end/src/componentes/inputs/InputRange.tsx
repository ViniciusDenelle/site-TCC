import * as Slider from '@radix-ui/react-slider'

interface InputRangeProps {
  valor: number
  onChange: (valor: number) => void
  min?: number
  max?: number
  step?: number
  recomendadoMax?: number
  recomendadoMin?: number
  classeAdicionalThumb?: string
  classeAdicionalTrack?: string
  classeAdicionalRange?: string
}

const InputRange = ({
  valor,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  recomendadoMax,
  recomendadoMin,
  classeAdicionalThumb,
  classeAdicionalTrack,
  classeAdicionalRange,
}: InputRangeProps) => {

  function porcentagem(val: number): number {
    return ((val - min) / (max - min)) * 100
  }

  const recomendadoMaxFinal =
    recomendadoMax && recomendadoMax > max
      ? max
      : recomendadoMax

  const recomendadoMinFinal =
    recomendadoMin && recomendadoMin < min
      ? min
      : recomendadoMin

  const esquerda =
    recomendadoMinFinal !== undefined
      ? porcentagem(recomendadoMinFinal)
      : 0

  const largura =
    recomendadoMaxFinal !== undefined
      ? porcentagem(recomendadoMaxFinal) - esquerda
      : 0

  const classeThumb = `
    block h-5 w-5 rounded-full
    bg-destaque-s-escuro shadow
    cursor-pointer hover:bg-destaque-s-medio
  `

  const classeRange = `
    absolute h-full rounded-full
    bg-destaque-s-claro
  `

  const classeTrack = `
    relative h-2 w-full grow
    rounded-full bg-base-terciaria
  `

  return (
    <Slider.Root
  value={[valor]}
  onValueChange={(value) => {
    if (value[0] !== undefined) {
      onChange(value[0])
    }
  }}
  min={min}
  max={max}
  step={step}
  className="
    relative flex items-center
    w-full h-full
  "
>

      <Slider.Track
        className={`
          ${classeTrack}
          ${classeAdicionalTrack ?? ''}
        `}
      >

        {recomendadoMaxFinal !== undefined && (

          <div
            className="
              absolute h-full
              bg-green-500/50 rounded-full
            "
            style={{
              left: `${esquerda}%`,
              width: `${largura}%`
            }}
          />

        )}

        <Slider.Range
          className={`
            ${classeRange}
            ${classeAdicionalRange ?? ''}
          `}
        />

      </Slider.Track>

      <Slider.Thumb
        className={`
          ${classeThumb}
          ${classeAdicionalThumb ?? ''}
        `}
      />

    </Slider.Root>
  )
}

export default InputRange