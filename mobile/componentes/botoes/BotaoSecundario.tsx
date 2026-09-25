import { ReactNode } from 'react'
import { Pressable, Text } from 'react-native'

type Props = {
  texto?: string
  children?: ReactNode
  icone?: React.ComponentType<{ size?: number; color?: string; className?: string }>
  onClick?: () => void
  onPress?: () => void
  tipo?: 'cheio' | 'vazio' | ''
  classeAdicional?: string
  className?: string
  textoClassName?: string
  redondo?: boolean
  disabled?: boolean
}

const BotaoSecundario = ({
  texto,
  children,
  icone: Icone,
  onClick,
  onPress,
  tipo = 'vazio',
  classeAdicional = '',
  className = '',
  textoClassName = '',
  redondo,
  disabled,
}: Props) => {
  const handler = onPress ?? onClick

  const base = 'flex-row items-center justify-center gap-2 px-3 py-2'
  const estiloTipo =
    tipo === 'cheio'
      ? 'bg-destaque-s-escuro'
      : 'bg-base-terciaria border border-destaque-s-medio'

  return (
    <Pressable
      onPress={handler}
      disabled={disabled}
      className={`${base} ${estiloTipo} ${redondo ? 'rounded-full' : 'rounded-xl'} ${classeAdicional} ${className}`}
    >
      {Icone ? <Icone size={18} /> : null}
      {texto ? <Text className={`font-poppins ${tipo === 'cheio' ? 'text-stone-200' : 'text-destaque-s-escuro'} ${textoClassName}`}>{texto}</Text> : null}
      {children}
    </Pressable>
  )
}

export default BotaoSecundario