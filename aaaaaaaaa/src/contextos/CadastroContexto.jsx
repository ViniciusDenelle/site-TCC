import { Children, createContext, useEffect } from "react";
import useCadastro from '../logicas/cadastro/useCadastro'

const CadastroContext = createContext()

export const CadastroProvider = ({children}) => {
    const dados = useCadastro()

    return (
        <CadastroContext.Provider 
        value={dados}>
            {children}
        </CadastroContext.Provider>
    )
}

export default CadastroContext