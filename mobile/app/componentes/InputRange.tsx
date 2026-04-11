import { View, Text } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'

type props = {
  valor: number,
  onChange: (value: number) => void,
  min: number,
  max: number,
  step?: number,
  recomendadoMax?: number,
  recomendadoMin?: number
}

const InputRange = ({
  valor,
  onChange,
  min,
  max,
  step = 1,
  recomendadoMin,
  recomendadoMax
}: props) => {

  function porcentagem(val: number) {
    if (max === min) return 0
    return ((val - min) / (max - min)) * 100
  }

  const recMax = recomendadoMax !== undefined
    ? Math.min(recomendadoMax, max)
    : undefined

  const recMin = recomendadoMin !== undefined
    ? Math.max(recomendadoMin, min)
    : undefined

  const esquerda = recMin !== undefined ? porcentagem(recMin) : 0
  const largura = (recMax !== undefined && recMin !== undefined)
    ? porcentagem(recMax) - esquerda
    : 0

  const cor = (recMin !== undefined && recMax !== undefined) && (valor >= recMin && valor <= recMax)
  ? "rgb(22,163,74)" : "rgb(37, 99, 235)"

  const progresso = porcentagem(valor)
  return (
    <View className="relative w-full justify-center">

      {/* TRACK CUSTOM */}
      <View className='absolute w-full px-4 flex justify-center items-center'>
        <View className="absolute w-full h-2 rounded-full bg-base-terciaria 
        overflow-hidden">

          <View
            className="absolute h-full bg-green-500/50"
            style={{
              left: `${esquerda}%`,
              width: `${largura}%`
            }}
          />

          <View
            className="absolute h-full -z-10"
            style={{
              width: `${progresso}%`,
              backgroundColor: cor
            }}
          />

        </View>
      </View>


      {/* SLIDER INVISÍVEL */}
      <Slider
        value={valor}
        onValueChange={onChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        style={{ width: '100%', height: 40 }}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={cor}
      />

    </View>
  )
}

export default InputRange