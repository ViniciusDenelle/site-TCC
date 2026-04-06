import { useEffect, useMemo } from "react"

const useMetas = (dados, mudarDados) => {
    const {
        veloPerda, 
        GET, 
        objetivo, 
        pesoFinal, 
        peso, 
        altura
    } = dados


    const calorias = useMemo(() => {
        if(!veloPerda || !GET) return {calorias: 0, diff: 0}

        const diferencaKcal = (7000 / 7 * veloPerda)

        if(objetivo === 'perder_peso'){
            return {calorias: GET - diferencaKcal, diff: diferencaKcal} 
        } else if(objetivo === 'ganhar_peso'){
            return {calorias: GET + diferencaKcal, diff: diferencaKcal} 
        } else  {
            return {calorias: GET } 
        }
    }, [veloPerda, GET, objetivo])


    const tempoEstimado = useMemo(() => {
        if(!pesoFinal || !veloPerda) return {meses: 0, semanas: 0, previsao: ''}

        let difPeso = objetivo === 'perder_peso'
        ? peso - pesoFinal
        : pesoFinal - peso

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
    }, [pesoFinal, veloPerda])

    const minMaxPeso = useMemo(() => {
        if (objetivo === 'perder_peso'){
            return {
                min: Math.round( peso - (peso * 0.5)),
                max: peso ,
                minRec: Math.round(18.5 * ((altura * altura) / 10000)) ,
                maxRec: peso
            }
        } else {
             return {
                min: peso,
                max: Math.round(peso + (peso * 0.7)) ,
                minRec: peso ,
                maxRec: Math.round(28.9 * ((altura * altura) / 10000))
            }
        } 

    }, [peso, altura])

    useEffect(() => {
        if (!tempoEstimado) return
        mudarDados('tempo', tempoEstimado)
    }, [tempoEstimado])

    useEffect(() => {
        if (!calorias) return
        mudarDados('calDiaria', calorias.calorias)
    }, [calorias])

    return {
        calorias,
        tempoEstimado,
        minMaxPeso
    }
}

export default useMetas