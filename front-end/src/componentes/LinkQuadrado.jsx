import React from 'react'
import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'

const LinkQuadrado = ({children, to}) => {
    return (
        <NavLink to={to ?? null}> 
        {({isActive}) => (

            <motion.li
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className={`flex w-30 h-10 justify-center items-center rounded-lg 
                ring-1 ring-base-quaternaria shadow-md shadow-base-quaternaria 
                hover:ring-destaque-p-escuro hover:text-destaque-p-escuro hover:shadow-none
                transiton-all duration-200 cursor-pointer bg-linear-to-b from-base-primaria to-base-terciaria/50
                ${isActive && `ring-destaque-s-medio text-destaque-s-medio`}
                `}>
                
                    {children} 
            </motion.li>
        )}
        </NavLink>
    )
}

export default LinkQuadrado