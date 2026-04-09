import { Pressable, Text, View } from "react-native";
import { vars } from "nativewind";
import  { useTema } from "./contextos/TemaContexto";

export default function Index() {
  const { temaAtual, setTema, tema } = useTema();

  function mudarTema()
  {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
  }

  return (
    <View style={vars(temaAtual)}
    className="h-full flex justify-center items-center">


      <Pressable
      onPress={mudarTema}>
        <Text>
          toggle tema
        </Text>
      </Pressable>

      <Text
      className="text-destaque-p-medio"
      >
        tema
      </Text>
      
    </View>
  );
}