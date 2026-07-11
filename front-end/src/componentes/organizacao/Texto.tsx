import React, { Children, ReactNode } from 'react'

type TextoProps = {
    tipo?: 'titulo' | 'subtitulo' | 'paragrafo' | 'subtexto'
    className? : string,
    children: ReactNode
}

const Texto = ({
    tipo = 'paragrafo',
    className = '',
    children
} : TextoProps) => {

    const ClasseTexto = {
        'titulo' : 'text-base sm:text-lg font-bold',
        'subtitulo' : 'text-sm sm:text-base md:text-lg font-semibold',
        'paragrafo' : 'text-sm sm:text-base',
        'subtexto' : 'text-xs sm:text-sm'
    }

  return (
    <p className={`${ClasseTexto[tipo]} ${className ?? ``}`}>
        {children}
    </p>
  )
}

export default Texto
