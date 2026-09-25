import { ReactNode } from 'react'
import { View } from 'react-native'

type Props = {
  children: ReactNode
  tamanho?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const tamanhos = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
}

const WrapperIcone = ({ children, tamanho = 'md', className = '' }: Props) => {
  return (
    <View className={`items-center justify-center ${tamanhos[tamanho]} ${className}`}>
      {children}
    </View>
  )
}

export default WrapperIcone