import React from 'react'
import { DietaCard } from '../../../componentes/dieta/DIetaCard'
import Texto from '../../../componentes/organizacao/Texto'

interface DietPlan {
  id: string
  title: string
  subtitle: string
  level: string
  mealsCount: string
  duration: string
  imageUrl?: string
}

const dietPlans: DietPlan[] = [
  {
    id: '1',
    title: 'Cutting — Definição',
    subtitle: 'Foco em perda de gordura mantendo massa magra',
    mealsCount: '5 refeições/dia',
    duration: '8 semanas',
    level: 'Intermediário',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    title: 'Bulking Limpo',
    subtitle: 'Superávit calórico controlado para ganho limpo',
    mealsCount: '6 refeições/dia',
    duration: '12 semanas',
    level: 'Intermediário',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    title: 'Manutenção Atlética',
    subtitle:
      'Manutenção de composição corporal e alta performance',
    mealsCount: '5 refeições/dia',
    duration: 'Contínuo',
    level: 'Todos',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    title: 'Low Carb + Proteína',
    subtitle: 'Estratégia para recomposição corporal acelerada',
    mealsCount: '4 refeições/dia',
    duration: '6 semanas',
    level: 'Avançado',
    imageUrl:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600',
  },
]

export default function DashboardDietas() {
  return (
    <div className="w-full font-poppins">
      {/* Cabeçalho */}
      <div className="mb-6 flex flex-col gap-1">
        <Texto
          tipo="subtitulo"
          className="!text-xl sm:!text-2xl text-t-primaria"
        >
          Planos de Dieta
        </Texto>

        <Texto
          tipo="subtexto"
          className="text-t-terciaria"
        >
          Escolha um plano ideal para o seu objetivo
        </Texto>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dietPlans.map((plan) => (
          <DietaCard
            key={plan.id}
            title={plan.title}
            description={plan.subtitle}
            calories={plan.duration}
            protein={plan.mealsCount}
            imageUrl={plan.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}