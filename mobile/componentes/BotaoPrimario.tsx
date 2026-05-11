import { ReactNode } from "react"
import { Pressable, Text } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

const BotaoPrimario = ({ 
    children,
    className = "",
    onPress,
    tipo = "",
    disabled,
}: { 
    children: ReactNode, 
    className?: string, 
    onPress?: () => void,
    tipo?: string,
    disabled?: boolean
 }) => {

    const escala = useSharedValue(1)
    const Y = useSharedValue(0)

    const animado = useAnimatedStyle(() => ({
        transform: [{ scale: escala.value }, {translateY: Y.value}]
    }))

    const classeBase = `
        rounded-lg p-2 flex justify-center items-center transition-colors
        duration-300 ${disabled ? `` : `cursor-pointer`}`
    const classeTipo = `
    ${
        tipo === 'cheio'
        ? `bg-destaque-p-escuro shadow-destaque-p-medio/30`
        : `bg-base-terciaria border-2 border-destaque-p-medio`
    }
    `
    return (
        <Animated.View style={!disabled ? animado : null}> 
            <Pressable
                onPress={() => (
                    onPress?.()
                )}
                onPressIn={() => {
                    escala.value = withSpring(0.9)
                    Y.value = withSpring(2)
                }}
                onPressOut={() => {
                    escala.value = withSpring(1)
                    Y.value = withSpring(0)
                }}
                className={`${classeBase} ${classeTipo} ${className}`}
            >
                <Text className={`
                font-poppins
                ${tipo === 'cheio' 
                ? 'text-base-secundaria' 
                : 'text-destaque-p-escuro'} `}>
                
                
                    {children}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

export default BotaoPrimario