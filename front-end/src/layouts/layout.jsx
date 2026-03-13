import { Outlet } from "react-router-dom"
import BotãoSimples from "../componentes/BotãoSimples"
import { TextAlignJustify } from 'lucide-react'

function LayoutDefault()
{
    return (
        <>
            <header className="absolute top-0 left-0 w-full font-poppins">
                <div className="container mx-auto px-2">

                    <nav className="flex justify-between
                    w-full p-2 px-5 mt-3 rounded-full bg-linear-to-r
                    from-base-terciaria via-base-secundaria
                    to-base-terciaria ring-1 ring-base-terciaria">  

                        <h1 className="text-xl font-bold">
                            site
                        </h1>

                        <BotãoSimples classeAdcional="">
                            <TextAlignJustify/>
                        </BotãoSimples>

                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default LayoutDefault