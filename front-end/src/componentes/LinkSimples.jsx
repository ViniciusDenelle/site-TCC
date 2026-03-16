import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkSimples = ({children, to, classeAdcional}) => {
    const classeBase = `
        hover:text-destaque-p-escuro transition-colors 
        duration-200 ${classeAdcional ?? ``}
    `
    const classeAtivo = `text-destaque-s-medio ${classeBase}`

  return (
    <NavLink className={({isActive}) => isActive ? classeAtivo : classeBase}
    to={to ?? ''}>
        {children}
    </NavLink>
  )
}

export default LinkSimples