import useTema from '@/contextos/TemaContexto'
import { vars } from 'nativewind'
import { Pressable, Text, View } from 'react-native'
import { Lightbulb } from 'lucide-react-native'

function TemaToggle() {
  const { tema, temaAtual, alternarTema, formatarCor } = useTema()

  const corIcone = formatarCor(temaAtual['--color-t-secundaria'], 1)

  return (
    <Pressable
      onPress={() => alternarTema()}
      className="absolute right-4 top-4 z-50"
    >
      <View
        style={vars(temaAtual)}
        className="flex-row items-center gap-2 rounded-full border border-contraste-primaria/30 bg-base-terciaria/90 px-3 py-2 shadow-lg"
      >
        <Lightbulb size={16} color={corIcone} />
        <Text className="font-poppins text-xs text-t-primaria">
          {tema === 'dark' ? 'Claro' : 'Escuro'}
        </Text>
      </View>
    </Pressable>
  )
}

export default TemaToggle