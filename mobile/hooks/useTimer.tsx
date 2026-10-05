import { useEffect, useState } from 'react'

export type UseTimerReturn = {
    tempo: number
    segundos: number
    tempoInicial: number
    rodando: boolean
    ativo: boolean
    iniciar: () => void
    pausar: () => void
    reiniciar: () => void
    resetar: () => void
    parar: () => void
    finalizar: () => void
    definirTempo: (tempo: number) => void
}

type UseTimerOptions = {
    tempoInicial?: number
    onFinish?: () => void
}

export default function useTimer({
    tempoInicial = 0,
    onFinish,
}: UseTimerOptions = {}) {

    const [tempo, setTempo] = useState(tempoInicial)
    const [rodando, setRodando] = useState(false)

    useEffect(() => {

        if (!rodando) {
            return
        }

        const intervalo = setInterval(() => {
            setTempo(valor => {
                if (valor <= 1) {
                    clearInterval(intervalo)
                    setRodando(false)
                    onFinish?.()
                    return 0
                }

                return valor - 1
            })
        }, 1000)

        return () => clearInterval(intervalo)

    }, [rodando, onFinish])

    const iniciar = () => {
        setRodando(true)
    }

    const pausar = () => {
        setRodando(false)
    }

    const reiniciar = () => {
        setRodando(false)
        setTempo(tempoInicial)
    }

    const resetar = reiniciar

    const parar = () => {
        setRodando(false)
        setTempo(tempoInicial)
    }

    const finalizar = () => {
        setRodando(false)
        setTempo(0)
        onFinish?.()
    }

    const definirTempo = (novoTempo: number) => {
        setTempo(novoTempo)
    }

    return {
        tempo,
        segundos: tempo,
        tempoInicial,
        rodando,
        ativo: rodando,
        iniciar,
        pausar,
        reiniciar,
        resetar,
        parar,
        finalizar,
        definirTempo,
    }
}