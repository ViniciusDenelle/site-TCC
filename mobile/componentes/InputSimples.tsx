import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type props = {
    tipo?: "text" | "number",
    valor: string,
    onChange: (text: string) => void,
    placeholder?: string,
    maximo?: number,
    minimo?: number,
    className?: string,
}

const InputSimples = ({
    tipo = 'text',
    valor,
    onChange,
    placeholder,
    maximo,
    minimo,
    className = ''
} : props) => {

    const escala = useSharedValue(1)

    const animado = useAnimatedStyle(() => ({
        transform: [{scale: escala.value}]
    }))

    const [valido, setValido] = useState(true)
    const [focado, setFocado] = useState(false)

    const classeBase = ` 
    rounded-xl p-2 border-2
    bg-base-terciaria w-full text-t-secundaria
    ${focado ? "border-destaque-s-medio" : "border-base-quaternaria"}
    ${!valido ? "border-red-500" : ""}`
    
    function dataBind(text: string)
    {   
        if (tipo === "number") {
        const num = Number(text)
            if (maximo && num > maximo) return setValido(false)
            if (minimo && num < minimo) return setValido(false)
        } else {
            if (maximo && text.length > maximo) return setValido(false)
            if (minimo && text.length < minimo) return setValido(false)
        }

        setValido(true)
        onChange(text)
    }
  return (
    <Animated.View
        style={animado}
        className='w-full'
    >
        <TextInput 
            value={valor}
            placeholder={placeholder}
            keyboardType={tipo === 'number' ? 'numeric' : 'default'}
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