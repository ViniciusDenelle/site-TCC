import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Utensils, Clock, Calendar, Search, X } from 'lucide-react';
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
import useAtualizarDieta from '../../../../logicas/dashboard/dieta/AtualizarDieta';
import useShowDieta from '../../../../logicas/dashboard/dieta/dieta/ShowDieta';
import SecaoBadges from '../../../../componentes/SecaoBadges';
import AlimentoCard from '../../../../componentes/cards/AlimentoCard';
import AlimentoAdicionadoCard from '../../../../componentes/cards/AlimentoSelecionadoCard';
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

const EditarDieta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { dieta, isPending: carregandoDieta, isError: erroDieta } = useShowDieta(id);
  const { dadosUsuario } = useFetchUsuario();
  const { objetivos } = useFetchObjetivosDieta();
  const { niveis } = useFetchNiveisDieta();

  const {
    nome, setNome,
    descricao, setDescricao,
    objetivo, nivel,
    refeicoes, adicionarRefeicao, removerRefeicao,
    adicionarAlimento, removerAlimento, atualizarQuantidade,
    carregarDieta,
    montarPayload,
  } = useDietaForm();

  const [diaAtivo, setDiaAtivo] = useState(1);
  const [nomeNovaRefeicao, setNomeNovaRefeicao] = useState('');
  const [horarioNovaRefeicao, setHorarioNovaRefeicao] = useState('');
  const [buscandoEm, setBuscandoEm] = useState<string | null>(null);

  const { mutate, isPending: salvando, isError: erroSalvar } = useAtualizarDieta(id);

  // Preenche o formulário uma única vez, quando a dieta chega da API
  const jaCarregou = useRef(false);
  useEffect(() => {
    if (dieta && !jaCarregou.current) {
      jaCarregou.current = true;
      carregarDieta(dieta);
    }
  }, [dieta]);

  if (carregandoDieta) {
    return <Texto className="animate-pulse">carregando dieta...</Texto>;
  }

  if (erroDieta || !dieta) {
    return <Texto>Dieta não encontrada.</Texto>;
  }

  // Só quem criou a dieta pode modificá-la (o servidor também confere)
  const ehCriador = !!dadosUsuario && dieta.user_id === dadosUsuario.id;

  if (!ehCriador) {
    return (
      <div className="w-full rounded-3xl bg-base-secundaria border border-base-terciaria/30 px-6 py-8 text-center flex flex-col gap-3 items-center">
        <Texto tipo="subtitulo" className="text-t-primaria">
          Você não pode modificar esta dieta
        </Texto>
        <Texto tipo="subtexto" className="text-t-terciaria">
          Somente quem criou a dieta pode modificá-la.
        </Texto>
        <NavLink to={`/dashboard/dieta/verDieta/${dieta.id}`}>
          <BotaoTerciario texto="Voltar para a dieta" icone={ArrowLeft} />
        </NavLink>
      </div>
    );
  }

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
    mutate(montarPayload(), {
      onSuccess: () => navigate(`/dashboard/dieta/verDieta/${id}`),
    });
  }

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto flex flex-col gap-3">

        <div className="flex gap-2 items-center">
          <WrapperIcone><Utensils className="size-full" /></WrapperIcone>
          <Texto tipo="titulo" className="font-thin">Modificar dieta</Texto>
        </div>

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

        <div className="rounded-xl bg-base-secundaria/50 px-3 py-2 flex flex-col gap-2">
          <Texto>
            Balanço geral ({DIAS.find(d => d.numero === diaAtivo)?.label}) :
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
            Refeições ({DIAS.find(d => d.numero === diaAtivo)?.label})
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
              (acc, a) => acc + usecalcularMacros(a, a.quantidade_gramas).calorias, 0
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

        {erroSalvar && (
          <Texto tipo="subtexto" className="text-red-400">
            Não foi possível salvar as alterações. Confira os campos e tente de novo.
          </Texto>
        )}

        <BotaoPrimario
          texto={salvando ? 'salvando...' : 'salvar alterações'}
          icone={Plus}
          onClick={salvar}
        />

      </div>
    </div>
  );
};

export default EditarDieta;