import { useState } from 'react';
import { motion } from 'framer-motion';

import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario';

import {
  CardMetrica,
  CardMedicao,
} from '../../../componentes/CardProgresso';
import GraficoSeries from '../../../componentes/graficos/GraficoSeries';
import GraficoPeso from '../../../componentes/graficos/GraficoPeso';
import GraficoFrequencia from '../../../componentes/graficos/GraficoFrequencia';
import GraficoCargas from '../../../componentes/graficos/GraficoCargas';

// =====================================================
// DADOS SIMULADOS (MOCK) - Substituto temporário da API
// =====================================================
const DADOS_MOCK = {
  tendencia: 'Tendência de Queda',
  metaPeso: 75,
  inicioPeso: 88,
  mediaSemanal: '81.5 kg',
  totalTreinos: 18,
  metricas: [
    { id: 1, titulo: 'Peso Atual', valor: '81.2 kg', variacao: '-0.8 kg', icon: 'scale' },
    { id: 2, titulo: 'Gordura Corporal', valor: '18.4%', variacao: '-1.2%', icon: 'activity' },
    { id: 3, titulo: 'Massa Magra', valor: '66.2 kg', variacao: '+0.5 kg', icon: 'biceps' },
    { id: 4, titulo: 'Treinos no Mês', valor: '18 treinos', variacao: '+2', icon: 'calendar' },
    { id: 5, titulo: 'Carga Máxima', valor: '110 kg', variacao: '+5 kg', icon: 'dumbbell' },
  ],
  historicoPeso: [
    { data: '01/05', peso: 85.0 },
    { data: '08/05', peso: 84.2 },
    { data: '15/05', peso: 83.5 },
    { data: '22/05', peso: 82.8 },
    { data: '29/05', peso: 82.0 },
    { data: '05/06', peso: 81.2 },
  ],
  frequenciaSemanal: [
    { dia: 'Seg', treinos: 1 },
    { dia: 'Ter', treinos: 1 },
    { dia: 'Qua', treinos: 0 },
    { dia: 'Qui', treinos: 1 },
    { dia: 'Sex', treinos: 1 },
    { dia: 'Sáb', treinos: 1 },
    { dia: 'Dom', treinos: 0 },
  ],
  exerciciosCargas: [
    { nome: 'Supino Reto', cargaInicial: 60, cargaAtual: 80 },
    { nome: 'Agachamento Livre', cargaInicial: 80, cargaAtual: 110 },
    { nome: 'Levantamento Terra', cargaInicial: 90, cargaAtual: 120 },
    { nome: 'Desenvolvimento', cargaInicial: 30, cargaAtual: 45 },
  ],
  exerciciosSeries: [
    { nome: 'Supino Reto', seriesIniciais: 3, seriesAtuais: 4 },
    { nome: 'Agachamento Livre', seriesIniciais: 3, seriesAtuais: 5 },
    { nome: 'Levantamento Terra', seriesIniciais: 2, seriesAtuais: 4 },
    { nome: 'Desenvolvimento', seriesIniciais: 3, seriesAtuais: 4 },
  ],
  registrosMedidas: [
    { id: 1, nome: 'Tórax / Peitoral', valor: '102 cm', data: '10/05/2026', periodo: 'Último mês' },
    { id: 2, nome: 'Braço Direito', valor: '38.5 cm', data: '10/05/2026', periodo: 'Último mês' },
    { id: 3, nome: 'Cintura', valor: '82 cm', data: '10/05/2026', periodo: 'Último mês' },
    { id: 4, nome: 'Coxa Direita', valor: '58 cm', data: '10/05/2026', periodo: 'Último mês' },
  ],
};

const Progresso = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Mes Atual');

  const data = DADOS_MOCK;

  /* =====================================================
     DESESTRUTURAÇÃO DOS DADOS
  ===================================================== */
  const {
    metricas = [],
    historicoPeso = [],
    frequenciaSemanal = [],
    exerciciosCargas = [],
    exerciciosSeries = [],
    registrosMedidas = [],
  } = data;

  /* =====================================================
     ANIMAÇÃO
  ===================================================== */
  const containerVariantes = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariantes}
      className="
        w-full
        min-h-screen
        flex
        flex-col
        gap-6
        px-4
        md:px-8
        lg:px-12
        py-8
        pb-20
        bg-base-primaria
      "
    >
      {/* =====================================================
          CABEÇALHO
      ===================================================== */}
      <section className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        border-b
        border-base-quaternaria/60
        pb-6
      ">
        <div>
          <p className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-destaque-p-medio
            font-bold
            mb-2
          ">
            Dashboard
          </p>

          <h1 className="
            text-3xl
            md:text-4xl
            font-extrabold
            text-t-primaria
            tracking-tight
          ">
            Seu Progresso
          </h1>

          <p className="
            text-sm
            text-t-secundaria/80
            mt-2
            max-w-xl
          ">
            Acompanhe sua evolução, frequência e desempenho nos treinos.
          </p>
        </div>

        <div className="
          flex
          flex-col
          sm:flex-row
          gap-3
        ">
          <select
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
            className="
              px-4
              py-2.5
              bg-base-terciaria
              ring-1
              ring-base-quaternaria/80
              hover:ring-destaque-p-medio
              rounded-xl
              text-sm
              font-semibold
              text-t-primaria
              outline-none
              cursor-pointer
              transition-all
            "
          >
            <option value="Mes Atual">Últimos 30 dias</option>
            <option value="Trimestre">Últimos 3 meses</option>
            <option value="Ano">Ano atual</option>
          </select>

          <BotaoPrimario tipo="cheio" texto="+ Adicionar Medição" />
        </div>
      </section>

      {/* =====================================================
          MÉTRICAS
      ===================================================== */}
      <section className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
        gap-4
      ">
        {metricas.map((metrica: any) => (
          <CardMetrica
            key={metrica.id}
            titulo={metrica.titulo}
            valor={metrica.valor}
            variacao={metrica.variacao}
            icon={metrica.icon}
          />
        ))}
      </section>

      {/* =====================================================
          PESO + FREQUÊNCIA
      ===================================================== */}
      <section className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">
        {/* PESO */}
        <div className="
          xl:col-span-2
          p-5
          md:p-6
          bg-base-terciaria/30
          ring-1
          ring-base-quaternaria
          rounded-3xl
          shadow-sm
        ">
          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mb-4
          ">
            <div>
              <p className="
                text-xs
                uppercase
                tracking-wider
                text-t-secundaria/70
              ">
                Evolução
              </p>

              <h2 className="
                text-lg
                font-bold
                text-t-primaria
              ">
                Peso ao longo do tempo
              </h2>
            </div>

            <span className="
              w-fit
              text-xs
              font-semibold
              text-green-400
              bg-green-500/10
              px-3
              py-1.5
              rounded-full
              ring-1
              ring-green-500/20
            ">
              {data.tendencia || 'Tendência de Queda'}
            </span>
          </div>

          <div className="
            flex
            flex-wrap
            gap-6
            mb-2
            text-xs
          ">
            <div>
              <span className="text-t-secundaria/70">Meta</span>
              <p className="text-sm font-bold text-t-primaria">
                {data.metaPeso || 0} kg
              </p>
            </div>

            <div>
              <span className="text-t-secundaria/70">Peso inicial</span>
              <p className="text-sm font-bold text-t-primaria">
                {data.inicioPeso || 0} kg
              </p>
            </div>

            <div>
              <span className="text-t-secundaria/70">Média semanal</span>
              <p className="text-sm font-bold text-t-primaria">
                {data.mediaSemanal || '0 kg'}
              </p>
            </div>
          </div>

          {historicoPeso.length > 0 ? (
            <GraficoPeso dados={historicoPeso} />
          ) : (
            <div className="
              h-[300px]
              flex
              items-center
              justify-center
              text-sm
              text-t-secundaria/60
            ">
              Nenhum registro de peso encontrado.
            </div>
          )}
        </div>

        {/* FREQUÊNCIA */}
        <div className="
          p-5
          md:p-6
          bg-base-terciaria/30
          ring-1
          ring-base-quaternaria
          rounded-3xl
          shadow-sm
        ">
          <div className="
            flex
            items-start
            justify-between
            mb-3
          ">
            <div>
              <p className="
                text-xs
                uppercase
                tracking-wider
                text-t-secundaria/70
              ">
                Constância
              </p>

              <h2 className="
                text-lg
                font-bold
                text-t-primaria
              ">
                Frequência semanal
              </h2>
            </div>

            <span className="text-xs text-t-secundaria/60">
              Por semana
            </span>
          </div>

          {frequenciaSemanal.length > 0 ? (
            <GraficoFrequencia dados={frequenciaSemanal} />
          ) : (
            <div className="
              h-[280px]
              flex
              items-center
              justify-center
              text-sm
              text-t-secundaria/60
            ">
              Nenhum treino registrado.
            </div>
          )}

          <div className="
            mt-2
            p-3
            bg-black/20
            rounded-2xl
            ring-1
            ring-white/5
            text-center
          ">
            <span className="text-xs text-t-secundaria/70">
              Total acumulado
            </span>

            <p className="text-sm font-bold text-t-primaria mt-1">
              {data.totalTreinos || 0} treinos concluídos
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CARGAS E SÉRIES (LADO A LADO)
      ===================================================== */}
      <section className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">
        {/* CARGAS */}
        <div className="
          p-5
          md:p-6
          bg-base-terciaria/30
          ring-1
          ring-base-quaternaria
          rounded-3xl
          shadow-sm
        ">
          <div className="
            flex
            items-center
            justify-between
            mb-4
          ">
            <div>
              <p className="
                text-xs
                uppercase
                tracking-wider
                text-t-secundaria/70
              ">
                Performance
              </p>

              <h2 className="text-lg font-bold text-t-primaria">
                Evolução das cargas
              </h2>
            </div>

            <button className="
              text-xs
              text-destaque-p-medio
              hover:underline
              font-bold
            ">
              VER TODOS
            </button>
          </div>

          {exerciciosCargas.length > 0 ? (
            <GraficoCargas dados={exerciciosCargas} />
          ) : (
            <div className="
              h-[300px]
              flex
              items-center
              justify-center
              text-sm
              text-t-secundaria/60
            ">
              Nenhum exercício registrado.
            </div>
          )}
        </div>

        {/* SÉRIES */}
        <div className="
          p-5
          md:p-6
          bg-base-terciaria/30
          ring-1
          ring-base-quaternaria
          rounded-3xl
          shadow-sm
        ">
          <div className="
            flex
            items-center
            justify-between
            mb-4
          ">
            <div>
              <p className="
                text-xs
                uppercase
                tracking-wider
                text-t-secundaria/70
              ">
                Volume
              </p>

              <h2 className="text-lg font-bold text-t-primaria">
                Evolução do nº de séries
              </h2>
            </div>

            <button className="
              text-xs
              text-destaque-p-medio
              hover:underline
              font-bold
            ">
              VER TODOS
            </button>
          </div>

          {exerciciosSeries.length > 0 ? (
            <GraficoSeries dados={exerciciosSeries} />
          ) : (
            <div className="
              h-[300px]
              flex
              items-center
              justify-center
              text-sm
              text-t-secundaria/60
            ">
              Nenhum registro de série.
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          MEDIÇÕES
      ===================================================== */}
      <section className="
        p-5
        md:p-6
        bg-base-terciaria/30
        ring-1
        ring-base-quaternaria
        rounded-3xl
        shadow-sm
      ">
        <div className="
          flex
          items-center
          justify-between
          mb-5
        ">
          <div>
            <p className="
              text-xs
              uppercase
              tracking-wider
              text-t-secundaria/70
            ">
              Avaliação física
            </p>

            <h2 className="text-lg font-bold text-t-primaria">
              Últimas medições
            </h2>
          </div>

          <button className="
            text-xs
            text-destaque-p-medio
            hover:underline
            font-bold
          ">
            HISTÓRICO
          </button>
        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-3
        ">
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

        <div className="mt-5 flex justify-end">
          <BotaoPrimario tipo="vazio" texto="Nova Avaliação Física" />
        </div>
      </section>
    </motion.main>
  );
};

export default Progresso;