import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BotaoSecundarioProps {
  children:ReactNode
  tipo?: 'cheio' | 'vazio'
  classeAdicional?: string
  onClick?: () => void
  disabled?: boolean
}
const BotaoSecundario = ({
  children,
  tipo,
  classeAdicional,
  onClick,
  disabled
}:BotaoSecundarioProps) => {

    const classeBase = `
        rounded-lg p-1 flex justify-center items-center transition-colors
        duration-300 ${!disabled && 'cursor-pointer'}`
    const classeTipo = `
        ${tipo === 'cheio' ?
           `bg-destaque-s-escuro text-base-secundaria hover:bg-destaque-s-medio` 
           : 
           ` bg-base-secundaria ring-2
            hover:text-destaque-s-medio text-destaque-s-escuro
            ${disabled 
              ? `ring-transparent` 
              : `ring-destaque-s-escuro 
              hover:bg-base-primaria hover:ring-destaque-s-medio`}`
          }
        `

  return (
    <motion.button 
    whileHover={disabled ? {} :{scale: 1.05}}
    whileTap={disabled ? {} :{scale: 0.95}}
    transition={{type: "spring", stiffness: 100}}
    className={`${classeBase} ${classeTipo} ${classeAdicional ?? ''}`}
    onClick={onClick}
    disabled={disabled }>
        {children}
    </motion.button>
  )
}

export default BotaoSecundario