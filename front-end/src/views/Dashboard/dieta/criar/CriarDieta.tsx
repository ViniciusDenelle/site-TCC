import { useState, useMemo, useRef } from 'react'
import { Plus, Utensils, Clock, Target, FileText, Calendar } from 'lucide-react'

import Texto from '../../../../componentes/organizacao/Texto'
import InputSimples from '../../../../componentes/inputs/InputSimples'
import InputTextarea from '../../../../componentes/inputs/InputTextarea'
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario'
import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario'
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone'

import { CardRefeicao } from '../../../../componentes/dieta/CardRefeicao'
import { SeletorDias } from '../../../../componentes/dieta/SeletorDias'
import { ResumoNutricionalDia } from '../../../../componentes/dieta/ResumoNutricionalDia'
import { AlimentoFormulario, RefeicaoFormulario, DiaSemana } from '../../../../componentes/dieta/types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

const DIAS_DA_SEMANA: DiaSemana[] = [
  { id: 'segunda', label: 'Segunda-feira', short: 'Seg' },
  { id: 'terca', label: 'Terça-feira', short: 'Ter' },
  { id: 'quarta', label: 'Quarta-feira', short: 'Qua' },
  { id: 'quinta', label: 'Quinta-feira', short: 'Qui' },
  { id: 'sexta', label: 'Sexta-feira', short: 'Sex' },
  { id: 'sabado', label: 'Sábado', short: 'Sáb' },
  { id: 'domingo', label: 'Domingo', short: 'Dom' },
]

const numeroOuNull = (v: number | string | '') =>
  v === '' || v === null || v === undefined ? null : Number(v)

const CriarDieta = () => {
  // --- Metadados da Dieta ---
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [nivel, setNivel] = useState('')
  const [duracao, setDuracao] = useState('')
  const [metaAgua, setMetaAgua] = useState<number | ''>(3)

  // --- Metas Nutricionais Diárias ---
  const [metasAlvo, setMetasAlvo] = useState({
    calorias: '' as number | '',
    proteinas: '' as number | '',
    carboidratos: '' as number | '',
    gorduras: '' as number | '',
  })

  // --- Estrutura dos Dias ---
  const [diaAtivo, setDiaAtivo] = useState('segunda')
  const [refeicoesPorDia, setRefeicoesPorDia] = useState<Record<string, RefeicaoFormulario[]>>({
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: [],
  })

  // --- Formulário de Nova Refeição ---
  const [nomeNovaRefeicao, setNomeNovaRefeicao] = useState('')
  const [horarioNovaRefeicao, setHorarioNovaRefeicao] = useState('')
  const [refeicaoAberta, setRefeicaoAberta] = useState<string | null>(null)
  const [observacoesFinais, setObservacoesFinais] = useState('')

  // --- Envio para o back-end ---
  const [salvando, setSalvando] = useState(false)
  const [erros, setErros] = useState<Record<string, string[]>>({})
  const salvandoRef = useRef(false) // evita envio duplicado

  // Refeições do dia selecionado
  const refeicoesDoDia = useMemo(() => refeicoesPorDia[diaAtivo] || [], [refeicoesPorDia, diaAtivo])

  // CÁLCULOS DO DIA ATIVO
  const totaisDiaAtual = useMemo(() => {
    return refeicoesDoDia.reduce(
      (acc, refeicao) => {
        refeicao.alimentos.forEach(alimento => {
          acc.calorias += Number(alimento.calorias) || 0
          acc.proteinas += Number(alimento.proteinas) || 0
          acc.carboidratos += Number(alimento.carboidratos) || 0
          acc.gorduras += Number(alimento.gorduras) || 0
        })
        return acc
      },
      { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
    )
  }, [refeicoesDoDia])

  const distribuicaoMacros = useMemo(() => {
    const calProt = totaisDiaAtual.proteinas * 4
    const calCarb = totaisDiaAtual.carboidratos * 4
    const calGord = totaisDiaAtual.gorduras * 9
    const totalCal = calProt + calCarb + calGord

    return {
      percProt: totalCal > 0 ? Math.round((calProt / totalCal) * 100) : 0,
      percCarb: totalCal > 0 ? Math.round((calCarb / totalCal) * 100) : 0,
      percGord: totalCal > 0 ? Math.round((calGord / totalCal) * 100) : 0,
    }
  }, [totaisDiaAtual])

  // ACCIONS: REFEIÇÕES
  function adicionarRefeicao() {
    if (!nomeNovaRefeicao.trim()) return

    const novaRefeicao: RefeicaoFormulario = {
      id: crypto.randomUUID(),
      nome: nomeNovaRefeicao.trim(),
      horario: horarioNovaRefeicao || '--:--',
      alimentos: [],
    }

    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: [...(prev[diaAtivo] || []), novaRefeicao],
    }))

    setNomeNovaRefeicao('')
    setHorarioNovaRefeicao('')
    setRefeicaoAberta(novaRefeicao.id)
  }

  function removerRefeicao(id: string) {
    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: (prev[diaAtivo] || []).filter(r => r.id !== id),
    }))
  }

  function atualizarRefeicao(id: string, campo: 'nome' | 'horario', valor: string) {
    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: (prev[diaAtivo] || []).map(r => (r.id === id ? { ...r, [campo]: valor } : r)),
    }))
  }

  // ACCIONS: ALIMENTOS
  function adicionarAlimento(refeicaoId: string) {
    const novoAlimento: AlimentoFormulario = {
      id: crypto.randomUUID(),
      nome: '',
      quantidade: '',
      calorias: '',
      proteinas: '',
      carboidratos: '',
      gorduras: '',
    }

    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
        ref.id === refeicaoId ? { ...ref, alimentos: [...ref.alimentos, novoAlimento] } : ref
      ),
    }))
  }

  function removerAlimento(refeicaoId: string, alimentoId: string) {
    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
        ref.id === refeicaoId
          ? { ...ref, alimentos: ref.alimentos.filter(a => a.id !== alimentoId) }
          : ref
      ),
    }))
  }

  function atualizarAlimento(
    refeicaoId: string,
    alimentoId: string,
    campo: keyof AlimentoFormulario,
    valor: string
  ) {
    const camposNumericos = ['calorias', 'proteinas', 'carboidratos', 'gorduras']
    const valorTratado = camposNumericos.includes(campo) ? (valor === '' ? '' : Number(valor)) : valor

    setRefeicoesPorDia(prev => ({
      ...prev,
      [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
        ref.id === refeicaoId
          ? {
              ...ref,
              alimentos: ref.alimentos.map(a =>
                a.id === alimentoId ? { ...a, [campo]: valorTratado } : a
              ),
            }
          : ref
      ),
    }))
  }

  function copiarCardapioParaOutrosDias() {
    if (refeicoesDoDia.length === 0) return

    const diaNome = DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label
    if (!confirm(`Deseja replicar as refeições de ${diaNome} para TODOS os outros dias?`)) return

    setRefeicoesPorDia(prev => {
      const novorefeicoesPorDia = { ...prev }
      DIAS_DA_SEMANA.forEach(dia => {
        if (dia.id !== diaAtivo) {
          novorefeicoesPorDia[dia.id] = refeicoesDoDia.map(ref => ({
            ...ref,
            id: crypto.randomUUID(),
            alimentos: ref.alimentos.map(ali => ({ ...ali, id: crypto.randomUUID() })),
          }))
        }
      })
      return novorefeicoesPorDia
    })
  }

  // SALVAR NO LARAVEL
  async function salvarDieta(e?: React.FormEvent) {
    e?.preventDefault()
    if (salvandoRef.current) return
    if (!nome.trim()) return alert('Informe o nome da dieta.')

    const payload = {
      nome: nome.trim(),
      descricao: descricao || null,
      objetivo: objetivo || null,
      nivel: nivel || null,
      duracao: duracao || null,
      meta_agua: numeroOuNull(metaAgua),
      meta_calorias: numeroOuNull(metasAlvo.calorias),
      meta_proteinas: numeroOuNull(metasAlvo.proteinas),
      meta_carboidratos: numeroOuNull(metasAlvo.carboidratos),
      meta_gorduras: numeroOuNull(metasAlvo.gorduras),
      observacoes_finais: observacoesFinais || null,

      // Transforma { segunda: [...], terca: [...] } em uma lista única
      refeicoes: DIAS_DA_SEMANA.flatMap(dia =>
        (refeicoesPorDia[dia.id] || []).map((ref, indice) => ({
          dia_semana: dia.id,
          nome: ref.nome,
          horario: ref.horario === '--:--' ? null : ref.horario,
          ordem: indice,
          alimentos: ref.alimentos
            .filter(a => a.nome.trim() !== '') // ignora alimentos em branco
            .map(a => ({
              nome: a.nome.trim(),
              quantidade: a.quantidade || null,
              calorias: numeroOuNull(a.calorias),
              proteinas: numeroOuNull(a.proteinas),
              carboidratos: numeroOuNull(a.carboidratos),
              gorduras: numeroOuNull(a.gorduras),
            })),
        }))
      ),
    }

    salvandoRef.current = true
    setSalvando(true)
    setErros({})

    try {
      const token = localStorage.getItem('token') // ajuste para onde você guarda o token

      const resposta = await fetch(`${API_URL}/dietas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (resposta.status === 422) {
        const data = await resposta.json()
        setErros(data.errors ?? {})
        alert(data.message ?? 'Verifique os campos informados.')
        return
      }

      if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)

      alert('Dieta cadastrada com sucesso!')
      // aqui você pode redirecionar (ex.: navigate('/dietas')) ou limpar o formulário
    } catch (err) {
      console.error(err)
      alert('Não foi possível salvar a dieta. Tente novamente.')
    } finally {
      salvandoRef.current = false
      setSalvando(false)
    }
  }

  return (
    <div className="min-h-screen w-full py-6">
      <form onSubmit={salvarDieta} className="container mx-auto flex flex-col gap-4">
        {/* Cabeçalho */}
        <div className="flex gap-2 items-center">
          <WrapperIcone>
            <Utensils className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Cadastrar Nova Dieta
          </Texto>
        </div>

        {/* Info Geral */}
        <Texto tipo="titulo" className="font-thin mt-2">
          Nome da dieta
        </Texto>
        <InputSimples valor={nome} onChange={e => setNome(e.target.value)} placeholder="ex: Plano Cutting" />
        {erros.nome && <p className="text-red-500 text-sm">{erros.nome[0]}</p>}

        <Texto tipo="titulo" className="font-thin">
          Descrição / Orientações Gerais
        </Texto>
        <InputTextarea
          valor={descricao}
          onChange={e => setDescricao(e.target.value)}
          classeAdicional="h-20"
          placeholder="Orientações iniciais..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-2">
          <div>
            <Texto tipo="titulo" className="font-thin mb-1">Objetivo</Texto>
            <InputSimples valor={objetivo} onChange={e => setObjetivo(e.target.value)} placeholder="ex: Hipertrofia" />
          </div>
          <div>
            <Texto tipo="titulo" className="font-thin mb-1">Nível</Texto>
            <InputSimples valor={nivel} onChange={e => setNivel(e.target.value)} placeholder="ex: Avançado" />
          </div>
          <div>
            <Texto tipo="titulo" className="font-thin mb-1">Duração</Texto>
            <InputSimples valor={duracao} onChange={e => setDuracao(e.target.value)} placeholder="ex: 8 semanas" />
          </div>
          <div>
            <Texto tipo="titulo" className="font-thin mb-1">Meta Água (L/dia)</Texto>
            <InputSimples
              tipo="number"
              valor={metaAgua}
              onChange={e => setMetaAgua(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="ex: 3.5"
            />
          </div>
        </div>

        {/* Metas Nutricionais */}
        <div className="flex gap-2 items-center mt-3">
          <WrapperIcone>
            <Target className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Metas Nutricionais Diárias (Alvo)
          </Texto>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs opacity-60 block mb-1">Calorias (kcal)</label>
            <InputSimples
              tipo="number"
              valor={metasAlvo.calorias}
              onChange={e => setMetasAlvo(p => ({ ...p, calorias: e.target.value === '' ? '' : Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="text-xs opacity-60 block mb-1">Proteínas (g)</label>
            <InputSimples
              tipo="number"
              valor={metasAlvo.proteinas}
              onChange={e => setMetasAlvo(p => ({ ...p, proteinas: e.target.value === '' ? '' : Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="text-xs opacity-60 block mb-1">Carbs (g)</label>
            <InputSimples
              tipo="number"
              valor={metasAlvo.carboidratos}
              onChange={e => setMetasAlvo(p => ({ ...p, carboidratos: e.target.value === '' ? '' : Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="text-xs opacity-60 block mb-1">Gorduras (g)</label>
            <InputSimples
              tipo="number"
              valor={metasAlvo.gorduras}
              onChange={e => setMetasAlvo(p => ({ ...p, gorduras: e.target.value === '' ? '' : Number(e.target.value) }))}
            />
          </div>
        </div>

        {/* Navegação por Dias */}
        <div className="flex gap-2 items-center mt-5">
          <WrapperIcone>
            <Calendar className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Planilha Semanal
          </Texto>
        </div>

        <SeletorDias
          dias={DIAS_DA_SEMANA}
          diaAtivo={diaAtivo}
          onSelecionarDia={setDiaAtivo}
          refeicoesPorDia={refeicoesPorDia}
        />

        {/* Resumo do Dia */}
        <ResumoNutricionalDia
          labelDia={DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label}
          totais={totaisDiaAtual}
          metas={metasAlvo}
          distribuicao={distribuicaoMacros}
          temRefeicoes={refeicoesDoDia.length > 0}
          onCopiarCardapio={copiarCardapioParaOutrosDias}
        />

        {/* Adicionar Refeição */}
        <div className="flex gap-2 items-center mt-3">
          <WrapperIcone>
            <Clock className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin capitalize">
            Refeições ({DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label})
          </Texto>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <InputSimples
            tipo="text"
            valor={nomeNovaRefeicao}
            onChange={e => setNomeNovaRefeicao(e.target.value)}
            placeholder="ex: Café da Manhã, Almoço..."
            classeAdicional="w-full"
          />
          <InputSimples
            tipo="time"
            valor={horarioNovaRefeicao}
            onChange={e => setHorarioNovaRefeicao(e.target.value)}
            classeAdicional="sm:w-40"
          />
          <BotaoSecundario icone={Plus} onClick={adicionarRefeicao} tipo="cheio" />
        </div>

        {/* Lista de Refeições */}
        <div className="flex flex-col gap-3">
          {refeicoesDoDia.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-base-terciaria/40 border border-dashed border-base-terciaria/60">
              <Texto tipo="subtexto" className="opacity-50">
                Nenhuma refeição cadastrada para {DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label}.
              </Texto>
            </div>
          )}

          {refeicoesDoDia.map(refeicao => (
            <CardRefeicao
              key={refeicao.id}
              refeicao={refeicao}
              estaAberta={refeicaoAberta === refeicao.id}
              onToggleAberta={() =>
                setRefeicaoAberta(refeicaoAberta === refeicao.id ? null : refeicao.id)
              }
              onAtualizarRefeicao={(campo, valor) => atualizarRefeicao(refeicao.id, campo, valor)}
              onRemoverRefeicao={() => removerRefeicao(refeicao.id)}
              onAdicionarAlimento={() => adicionarAlimento(refeicao.id)}
              onRemoverAlimento={alimentoId => removerAlimento(refeicao.id, alimentoId)}
              onAtualizarAlimento={(alimentoId, campo, valor) =>
                atualizarAlimento(refeicao.id, alimentoId, campo, valor)
              }
            />
          ))}
        </div>

        {/* Observações */}
        <div className="flex gap-2 items-center mt-3">
          <WrapperIcone>
            <FileText className="size-full" />
          </WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Suplementação & Observações Adicionais
          </Texto>
        </div>

        <InputTextarea
          valor={observacoesFinais}
          onChange={e => setObservacoesFinais(e.target.value)}
          classeAdicional="h-24"
          placeholder="ex: Creatina, Glutamina..."
        />

        <BotaoPrimario
          texto={salvando ? 'salvando...' : 'salvar dieta completa'}
          icone={Plus}
          onClick={() => salvarDieta()}
        />
      </form>
    </div>
  )
}

export default CriarDieta