import useFetchUsuario, { RetornoUsuario } from "@/logicas/querys/FetchUsuarioMutation";
import { createContext, ReactNode, useContext } from "react";

type UsuarioProviderProps = {
    children: ReactNode
}

const UsuarioContext = createContext<RetornoUsuario | null>(null)

export const UsuarioProvider = ({
    children
} : UsuarioProviderProps) => {
    const usuario = useFetchUsuario()

    return (
        <UsuarioContext.Provider value={usuario}>
            {children}
        </UsuarioContext.Provider>
    )
}

const useUsuarioContext = () => {
    const usuario = useContext(UsuarioContext)

    if (!usuario) {
    throw new Error("useTema deve ser usado dentro do TemaProvider");
  }

  return usuario;
}

export default useUsuarioContext