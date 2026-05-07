import React from 'react'
import { motion } from 'motion/react'

const BotaoSimples = ({
  children,
  tipo,
  classeAdcional,
  onClick,
  disabled
}) => {

    const classeBase = `
        rounded-lg p-1 flex justify-center items-center transition-colors
        duration-300 ${disabled ? `` : `cursor-pointer`}`
    const classeTipo = `
        ${tipo === 'cheio' ?
           `bg-destaque-s-escuro text-base-secundaria hover:bg-destaque-s-medio` 
           : 
           `text-destaque-s-escuro bg-base-secundaria ring-1
            ring-destaque-s-escuro hover:text-destaque-s-medio
            hover:bg-base-primaria hover:ring-destaque-s-medio `
          }
        `

  return (
    <motion.button 
    whileHover={disabled ? "" :{scale: 1.05}}
    whileTap={disabled ? "" :{scale: 0.95}}
    transition={{type: "spring", stiffness: 100}}
    className={`${classeBase} ${classeTipo} ${classeAdcional ?? ''}`}
    onClick={onClick ?? ''}
    disabled={disabled ?? ''}>
        {children}
    </motion.button>
  )
}

export default BotaoSimples