
import { createContext, ReactNode, useContext, useState } from 'react';
import temas from '../app/tema'

type Tema = keyof typeof temas;

type TipoTemaContext = {
    tema: Tema,
    temaAtual: typeof temas[Tema],
    setTema: (tema: Tema) => void;
}

const TemaContexto = createContext<TipoTemaContext | null>(null)

export const TemaProvider = ({ children }: { children: ReactNode }) => {
    const [tema, setTema] = useState<Tema>("light");

    return (
        <TemaContexto.Provider
        value={{
            tema: tema,
            temaAtual: temas[tema],
            setTema: setTema
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