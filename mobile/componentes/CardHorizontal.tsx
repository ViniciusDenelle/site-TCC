import { ReactNode } from 'react'
import { View } from 'react-native'

type Props = {
  children: ReactNode
  className?: string
}

const CardHorizontal = ({ children, className = '' }: Props) => {
  return (
    <View className={`rounded-2xl bg-base-terciaria/80 px-4 py-3 ${className}`}>
      {children}
    </View>
  )
}

export default CardHorizontal