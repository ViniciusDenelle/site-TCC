import React from 'react'
import { motion } from 'motion/react'

const BotãoSimples = ({
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
           `bg-destaque-p-escuro text-base-terciaria hover:bg-destaque-p-medio` 
           : 
           `text-destaque-s-escuro bg-base-secundaria ring-1
            ring-destaque-s-escuro hover:text-destaque-s-medio
            hover:bg-base-primaria hover:ring-destaque-s-medio `
          }
        `

  return (
    <motion.button 
    whileHover={disabled ? "" :{scale: 1.05, y: -2}}
    whileTap={disabled ? "" :{scale: 0.95, y: 2}}
    transition={{type: "spring", stiffness: 100}}
    className={`${classeBase} ${classeTipo} ${classeAdcional ?? ''}`}
    onClick={onClick ?? ''}
    disabled={disabled ?? ''}>
        {children}
    </motion.button>
  )
}

export default BotãoSimples