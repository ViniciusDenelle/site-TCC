import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface LinkSimplesProps {
  children: ReactNode
  to: string
  className?: string
  end?: boolean
}

const LinkSimples = ({
  children,
  to,
  className,
  end = false
}: LinkSimplesProps) => {

  const classeBase = `
    hover:text-destaque-p-escuro
    transition-colors duration-200 font-medium
    ${className ?? ''}
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
      end={end}
    >
      {children}
    </NavLink>
  )
}

export default LinkSimples