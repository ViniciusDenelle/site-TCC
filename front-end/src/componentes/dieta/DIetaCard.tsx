import React from 'react'
import { motion } from 'motion/react'
import { Plus, Flame, Dumbbell } from 'lucide-react'
import Texto from '../organizacao/Texto'
import BotaoSecundario from '../botoes/BotaoSecundario'
import BotaoPrimario from '../botoes/BotaoPrimario'
import BotaoTerciario from '../botoes/BotaoTerciario'


interface TagItem {
  label: string
  icon?: React.ReactNode
}

interface DietaCardProps {
  title: string
  description: string
  calories: string
  protein: string
  imageUrl?: string
  tags?: TagItem[]
  onAdd?: () => void
}

export function DietaCard({
  title = "Plano Cutting — Definição",
  description = "Foco em perda de gordura mantendo massa magra com refeições nutritivas.",
  calories = "8 semanas",
  protein = "5 refeições/dia",
  imageUrl = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
  tags = [
    { label: "Low Carb", icon: <Flame className="w-3 h-3 text-destaque-p-claro" /> },
    { label: "Proteico", icon: <Dumbbell className="w-3 h-3 text-destaque-s-medio" /> },
  ],
  onAdd
}: Partial<DietaCardProps>) {
  return (
    <motion.div 
      className="max-w-sm w-full font-poppins"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Container Principal */}
      <div className="bg-base-secundaria rounded-3xl p-5 border border-base-terciaria/20 shadow-xl flex flex-col justify-between overflow-hidden">
        
        {/* Imagem do Card */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-base-terciaria/20 border border-base-terciaria/30 shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informações textuais */}
        <div className="mt-4 flex flex-col gap-2.5">
          {/* Título com componente Texto */}
          <Texto tipo="titulo" className="text-t-primaria leading-snug">
            {title}
          </Texto>

          {/* Tags de Destaque */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1"
                >
                  <BotaoTerciario 
                    texto={tag.label}   
                    disabled 
                    classeAdicional="!p-0.5 !text-[11px] font-semibold"
                  />
                </span>
              ))}
            </div>
          )}

          {/* Descrição com componente Texto */}
          <Texto tipo="subtexto" className="text-t-terciaria line-clamp-2 leading-relaxed">
            {description}
          </Texto>
        </div>

        {/* Rodapé do Card */}
        <div className="mt-5 pt-3 border-t border-base-terciaria/40 flex items-center justify-between">
          <div className="flex flex-col">
            <Texto tipo="subtexto" className="font-bold text-t-primaria">
              {calories}
            </Texto>
            <Texto tipo="subtexto" className="!text-xs text-t-terciaria">
              {protein}
            </Texto>
          </div>

          {/* Botão de Ação Reutilizável */}
          <BotaoPrimario 
            texto="Adicionar"
            icone={Plus}
            tipo="cheio"
            redondo
            onClick={onAdd}
          />
        </div>

      </div>
    </motion.div>
  )
}