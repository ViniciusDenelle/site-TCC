import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

type Tema = string

type TemaContextType = [
  Tema,
  () => void
]

interface TemaContextoProviderProps {
  children: ReactNode
}

const TemaContexto =
  createContext<TemaContextType | null>(null)

export function TemaContextoProvider({
  children
}: TemaContextoProviderProps) {

  const [tema, setTema] = useState<Tema>(
    localStorage.getItem('tema') ?? ''
  )

  document.documentElement.dataset.theme = tema

  function alterarTema() {

    const temaFinal =
      tema === 'dark'
        ? ''
        : 'dark'

    document.documentElement.dataset.theme =
      temaFinal

    setTema(temaFinal)

    localStorage.setItem('tema', temaFinal)
  }

  return (
    <TemaContexto.Provider
      value={[tema, alterarTema]}
    >
      {children}
    </TemaContexto.Provider>
  )
}

export default TemaContexto