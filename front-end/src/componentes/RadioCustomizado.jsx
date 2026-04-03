import React from 'react'
import {motion} from 'motion/react'

const RadioCustomizado = ({
    name,
    valor,
    dataBinding,
    children,
    classeAdcional,
    checked,
    semBolinha,
}) => {
    const classeBase = `
        flex gap-1 justify-center items-center
        border-2 border-base-quaternaria bg-base-terciaria hover:bg-base-secundaria
        rounded-lg bg-linear-to-b shadow-destaque-s-escuro/50 w-35 h-12 transition-colors duration-200
        peer-checked:border-destaque-s-escuro/50 peer-checked:shadow-md peer-checked:bg-base-secundaria
    `

    return (
        <>
        
        <label className="block cursor-pointer group">
            <input
                type="radio"
                name={name}
                value={valor}
                className="peer hidden"
                onChange={dataBinding}
                checked={checked}
            />

            <motion.div 
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.95}}
            className={`${classeBase} ${classeAdcional ?? ``}`}>
                
                {semBolinha ? '' : (
                    <span className="flex justify-center items-center p-1 
                    rounded-full ring ring-base-quartenaria group-has-checked:ring-destaque-s-escuro">

                        <div className="span size-2.5 rounded-full bg-transparent group-has-checked:bg-destaque-s-escuro
                        transition-colors duration-200">

                        </div>
                    </span>
                )}
                {children}
            </motion.div>
            </label>
        </>
    )
}

export default RadioCustomizado