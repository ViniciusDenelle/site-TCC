
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import temas from '../app/tema'

type Tema = keyof typeof temas;

type TipoTemaContext = {
    tema: Tema,
    temaAtual: typeof temas[Tema],
    setTema: (tema: Tema) => void;
    alternarTema: (tema?: Tema) => void;
    formatarCor: (color: string, opacidade: number) => string
    corIcone: string
}

const TemaContexto = createContext<TipoTemaContext | null>(null)

export const TemaProvider = ({ children }: { children: ReactNode }) => {
    const [tema, setTema] = useState<Tema>("light");
    const [carregado, setCarregado] = useState(false)

    useEffect(() => {
        let ativo = true

        async function carregarTema() {
            const temaSalvo = await AsyncStorage.getItem('tema')

            if (!ativo) {
                return
            }

            if (temaSalvo === 'dark' || temaSalvo === 'light') {
                setTema(temaSalvo)
            }

            setCarregado(true)
        }

        carregarTema()

        return () => {
            ativo = false
        }
    }, [])

    useEffect(() => {
        if (!carregado) {
            return
        }

        AsyncStorage.setItem('tema', tema).catch(() => undefined)
    }, [carregado, tema])

    const formatarCor = (color: string, opacidade: number) => {
        const formatted = color.replace(/\s+/g, ', ')
        return `rgba(${formatted}, ${opacidade})`
    }

    const temaAtual = useMemo(() => temas[tema], [tema])

    const corIcone = useMemo(
        () => formatarCor(temaAtual['--color-t-secundaria'], 1),
        [temaAtual]
    )

    function alternarTema(novoTema?: Tema) {
        setTema((temaAtual) => novoTema ?? (temaAtual === 'dark' ? 'light' : 'dark'))
    }

    return (
        <TemaContexto.Provider
        value={{
            tema: tema,
            temaAtual,
            setTema: setTema,
            alternarTema,
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