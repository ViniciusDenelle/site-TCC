import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface LinkSimplesProps {
  children: ReactNode
  to: string
  classeAdicional?: string
}

const LinkSimples = ({
  children,
  to,
  classeAdicional
}: LinkSimplesProps) => {

  const classeBase = `
    hover:text-destaque-p-escuro
    transition-colors duration-200 font-medium
    ${classeAdicional ?? ''}
  `

  const classeAtivo = `
    text-destaque-s-escuro
    ${classeBase}
  `

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? classeAtivo : classeBase
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}

export default LinkSimples