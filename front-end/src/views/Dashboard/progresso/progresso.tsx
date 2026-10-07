import { useState } from 'react';
import { motion } from 'framer-motion';

import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario';
import BotaoSecundario from '../../../componentes/botoes/BotaoSecundario';

import {
  CardMetrica,
  CardMedicao,
} from '../../../componentes/CardProgresso';
import GraficoPeso from '../../../componentes/graficos/GraficoPeso';
import GraficoFrequencia from '../../../componentes/graficos/GraficoFrequencia';
import GraficoCargas from '../../../componentes/graficos/GraficoCargas';

import useFetchUsuario from '../../../logicas/usuario/FetchUsuario';
import {
  useFetchResumoProgresso,
  useFetchPesoProgresso,
  useFetchFrequenciaProgresso,
  useFetchCargasProgresso,
  useRegistrarPeso,
} from '../../../logicas/dashboard/treinos/treino/Fetchprogresso';

/* =====================================================
   PERÍODOS DO SELETOR (valor -> quantidade de dias)
===================================================== */
const diasDesdeInicioDoAno = () => {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 1);
  const umDia = 1000 * 60 * 60 * 24;

  return Math.max(1, Math.ceil((hoje.getTime() - inicio.getTime()) / umDia) + 1);
};

const DIAS_POR_PERIODO: Record<string, () => number> = {
  'Mes Atual': () => 30,
  Trimestre: () => 90,
  Ano: diasDesdeInicioDoAno,
};

/* =====================================================
   AUXILIARES DE FORMATAÇÃO
===================================================== */
const formatarNumero = (valor: number) =>
  valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

const textoVariacao = (valor: number | null | undefined, sufixo = '') => {
  if (valor === null || valor === undefined) return '--';

  const sinal = valor > 0 ? '+' : '';

  return `${sinal}${formatarNumero(valor)}${sufixo ? ` ${sufixo}` : ''}`;
};

const CARD_CLASSES = `
  p-5
  md:p-6
  bg-base-terciaria/30
  ring-1
  ring-base-quaternaria
  rounded-3xl
  shadow-sm
`;

const EstadoGrafico = ({ altura, texto }: { altura: string; texto: string }) => (
  <div
    className={`
      ${altura}
      flex
      items-center
      justify-center
      text-sm
      text-t-secundaria/60
    `}
  >
    {texto}
  </div>
);

const Progresso = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Mes Atual');
  const [pesoInput, setPesoInput] = useState('');
  const [dataInput, setDataInput] = useState('');

  const dias = DIAS_POR_PERIODO[periodoSelecionado]();

  /* =====================================================
     DADOS DA API
  ===================================================== */
  const { dadosUsuario } = useFetchUsuario();

  const { resumo } = useFetchResumoProgresso(dias);
  const { historicoPeso = [], isPending: carregandoPeso } = useFetchPesoProgresso(dias);
  const { frequencia = [], isPending: carregandoFrequencia } = useFetchFrequenciaProgresso(7);
  const { cargas = [], isPending: carregandoCargas } = useFetchCargasProgresso(dias);
  // const { repeticoes = [], isPending: carregandoRepeticoes } = useFetchRepeticoesProgresso(dias);

  const { registrarPeso, isPending: registrandoPeso, isError: erroRegistroPeso } = useRegistrarPeso();

  // TODO: ligar ao back-end quando existir a tabela de medições corporais
  const registrosMedidas: any[] = [];

  /* =====================================================
     VALORES DERIVADOS
  ===================================================== */
  const unidadePeso = dadosUsuario?.tipoPeso ?? 'kg';
  const pesoAtual = resumo?.pesoAtual ?? dadosUsuario?.peso ?? null;

  const metricas = [
    {
      id: 1,
      titulo: 'Peso Atual',
      valor: pesoAtual !== null ? `${formatarNumero(Number(pesoAtual))} ${unidadePeso}` : '--',
      variacao: textoVariacao(resumo?.variacaoPeso, unidadePeso),
      icon: 'scale',
    },
    {
      id: 2,
      titulo: 'Treinos no Período',
      valor: `${resumo?.treinosNoMes ?? 0} treinos`,
      variacao: textoVariacao(resumo?.variacaoTreinos),
      icon: 'calendar',
    },
    {
      id: 3,
      titulo: 'Carga Máxima',
      valor: resumo?.cargaMaxima != null ? `${formatarNumero(resumo.cargaMaxima)} kg` : '--',
      variacao: textoVariacao(resumo?.variacaoCarga, 'kg'),
      icon: 'dumbbell',
    },
  ];

  // const registrar = () => {
  //   const valor = Number(pesoInput.replace(',', '.'));

  //   if (!valor || valor <= 0 || registrandoPeso) return;

  //   registrarPeso(
  //     { peso: valor, data: dataInput || undefined },
  //     {
  //       onSuccess: () => {
  //         setPesoInput('');
  //         setDataInput('');
  //       },
  //     }
  //   );
  // };

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
        gap-4
      ">
        {metricas.map((metrica) => (
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
        <div className={`xl:col-span-2 ${CARD_CLASSES}`}>
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
              {resumo?.tendencia ?? 'Sem dados'}
            </span>
          </div>

          <div className="
            flex
            flex-wrap
            gap-6
            mb-3
            text-xs
          ">
            <div>
              <span className="text-t-secundaria/70">Meta</span>
              <p className="text-sm font-bold text-t-primaria">
                {dadosUsuario?.pesoIdeal ?? '--'} {unidadePeso}
              </p>
            </div>

            <div>
              <span className="text-t-secundaria/70">Peso inicial</span>
              <p className="text-sm font-bold text-t-primaria">
                {resumo?.inicioPeso != null ? formatarNumero(resumo.inicioPeso) : '--'} {unidadePeso}
              </p>
            </div>

            <div>
              <span className="text-t-secundaria/70">Média semanal</span>
              <p className="text-sm font-bold text-t-primaria">
                {resumo?.mediaSemanal != null ? formatarNumero(resumo.mediaSemanal) : '--'} {unidadePeso}
              </p>
            </div>
          </div>

          {/* REGISTRAR PESO */}
          <div className="flex flex-wrap items-end gap-2 mb-3">
            <div>
              <label className="text-xs text-t-secundaria/70 block mb-1">
                Peso ({unidadePeso})
              </label>

              <input
                type="number"
                step="0.1"
                min="1"
                value={pesoInput}
                onChange={(e) => setPesoInput(e.target.value)}
                placeholder="ex: 82.5"
                className="
                  w-32
                  px-3
                  py-2
                  bg-base-terciaria
                  ring-1
                  ring-base-quaternaria/80
                  focus:ring-destaque-p-medio
                  rounded-xl
                  text-sm
                  text-t-primaria
                  outline-none
                  transition-all
                "
              />
            </div>

            <div>
              <label className="text-xs text-t-secundaria/70 block mb-1">
                Data (opcional)
              </label>

              <input
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="
                  px-3
                  py-2
                  bg-base-terciaria
                  ring-1
                  ring-base-quaternaria/80
                  focus:ring-destaque-p-medio
                  rounded-xl
                  text-sm
                  text-t-primaria
                  outline-none
                  transition-all
                "
              />
            </div>

            {/* <BotaoSecundario
              tipo="cheio"
              texto={registrandoPeso ? 'salvando...' : 'Registrar'}
              onClick={registrar}
            /> */}

            {erroRegistroPeso && (
              <span className="text-xs text-red-400">
                Não foi possível registrar o peso.
              </span>
            )}
          </div>

          {carregandoPeso ? (
            <EstadoGrafico altura="h-[300px]" texto="Carregando..." />
          ) : historicoPeso.length > 0 ? (
            <GraficoPeso dados={historicoPeso} />
          ) : (
            <EstadoGrafico
              altura="h-[300px]"
              texto="Nenhum registro de peso neste período."
            />
          )}
        </div>

        {/* FREQUÊNCIA */}
        <div className={CARD_CLASSES}>
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
              Últimos 7 dias
            </span>
          </div>

          {carregandoFrequencia ? (
            <EstadoGrafico altura="h-[280px]" texto="Carregando..." />
          ) : frequencia.length > 0 ? (
            <GraficoFrequencia dados={frequencia} />
          ) : (
            <EstadoGrafico altura="h-[280px]" texto="Nenhum treino registrado." />
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
              {resumo?.totalTreinos ?? 0} treinos concluídos
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CARGAS E REPETIÇÕES (LADO A LADO)
      ===================================================== */}
      <section className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">
        {/* CARGAS */}
        <div className={CARD_CLASSES}>
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

          {carregandoCargas ? (
            <EstadoGrafico altura="h-[300px]" texto="Carregando..." />
          ) : cargas.length > 0 ? (
            <GraficoCargas dados={cargas} />
          ) : (
            <EstadoGrafico altura="h-[300px]" texto="Nenhum exercício com carga neste período." />
          )}
        </div>

        {/* REPETIÇÕES */}
        <div className={CARD_CLASSES}>
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
                Evolução das repetições
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

          {/* {carregandoRepeticoes ? (
            <EstadoGrafico altura="h-[300px]" texto="Carregando..." />
          ) : repeticoes.length > 0 ? (
            <GraficoRepeticoes dados={repeticoes} />
          ) : (
            <EstadoGrafico altura="h-[300px]" texto="Nenhum registro de repetições neste período." />
          )} */}
        </div>
      </section>

      {/* =====================================================
          MEDIÇÕES
      ===================================================== */}
      <section className={CARD_CLASSES}>
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

        {registrosMedidas.length > 0 ? (
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
        ) : (
          <EstadoGrafico altura="h-[120px]" texto="Nenhuma medição registrada." />
        )}

        <div className="mt-5 flex justify-end">
          <BotaoPrimario tipo="vazio" texto="Nova Avaliação Física" />
        </div>
      </section>
    </motion.main>
  );
};

export default Progresso;