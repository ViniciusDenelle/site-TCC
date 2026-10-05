import { ReactNode } from 'react'
import { View } from 'react-native'

type Props = {
  tempo: number
  tempoInicial: number
  size?: number
  strokeWidth?: number
  children?: ReactNode
}

const TImerCircular = ({ size = 200, strokeWidth = 10, children }: Props) => {
  return (
    <View
      className="items-center justify-center rounded-full border-dashed border-destaque-s-claro"
      style={{ width: size, height: size, borderWidth: strokeWidth }}
    >
      {children}
    </View>
  )
}

export default TImerCircular