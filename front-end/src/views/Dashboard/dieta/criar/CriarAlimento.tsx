import { useState, useMemo } from 'react'
import { Apple, Scale, Flame, Plus, Calculator, PieChart } from 'lucide-react'

import Texto from '../../../../componentes/organizacao/Texto'
import InputSimples from '../../../../componentes/inputs/InputSimples'
import InputTextarea from '../../../../componentes/inputs/InputTextarea'
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario'
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone'

export interface AlimentoModel {
  nome: string
  categoria: string
  quantidadePorcao: number | ''
  unidadeMedida: string
  calorias: number | ''
  proteinas: number | ''
  carboidratos: number | ''
  gorduras: number | ''
  fibras: number | ''
  observacoes: string
}

const CriarAlimento = () => {
  // Estado do formulário principal
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [quantidadePorcao, setQuantidadePorcao] = useState<number | ''>(100)
  const [unidadeMedida, setUnidadeMedida] = useState('g')
  
  const [calorias, setCalorias] = useState<number | ''>('')
  const [proteinas, setProteinas] = useState<number | ''>('')
  const [carboidratos, setCarboidratos] = useState<number | ''>('')
  const [gorduras, setGorduras] = useState<number | ''>('')
  const [fibras, setFibras] = useState<number | ''>('')
  const [observacoes, setObservacoes] = useState('')

  // Estado para simulação de porção rápida
  const [simulacaoQuantidade, setSimulacaoQuantidade] = useState<number | ''>(100)

  // Cálculos automáticos de distribuição de macros
  const estatisticas = useMemo(() => {
    const prot = Number(proteinas) || 0
    const carb = Number(carboidratos) || 0
    const gord = Number(gorduras) || 0

    const calProt = prot * 4
    const calCarb = carb * 4
    const calGord = gord * 9

    const totalCalCalculada = calProt + calCarb + calGord

    return {
      totalCalCalculada,
      percProt: totalCalCalculada > 0 ? Math.round((calProt / totalCalCalculada) * 100) : 0,
      percCarb: totalCalCalculada > 0 ? Math.round((calCarb / totalCalCalculada) * 100) : 0,
      percGord: totalCalCalculada > 0 ? Math.round((calGord / totalCalCalculada) * 100) : 0,
    }
  }, [proteinas, carboidratos, gorduras])

  // Cálculo da simulação de porção
  const simulacaoValores = useMemo(() => {
    const qtdBase = Number(quantidadePorcao) || 1
    const qtdSimulada = Number(simulacaoQuantidade) || 0
    const fator = qtdSimulada / qtdBase

    return {
      calorias: Math.round((Number(calorias) || 0) * fator),
      proteinas: (Number(proteinas) || 0) * fator,
      carboidratos: (Number(carboidratos) || 0) * fator,
      gorduras: (Number(gorduras) || 0) * fator,
      fibras: (Number(fibras) || 0) * fator,
    }
  }, [quantidadePorcao, simulacaoQuantidade, calorias, proteinas, carboidratos, gorduras, fibras])

  function salvarAlimento(e: React.FormEvent) {
    e.preventDefault()

    if (!nome.trim()) {
      alert('Por favor, informe o nome do alimento.')
      return
    }

    if (calorias === '' || calorias < 0) {
      alert('Por favor, informe as calorias válidas para a porção base.')
      return
    }

    const novoAlimento: AlimentoModel = {
      nome: nome.trim(),
      categoria,
      quantidadePorcao,
      unidadeMedida,
      calorias,
      proteinas: proteinas || 0,
      carboidratos: carboidratos || 0,
      gorduras: gorduras || 0,
      fibras: fibras || 0,
      observacoes,
    }

    console.log('Alimento cadastrado:', novoAlimento)
    alert('Alimento cadastrado com sucesso!')
  }

  return (
    <div className="min-h-screen w-full py-6">
      <form onSubmit={salvarAlimento} className="container mx-auto flex flex-col gap-4">
        
        {/* Cabeçalho */}
        <div className="flex gap-2 items-center">
          <WrapperIcone>
            <Apple className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Cadastrar Novo Alimento
          </Texto>
        </div>

        <Texto tipo="subtexto" className="opacity-50 -mt-2">
          Adicione informações nutricionais completas para expandir a biblioteca de alimentos
        </Texto>

        {/* Informações Básicas */}
        <Texto tipo="titulo" className="font-thin mt-2">
          Nome do Alimento
        </Texto>
        <InputSimples
          tipo="text"
          valor={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="ex: Peito de Frango Grelhado, Arroz Integral, Banana..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Texto tipo="titulo" className="font-thin mb-1">
              Categoria
            </Texto>
            <InputSimples
              tipo="text"
              valor={categoria}
              onChange={e => setCategoria(e.target.value)}
              placeholder="ex: Proteínas, Frutas, Grãos"
            />
          </div>

          <div>
            <Texto tipo="titulo" className="font-thin mb-1">
              Porção Base
            </Texto>
            <InputSimples
              tipo="number"
              valor={quantidadePorcao}
              onChange={e => setQuantidadePorcao(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="ex: 100"
            />
          </div>

          <div>
            <Texto tipo="titulo" className="font-thin mb-1">
              Unidade de Medida
            </Texto>
            <InputSimples
              tipo="text"
              valor={unidadeMedida}
              onChange={e => setUnidadeMedida(e.target.value)}
              placeholder="ex: g, ml, unidade, colher de sopa"
            />
          </div>
        </div>

        {/* Tabela Nutricional da Porção Base */}
        <div className="p-4 rounded-2xl bg-base-terciaria/70 shadow-md shadow-gray-900/20 flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-2">
            <WrapperIcone>
              <Scale className="size-full" />
            </WrapperIcone>
            <Texto tipo="subtitulo">
              Valores Nutricionais (por porção de {quantidadePorcao || 0}{unidadeMedida})
            </Texto>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="text-xs opacity-60 block mb-1">Calorias (kcal)*</label>
              <InputSimples
                tipo="number"
                valor={calorias}
                onChange={e => setCalorias(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="kcal"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-1">Proteínas (g)</label>
              <InputSimples
                tipo="number"
                valor={proteinas}
                onChange={e => setProteinas(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="g"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-1">Carboidratos (g)</label>
              <InputSimples
                tipo="number"
                valor={carboidratos}
                onChange={e => setCarboidratos(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="g"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-1">Gorduras (g)</label>
              <InputSimples
                tipo="number"
                valor={gorduras}
                onChange={e => setGorduras(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="g"
              />
            </div>

            <div>
              <label className="text-xs opacity-60 block mb-1">Fibras (g)</label>
              <InputSimples
                tipo="number"
                valor={fibras}
                onChange={e => setFibras(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="g"
              />
            </div>
          </div>
        </div>

        {/* Resumo da Distribuição de Macros */}
        {estatisticas.totalCalCalculada > 0 && (
          <div className="p-4 rounded-xl bg-base-secundaria border border-base-terciaria/40 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PieChart className="size-4 opacity-70" />
              <Texto tipo="subtitulo" className="text-sm">
                Distribuição Calórica Estimada
              </Texto>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-base-terciaria/40">
                <span className="block opacity-60">🥩 Proteínas</span>
                <strong>{estatisticas.percProt}%</strong>
              </div>
              <div className="p-2 rounded-lg bg-base-terciaria/40">
                <span className="block opacity-60">🍞 Carboidratos</span>
                <strong>{estatisticas.percCarb}%</strong>
              </div>
              <div className="p-2 rounded-lg bg-base-terciaria/40">
                <span className="block opacity-60">🥑 Gorduras</span>
                <strong>{estatisticas.percGord}%</strong>
              </div>
            </div>
          </div>
        )}

        {/* Simulador de Porções */}
        <div className="p-4 rounded-2xl bg-base-terciaria/40 border border-base-terciaria/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="size-5 opacity-70" />
              <Texto tipo="subtitulo" className="text-sm">
                Simulador de Porções
              </Texto>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60">Simular quantidade ({unidadeMedida}):</span>
              <InputSimples
                tipo="number"
                valor={simulacaoQuantidade}
                onChange={e => setSimulacaoQuantidade(e.target.value === '' ? '' : Number(e.target.value))}
                classeAdicional="w-24 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs bg-base-secundaria p-3 rounded-xl border border-base-terciaria/30">
            <div>🔥 <strong>Calorias:</strong> {simulacaoValores.calorias} kcal</div>
            <div>🥩 <strong>Proteínas:</strong> {simulacaoValores.proteinas.toFixed(1)}g</div>
            <div>🍞 <strong>Carbs:</strong> {simulacaoValores.carboidratos.toFixed(1)}g</div>
            <div>🥑 <strong>Gorduras:</strong> {simulacaoValores.gorduras.toFixed(1)}g</div>
            <div>🌾 <strong>Fibras:</strong> {simulacaoValores.fibras.toFixed(1)}g</div>
          </div>
        </div>

        {/* Observações / Preparo */}
        <Texto tipo="titulo" className="font-thin mt-2">
          Observações / Modo de Preparo
        </Texto>
        <InputTextarea
          valor={observacoes}
          onChange={e => setObservacoes(e.target.value)}
          classeAdicional="h-20"
          placeholder="ex: Pesar alimento cru/cozido, modo de armazenamento ou marcas recomendadas"
        />

        {/* Submissão */}
        <BotaoPrimario
          texto="Salvar Alimento"
          icone={Plus}
          onClick={() => salvarAlimento}
        />
      </form>
    </div>
  )
}

export default CriarAlimento