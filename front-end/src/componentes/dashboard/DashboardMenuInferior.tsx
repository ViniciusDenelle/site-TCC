import LinkNavDashboard from "../links/LinkNavDashboard"
import PlayerInferior from "./player/PlayerInferior"

const DashboardMenuInferior = ({
    linksNav
}) => {

    return (
        <div className="fixed z-100 bottom-0 left-1/2 -translate-x-1/2 w-full md:hidden">
            <div className="container mx-auto">

                <PlayerInferior />

                <nav className="
                        border-base-terciaria border-0 rounded-none bg-base-terciaria/60 
                        py-1 px-5 w-full backdrop-blur-md text-base">

                    <div className="flex items-center justify-between
                            gap-5 shrink-0 overflow-y-visible h-15">

                        {linksNav.map(item => (
                            <LinkNavDashboard
                                key={item.to}
                                icone={item.icone}
                                legenda={item.legenda}
                                to={item.to}
                            />
                        ))}

                    </div>

                </nav>
            </div>
        </div>
    )
}

export default DashboardMenuInferior