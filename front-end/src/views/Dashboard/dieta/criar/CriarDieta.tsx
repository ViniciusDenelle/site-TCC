// import { useState, useMemo, useRef } from 'react'
// import { Plus, Utensils, Clock, Target, FileText, Calendar } from 'lucide-react'

// import Texto from '../../../../componentes/organizacao/Texto'
// import InputSimples from '../../../../componentes/inputs/InputSimples'
// import InputTextarea from '../../../../componentes/inputs/InputTextarea'
// import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario'
// import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario'
// import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone'

// import { CardRefeicao } from '../../../../componentes/dieta/CardRefeicao'
// import { SeletorDias } from '../../../../componentes/dieta/SeletorDias'
// import { ResumoNutricionalDia } from '../../../../componentes/dieta/ResumoNutricionalDia'
// import { AlimentoFormulario, RefeicaoFormulario, DiaSemana } from '../../../../componentes/dieta/types'

// const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

// const DIAS_DA_SEMANA: DiaSemana[] = [
//   { id: 'segunda', label: 'Segunda-feira', short: 'Seg' },
//   { id: 'terca', label: 'Terça-feira', short: 'Ter' },
//   { id: 'quarta', label: 'Quarta-feira', short: 'Qua' },
//   { id: 'quinta', label: 'Quinta-feira', short: 'Qui' },
//   { id: 'sexta', label: 'Sexta-feira', short: 'Sex' },
//   { id: 'sabado', label: 'Sábado', short: 'Sáb' },
//   { id: 'domingo', label: 'Domingo', short: 'Dom' },
// ]

// const numeroOuNull = (v: number | string | '') =>
//   v === '' || v === null || v === undefined ? null : Number(v)

// const CriarDieta = () => {
//   // --- Metadados da Dieta ---
//   const [nome, setNome] = useState('')
//   const [descricao, setDescricao] = useState('')
//   const [objetivo, setObjetivo] = useState('')
//   const [nivel, setNivel] = useState('')
//   const [duracao, setDuracao] = useState('')
//   const [metaAgua, setMetaAgua] = useState<number | ''>(3)

//   // --- Metas Nutricionais Diárias ---
//   const [metasAlvo, setMetasAlvo] = useState({
//     calorias: '' as number | '',
//     proteinas: '' as number | '',
//     carboidratos: '' as number | '',
//     gorduras: '' as number | '',
//   })

//   // --- Estrutura dos Dias ---
//   const [diaAtivo, setDiaAtivo] = useState('segunda')
//   const [refeicoesPorDia, setRefeicoesPorDia] = useState<Record<string, RefeicaoFormulario[]>>({
//     segunda: [],
//     terca: [],
//     quarta: [],
//     quinta: [],
//     sexta: [],
//     sabado: [],
//     domingo: [],
//   })

//   // --- Formulário de Nova Refeição ---
//   const [nomeNovaRefeicao, setNomeNovaRefeicao] = useState('')
//   const [horarioNovaRefeicao, setHorarioNovaRefeicao] = useState('')
//   const [refeicaoAberta, setRefeicaoAberta] = useState<string | null>(null)
//   const [observacoesFinais, setObservacoesFinais] = useState('')

//   // --- Envio para o back-end ---
//   const [salvando, setSalvando] = useState(false)
//   const [erros, setErros] = useState<Record<string, string[]>>({})
//   const salvandoRef = useRef(false) // evita envio duplicado

//   // Refeições do dia selecionado
//   const refeicoesDoDia = useMemo(() => refeicoesPorDia[diaAtivo] || [], [refeicoesPorDia, diaAtivo])

//   // CÁLCULOS DO DIA ATIVO
//   const totaisDiaAtual = useMemo(() => {
//     return refeicoesDoDia.reduce(
//       (acc, refeicao) => {
//         refeicao.alimentos.forEach(alimento => {
//           acc.calorias += Number(alimento.calorias) || 0
//           acc.proteinas += Number(alimento.proteinas) || 0
//           acc.carboidratos += Number(alimento.carboidratos) || 0
//           acc.gorduras += Number(alimento.gorduras) || 0
//         })
//         return acc
//       },
//       { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
//     )
//   }, [refeicoesDoDia])

//   const distribuicaoMacros = useMemo(() => {
//     const calProt = totaisDiaAtual.proteinas * 4
//     const calCarb = totaisDiaAtual.carboidratos * 4
//     const calGord = totaisDiaAtual.gorduras * 9
//     const totalCal = calProt + calCarb + calGord

//     return {
//       percProt: totalCal > 0 ? Math.round((calProt / totalCal) * 100) : 0,
//       percCarb: totalCal > 0 ? Math.round((calCarb / totalCal) * 100) : 0,
//       percGord: totalCal > 0 ? Math.round((calGord / totalCal) * 100) : 0,
//     }
//   }, [totaisDiaAtual])

//   // ACCIONS: REFEIÇÕES
//   function adicionarRefeicao() {
//     if (!nomeNovaRefeicao.trim()) return

//     const novaRefeicao: RefeicaoFormulario = {
//       id: crypto.randomUUID(),
//       nome: nomeNovaRefeicao.trim(),
//       horario: horarioNovaRefeicao || '--:--',
//       alimentos: [],
//     }

//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: [...(prev[diaAtivo] || []), novaRefeicao],
//     }))

//     setNomeNovaRefeicao('')
//     setHorarioNovaRefeicao('')
//     setRefeicaoAberta(novaRefeicao.id)
//   }

//   function removerRefeicao(id: string) {
//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: (prev[diaAtivo] || []).filter(r => r.id !== id),
//     }))
//   }

//   function atualizarRefeicao(id: string, campo: 'nome' | 'horario', valor: string) {
//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: (prev[diaAtivo] || []).map(r => (r.id === id ? { ...r, [campo]: valor } : r)),
//     }))
//   }

//   // ACCIONS: ALIMENTOS
//   function adicionarAlimento(refeicaoId: string) {
//     const novoAlimento: AlimentoFormulario = {
//       id: crypto.randomUUID(),
//       nome: '',
//       quantidade: '',
//       calorias: '',
//       proteinas: '',
//       carboidratos: '',
//       gorduras: '',
//     }

//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
//         ref.id === refeicaoId ? { ...ref, alimentos: [...ref.alimentos, novoAlimento] } : ref
//       ),
//     }))
//   }

//   function removerAlimento(refeicaoId: string, alimentoId: string) {
//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
//         ref.id === refeicaoId
//           ? { ...ref, alimentos: ref.alimentos.filter(a => a.id !== alimentoId) }
//           : ref
//       ),
//     }))
//   }

//   function atualizarAlimento(
//     refeicaoId: string,
//     alimentoId: string,
//     campo: keyof AlimentoFormulario,
//     valor: string
//   ) {
//     const camposNumericos = ['calorias', 'proteinas', 'carboidratos', 'gorduras']
//     const valorTratado = camposNumericos.includes(campo) ? (valor === '' ? '' : Number(valor)) : valor

//     setRefeicoesPorDia(prev => ({
//       ...prev,
//       [diaAtivo]: (prev[diaAtivo] || []).map(ref =>
//         ref.id === refeicaoId
//           ? {
//               ...ref,
//               alimentos: ref.alimentos.map(a =>
//                 a.id === alimentoId ? { ...a, [campo]: valorTratado } : a
//               ),
//             }
//           : ref
//       ),
//     }))
//   }

//   function copiarCardapioParaOutrosDias() {
//     if (refeicoesDoDia.length === 0) return

//     const diaNome = DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label
//     if (!confirm(`Deseja replicar as refeições de ${diaNome} para TODOS os outros dias?`)) return

//     setRefeicoesPorDia(prev => {
//       const novorefeicoesPorDia = { ...prev }
//       DIAS_DA_SEMANA.forEach(dia => {
//         if (dia.id !== diaAtivo) {
//           novorefeicoesPorDia[dia.id] = refeicoesDoDia.map(ref => ({
//             ...ref,
//             id: crypto.randomUUID(),
//             alimentos: ref.alimentos.map(ali => ({ ...ali, id: crypto.randomUUID() })),
//           }))
//         }
//       })
//       return novorefeicoesPorDia
//     })
//   }

//   // SALVAR NO LARAVEL
//   async function salvarDieta(e?: React.FormEvent) {
//     e?.preventDefault()
//     if (salvandoRef.current) return
//     if (!nome.trim()) return alert('Informe o nome da dieta.')

//     const payload = {
//       nome: nome.trim(),
//       descricao: descricao || null,
//       objetivo: objetivo || null,
//       nivel: nivel || null,
//       duracao: duracao || null,
//       meta_agua: numeroOuNull(metaAgua),
//       meta_calorias: numeroOuNull(metasAlvo.calorias),
//       meta_proteinas: numeroOuNull(metasAlvo.proteinas),
//       meta_carboidratos: numeroOuNull(metasAlvo.carboidratos),
//       meta_gorduras: numeroOuNull(metasAlvo.gorduras),
//       observacoes_finais: observacoesFinais || null,

//       // Transforma { segunda: [...], terca: [...] } em uma lista única
//       refeicoes: DIAS_DA_SEMANA.flatMap(dia =>
//         (refeicoesPorDia[dia.id] || []).map((ref, indice) => ({
//           dia_semana: dia.id,
//           nome: ref.nome,
//           horario: ref.horario === '--:--' ? null : ref.horario,
//           ordem: indice,
//           alimentos: ref.alimentos
//             .filter(a => a.nome.trim() !== '') // ignora alimentos em branco
//             .map(a => ({
//               nome: a.nome.trim(),
//               quantidade: a.quantidade || null,
//               calorias: numeroOuNull(a.calorias),
//               proteinas: numeroOuNull(a.proteinas),
//               carboidratos: numeroOuNull(a.carboidratos),
//               gorduras: numeroOuNull(a.gorduras),
//             })),
//         }))
//       ),
//     }

//     salvandoRef.current = true
//     setSalvando(true)
//     setErros({})

//     try {
//       const token = localStorage.getItem('token') // ajuste para onde você guarda o token

//       const resposta = await fetch(`${API_URL}/dietas`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//       })

//       if (resposta.status === 422) {
//         const data = await resposta.json()
//         setErros(data.errors ?? {})
//         alert(data.message ?? 'Verifique os campos informados.')
//         return
//       }

//       if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)

//       alert('Dieta cadastrada com sucesso!')
//       // aqui você pode redirecionar (ex.: navigate('/dietas')) ou limpar o formulário
//     } catch (err) {
//       console.error(err)
//       alert('Não foi possível salvar a dieta. Tente novamente.')
//     } finally {
//       salvandoRef.current = false
//       setSalvando(false)
//     }
//   }

//   return (
//     <div className="min-h-screen w-full py-6">
//       <form onSubmit={salvarDieta} className="container mx-auto flex flex-col gap-4">
//         {/* Cabeçalho */}
//         <div className="flex gap-2 items-center">
//           <WrapperIcone>
//             <Utensils className="size-full" />
//           </WrapperIcone>
//           <Texto tipo="titulo" className="font-thin">
//             Cadastrar Nova Dieta
//           </Texto>
//         </div>

//         {/* Info Geral */}
//         <Texto tipo="titulo" className="font-thin mt-2">
//           Nome da dieta
//         </Texto>
//         <InputSimples valor={nome} onChange={e => setNome(e.target.value)} placeholder="ex: Plano Cutting" />
//         {erros.nome && <p className="text-red-500 text-sm">{erros.nome[0]}</p>}

//         <Texto tipo="titulo" className="font-thin">
//           Descrição / Orientações Gerais
//         </Texto>
//         <InputTextarea
//           valor={descricao}
//           onChange={e => setDescricao(e.target.value)}
//           classeAdicional="h-20"
//           placeholder="Orientações iniciais..."
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-2">
//           <div>
//             <Texto tipo="titulo" className="font-thin mb-1">Objetivo</Texto>
//             <InputSimples valor={objetivo} onChange={e => setObjetivo(e.target.value)} placeholder="ex: Hipertrofia" />
//           </div>
//           <div>
//             <Texto tipo="titulo" className="font-thin mb-1">Nível</Texto>
//             <InputSimples valor={nivel} onChange={e => setNivel(e.target.value)} placeholder="ex: Avançado" />
//           </div>
//           <div>
//             <Texto tipo="titulo" className="font-thin mb-1">Duração</Texto>
//             <InputSimples valor={duracao} onChange={e => setDuracao(e.target.value)} placeholder="ex: 8 semanas" />
//           </div>
//           <div>
//             <Texto tipo="titulo" className="font-thin mb-1">Meta Água (L/dia)</Texto>
//             <InputSimples
//               tipo="number"
//               valor={metaAgua}
//               onChange={e => setMetaAgua(e.target.value === '' ? '' : Number(e.target.value))}
//               placeholder="ex: 3.5"
//             />
//           </div>
//         </div>

//         {/* Metas Nutricionais */}
//         <div className="flex gap-2 items-center mt-3">
//           <WrapperIcone>
//             <Target className="size-full" />
//           </WrapperIcone>
//           <Texto tipo="titulo" className="font-thin">
//             Metas Nutricionais Diárias (Alvo)
//           </Texto>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//           <div>
//             <label className="text-xs opacity-60 block mb-1">Calorias (kcal)</label>
//             <InputSimples
//               tipo="number"
//               valor={metasAlvo.calorias}
//               onChange={e => setMetasAlvo(p => ({ ...p, calorias: e.target.value === '' ? '' : Number(e.target.value) }))}
//             />
//           </div>
//           <div>
//             <label className="text-xs opacity-60 block mb-1">Proteínas (g)</label>
//             <InputSimples
//               tipo="number"
//               valor={metasAlvo.proteinas}
//               onChange={e => setMetasAlvo(p => ({ ...p, proteinas: e.target.value === '' ? '' : Number(e.target.value) }))}
//             />
//           </div>
//           <div>
//             <label className="text-xs opacity-60 block mb-1">Carbs (g)</label>
//             <InputSimples
//               tipo="number"
//               valor={metasAlvo.carboidratos}
//               onChange={e => setMetasAlvo(p => ({ ...p, carboidratos: e.target.value === '' ? '' : Number(e.target.value) }))}
//             />
//           </div>
//           <div>
//             <label className="text-xs opacity-60 block mb-1">Gorduras (g)</label>
//             <InputSimples
//               tipo="number"
//               valor={metasAlvo.gorduras}
//               onChange={e => setMetasAlvo(p => ({ ...p, gorduras: e.target.value === '' ? '' : Number(e.target.value) }))}
//             />
//           </div>
//         </div>

//         {/* Navegação por Dias */}
//         <div className="flex gap-2 items-center mt-5">
//           <WrapperIcone>
//             <Calendar className="size-full" />
//           </WrapperIcone>
//           <Texto tipo="titulo" className="font-thin">
//             Planilha Semanal
//           </Texto>
//         </div>

//         <SeletorDias
//           dias={DIAS_DA_SEMANA}
//           diaAtivo={diaAtivo}
//           onSelecionarDia={setDiaAtivo}
//           refeicoesPorDia={refeicoesPorDia}
//         />

//         {/* Resumo do Dia */}
//         <ResumoNutricionalDia
//           labelDia={DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label}
//           totais={totaisDiaAtual}
//           metas={metasAlvo}
//           distribuicao={distribuicaoMacros}
//           temRefeicoes={refeicoesDoDia.length > 0}
//           onCopiarCardapio={copiarCardapioParaOutrosDias}
//         />

//         {/* Adicionar Refeição */}
//         <div className="flex gap-2 items-center mt-3">
//           <WrapperIcone>
//             <Clock className="size-full" />
//           </WrapperIcone>
//           <Texto tipo="titulo" className="font-thin capitalize">
//             Refeições ({DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label})
//           </Texto>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2">
//           <InputSimples
//             tipo="text"
//             valor={nomeNovaRefeicao}
//             onChange={e => setNomeNovaRefeicao(e.target.value)}
//             placeholder="ex: Café da Manhã, Almoço..."
//             classeAdicional="w-full"
//           />
//           <InputSimples
//             tipo="time"
//             valor={horarioNovaRefeicao}
//             onChange={e => setHorarioNovaRefeicao(e.target.value)}
//             classeAdicional="sm:w-40"
//           />
//           <BotaoSecundario icone={Plus} onClick={adicionarRefeicao} tipo="cheio" />
//         </div>

//         {/* Lista de Refeições */}
//         <div className="flex flex-col gap-3">
//           {refeicoesDoDia.length === 0 && (
//             <div className="p-8 text-center rounded-2xl bg-base-terciaria/40 border border-dashed border-base-terciaria/60">
//               <Texto tipo="subtexto" className="opacity-50">
//                 Nenhuma refeição cadastrada para {DIAS_DA_SEMANA.find(d => d.id === diaAtivo)?.label}.
//               </Texto>
//             </div>
//           )}

//           {refeicoesDoDia.map(refeicao => (
//             <CardRefeicao
//               key={refeicao.id}
//               refeicao={refeicao}
//               estaAberta={refeicaoAberta === refeicao.id}
//               onToggleAberta={() =>
//                 setRefeicaoAberta(refeicaoAberta === refeicao.id ? null : refeicao.id)
//               }
//               onAtualizarRefeicao={(campo, valor) => atualizarRefeicao(refeicao.id, campo, valor)}
//               onRemoverRefeicao={() => removerRefeicao(refeicao.id)}
//               onAdicionarAlimento={() => adicionarAlimento(refeicao.id)}
//               onRemoverAlimento={alimentoId => removerAlimento(refeicao.id, alimentoId)}
//               onAtualizarAlimento={(alimentoId, campo, valor) =>
//                 atualizarAlimento(refeicao.id, alimentoId, campo, valor)
//               }
//             />
//           ))}
//         </div>

//         {/* Observações */}
//         <div className="flex gap-2 items-center mt-3">
//           <WrapperIcone>
//             <FileText className="size-full" />
//           </WrapperIcone>
//           <Texto tipo="titulo" className="font-thin">
//             Suplementação & Observações Adicionais
//           </Texto>
//         </div>

//         <InputTextarea
//           valor={observacoesFinais}
//           onChange={e => setObservacoesFinais(e.target.value)}
//           classeAdicional="h-24"
//           placeholder="ex: Creatina, Glutamina..."
//         />

//         <BotaoPrimario
//           texto={salvando ? 'salvando...' : 'salvar dieta completa'}
//           icone={Plus}
//           onClick={() => salvarDieta()}
//         />
//       </form>
//     </div>
//   )
// }

// export default CriarDieta

import { useState } from 'react';
import { Plus, Utensils, Clock, Calendar, Search, X } from 'lucide-react';
import Texto from '../../../../componentes/organizacao/Texto';
import InputSimples from '../../../../componentes/inputs/InputSimples';
import InputTextarea from '../../../../componentes/inputs/InputTextarea';
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario';
import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario';
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario';
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone';
import useDebounce from '../../../../logicas/useDebounce';
import useFetchUsuario from '../../../../logicas/usuario/FetchUsuario';
import { Alimento } from '../../../../logicas/dashboard/dieta/DietaProps';
import useFetchAlimentos from '../../../../logicas/dashboard/dieta/alimento/FetchAlimentos';
import useFetchObjetivosDieta from '../../../../logicas/dashboard/dieta/FetchObjetivosDieta';
import useFetchNiveisDieta from '../../../../logicas/dashboard/dieta/FetchNiveisDieta';
import useDietaForm from '../../../../logicas/dashboard/dieta/useDietaForm';
import useCriarDieta from '../../../../logicas/dashboard/dieta/CriarDieta';
import SecaoBadges from '../../../../componentes/SecaoBadges';
import AlimentoCard from '../../../../componentes/cards/AlimentoCard';
import AlimentoAdicionadoCard from '../../../../componentes/cards/AlimentoSelecionadoCard';
import usecalcularMacrosPorGramas from '../../../../logicas/dashboard/dieta/useCalcularMacros';
import usecalcularMacros from '../../../../logicas/dashboard/dieta/useCalcularMacros';

const DIAS = [
  { numero: 1, label: 'Segunda' },
  { numero: 2, label: 'Terça' },
  { numero: 3, label: 'Quarta' },
  { numero: 4, label: 'Quinta' },
  { numero: 5, label: 'Sexta' },
  { numero: 6, label: 'Sábado' },
  { numero: 0, label: 'Domingo' },
];

function BuscaAlimento({ onSelecionar }: { onSelecionar: (a: Alimento) => void }) {
  const [termo, setTermo] = useState('');
  const termoDebounce = useDebounce(termo, 400);
  const { alimentos } = useFetchAlimentos({ nome: termoDebounce }, 1);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <InputSimples
          tipo="text"
          valor={termo}
          onChange={e => setTermo(e.target.value)}
          placeholder="buscar alimento..."
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-40" />
      </div>

      {termoDebounce && alimentos?.data && alimentos.data.length > 0 && (
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {alimentos.data.map(alimento => (
            <AlimentoCard
              key={alimento.id}
              alimento={alimento}
              onSelecionar={(a) => { onSelecionar(a); setTermo(''); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const CriarDieta = () => {
  const { dadosUsuario } = useFetchUsuario();
  const { objetivos } = useFetchObjetivosDieta();
  const { niveis } = useFetchNiveisDieta();

  console.log(objetivos)

  const {
    nome, setNome,
    descricao, setDescricao,
    objetivo, nivel,
    refeicoes, adicionarRefeicao, removerRefeicao,
    adicionarAlimento, removerAlimento, atualizarQuantidade,
    montarPayload,
  } = useDietaForm();

  const [diaAtivo, setDiaAtivo] = useState(1);
  const [nomeNovaRefeicao, setNomeNovaRefeicao] = useState('');
  const [horarioNovaRefeicao, setHorarioNovaRefeicao] = useState('');
  const [buscandoEm, setBuscandoEm] = useState<string | null>(null);

  const { mutate, isPending } = useCriarDieta();

  const refeicoesDoDia = refeicoes.filter(r => r.dia_semana === diaAtivo);

  const totalDoDia = refeicoesDoDia.reduce(
    (acc, r) => {
      r.alimentos.forEach(a => {
        const macros = usecalcularMacros(a, a.quantidade_gramas);
        acc.calorias += macros.calorias;
        acc.proteinas += macros.proteinas;
        acc.carboidratos += macros.carboidratos;
        acc.gorduras += macros.gorduras;
      });
      return acc;
    },
    { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
  );

  function handleAdicionarRefeicao() {
    if (!nomeNovaRefeicao.trim()) return;
    adicionarRefeicao(diaAtivo, nomeNovaRefeicao.trim(), horarioNovaRefeicao);
    setNomeNovaRefeicao('');
    setHorarioNovaRefeicao('');
  }

  function salvar() {
    mutate(montarPayload());
  }

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto flex flex-col gap-3">

        <div className="flex gap-2 items-center">
          <WrapperIcone><Utensils className="size-full" /></WrapperIcone>
          <Texto tipo="titulo" className="font-thin">Nova dieta</Texto>
        </div>

        {dadosUsuario && (
          <div className="rounded-xl bg-base-secundaria/50 px-3 py-2 flex items-center justify-between">
            <Texto tipo="subtexto" className="opacity-70">Sua referência diária</Texto>
            <Texto tipo="subtexto" className="font-semibold">
              {dadosUsuario.caloriasDiarias} kcal
            </Texto>
          </div>
        )}

        <Texto tipo="titulo" className="font-thin">Nome da dieta</Texto>
        <InputSimples valor={nome} onChange={e => setNome(e.target.value)} placeholder="ex: Plano de cutting" />

        <Texto tipo="titulo" className="font-thin">Descrição</Texto>
        <InputTextarea valor={descricao} onChange={e => setDescricao(e.target.value)} classeAdicional="h-20" placeholder="opcional" />

        {objetivos && (
          <SecaoBadges
            titulo="Objetivo"
            itens={objetivos}
            isSelecionado={(id) => objetivo.isSelecionado(id)}
            onToggle={(item) => objetivo.selecionar(item)}
          />
        )}

        {niveis && (
          <SecaoBadges
            titulo="Nível"
            itens={niveis}
            isSelecionado={(id) => nivel.isSelecionado(id)}
            onToggle={(item) => nivel.selecionar(item)}
          />
        )}
        <div className="flex gap-2 items-center mt-2">
          <WrapperIcone><Calendar className="size-full" /></WrapperIcone>
          <Texto tipo="titulo" className="font-thin">Plano semanal</Texto>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {DIAS.map(dia => (
            <button
              key={dia.numero}
              onClick={() => setDiaAtivo(dia.numero)}
              className={`shrink-0 rounded-xl px-4 py-2 border ${diaAtivo === dia.numero ? 'bg-destaque-p-claro text-black border-destaque-p-claro' : 'bg-base-secundaria border-base-terciaria/30'}`}
            >
              <Texto tipo="subtexto" className={diaAtivo === dia.numero ? 'text-black font-semibold' : ''}>
                {dia.label}
              </Texto>
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-base-secundaria/50 px-3 py-2 flex flex-col gap-2 
        ">
          <Texto>
            Balanço geral ({DIAS[diaAtivo - 1].label}) :
          </Texto>
          <div className="flex gap-4 flex-wrap">
            <Texto tipo="subtexto">
              {Math.round(totalDoDia.calorias)} kcal
            </Texto>
            <Texto tipo="subtexto" className="opacity-70">
              {Math.round(totalDoDia.proteinas)}g prot
            </Texto>
            <Texto tipo="subtexto" className="opacity-70">
              {Math.round(totalDoDia.carboidratos)}g carb
            </Texto>
            <Texto tipo="subtexto" className="opacity-70">
              {Math.round(totalDoDia.gorduras)}g gord
            </Texto>
          </div>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <WrapperIcone><Clock className="size-full" /></WrapperIcone>
          <Texto tipo="titulo" className="font-thin">
            Refeições ({DIAS[diaAtivo - 1].label})
          </Texto>
        </div>

        <div className="flex gap-2">
          <InputSimples
            tipo="text"
            valor={nomeNovaRefeicao}
            onChange={e => setNomeNovaRefeicao(e.target.value)}
            placeholder="ex: Café da manhã"
            classeAdicional="w-full"
          />
          <InputSimples
            tipo="time"
            valor={horarioNovaRefeicao}
            onChange={e => setHorarioNovaRefeicao(e.target.value)}
            classeAdicional="w-32"
          />
          <BotaoSecundario icone={Plus} onClick={handleAdicionarRefeicao} tipo="cheio" />
        </div>

        <div className="flex flex-col gap-3">
          {refeicoesDoDia.length === 0 && (
            <Texto tipo="subtexto" className="opacity-50">Nenhuma refeição neste dia ainda.</Texto>
          )}

          {refeicoesDoDia.map(refeicao => {
            const totalRefeicao = refeicao.alimentos.reduce(
              (acc, a) => acc + a.calorias * a.quantidade_gramas, 0
            );

            return (
              <div key={refeicao.id} className="rounded-2xl bg-base-secundaria border border-base-terciaria/30 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Texto tipo="subtitulo">{refeicao.nome} {refeicao.horario && `· ${refeicao.horario}`}</Texto>
                  <div className="flex items-center gap-2">
                    <Texto tipo="subtexto" className="opacity-60">{Math.round(totalRefeicao)} kcal</Texto>
                    <button onClick={() => removerRefeicao(refeicao.id)}>
                      <X className="size-4 opacity-60" />
                    </button>
                  </div>
                </div>

                {refeicao.alimentos.map(alimento => (
                  <AlimentoAdicionadoCard
                    key={alimento.id}
                    alimento={alimento}
                    onAtualizarQuantidade={(gramas) => atualizarQuantidade(refeicao.id, alimento.id, gramas)}
                    onRemover={() => removerAlimento(refeicao.id, alimento.id)}
                  />
                ))}

                {buscandoEm === refeicao.id ? (
                  <BuscaAlimento
                    onSelecionar={(alimento) => {
                      adicionarAlimento(refeicao.id, alimento);
                      setBuscandoEm(null);
                    }}
                  />
                ) : (
                  <BotaoTerciario
                    texto="adicionar alimento"
                    icone={Plus}
                    onClick={() => setBuscandoEm(refeicao.id)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <BotaoPrimario
          texto={isPending ? 'salvando...' : 'salvar dieta'}
          icone={Plus}
          onClick={salvar}
        />

      </div>
    </div>
  );
};

export default CriarDieta;