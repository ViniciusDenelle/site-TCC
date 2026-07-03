import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

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
                    shrink-0 rounded-full
                    ${isActive
                            ? `bg-base-terciaria/50 backdrop-blur-md size-20`
                            : `size-18`}`}
                >
                    <Icone
                        size={25}
                        className={`transition-all duration-300
                            ${isActive
                                ? `text-destaque-s-medio group-hover:text-destaque-s-escuro`
                                : `text-t-terciaria group-hover:text-t-primaria`}`}
                    />

                    <span className={`text-md transition-colors duration-300 font-semibold
                            ${isActive
                            ? `text-destaque-s-medio 
                                group-hover:text-destaque-s-escuro`
                            : `text-t-terciaria group-hover:text-t-secundaria`
                        }`}>
                        {legenda}
                    </span>
                    {/* {isActive && (
                    )} */}

                </div>

            )}
        </NavLink>
    )
}

export default LinkNavDashboard