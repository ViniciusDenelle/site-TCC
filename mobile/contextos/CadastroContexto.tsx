import useCadastro from "@/logicas/cadastro/useCadastro";
import { createContext, ReactNode, useContext } from "react";

type UseCadastroReturn = ReturnType<typeof useCadastro>

const CadastroContext = createContext<UseCadastroReturn | null>(null)

export const CadastroProvider = ({children}: {children: ReactNode}) => {
    const cadastro = useCadastro()

    return (
        <CadastroContext.Provider value={cadastro}>
            {children}
        </CadastroContext.Provider>
    )
}

const useCadastroContext = () => {
    const contexto = useContext(CadastroContext)

    if (!contexto) {
    throw new Error('useCadastroContext precisa estar dentro do Provider')
    }

    return contexto
} 

export default useCadastroContext