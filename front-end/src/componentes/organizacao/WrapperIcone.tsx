import React, { Children, ReactNode } from 'react'

type WrapperIconeProps = {
    children: ReactNode
    tamanho?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}

const WrapperIcone = ({
    tamanho = 'md',
    children
}) => {

    const classeWrapper = {
        'xl' : 'size-10 sm:size-12 md:size-14',
        'lg' : 'size-8 sm:size-10 md:size-12',
        'md': 'size-6 sm:size-8',
        'sm' : 'size-5 sm:size-6 ',
        'xs' : 'size-4 sm:size-5',
    }

  return (
    <div className={`${classeWrapper[tamanho]} flex items-center justify-center`}>
      {children}
    </div>
  )
}

export default WrapperIcone
