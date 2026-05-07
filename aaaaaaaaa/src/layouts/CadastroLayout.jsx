import { Outlet } from "react-router-dom"
import { CadastroProvider } from "../contextos/CadastroContexto"

const CadastroLayout = () => {
   
    return (
        <CadastroProvider>
             <Outlet />
        </CadastroProvider>
)}

export default CadastroLayout