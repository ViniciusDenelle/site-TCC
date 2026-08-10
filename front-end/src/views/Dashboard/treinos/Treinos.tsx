import { useContext, useMemo, useState } from 'react';
import TemaContexto from '../../../contextos/TemaContexto';
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'; 

const Treinos = () => {
  const [abaAtiva, setAbaAtiva] = useState<'fichas' | 'biblioteca' | 'exercicios'>('fichas');
  const [pesquisa, setPesquisa] = useState('');

  const bancoDeFichas = [
    { 
      _id: "f1", 
      nome: "Ficha A — Hipertrofia de Peito e Tríceps", 
      nivel: "intermediario", 
      tempo: "65 min", 
      semanas: "12 sem", 
      criadorNome: "Rafael Costa", 
      divisao: "Push (Empurrar)", 
      frequencia: "2x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f2", 
      nome: "Ficha Explosiva — Dorsal & Bíceps", 
      nivel: "avancado", 
      tempo: "75 min", 
      semanas: "8 sem", 
      criadorNome: "Lucas Ferreira", 
      divisao: "Pull (Puxar)", 
      frequencia: "2x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f3", 
      nome: "Ficha Power — Ombros e Trapézio", 
      nivel: "avancado", 
      tempo: "55 min", 
      semanas: "10 sem", 
      criadorNome: "Lucas Ferreira", 
      divisao: "ABCDE (Foco Isolado)", 
      frequencia: "1x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f4", 
      nome: "Ficha B — Destruição de Quadríceps", 
      nivel: "avancado", 
      tempo: "70 min", 
      semanas: "6 sem", 
      criadorNome: "Ana Beatriz Lima", 
      divisao: "Leg Day (Inferiores A)", 
      frequencia: "2x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f5", 
      nome: "Ficha C — Posterior de Coxa e Glúteos", 
      nivel: "intermediario", 
      tempo: "60 min", 
      semanas: "8 sem", 
      criadorNome: "Ana Beatriz Lima", 
      divisao: "Leg Day (Inferiores B)", 
      frequencia: "1x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f6", 
      nome: "Ficha Leg Day — Potência Máxima", 
      nivel: "avancado", 
      tempo: "80 min", 
      semanas: "16 sem", 
      criadorNome: "Rafael Costa", 
      divisao: "Full Body Inferiores", 
      frequencia: "1x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f7", 
      nome: "Ficha Express — Full Body Funcional", 
      nivel: "iniciante", 
      tempo: "40 min", 
      semanas: "6 sem", 
      criadorNome: "Rodrigo Silva", 
      divisao: "Corpo Todo (Circuito)", 
      frequencia: "3x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop"
    },
    { 
      _id: "f8", 
      nome: "Ficha Core & Cardio Avançado", 
      nivel: "avancado", 
      tempo: "50 min", 
      semanas: "8 sem", 
      criadorNome: "Rodrigo Silva", 
      divisao: "Abdominal e Resistência", 
      frequencia: "2x por semana",
      imagemFundo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
    },
  ];

  const listaDeTreinadores = [
    { _id: "1", nome: "Rafael Costa", cref: "012345", cargo: "Personal Trainer", tag: "Hipertrofia 12W", nota: "4.9", bgAvatar: "bg-red-500/20 text-red-400" },
    { _id: "2", nome: "Ana Beatriz Lima", cref: "098765", cargo: "Profª Ed. Física", tag: "Queima Total 6W", nota: "5.0", bgAvatar: "bg-purple-500/20 text-purple-400" },
    { _id: "3", nome: "Lucas Ferreira", cref: "045678", cargo: "Coach Esportivo", tag: "Atleta Funcional", nota: "4.8", bgAvatar: "bg-blue-500/20 text-blue-400" },
  ];

  const fichasFiltradas = useMemo(() => {
    return bancoDeFichas.filter(ficha => 
      ficha.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
      ficha.divisao.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }, [pesquisa]);

  const contexto = useContext(TemaContexto);
  const [tema, alterarTema] = contexto ? contexto : ['', () => {}];

  const obterCorNivel = (nivel?: string) => {
    switch (nivel?.toLowerCase()) {
      case 'iniciante': return 'text-green-400';
      case 'avancado': return 'text-red-400';
      default: return 'text-amber-400';
    }
  };

  const obterIniciais = (nomeCompleto?: string) => {
    if (!nomeCompleto) return '??';
    const partes = nomeCompleto.trim().split(' ');
    if (partes.length > 1) return (partes[0][0] + partes[1][0]).toUpperCase();
    return partes[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full min-h-full flex flex-col gap-6 bg-base-primaria transition-colors duration-300">
    

      {/* BARRA DE PESQUISA (Ocupando a largura total) */}
      {abaAtiva === 'fichas' && (
        <div className="w-full relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-t-secundaria/50 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar ficha por nome ou divisão de treino..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-base-terciaria/20 rounded-xl border border-base-quaternaria text-sm font-medium text-t-primaria placeholder-t-secundaria/40 focus:outline-none focus:border-destaque-p-medio focus:ring-1 focus:ring-destaque-p-medio transition-all"
          />
        </div>
      )}

      {abaAtiva === 'fichas' && (
        <>
          {fichasFiltradas.length === 0 ? (
            <div className="w-full text-center py-12 text-sm text-t-secundaria/60 font-medium">
              Nenhuma ficha encontrada para a sua busca.
            </div>
          ) : (
            /* GRID REDIMENSIONADO: max-w-full retira o limite lateral para expandir totalmente */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-full">
              {fichasFiltradas.map((ficha) => (
                <div 
                  key={ficha._id} 
                  style={{ backgroundImage: `url(${ficha.imagemFundo})` }}
                  className="flex flex-col justify-between p-5 min-h-90 bg-cover bg-center rounded-2xl ring-1 ring-base-quaternaria hover:ring-base-quaternaria/80 transition-all duration-300 gap-4 relative overflow-hidden group w-full"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/75 to-black/40 z-0 transition-opacity group-hover:opacity-95" />
                  
                  <div className="flex flex-col gap-1 w-full relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-bold capitalize tracking-wider ${obterCorNivel(ficha.nivel)}`}>
                        {ficha.nivel}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">{ficha.nome}</h3>
                    </div>
                    <p className="text-[11px] text-white/50 font-medium mt-1">Por: <span className="italic text-white/70">{ficha.criadorNome}</span></p>
                  </div>

                  <div className="p-3 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 relative z-10 flex flex-col gap-2 text-xs">
                    <div>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Divisão:</p>
                      <p className="text-white font-semibold mt-0.5 truncate">{ficha.divisao}</p>
                    </div>
                    <div className="border-t border-white/10 pt-1.5">
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Frequência:</p>
                      <p className="text-destaque-p-medio font-semibold mt-0.5 truncate">{ficha.frequencia}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/10 pt-3 mt-auto relative z-10">
                    <div className="text-[11px] text-white/70 font-semibold text-center">
                      ⏱️ {ficha.tempo} &nbsp;•&nbsp; 🗓️ {ficha.semanas}
                    </div>
                    <BotaoPrimario 
                      tipo="cheio"
                      texto='vizualizar Ficha' 
                    />
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* SEÇÃO INFERIOR: TREINADORES */}
          <section className="flex flex-col gap-4 border-t border-base-quaternaria pt-6 w-full max-w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-t-primaria px-1">Treinadores Certificados</h2>
              <span className="hidden sm:inline text-[10px] font-bold tracking-widest text-t-secundaria/40">SUPORTE PROFISSIONAL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {listaDeTreinadores.map((coach) => (
                <div key={coach._id} className="flex items-center justify-between p-5 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria rounded-xl hover:ring-base-quaternaria/80 transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${coach.bgAvatar}`}>
                      {obterIniciais(coach.nome)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-base font-semibold text-t-primaria flex items-center gap-1 truncate">
                        {coach.nome} <span className="text-blue-400 text-xs shrink-0">✓</span>
                      </h3>
                      <p className="text-xs text-t-secundaria/60 truncate">{coach.cargo}</p>
                      <p className="text-xs font-semibold text-red-500 mt-0.5">{coach.tag}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between h-12 shrink-0 pl-2">
                    <span className="text-xs font-bold text-amber-400">★ {coach.nota}</span>
                    <BotaoPrimario 
                      tipo="vazio"
                      texto='ver' 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default Treinos;