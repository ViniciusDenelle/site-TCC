import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import useTema from '@/contextos/TemaContexto'

type props = {
    tipo?: "text" | "number" | "email",
    valor: string,
    onChange: (text: string) => void,
    placeholder?: string,
    maximo?: number,
    minimo?: number,
    className?: string,
    visivel?: boolean
    abilitado?: boolean
    senha?: boolean
}

const InputSimples = ({
    tipo = 'text',
    valor,
    onChange,
    placeholder,
    maximo,
    minimo,
    className = '',
    visivel = true,
    abilitado = true,
    senha = false

} : props) => {

    const escala = useSharedValue(1)

    const animado = useAnimatedStyle(() => ({
        transform: [{scale: escala.value}]
    }))

    const [valido, setValido] = useState(true)
    const [focado, setFocado] = useState(false)

    const classeBase = ` 
    rounded-xl p-2 border-2 w-full
    ${ abilitado ? 'bg-base-terciaria  text-t-secundaria' 
    : 'bg-base-secundaria text-t-terciaria'}
    ${focado ? "border-destaque-s-medio" : "border-base-quaternaria"}
    ${!valido ? "border-red-500" : ""}`
    
    function dataBind(text: string) {
  if (tipo === "number") {
    const num = Number(text)

    if (isNaN(num)) {
      setValido(false)
      
    }

    if (maximo != null && num > maximo) {
      setValido(false)
      
    }

    if (minimo != null && num < minimo) {
      setValido(false)
    }

  } else {
    if (maximo != null && text.length > maximo) {
      setValido(false)
    }

    if (minimo != null && text.length < minimo) {
      setValido(false)
    }
  }

  setValido(true)
  onChange(text)
}

  const { corIcone } = useTema()

  return (
    <Animated.View
        style={animado}
        className='w-full'
    >
        <TextInput 
            value={valor}
            placeholder={placeholder}
            placeholderTextColor={corIcone}
            keyboardType={tipo === 'number' ? 'numeric' 
              : tipo === 'email' ? 'email-address' 
              : 'default'}
              autoCapitalize={tipo === 'email' || senha ? 'none' : undefined}
            autoCorrect={tipo === 'email' || senha ? false : undefined}
            secureTextEntry={senha || !visivel}
            editable={abilitado}
            onChangeText={dataBind}
            onFocus={() => {
                setFocado(true)
                escala.value = withSpring(1.02)
            }}
            onBlur={() => {
                setFocado(false)
                escala.value = withSpring(0.98)
            }}
            className={`${classeBase} ${className}`}
        />
    </Animated.View>
  )
}

export default InputSimples