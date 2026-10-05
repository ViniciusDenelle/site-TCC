import { ReactNode } from "react"
import CardHorizontal from "../../../CardHorizontal"
import { Dispatch, SetStateAction } from "react"
import { Pressable, View } from "react-native"

type MenuLayoutProps = {
    menuAberto: boolean
    setMenuAberto: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

const MenuLayout = ({
    menuAberto,
    setMenuAberto,
    children
}: MenuLayoutProps) => {

    return (
        menuAberto ? (
            <View className="absolute inset-0 z-50">
                <Pressable
                    className="absolute inset-0 bg-black/40"
                    onPress={() => setMenuAberto(false)}
                />

                <View className="absolute bottom-0 left-0 w-full">
                    <CardHorizontal className="h-full">
                        <View className="flex flex-col gap-4">
                            <View className="mx-auto mt-2 h-1 w-10 rounded-full bg-t-terciaria/50" />
                            {children}
                        </View>
                    </CardHorizontal>
                </View>
            </View>
        ) : null
    )
}

export default MenuLayout