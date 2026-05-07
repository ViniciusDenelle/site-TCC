import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

interface LinkQuadradoProps {
  children: ReactNode
  to: string
  classeAdicional?: string
}

const LinkQuadrado = ({
  children,
  to,
  classeAdicional
}: LinkQuadradoProps) => {

  const classeBase = `
    flex w-30 h-10 justify-center items-center rounded-lg
    ring-1 ring-base-quaternaria shadow-md shadow-base-quaternaria
    hover:ring-destaque-p-escuro hover:text-destaque-p-escuro
    hover:shadow-none transition-all duration-200
    cursor-pointer bg-base-secundaria
  `

  return (
    <NavLink to={to}>
      {({ isActive }) => (

        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${classeBase} ${classeAdicional ?? ''}
            ${isActive
              ? `
                ring-destaque-s-medio bg-linear-to-b
                from-base-terciaria to-base-secundaria
                text-destaque-s-medio
              `
              : ''
            }
          `}
        >
          {children}
        </motion.li>

      )}
    </NavLink>
  )
}

export default LinkQuadrado