import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Utensils, Apple } from 'lucide-react'

import CardHorizontal from '../../../../componentes/CardHorizontal'
import Texto from '../../../../componentes/organizacao/Texto'

const PesquisarDietaHome = () => {
  const navigate = useNavigate()

  const opcoes = [
    {
      titulo: 'Pesquisar Dietas',
      descricao: 'Planejar refeições e metas calóricas personalizadas para atingir seus objetivos com eficiência.',
      icone: Utensils,
      rota: '/dashboard/dieta/PesquisarDietas', // Ajustado para corresponder ao Rota.jsx
    },
    {
      titulo: 'Pesquisar Comidas',
      descricao: 'Cadastrar novos alimentos e seus valores nutricionais para ampliar sua biblioteca.',
      icone: Apple,
      rota: '/dashboard/dieta/PesquisarAlimentos', // Ajustado para PesquisarAlimento
    },
  ]

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {opcoes.map((opcao, index) => {
        const Icone = opcao.icone
        return (
          <div
            key={index}
            onClick={() => navigate(opcao.rota)}
            className="cursor-pointer transition-all hover:opacity-90"
          >
            <CardHorizontal className="flex items-center gap-4 p-5 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                <Icone size={28} />
              </div>

              <div className="flex flex-col gap-0.5">
                <Texto tipo="subtitulo" className="text-base font-bold text-t-primaria">
                  {opcao.titulo}
                </Texto>
                <Texto tipo="paragrafo" className="text-xs text-t-secundaria">
                  {opcao.descricao}
                </Texto>
              </div>
            </CardHorizontal>
          </div>
        )
      })}
    </div>
  )
}

export default PesquisarDietaHome