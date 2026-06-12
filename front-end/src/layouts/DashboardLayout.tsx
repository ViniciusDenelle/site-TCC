import { Outlet } from "react-router-dom"
import { UsuarioProvider } from "../contextos/UsuarioContexto"


const DashboardLayout = () => {

    return (
        <UsuarioProvider>
            <Outlet/>
        </UsuarioProvider>
    )
}

export default DashboardLayout