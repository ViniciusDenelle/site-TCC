import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import Texto from './Texto'
import WrapperIcone from './WrapperIcone'

type Props = {
  nome: string
  icone: React.ComponentType<{ size?: number; color?: string; className?: string }>
  to?: string
  onclick?: () => void
  tipo?: 'link' | 'botao'
  corIcone?: string
}

const OpcoesMenuPlayer = ({ nome, icone: Icone, to, onclick, tipo = 'botao', corIcone = '' }: Props) => {
  const conteudo = (
    <Pressable onPress={onclick} className="flex-row items-center gap-3 rounded-xl bg-base-terciaria px-3 py-3">
      <WrapperIcone>
        <Icone size={20} className={corIcone} />
      </WrapperIcone>
      <Texto tipo="subtitulo" className="font-medium text-t-primaria">
        {nome}
      </Texto>
    </Pressable>
  )

  if (tipo === 'link' && to) {
    return (
      <Link href={to as any} asChild>
        {conteudo}
      </Link>
    )
  }

  return conteudo
}

export default OpcoesMenuPlayer