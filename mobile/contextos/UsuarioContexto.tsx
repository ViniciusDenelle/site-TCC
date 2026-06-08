import useCadastro from "@/logicas/cadastro/useCadastro";
import { createContext, ReactNode } from "react";

type usuarioContextoProps = {
    
}
type UsuarioProviderProps = {
    children: ReactNode
}

const UsuarioContext = createContext<usuarioContextoProps | null>(null)

const UsuarioProvider = ({
    children
} : UsuarioProviderProps) => {

    return (
        <UsuarioContext.Provider value={}>
            {children}
        </UsuarioContext.Provider>
    )
}