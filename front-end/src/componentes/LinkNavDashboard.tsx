import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import Texto from "./Texto"
import WrapperIcone from "./WrapperIcone"

type LinkNavDashboardProps = {
    icone: LucideIcon,
    legenda: string,
    to: string
}

const LinkNavDashboard = ({
    icone: Icone,
    legenda,
    to
}: LinkNavDashboardProps) => {

    return (
        <NavLink
            to={to}
        >
            {({ isActive }) => (
                <div
                    className={`group flex flex-col items-center justify-center
                    shrink-0 rounded-full size-10 ${isActive && `scale-110`}`}
                >
                    <WrapperIcone>
                        <Icone
                            className={`transition-all duration-300 size-full
                                ${isActive
                                    ? `text-destaque-s-escuro group-hover:text-destaque-s-escuro`
                                    : `text-t-terciaria group-hover:text-t-primaria`}`}
                        />
                    </WrapperIcone>

                    <Texto tipo="subtexto" 
                    className={`transition-colors duration-300 font-semibold
                            ${isActive
                            ? `text-destaque-s-escuro 
                                group-hover:text-destaque-s-escuro`
                            : `text-t-secundaria group-hover:text-t-primaria`
                        }`}>
                        {legenda}
                    </Texto>

                    {/* {isActive && (
                    )} */}

                </div>

            )}
        </NavLink>
    )
}

export default LinkNavDashboard