import { useEffect, useMemo } from "react"

interface DadosMetas {
  veloPerda: number
  objetivo: string
  pesoIdeal: number
  peso: number
  altura: number
}

type MudarDados = (campo: string, valor: any) => void

const useMetas = (
  dados: DadosMetas,
  mudarDados: MudarDados,
  GET: number
) => {
  const {
    veloPerda,
    objetivo,
    pesoIdeal,
    peso,
    altura
  } = dados

  const calorias = useMemo(() => {
    if (!veloPerda || !GET)
      return { calorias: 0, diff: 0 }

    const diferencaKcal = (7000 / 7 * veloPerda)

    if (objetivo === 'perder_peso') {
      return {
        calorias: GET - diferencaKcal,
        diff: diferencaKcal
      }
    } else if (objetivo === 'ganhar_peso') {
      return {
        calorias: GET + diferencaKcal,
        diff: diferencaKcal
      }
    } else {
      return { calorias: GET }
    }
  }, [veloPerda, GET, objetivo])

  const tempoEstimado = useMemo(() => {
    if (!pesoIdeal || !veloPerda)
      return { meses: 0, semanas: 0, previsao: '' }

    let difPeso =
      objetivo === 'perder_peso'
        ? peso - pesoIdeal
        : pesoIdeal - peso

    let semanasTotais = difPeso / veloPerda

    let meses = Math.floor(semanasTotais / 4)
    let semanas = Math.round(semanasTotais % 4)

    const hoje = new Date()
    const dias = Math.round(semanasTotais * 7)

    const dataFinal = new Date(hoje)
    dataFinal.setDate(hoje.getDate() + dias)

    return {
      meses,
      semanas,
      previsao: dataFinal.toLocaleDateString("pt-BR")
    }
  }, [pesoIdeal, veloPerda])

  const minMaxPeso = useMemo(() => {
    if (objetivo === 'perder_peso') {
      return {
        min: Math.round(peso - (peso * 0.5)),
        max: peso - 1,
        minRec: Math.round(18.5 * ((altura * altura) / 10000)),
        maxRec: peso - 1
      }
    } else if (objetivo === 'ganhar_peso') {
      return {
        min: peso + 1,
        max: Math.round(peso + (peso * 0.7)),
        minRec: peso + 1,
        maxRec: Math.round(28.9 * ((altura * altura) / 10000))
      }
    } else {
      return {
        min: Math.round(peso - (peso * 0.3)),
        max: Math.round(peso + (peso * 0.4)),
        minRec: Math.round(18.5 * ((altura * altura) / 10000)),
        maxRec: Math.round(24.9 * ((altura * altura) / 10000))
      }
    }
  }, [peso, altura, objetivo])

  useEffect(() => {
    if (!tempoEstimado) return
    mudarDados('tempo', tempoEstimado)
  }, [tempoEstimado])

  useEffect(() => {
    if (!calorias) return
    mudarDados('calDiaria', calorias.calorias)
  }, [calorias])

  useEffect(() => {
    if (objetivo !== 'manter_peso') return 
    mudarDados('pesoMinimo', minMaxPeso.minRec)
    mudarDados('pesoMaximo', minMaxPeso.maxRec)

  }, [objetivo, minMaxPeso])

  return {
    calorias,
    tempoEstimado,
    minMaxPeso
  }
}

export default useMetas