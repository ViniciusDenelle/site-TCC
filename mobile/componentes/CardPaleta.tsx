import { View } from 'react-native'

type Props = {
  corBase: string
  corComplementar: string
  corPrimaria: string
}

const CardPaleta = ({ corBase, corComplementar, corPrimaria }: Props) => {
  return (
    <View className="flex-row gap-2">
      <View className={`h-12 flex-1 rounded-xl ${corBase}`} />
      <View className={`h-12 flex-1 rounded-xl ${corComplementar}`} />
      <View className={`h-12 flex-1 rounded-xl ${corPrimaria}`} />
    </View>
  )
}

export default CardPaleta