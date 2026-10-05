import { Pressable } from 'react-native'

type Props = {
  icone?: React.ComponentType<{ size?: number; color?: string; className?: string }>
  onClick?: () => void
  onPress?: () => void
  tamanhoIcone?: 'md' | 'lg' | 'xl'
  className?: string
}

const tamanhos = {
  md: 18,
  lg: 22,
  xl: 26,
}

const BotaoTerciario = ({
  icone: Icone,
  onClick,
  onPress,
  tamanhoIcone = 'md',
  className = '',
}: Props) => {
  const handler = onPress ?? onClick

  return (
    <Pressable
      onPress={handler}
      className={`items-center justify-center rounded-full bg-base-terciaria p-3 ${className}`}
    >
      {Icone ? <Icone size={tamanhos[tamanhoIcone]} /> : null}
    </Pressable>
  )
}

export default BotaoTerciario