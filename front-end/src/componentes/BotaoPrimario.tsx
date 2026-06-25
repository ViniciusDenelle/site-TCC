import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface BotaoPrimarioProps {
  children: ReactNode
  tipo?: 'cheio' | 'vazio'
  classeAdicional?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// O TRUQUE: Mudamos o tipo do componente para 'any'. 
// Isso desativa o "modo detetive" do TS especificamente para as tags do Motion.
const MotionButton = motion.button as any

const BotaoPrimario = ({
  children,
  tipo = 'cheio',
  classeAdicional = '',
  disabled = false,
  type = 'button',
  onClick
}: BotaoPrimarioProps) => {

  const classeBase = `
    rounded-lg p-1 flex justify-center items-center transition-colors
    duration-300 ${disabled ? 'opacity-70' : 'cursor-pointer'}
  `.trim()

  const classeTipo = tipo === 'cheio'
      ? `bg-destaque-p-escuro text-base-secundaria hover:bg-destaque-p-medio
         hover:shadow-sm shadow-destaque-p-medio/30`
      : `text-destaque-p-escuro bg-base-terciaria ring-2
         ring-destaque-p-medio hover:text-destaque-p-medio
         hover:bg-base-secundaria hover:ring-destaque-p-medio`

  return (
    <MotionButton
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.95, y: 2 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${classeBase} ${classeTipo} ${classeAdicional}`.trim()}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </MotionButton>
  )
}

export default BotaoPrimario