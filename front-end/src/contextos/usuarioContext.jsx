import { createContext, useState } from "react";

const usuarioContext = createContext({})

export function UsuarioContextProvider({children})
{
    const [usuarioAtual, setUsuarioAtual] = useState('rodolfo')
    const [
        usuarioAtualToken,
        setUsuarioAtualToken
    ] = useState(
        localStorage.getItem('token')
    )

    return(
        <usuarioContext.Provider value={{
            usuarioAtual,
            setUsuarioAtual,
            usuarioAtualToken,
            setUsuarioAtualToken,
        }}>
            {children}
        </usuarioContext.Provider>
    )
}

export default usuarioContext