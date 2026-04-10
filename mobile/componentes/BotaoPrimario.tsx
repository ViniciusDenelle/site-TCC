import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

const BotaoPrimario = (
    { children }: { children: ReactNode },
) => {
    const classeBase = `
        flex justify-center items-center p-2 rounded-lg 
        ring-destaque-p-medio bg-base-primaria 
    `

    return (
        <Pressable
        className={`${classeBase}`}>
            
                <Text className="text-t-secundaria">
                    {children}
                </Text>
            
        </Pressable>
    )
}

export default BotaoPrimario