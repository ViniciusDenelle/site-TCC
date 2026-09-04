import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario';
import { CardMetrica, CardCarga, CardMedicao } from '../../../componentes/CardProgresso';
import useFetchProgresso from '../../../logicas/Progresso/useFetchProgresso'; // Importe seu Hook

const Progresso = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Mes Atual');
  const [barAtiva, setBarAtiva] = useState<number | null>(null);

  // Busca de dados reais da API
  const { data, isLoading, isError } = useFetchProgresso();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-base-primaria text-t-primaria">
        <p className="animate-pulse font-semibold">Carregando métricas e gráficos...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-base-primaria text-red-400">
        <p>Erro ao carregar as informações do progresso.</p>
      </div>
    );
  }

  // Desestruturação dos dados recebidos da API
  const { metricas = [], historicoPeso = [], frequenciaSemanal = [], exercicios = [], registrosMedidas = [] } = data;

  // Cálculo para escala automática do gráfico de peso
  const pesosValores = historicoPeso.map((item: any) => item.valor);
  const minPeso = Math.min(...pesosValores, 50);
  const maxPeso = Math.max(...pesosValores, 100);

  const containerVariantes = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.4 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariantes}
      className="w-full min-h-screen flex flex-col gap-8 px-6 md:px-12 py-8 pb-20 bg-base-primaria transition-colors duration-300"
    >
      {/* CABEÇALHO */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-quaternaria/60 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-t-primaria tracking-tight">Seu Progresso</h1>
          <p className="text-sm text-t-secundaria/80">
            Acompanhe sua evolução física, métricas de carga e constância.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select 
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
            className="px-4 py-2.5 bg-base-terciaria ring-1 ring-base-quaternaria/80 hover:ring-destaque-p-medio rounded-xl text-sm font-semibold text-t-primaria outline-none cursor-pointer transition-all shadow-sm"
          >
            <option value="Mes Atual">Últimos 30 dias</option>
            <option value="Trimestre">Últimos 3 meses</option>
            <option value="Ano">Ano Atual</option>
          </select>

          <BotaoPrimario tipo="cheio" texto="+ Adicionar Medição" />
        </div>
      </div>

      {/* METRICAS DINÂMICAS */}
      <motion.div variants={containerVariantes} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {metricas.map((m: any) => (
          <CardMetrica 
            key={m.id} 
            titulo={m.titulo} 
            valor={m.valor} 
            variacao={m.variacao} 
            icon={m.icon} 
          />
        ))}
      </motion.div>

      {/* GRÁFICOS E RESUMOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* EVOLUÇÃO DE PESO DINÂMICA */}
        <div className="lg:col-span-2 p-6 bg-base-terciaria/30 ring-1 ring-base-quaternaria rounded-3xl flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-t-primaria flex items-center gap-2">
              <span>📈</span> Evolução do Peso & Composição
            </h2>
            <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full ring-1 ring-green-500/20">
              {data.tendencia || 'Tendência de Queda'}
            </span>
          </div>

          <div className="w-full h-56 bg-black/20 rounded-2xl ring-1 ring-white/5 flex flex-col justify-between p-5 relative overflow-hidden">
            <div className="flex justify-between items-center text-xs text-t-secundaria/70 border-b border-white/5 pb-2">
              <span>Meta: <b className="text-t-primaria">{data.metaPeso || 0} kg</b></span>
              <span>Início: <b className="text-t-primaria">{data.inicioPeso || 0} kg</b></span>
            </div>

            {/* BARRAS DO GRÁFICO DINÂMICAS */}
            <div className="w-full flex items-end justify-between gap-3 h-32 px-2 relative z-10">
              {historicoPeso.map((item: any, i: number) => {
                const alturaPorcentagem = ((item.valor - minPeso) / (maxPeso - minPeso || 1)) * 80 + 20;

                return (
                  <div 
                    key={item.id || i} 
                    className="relative flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setBarAtiva(i)}
                    onMouseLeave={() => setBarAtiva(null)}
                  >
                    <AnimatePresence>
                      {barAtiva === i && (
                        <motion.div 
                          initial={{ opacity: 0, y: 4 }} 
                          animate={{ opacity: 1, y: -24 }} 
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute text-[10px] font-bold text-t-primaria bg-base-terciaria ring-1 ring-base-quaternaria px-2 py-0.5 rounded-md shadow-md z-20 pointer-events-none whitespace-nowrap"
                        >
                          {item.valor} kg
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="w-full h-full flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${alturaPorcentagem}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="w-full bg-destaque-p-medio/80 group-hover:bg-destaque-p-medio rounded-t-md transition-colors" 
                      />
                    </div>

                    <span className="text-[10px] text-t-secundaria/70 font-mono mt-2 group-hover:text-t-primaria transition-colors">
                      {item.data}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs text-t-secundaria/80">
              <span>Média semanal: <b className="text-t-primaria">{data.mediaSemanal || '0 kg'}</b></span>
              <span className="text-destaque-p-medio font-semibold">Dentro da Meta 🔥</span>
            </div>
          </div>
        </div>

        {/* FREQUÊNCIA DE TREINOS DINÂMICA */}
        <div className="p-6 bg-base-terciaria/30 ring-1 ring-base-quaternaria rounded-3xl flex flex-col justify-between gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-t-primaria flex items-center gap-2">
              <span>📊</span> Consistência
            </h2>
            <span className="text-xs text-t-secundaria/70">Por semana</span>
          </div>

          <div className="flex items-end justify-between gap-3 h-36 pt-2 px-1">
            {frequenciaSemanal.map((s: any, idx: number) => (
              <div key={s.id || idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                <span className="text-xs font-bold text-destaque-p-medio group-hover:scale-110 transition-transform">{s.qtd}</span>
                <div className="w-full bg-base-quaternaria/40 rounded-xl h-24 flex items-end overflow-hidden p-1">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(s.qtd / (s.max || 5)) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="w-full bg-destaque-p-medio rounded-lg transition-colors" 
                  />
                </div>
                <span className="text-[10px] font-medium text-t-secundaria/70">{s.dia}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-black/20 rounded-2xl ring-1 ring-white/5 text-center text-xs text-t-secundaria/80">
            Total acumulado: <b className="text-t-primaria">{data.totalTreinos || 0} treinos concluídos</b>
          </div>
        </div>

      </div>

      {/* SEÇÃO INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* EVOLUÇÃO DE CARGAS DINÂMICA */}
        <div className="p-6 bg-base-terciaria/30 ring-1 ring-base-quaternaria rounded-3xl flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-t-primaria flex items-center gap-2">
              <span>🏋️</span> Evolução de Cargas
            </h2>
            <button className="text-xs text-destaque-p-medio hover:underline transition-colors font-bold">VER TODOS</button>
          </div>

          <div className="flex flex-col gap-3">
            {exercicios.map((ex: any) => (
              <CardCarga 
                key={ex.id} 
                nome={ex.nome} 
                carga={ex.carga} 
                evolucao={ex.evolucao} 
                porcentagem={ex.porcentagem} 
              />
            ))}
          </div>
        </div>

        {/* ÚLTIMAS MEDIÇÕES DINÂMICAS */}
        <div className="p-6 bg-base-terciaria/30 ring-1 ring-base-quaternaria rounded-3xl flex flex-col justify-between gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-t-primaria flex items-center gap-2">
              <span>📏</span> Últimas Medições
            </h2>
            <button className="text-xs text-destaque-p-medio hover:underline transition-colors font-bold">HISTÓRICO</button>
          </div>

          <div className="flex flex-col gap-3">
            {registrosMedidas.map((item: any) => (
              <CardMedicao 
                key={item.id} 
                nome={item.nome} 
                valor={item.valor} 
                data={item.data} 
                periodo={item.periodo} 
              />
            ))}
          </div>

          <BotaoPrimario tipo="vazio" texto="Nova Avaliação Física" />
        </div>

      </div>

    </motion.div>
  );
};

export default Progresso;