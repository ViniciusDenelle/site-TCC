import { useEffect, useState } from 'react'

export type UseTimerReturn = {
    segundos: number
    rodando: boolean
    iniciar: () => void
    pausar: () => void
    resetar: () => void
}

export default function useTimer() {

    const [segundos, setSegundos] = useState(0)
    const [rodando, setRodando] = useState(false)

    useEffect(() => {

        if (!rodando) {
            return
        }

        const intervalo = setInterval(() => {

            setSegundos(valor => valor + 1)

        }, 1000)

        return () => clearInterval(intervalo)

    }, [rodando])

    const iniciar = () => {
        setRodando(true)
    }

    const pausar = () => {
        setRodando(false)
    }

    const resetar = () => {
        setRodando(false)
        setSegundos(0)
    }

    return {
        segundos,
        rodando,
        iniciar,
        pausar,
        resetar,
    }
}