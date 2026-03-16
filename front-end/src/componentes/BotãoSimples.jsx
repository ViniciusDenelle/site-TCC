import React from 'react'
import { motion } from 'motion/react'

const BotãoSimples = ({children, tipo, classeAdcional, onClick}) => {

    const classeBase = `
        rounded-lg p-1 flex justify-center items-center transition-colors
        duration-300 cursor-pointer`
    const classeTipo = `
        ${tipo === 'cheio' ?
           `bg-destaque-s-escuro text-slate-200 hover:bg-destaque-s-medio` 
           : 
           `text-destaque-s-escuro bg-base-secundaria ring-1
            ring-destaque-s-escuro hover:text-destaque-s-medio
            hover:bg-base-primaria hover:ring-destaque-s-medio `
          }
        `

  return (
    <motion.button 
    whileHover={{scale: 1.05, y: -2}}
    whileTap={{scale: 0.95, y: 2}}
    transition={{type: "spring", stiffness: 100}}
    className={`${classeBase} ${classeTipo} ${classeAdcional}`}
    onClick={onClick ?? ''}>
        {children}
    </motion.button>
  )
}

export default BotãoSimples