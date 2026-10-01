import React from 'react'
import { Dumbbell, Flame, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react'

import CardHorizontal from '../../componentes/CardHorizontal'
import Texto from '../../componentes/organizacao/Texto'

const SobreNos = () => {
  const pilares = [
    {
      icone: Dumbbell,
      titulo: 'Treino Adaptável',
      descricao: 'Planos ajustados ao seu nível de experiência — do iniciante ao avançado — focados nos seus objetivos específicos.',
    },
    {
      icone: Flame,
      titulo: 'Nutrição Inteligente',
      descricao: 'Cálculo preciso de TMB e GET para garantir que seus aportes calóricos e de macronutrientes trabalhem a seu favor.',
    },
    {
      icone: TrendingUp,
      titulo: 'Previsão de Progresso',
      descricao: 'Visualização clara de datas estimadas e ritmo de evolução semanal para você saber exatamente para onde está indo.',
    },
    {
      icone: ShieldCheck,
      titulo: 'Baseado em Ciência',
      descricao: 'Adeus às fórmulas mágicas. Utilizamos equações metabólicas e metodologias validadas pela educação física.',
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      {/* Cabeçalho / Hero */}
      <CardHorizontal className="flex flex-col items-center text-center p-8 md:p-12 gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={14} />
          Conheça o Fit Forge
        </div>
        
        <Texto tipo="titulo" className="text-3xl md:text-5xl font-extrabold text-t-primaria max-w-3xl">
          Forjando a sua melhor versão através da tecnologia
        </Texto>
        
        <Texto tipo="paragrafo" className="text-t-secundaria text-base md:text-lg max-w-2xl leading-relaxed">
          Na Fit Forge, unimos ciência, simplicidade e tecnologia para transformar
          a sua rotina de treinos e nutrição em um processo inteligente, transparente e com resultados reais.
        </Texto>
      </CardHorizontal>

      {/* Grid de Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pilares.map((pilar, index) => {
          const Icone = pilar.icone
          return (
            <CardHorizontal key={index} className="flex flex-col gap-3 p-6 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icone size={22} />
              </div>
              <Texto tipo="subtitulo" className="text-lg font-bold text-t-primaria">
                {pilar.titulo}
              </Texto>
              <Texto tipo="paragrafo" className="text-xs text-t-secundaria leading-relaxed">
                {pilar.descricao}
              </Texto>
            </CardHorizontal>
          )
        })}
      </div>

      {/* Manifestation / Por que Fit Forge */}
      <CardHorizontal className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 items-center">
        <div className="space-y-4">
          <Texto tipo="titulo" className="text-2xl md:text-3xl font-bold text-t-primaria">
            Por que <span className="text-primary">Fit Forge</span>?
          </Texto>
          <Texto tipo="paragrafo" className="text-sm text-t-secundaria leading-relaxed">
            O nome surge do conceito de <strong>forjar</strong>. Acreditamos que o físico e a saúde dos seus sonhos não são construídos com atalhos, mas esculpidos dia após dia com consistência e direcionamento correto.
          </Texto>
          <Texto tipo="paragrafo" className="text-sm text-t-secundaria leading-relaxed">
            Nossa missão é eliminar as dúvidas da sua rotina: você nunca mais precisará adivinhar quanto comer ou qual treino seguir. O Fit Forge cuida dos números para que você foque na execução.
          </Texto>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-5 rounded-xl bg-base-terciaria/40 border border-base-terciaria text-center">
            <span className="text-2xl font-black text-primary block">100%</span>
            <Texto tipo="paragrafo" className="text-[10px] text-t-secundaria uppercase font-bold mt-1">Personalizado</Texto>
          </div>
          <div className="p-5 rounded-xl bg-base-terciaria/40 border border-base-terciaria text-center">
            <span className="text-2xl font-black text-primary block">TMB & GET</span>
            <Texto tipo="paragrafo" className="text-[10px] text-t-secundaria uppercase font-bold mt-1">Ajuste Dinâmico</Texto>
          </div>
          <div className="p-5 rounded-xl bg-base-terciaria/40 border border-base-terciaria text-center">
            <span className="text-2xl font-black text-primary block">3+</span>
            <Texto tipo="paragrafo" className="text-[10px] text-t-secundaria uppercase font-bold mt-1">Níveis de Treino</Texto>
          </div>
          <div className="p-5 rounded-xl bg-base-terciaria/40 border border-base-terciaria text-center">
            <span className="text-2xl font-black text-primary block">24/7</span>
            <Texto tipo="paragrafo" className="text-[10px] text-t-secundaria uppercase font-bold mt-1">Controle de Metas</Texto>
          </div>
        </div>
      </CardHorizontal>
    </div>
  )
}

export default SobreNos