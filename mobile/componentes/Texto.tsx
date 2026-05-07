import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

type props = {
    children: ReactNode,
    variante?: 'titulo' | 'texto' | 'legenda',
    className?: string
}

const Texto = ({
    children,
    variante = 'texto',
    className,
} : props) => {
    const variantes = {
        'titulo' : 'text-lg text-t-primaria font-poppins',
        'texto' : 'text-base text-t-secundaria font-poppins',
        'legenda' : 'text-sm text-t-terciaria font-poppins',
    }

  return (
    <Text 
        className={`${variantes[variante]} ${className}`}
    >
        {children}
    </Text>
  )
}

export default Texto