import LinkNavDashboard from "../links/LinkNavDashboard"
import PlayerInferior from "./player/PlayerInferior"
import { View } from "react-native"

const DashboardMenuInferior = ({
    setModalPlayer,
    linksNav
}) => {

    return (
        <View className="absolute bottom-0 left-0 z-40 w-full md:hidden">
            <View className="mx-auto w-full">

                <PlayerInferior
                    setModalPlayer={setModalPlayer}
                />

                <View className="
                        border-base-terciaria border-0 rounded-none bg-base-terciaria/60 
                        py-1 px-5 w-full backdrop-blur-md text-base">

                    <View className="flex-row items-center justify-between
                            gap-5 shrink-0 overflow-y-visible h-15">

                        {linksNav.map(item => (
                            <LinkNavDashboard
                                key={item.to}
                                icone={item.icone}
                                legenda={item.legenda}
                                to={item.to}
                            />
                        ))}

                    </View>

                </View>
            </View>
        </View>
    )
}

export default DashboardMenuInferior