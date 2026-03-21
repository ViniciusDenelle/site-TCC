import React from 'react'
import {motion} from 'motion/react'

const RadioCustomizado = ({name, valor, dataBinding, children}) => {
    return (
        <>
        
        <label className="block cursor-pointer group">
            <input
                type="radio"
                name={name}
                value={valor}
                className="peer hidden"
                onChange={dataBinding}
            />

            <motion.div 
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.95}}
            className="flex gap-2 justify-center items-center
            border-2 border-base-quaternaria hover:from-base-primaria to-base-secundaria
            rounded-lg bg-linear-to-b w-35 h-12 shadow-md shadow-base-quaternaria transition-colors duration-200
            peer-checked:border-destaque-p-escuro/50 peer-checked:shadow-destaque-p-medio/50
            peer-checked:from-base-primaria">

                <span className="flex justify-center items-center size-4 
                rounded-full ring ring-base-quartenaria group-has-checked:ring-destaque-p-medio">
                    <div className="span size-2.5 rounded-full bg-transparent group-has-checked:bg-destaque-p-medio
                    transition-colors duration-200">

                    </div>
                </span>
                {children}
            </motion.div>
            </label>
        </>
    )
}

export default RadioCustomizado