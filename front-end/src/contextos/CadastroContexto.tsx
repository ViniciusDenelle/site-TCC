import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import useCadastro, { UseCadastroReturn } from '../logicas/cadastro/useCadastro.js'

interface CadastroContextType {
  [key: string]: unknown
}

interface CadastroProviderProps {
  children: ReactNode
}

const CadastroContext = createContext<CadastroContextType | null>(null)

export const CadastroProvider = ({
  children
}: CadastroProviderProps) => {

  const dados = useCadastro()

  return (
    <CadastroContext.Provider value={dados}>
      {children}
    </CadastroContext.Provider>
  )
}

export default function useCadastroContexto() {
  const dados = useContext(CadastroContext) as UseCadastroReturn | null
  return dados
}