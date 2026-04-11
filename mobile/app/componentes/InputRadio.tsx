import { View, Text, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type props = {
    valor: string,
    selecionado: string,
    onChange: (valor: string) => void
    children: ReactNode
    semBolinha?: boolean
    className?: string
}

const InputRadio = ({
    valor,
    selecionado,
    onChange,
    children,
    semBolinha = false,
    className = ''
} : props) => {
    const escala = useSharedValue(1)

    const animado = useAnimatedStyle(() => ({
        transform: [{scale: escala.value}]
    }))

    const ativo = selecionado === valor

    const classeBase = `
        flex-row gap-2 items-center justify-center
        border-2 rounded-lg w-36 h-12
        ${ativo ? "border-destaque-s-escuro bg-base-secundaria" 
        : "border-base-quaternaria bg-base-terciaria"}
    `

  return (
    <Animated.View style={animado}>
        <Pressable
            onPress={() => onChange(valor)}
            onPressIn={() => {
                escala.value = withSpring(1.05)
            }}
            onPressOut={() => {
                escala.value = withSpring(0.95)
            }}
            className={`${classeBase} ${className}`}
        >
            {!semBolinha && (
                <View className="p-1 rounded-full border border-base-quaternaria">
                    <View
                    className={`w-2.5 h-2.5 rounded-full ${
                        ativo ? "bg-destaque-s-escuro" : "bg-transparent"
                    }`}
                    />
                </View>
            )}
            <Text className='text-t-secundaria font-poppins'>
                {children}
            </Text>
        </Pressable>
    </Animated.View>
  )
}

export default InputRadio