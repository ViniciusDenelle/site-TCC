
import { createContext, ReactNode, useContext } from "react";
import useFetchUsuario, { RetornoUsuario } from "../logicas/querys/FetchUsuario";


type UsuarioProviderProps = {
    children: ReactNode
}

const UsuarioContext = createContext<RetornoUsuario | null>(null)

export const UsuarioProvider = ({
    children
} : UsuarioProviderProps) => {

    const {dadosUsuario} = useFetchUsuario()

    return (
        <UsuarioContext.Provider value={dadosUsuario}>
            {children}
        </UsuarioContext.Provider>
    )
}

const useUsuarioContexto = () => {
    const usuario = useContext(UsuarioContext);

  if (!usuario) {
    throw new Error("useTema deve ser usado dentro do TemaProvider");
  }

  return usuario;
}