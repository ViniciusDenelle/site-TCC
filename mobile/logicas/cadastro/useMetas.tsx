import { useEffect, useMemo } from 'react'
import useCadastro from './useCadastro'

type UseCadastroReturn = ReturnType<typeof useCadastro>
type props = Pick<UseCadastroReturn, 'dados' | 'GET' | 'mudarDados'>

const useMetas = ({
    dados,
    GET,
    mudarDados,
}: props) => {
    const {
        veloPerda,
        objetivo,
        pesoFinal,
        peso,
        altura,
    } = dados

    const calorias = useMemo(() => {
        if (!veloPerda || !GET) {
            return {
                calorias: 0,
                diff: 0,
            }
        }

        const diferencaKcal =
            (7000 / 7) * Number(veloPerda)

        if (objetivo === 'perder_peso') {
            return {
                calorias: Math.round(GET - diferencaKcal),
                diff: diferencaKcal,
            }
        }

        if (objetivo === 'ganhar_peso') {
            return {
                calorias: Math.round(GET + diferencaKcal),
                diff: diferencaKcal,
            }
        }

        return {
            calorias: GET,
            diff: 0,
        }
    }, [veloPerda, GET, objetivo])

    const tempoEstimado = useMemo(() => {
        if (!pesoFinal || !veloPerda) {
            return {
                meses: 0,
                semanas: 0,
                previsao: '',
            }
        }

        let difPeso =
            objetivo === 'perder_peso'
                ? peso - pesoFinal
                : pesoFinal - peso

        /*
          evita número negativo
        */
        difPeso = Math.max(difPeso, 0)

        const semanasTotais =
            difPeso / Number(veloPerda)

        const meses = Math.floor(
            semanasTotais / 4
        )

        const semanas = Math.round(
            semanasTotais % 4
        )

        const hoje = new Date()

        const dias = Math.round(
            semanasTotais * 7
        )

        const dataFinal = new Date(hoje)

        dataFinal.setDate(
            hoje.getDate() + dias
        )

        return {
            meses,
            semanas,
            previsao:
                dataFinal.toLocaleDateString(
                    'pt-BR'
                ),
        }
    }, [
        pesoFinal,
        veloPerda,
        objetivo,
        peso,
    ])

    /*
      min max peso
    */
    const minMaxPeso = useMemo(() => {
        if (!peso || !altura) {
            return {
                min: 0,
                max: 0,
                minRec: 0,
                maxRec: 0,
            }
        }

        if (objetivo === 'perder_peso') {
            return {
                min: Math.round(
                    peso - peso * 0.5
                ),

                max: Math.round(peso),


                minRec: Math.round(
                    18.5 *
                    ((altura * altura) / 10000)
                ),

                maxRec: Math.round(peso),
            }
        }

        return {
            min: Math.round(peso),

            max: Math.round(
                peso + peso * 0.7
            ),

            minRec: Math.round(peso),

            /*
              IMC 28.9
            */
            maxRec: Math.round(
                28.9 *
                ((altura * altura) / 10000)
            ),
        }
    }, [
        peso,
        altura,
        objetivo,
    ])

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
        minMaxPeso,
    }
}

export default useMetas