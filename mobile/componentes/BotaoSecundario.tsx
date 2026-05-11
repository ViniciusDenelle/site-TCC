import { ReactNode } from "react"
import { Pressable, Text } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

const BotaoSecundario = ({ 
    children,
    className = "",
    onPress,
    tipo = "",
    disabled,
}: { 
    children: ReactNode, 
    className?: string, 
    onPress?: () => void,
    tipo?: 'cheio' | '',
    disabled?: boolean
 }) => {

    const escala = useSharedValue(1)

    const animado = useAnimatedStyle(() => ({
        transform: [{ scale: escala.value }]
    }))

    const classeBase = `
        rounded-lg p-2 flex justify-center items-center transition-colors
        duration-300 ${disabled ? `` : `cursor-pointer`}`
    const classeTipo = `
    ${
        tipo === 'cheio'
        ? `bg-destaque-s-escuro shadow-destaque-s-medio/30`
        : `bg-base-terciaria border-2 border-destaque-s-medio`
    }
    `
    return (
        <Animated.View style={animado}> 
            <Pressable
                onPress={() => (
                    onPress?.()
                )}
                onPressIn={() => {
                    escala.value = withSpring(0.95)
                }}
                onPressOut={() => {
                    escala.value = withSpring(1)
                }}
                className={`${classeBase} ${classeTipo} ${className}`}
            >
                <Text className={`
                font-poppins
                ${tipo === 'cheio' 
                ? 'text-base-secundaria' 
                : 'text-destaque-s-escuro'} `}>
                    {children}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

export default BotaoSecundario