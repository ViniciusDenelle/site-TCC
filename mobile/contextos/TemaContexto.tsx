
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import temas from '../app/tema'

type Tema = keyof typeof temas;

type TipoTemaContext = {
    tema: Tema,
    temaAtual: typeof temas[Tema],
    setTema: (tema: Tema) => void;
    formatarCor: (color: string, opacidade: number) => string
    corIcone: string
}

const TemaContexto = createContext<TipoTemaContext | null>(null)

export const TemaProvider = ({ children }: { children: ReactNode }) => {
    const [tema, setTema] = useState<Tema>("light");

    const formatarCor = (color: string, opacidade: number) => {
        const formatted = color.replace(/\s+/g, ', ')
        return `rgba(${formatted}, ${opacidade})`
    }

    const corIcone = formatarCor(temas[tema]['--color-t-secundaria'], 1)

    return (
        <TemaContexto.Provider
        value={{
            tema: tema,
            temaAtual: temas[tema],
            setTema: setTema,
            formatarCor,
            corIcone
        }}>
            {children}
        </TemaContexto.Provider>
    )
}

const useTema = () => {
  const contexto = useContext(TemaContexto);

  if (!contexto) {
    throw new Error("useTema deve ser usado dentro do TemaProvider");
  }

  return contexto;
};

export default useTema