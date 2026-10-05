import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

type temas = 'dark' | 'light'

type Tema = temas

type TemaContextType = [
  Tema,
  (tema?: temas) => void,

]

interface TemaContextoProviderProps {
  children: ReactNode
}

const TemaContexto =
  createContext<TemaContextType | null>(null)

export function TemaContextoProvider({
  children
}: TemaContextoProviderProps) {

  const temaSalvo = localStorage.getItem('tema')

  const [tema, setTema] = useState<Tema>(
    temaSalvo === 'dark' ? 'dark' : 'light'
  )

  document.documentElement.dataset.theme = tema

  function alterarTema(novoTema?: temas) {

    const temaFinal = novoTema ?? (tema === 'dark'
        ? 'light'
        : 'dark')

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