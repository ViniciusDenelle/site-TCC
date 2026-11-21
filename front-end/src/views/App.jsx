import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Calculator,
  CalendarDays,
  ChevronDown,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LogIn,
  Salad,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  UserPlus,
} from 'lucide-react'

import BotaoPrimario from '../componentes/botoes/BotaoPrimario'
import BotaoSecundario from '../componentes/botoes/BotaoSecundario'
import useFetchUsuario from '../logicas/usuario/FetchUsuario'

/* ------------------------------------------------------------------ */
/* Conteúdo (edite aqui os textos da página)                           */
/* ------------------------------------------------------------------ */

const recursos = [
  {
    icone: Dumbbell,
    titulo: 'Treinos e fichas',
    descricao:
      'Monte seus treinos, organize uma ficha para a semana e execute cada série com cronômetro e registro de carga.',
  },
  {
    icone: Salad,
    titulo: 'Dietas sob medida',
    descricao:
      'Crie refeições com seus alimentos e acompanhe calorias e macronutrientes de cada dia.',
  },
  {
    icone: TrendingUp,
    titulo: 'Progresso em gráficos',
    descricao:
      'Peso, cargas e frequência de treino em gráficos claros para você ver a evolução semana após semana.',
  },
  {
    icone: Calculator,
    titulo: 'Metas calculadas para você',
    descricao:
      'Calculamos sua TMB e seu gasto energético (GET) a partir do seu perfil e do seu objetivo.',
  },
  {
    icone: Users,
    titulo: 'Biblioteca da comunidade',
    descricao:
      'Pesquise treinos, fichas e dietas criados por outras pessoas e adicione à sua biblioteca.',
  },
  {
    icone: Smartphone,
    titulo: 'Leve para a academia',
    descricao:
      'Acompanhe o treino do dia direto do celular, com o aplicativo mobile do Fit Forge.',
  },
]

const passos = [
  {
    titulo: 'Crie sua conta',
    descricao:
      'Responda algumas perguntas sobre seu corpo, sua rotina e o seu objetivo.',
  },
  {
    titulo: 'Receba suas metas',
    descricao:
      'O Fit Forge calcula suas calorias diárias e o ritmo para você chegar lá.',
  },
  {
    titulo: 'Treine e evolua',
    descricao:
      'Monte seus treinos, registre as séries e acompanhe o seu progresso.',
  },
]

const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const diasTreinadosExemplo = [true, true, false, true, false, false, false]

/* ------------------------------------------------------------------ */
/* Componentes auxiliares                                              */
/* ------------------------------------------------------------------ */

// Entrada suave ao rolar a página (respeita "reduzir movimento" do sistema)
function Aparecer({ children, atraso = 0, className = '' }) {
  const reduzirMovimento = useReducedMotion()

  if (reduzirMovimento) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: atraso, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Selo({ children }) {
  return (
    <span
      className="
        inline-flex items-center gap-2 px-3 py-1 rounded-full
        bg-destaque-p-medio/15 text-destaque-p-escuro
        text-xs font-semibold tracking-wide uppercase
      "
    >
      <Sparkles size={14} aria-hidden="true" />
      {children}
    </span>
  )
}

// Cartão de exemplo exibido no topo: mostra como é o dia a dia dentro do app
function PreviaDoApp() {
  return (
    <div
      className="
        relative w-full max-w-md mx-auto p-5 rounded-2xl
        bg-base-terciaria/60 backdrop-blur-md
        ring-1 ring-base-quaternaria shadow-xl
      "
      role="img"
      aria-label="Exemplo de como o Fit Forge mostra o treino do dia, a meta da semana e as calorias diárias"
    >
      <div className="flex items-center justify-between" aria-hidden="true">
        <div className="flex items-center gap-2 text-t-primaria font-bold">
          <Flame className="text-destaque-p-medio" size={20} strokeWidth={3} />
          Treino de hoje
        </div>
        <span className="text-[10px] uppercase tracking-wide font-semibold text-t-terciaria">
          exemplo
        </span>
      </div>

      <div className="mt-4" aria-hidden="true">
        <p className="text-2xl font-extrabold text-t-primaria">Push A</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {['Intermediário', '45 min', '8 exercícios'].map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-full bg-base-secundaria text-t-secundaria"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5" aria-hidden="true">
        <div className="flex items-center justify-between text-xs text-t-terciaria">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            Meta da semana
          </span>
          <span className="font-semibold text-t-primaria">3/5 treinos</span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-base-quaternaria overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-destaque-p-medio" />
        </div>

        <div className="mt-4 flex justify-between">
          {diasDaSemana.map((dia, indice) => (
            <div key={dia} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-t-terciaria">{dia}</span>
              <span
                className={`size-2.5 rounded-full ${
                  diasTreinadosExemplo[indice]
                    ? 'bg-destaque-p-medio'
                    : 'bg-base-quaternaria'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-5 grid grid-cols-3 gap-2 text-center"
        aria-hidden="true"
      >
        {[
          { valor: '2.150', legenda: 'kcal / dia' },
          { valor: '48 min', legenda: 'duração média' },
          { valor: '2.450 kg', legenda: 'carga total' },
        ].map((metrica) => (
          <div
            key={metrica.legenda}
            className="py-2 rounded-xl bg-base-secundaria"
          >
            <p className="text-sm font-bold text-t-primaria">{metrica.valor}</p>
            <p className="text-[10px] text-t-terciaria">{metrica.legenda}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

function App() {
  const navigate = useNavigate()
  const { dadosUsuario } = useFetchUsuario()
  const logado = Boolean(dadosUsuario)

  function irParaRecursos() {
    document
      .getElementById('recursos')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  // Botões de ação (mudam se a pessoa já estiver logada)
  const acoes = logado ? (
    <BotaoPrimario
      redondo
      icone={LayoutDashboard}
      texto="Ir para o Dashboard"
      textoClassName="font-semibold"
      classeAdicional="px-6 py-3 w-full sm:w-auto"
      onClick={() => navigate('/dashboard')}
    />
  ) : (
    <>
      <BotaoPrimario
        redondo
        icone={UserPlus}
        texto="Começar agora"
        textoClassName="font-semibold"
        classeAdicional="px-6 py-3 w-full sm:w-auto"
        onClick={() => navigate('/cadastro')}
      />
      <BotaoSecundario
        redondo
        icone={LogIn}
        texto="Já tenho conta"
        classeAdicional="px-6 py-3 w-full sm:w-auto"
        onClick={() => navigate('/login')}
      />
    </>
  )

  return (
    <main className="relative min-h-screen bg-base-primaria text-t-terciaria overflow-hidden">
      {/* Fundo decorativo (mesmo clima da tela de login) */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-linear-to-t from-destaque-p-escuro/25
          to-base-primaria to-60%
        "
      />
      <div
        aria-hidden="true"
        className="
          absolute -top-24 -right-24 size-96 rounded-full pointer-events-none
          bg-destaque-p-medio/20 blur-3xl
        "
      />
      <div
        aria-hidden="true"
        className="
          absolute top-1/3 -left-32 size-96 rounded-full pointer-events-none
          bg-destaque-s-claro/15 blur-3xl
        "
      />

      <div className="relative container mx-auto px-4">
        {/* ----------------------------- HERO ----------------------------- */}
        <section className="pt-28 md:pt-36 pb-16 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <Aparecer className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <Selo>Treino · Dieta · Progresso</Selo>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-t-primaria">
              Forje a sua{' '}
              <span className="text-destaque-p-escuro">melhor versão</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-t-secundaria leading-relaxed">
              O Fit Forge reúne seus treinos, sua dieta e a sua evolução em um
              só lugar. Você diz o objetivo, a gente cuida dos números para
              você focar em treinar.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {acoes}
            </div>

            <button
              type="button"
              onClick={irParaRecursos}
              className="
                flex items-center gap-1 text-sm font-medium cursor-pointer
                text-t-terciaria hover:text-destaque-p-escuro
                transition-colors duration-200
              "
            >
              Conheça os recursos
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </Aparecer>

          <Aparecer atraso={0.15}>
            <PreviaDoApp />
          </Aparecer>
        </section>

        {/* --------------------------- RECURSOS --------------------------- */}
        <section id="recursos" className="py-16 scroll-mt-24">
          <Aparecer className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-t-primaria">
              Tudo o que você precisa
            </h2>
            <p className="mt-3 text-t-secundaria leading-relaxed">
              Do primeiro treino ao resultado, o Fit Forge acompanha cada passo
              da sua rotina.
            </p>
          </Aparecer>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
            {recursos.map((recurso, indice) => {
              const Icone = recurso.icone

              return (
                <li key={recurso.titulo}>
                  <Aparecer atraso={(indice % 3) * 0.08} className="h-full">
                    <article
                      className="
                        h-full flex flex-col gap-3 p-6 rounded-2xl
                        bg-base-terciaria/40 backdrop-blur-md
                        ring-1 ring-base-quaternaria
                        hover:-translate-y-1 hover:ring-destaque-p-medio/60
                        transition-all duration-300
                      "
                    >
                      <div
                        className="
                          size-11 rounded-xl flex items-center justify-center
                          bg-destaque-p-medio/15 text-destaque-p-escuro
                        "
                      >
                        <Icone size={22} aria-hidden="true" />
                      </div>

                      <h3 className="text-lg font-bold text-t-primaria">
                        {recurso.titulo}
                      </h3>

                      <p className="text-sm text-t-secundaria leading-relaxed">
                        {recurso.descricao}
                      </p>
                    </article>
                  </Aparecer>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ------------------------ COMO FUNCIONA ------------------------- */}
        <section className="py-16">
          <Aparecer className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-t-primaria">
              Como funciona
            </h2>
            <p className="mt-3 text-t-secundaria leading-relaxed">
              Em poucos minutos você sai do zero para um plano pensado para o
              seu corpo.
            </p>
          </Aparecer>

          <ol className="grid md:grid-cols-3 gap-4 list-none">
            {passos.map((passo, indice) => (
              <li key={passo.titulo}>
                <Aparecer atraso={indice * 0.1} className="h-full">
                  <div
                    className="
                      h-full flex flex-col gap-3 p-6 rounded-2xl
                      bg-base-terciaria/40 backdrop-blur-md
                      ring-1 ring-base-quaternaria
                    "
                  >
                    <span
                      className="
                        size-10 rounded-full flex items-center justify-center
                        bg-destaque-p-escuro text-base-secundaria font-bold
                      "
                      aria-hidden="true"
                    >
                      {indice + 1}
                    </span>

                    <h3 className="text-lg font-bold text-t-primaria">
                      {passo.titulo}
                    </h3>

                    <p className="text-sm text-t-secundaria leading-relaxed">
                      {passo.descricao}
                    </p>
                  </div>
                </Aparecer>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------- CHAMADA FINAL ----------------------- */}
        <section className="py-16">
          <Aparecer>
            <div
              className="
                flex flex-col items-center text-center gap-5
                p-8 md:p-12 rounded-3xl
                bg-base-terciaria/60 backdrop-blur-md
                ring-1 ring-base-quaternaria
              "
            >
              <Flame
                className="text-destaque-p-medio"
                size={36}
                strokeWidth={3}
                aria-hidden="true"
              />

              <h2 className="text-3xl md:text-4xl font-extrabold text-t-primaria max-w-2xl">
                {logado
                  ? 'Seu próximo treino está esperando'
                  : 'Pronto para começar a forjar?'}
              </h2>

              <p className="max-w-xl text-t-secundaria leading-relaxed">
                {logado
                  ? 'Volte para o seu dashboard e continue de onde parou.'
                  : 'Crie sua conta e monte o seu primeiro treino hoje.'}
              </p>

              <div className="flex flex-wrap justify-center gap-3">{acoes}</div>
            </div>
          </Aparecer>
        </section>

        {/* ----------------------------- RODAPÉ --------------------------- */}
        <footer className="py-8 border-t border-base-quaternaria text-center text-sm text-t-terciaria">
          <p className="flex items-center justify-center gap-2">
            <Flame
              className="text-destaque-p-medio"
              size={16}
              strokeWidth={3}
              aria-hidden="true"
            />
            Fit Forge · Projeto de TCC
          </p>
        </footer>
      </div>
    </main>
  )
}

export default App