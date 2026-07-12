import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import WrapperIcone from '../organizacao/WrapperIcone'
import Texto from '../organizacao/Texto'

interface BotaoSecundarioProps {
  texto?: string
  icone?: LucideIcon,
  tipo?: 'cheio' | 'vazio'
  classeAdicional?: string
  onClick?: () => void
  disabled?: boolean
  redondo?: boolean
}
const BotaoSecundario = ({
  texto,
  icone : Icone,
  tipo,
  classeAdicional,
  onClick,
  disabled,
  redondo, 
}:BotaoSecundarioProps) => {

    const classeBase = `
        p-1 flex justify-center items-center transition-colors gap-1
        duration-300 ${!disabled && 'cursor-pointer'}
        ${redondo ? `rounded-full px-3` : `rounded-lg`}`
    const classeTipo = `
        ${tipo === 'cheio' ?
           `bg-destaque-s-escuro text-base-secundaria hover:bg-destaque-s-medio` 
           : 
           ` bg-base-secundaria ring-2
            hover:text-destaque-s-medio text-destaque-s-escuro
            ${disabled 
              ? `ring-transparent opacity-70` 
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
      {Icone && (
        <WrapperIcone tamanho='sm'>
          <Icone className='size-full'/>
        </WrapperIcone>
      )}
      {texto && (
        <Texto className='font-semibold'>
          {texto}
        </Texto>
      )}
    </motion.button>
  )
}

export default BotaoSecundario