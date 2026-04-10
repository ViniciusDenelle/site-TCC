import { Pressable, Text, View } from "react-native";
import { cssInterop, vars } from "nativewind";
import  { useTema } from "./contextos/TemaContexto";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import {} from 'nativewind'
import BotaoPrimario from "@/componentes/BotaoPrimario";

const BtnAnimado = Animated.createAnimatedComponent(Pressable);

cssInterop(BtnAnimado, {
  className: 'style'
})

export default function Index() {
  const { temaAtual, setTema, tema } = useTema();
  const scale = useSharedValue(1)

  const animado = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}]
  }))

  function mudarTema()
  {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
  }

  return (
    <View style={vars(temaAtual)}
    className="h-full flex justify-center items-center bg-base-primaria">


      <BtnAnimado
      onPress={mudarTema}
        onPressIn={() => {
          scale.value = withSpring(0.9, {duration: 100})
        } }
        onPressOut={() => {
          scale.value = withSpring(1, {duration: 100})
        } }
        style={animado}
        className='bg-base-secundaria rounded p-1 '
      >
        <Text className="text-t-primaria select-none">
          toggle tema
        </Text>
      </BtnAnimado>

      <BotaoPrimario>
        botaof
      </BotaoPrimario>

      <Text
      className="text-destaque-p-medio"
      >
        tema
      </Text>
      
    </View>
  );
}