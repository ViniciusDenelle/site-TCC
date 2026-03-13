import React from 'react'

const BotãoSimples = ({children, classeAdcional}) => {

    const classe = `
        rounded-lg p-1 bg-base-secundaria
         ring-destaque-s-medio
        text-destaque-s-medio hover:text-destaque-s-claro
        hover:bg-base-primaria hover:ring-destaque-s-medio 
        transition-all
        duration-300 cursor-pointer
        ${classeAdcional}
    `

  return (
    <button className={classe}>
        {children}
    </button>
  )
}

export default BotãoSimples