import { useEffect, useState } from 'react'
import { PieChart, Copy } from 'lucide-react'
import Texto from '../organizacao/Texto'

interface Totais {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
}

interface Metas {
  calorias: number | ''
  proteinas: number | ''
  carboidratos: number | ''
  gorduras: number | ''
}

interface Distribuicao {
  percProt: number
  percCarb: number
  percGord: number
}

interface DadosNutricionais {
  totais: Totais
  metas: Metas
  distribuicao: Distribuicao
}

interface ResumoNutricionalDiaProps {
  labelDia?: string
  totais?: Totais
  metas?: Metas
  distribuicao?: Distribuicao
  temRefeicoes: boolean
  onCopiarCardapio: () => void
  dia?: string
  dietaId?: number | string
}

const dadosMock: DadosNutricionais = {
  totais: {
    calorias: 2350,
    proteinas: 150,
    carboidratos: 260,
    gorduras: 70,
  },

  metas: {
    calorias: 2400,
    proteinas: 160,
    carboidratos: 280,
    gorduras: 75,
  },

  distribuicao: {
    percProt: 26,
    percCarb: 44,
    percGord: 30,
  },
}

const API_URL = 'http://127.0.0.1:8000/api'

export const ResumoNutricionalDia = ({
  labelDia,
  totais,
  metas,
  distribuicao,
  temRefeicoes,
  onCopiarCardapio,
  dia,
  dietaId,
}: ResumoNutricionalDiaProps) => {

  const [dados, setDados] = useState<DadosNutricionais>({
    totais: totais ?? dadosMock.totais,
    metas: metas ?? dadosMock.metas,
    distribuicao: distribuicao ?? dadosMock.distribuicao,
  })

  const [carregando, setCarregando] = useState(false)

  useEffect(() => {

    if (!dietaId) {
      return
    }

    const carregarDados = async () => {

      try {

        setCarregando(true)

        let endpoint = `${API_URL}/dietas/${dietaId}/nutricao`

        if (dia) {
          endpoint += `?dia=${encodeURIComponent(dia)}`
        }

        const resposta = await fetch(endpoint)

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os dados nutricionais')
        }

        const dadosApi = await resposta.json()

        setDados({
          totais: dadosApi.totais ?? dadosMock.totais,
          metas: dadosApi.metas ?? dadosMock.metas,
          distribuicao:
            dadosApi.distribuicao ?? dadosMock.distribuicao,
        })

      } catch (erro) {

        console.log(
          'API indisponível. Utilizando dados mockados.',
          erro
        )

        setDados({
          totais: totais ?? dadosMock.totais,
          metas: metas ?? dadosMock.metas,
          distribuicao:
            distribuicao ?? dadosMock.distribuicao,
        })

      } finally {

        setCarregando(false)

      }
    }

    carregarDados()

  }, [
    dietaId,
    dia,
    totais,
    metas,
    distribuicao,
  ])

  const totaisAtuais = dados.totais
  const metasAtuais = dados.metas
  const distribuicaoAtual = dados.distribuicao

  return (
    <div className="p-4 rounded-2xl bg-base-terciaria/70 shadow-md shadow-gray-900/20 flex flex-col gap-4">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

        <Texto
          tipo="subtitulo"
          className="flex items-center gap-2 capitalize"
        >
          <PieChart className="size-5 opacity-70" />

          Balanço do Dia: {labelDia ?? 'Dia'}

        </Texto>

        {temRefeicoes && (
          <button
            type="button"
            onClick={onCopiarCardapio}
            className="
              flex
              items-center
              gap-1.5
              text-xs
              opacity-70
              hover:opacity-100
              bg-base-secundaria
              px-3
              py-1.5
              rounded-lg
              border
              border-base-terciaria/40
              transition-colors
            "
          >
            <Copy className="size-3.5" />

            Copiar este cardápio para os outros dias

          </button>
        )}

      </div>


      {carregando && (
        <span className="text-xs opacity-50">
          Carregando dados nutricionais...
        </span>
      )}


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">

        {/* CALORIAS */}

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">

          <span className="block opacity-60 mb-0.5">
            🔥 Calorias
          </span>

          <strong className="text-sm">
            {totaisAtuais.calorias} kcal
          </strong>

          {metasAtuais.calorias !== '' && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metasAtuais.calorias} kcal (
              {totaisAtuais.calorias -
                Number(metasAtuais.calorias)} kcal)
            </span>
          )}

        </div>


        {/* PROTEÍNAS */}

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">

          <span className="block opacity-60 mb-0.5">
            🥩 Proteínas
          </span>

          <strong className="text-sm">
            {totaisAtuais.proteinas}g
          </strong>

          {metasAtuais.proteinas !== '' && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metasAtuais.proteinas}g (
              {totaisAtuais.proteinas -
                Number(metasAtuais.proteinas)}g)
            </span>
          )}

        </div>


        {/* CARBOIDRATOS */}

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">

          <span className="block opacity-60 mb-0.5">
            🍞 Carboidratos
          </span>

          <strong className="text-sm">
            {totaisAtuais.carboidratos}g
          </strong>

          {metasAtuais.carboidratos !== '' && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metasAtuais.carboidratos}g (
              {totaisAtuais.carboidratos -
                Number(metasAtuais.carboidratos)}g)
            </span>
          )}

        </div>


        {/* GORDURAS */}

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">

          <span className="block opacity-60 mb-0.5">
            🥑 Gorduras
          </span>

          <strong className="text-sm">
            {totaisAtuais.gorduras}g
          </strong>

          {metasAtuais.gorduras !== '' && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metasAtuais.gorduras}g (
              {totaisAtuais.gorduras -
                Number(metasAtuais.gorduras)}g)
            </span>
          )}

        </div>

      </div>


      {totaisAtuais.calorias > 0 && (

        <div className="pt-2 border-t border-base-terciaria/40">

          <span className="text-xs opacity-60 block mb-2">
            Divisão Calórica de {labelDia ?? 'Dia'} (%):
          </span>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">

            <div className="p-2 rounded-lg bg-base-secundaria">

              <span className="opacity-60">
                Proteínas:
              </span>

              <strong>
                {distribuicaoAtual.percProt}%
              </strong>

            </div>


            <div className="p-2 rounded-lg bg-base-secundaria">

              <span className="opacity-60">
                Carboidratos:
              </span>

              <strong>
                {distribuicaoAtual.percCarb}%
              </strong>

            </div>


            <div className="p-2 rounded-lg bg-base-secundaria">

              <span className="opacity-60">
                Gorduras:
              </span>

              <strong>
                {distribuicaoAtual.percGord}%
              </strong>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
