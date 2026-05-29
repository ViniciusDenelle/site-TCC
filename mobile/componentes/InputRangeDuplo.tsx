import React, { useState, useEffect } from 'react'
import { View, LayoutChangeEvent } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import useTema from '@/contextos/TemaContexto'

type Props = {
  // Agora 'valor' espera um array com duas posições: [minimoAtual, maximoAtual]
  valor: [number, number] 
  onChange: (value: [number, number]) => void
  min: number
  max: number
  step?: number
}

const InputRangeDuplo = ({
  valor,
  onChange,
  min,
  max,
  step = 1,
}: Props) => {
  const { temaAtual, formatarCor } = useTema()
  
  // Estado para controlar a largura responsiva do slider na View pai
  const [sliderWidth, setSliderWidth] = useState(250)

  // Captura o tamanho real do container na tela para esticar o slider de forma responsiva
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    // Subtraímos 20px de margem interna para os Thumbs não cortarem nas bordas
    setSliderWidth(width - 20)
  }

  // Renderiza o botão do marcador (exatamente com a sua classe do NativeWind)
  const renderThumbCustomizado = () => (
    <View 
      className='h-5 w-5 rounded-full bg-destaque-s-escuro'
      style={{ transform: [{ translateY: 2 }] }} // Centraliza o círculo verticalmente na barra de 8px
    />
  )

  return (
    <View onLayout={onLayout} className="w-full justify-center h-8">
      <MultiSlider
        values={valor}
        sliderLength={sliderWidth}
        onValuesChange={(novosValores) => onChange(novosValores as [number, number])}
        min={min}
        max={max}
        step={step}
        allowOverlap={false}
        snapped

        // Substitui os ponteiros padrão pelo seu customizado
        customMarker={renderThumbCustomizado}

        // Replica a estilização do containerStyle original (altura 8, borderRadius 4)
        trackStyle={{
          height: 8,
          borderRadius: 4,
        }}
        
        // Cor do progresso ativo (entre o ponteiro min e max)
        selectedStyle={{
          backgroundColor: formatarCor(temaAtual['--color-destaque-s-medio'], 1),
        }}
        
        // Cor das pontas inativas (menor que o min e maior que o max)
        unselectedStyle={{
          backgroundColor: formatarCor(temaAtual['--color-base-terciaria'], 1),
        }}

        // Otimiza a área de clique para que seja fácil de arrastar os botões
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
      />
    </View>
  )
}

export default InputRangeDuplo