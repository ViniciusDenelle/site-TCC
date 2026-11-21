import { useEffect, useMemo } from 'react'

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
    if (!GET) return { calorias: 0, diff: 0 }

    // manter peso não tem velocidade: antes caía no primeiro if e dava 0 kcal
    if (objetivo === 'manter_peso') return { calorias: GET, diff: 0 }

    if (!veloPerda) return { calorias: 0, diff: 0 }

    const diferencaKcal = Math.round((7000 / 7) * veloPerda)

    return {
      // o back valida calDiaria como integer
      calorias: Math.round(
        objetivo === 'perder_peso' ? GET - diferencaKcal : GET + diferencaKcal
      ),
      diff: diferencaKcal
    }
  }, [veloPerda, GET, objetivo])

  const tempoEstimado = useMemo(() => {
    if (!pesoIdeal || !veloPerda)
      return { meses: 0, semanas: 0, previsao: '' }

    const difPeso =
      objetivo === 'perder_peso'
        ? peso - pesoIdeal
        : pesoIdeal - peso

    const semanasTotais = Math.max(0, difPeso / veloPerda)

    const meses = Math.floor(semanasTotais / 4)
    const semanas = Math.round(semanasTotais % 4)

    const hoje = new Date()
    const dias = Math.round(semanasTotais * 7)

    const dataFinal = new Date(hoje)
    dataFinal.setDate(hoje.getDate() + dias)

    return {
      meses,
      semanas,
      previsao: dataFinal.toLocaleDateString('pt-BR')
    }
    // antes faltavam peso e objetivo: mudar só o peso não recalculava
  }, [peso, pesoIdeal, veloPerda, objetivo])

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
    mudarDados('tempo', tempoEstimado)
  }, [tempoEstimado])

  useEffect(() => {
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