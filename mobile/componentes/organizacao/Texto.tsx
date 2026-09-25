import { ReactNode } from 'react'
import { Text } from 'react-native'

type TipoTexto = 'titulo' | 'subtitulo' | 'texto' | 'subtexto'

type Props = {
  children: ReactNode
  tipo?: TipoTexto
  className?: string
}

const estilos: Record<TipoTexto, string> = {
  titulo: 'text-lg font-poppins font-semibold text-t-primaria',
  subtitulo: 'text-base font-poppins text-t-primaria',
  texto: 'text-base font-poppins text-t-secundaria',
  subtexto: 'text-sm font-poppins text-t-terciaria',
}

const Texto = ({ children, tipo = 'texto', className = '' }: Props) => {
  return <Text className={`${estilos[tipo]} ${className}`}>{children}</Text>
}

export default Texto