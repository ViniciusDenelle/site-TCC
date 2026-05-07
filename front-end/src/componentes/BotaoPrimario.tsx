import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BotaoPrimarioProps {
  children: ReactNode
  tipo?: 'cheio' | 'vazio'
  classeAdicional?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const BotaoPrimario = ({
  children,
  tipo,
  classeAdicional,
  onClick,
  disabled = false,
  type
}: BotaoPrimarioProps) => {

  const classeBase = `
    rounded-lg p-1 flex justify-center items-center transition-colors
    duration-300 ${disabled ? 'opacity-70' : 'cursor-pointer'}
  `

  const classeTipo = `
    ${tipo === 'cheio'
      ? `bg-destaque-p-escuro text-base-secundaria hover:bg-destaque-p-medio
         hover:shadow-sm shadow-destaque-p-medio/30`
      : `text-destaque-p-escuro bg-base-terciaria ring-2
         ring-destaque-p-medio hover:text-destaque-p-medio
         hover:bg-base-secundaria hover:ring-destaque-p-medio`
    }
  `

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95, y: 2 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${classeBase} ${classeTipo} ${classeAdicional ?? ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type ?? 'button'}
    >
      {children}
    </motion.button>
  )
}

export default BotaoPrimario