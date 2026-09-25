import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import Texto from '../organizacao/Texto'
import WrapperIcone from '../organizacao/WrapperIcone'

type Props = {
  icone: React.ComponentType<{ size?: number; color?: string; className?: string }>
  legenda: string
  to: string
}

const LinkNavDashboard = ({ icone: Icone, legenda, to }: Props) => {
  return (
    <Link href={to as any} asChild>
      <Pressable className="flex-1 items-center justify-center gap-1 rounded-xl px-2 py-2">
        <WrapperIcone tamanho="md">
          <Icone size={20} />
        </WrapperIcone>
        <Texto tipo="subtexto" className="text-center">
          {legenda}
        </Texto>
      </Pressable>
    </Link>
  )
}

export default LinkNavDashboard