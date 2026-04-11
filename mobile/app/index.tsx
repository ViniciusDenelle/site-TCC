import { Pressable, Text, View } from "react-native";
import { cssInterop, vars } from "nativewind";
import useTema from "./contextos/TemaContexto";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { } from 'nativewind'
import BotaoPrimario from "@/app/componentes/BotaoPrimario";
import BotaoSecundario from "./componentes/BotaoSecundario";
import LinkSimples from "./componentes/LinkSimples";
import InputSimples from "./componentes/InputSimples";
import { useState } from "react";
import InputRadio from "./componentes/InputRadio";
import InputRange from "./componentes/InputRange";

export default function Index() {
  const { temaAtual, setTema, tema } = useTema();

  function mudarTema() {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
  }

  const [valor, setValor] = useState('')
  const [genero, setGenero] = useState('')
  const [peso, setPeso] = useState(20)

  return (
    <View style={vars(temaAtual)}
      className="h-full w-full flex justify-center
    bg-base-primaria font-poppins items-center">

    <View className="w-[90%] p-4 flex flex-col 
    gap-2 bg-base-secundaria rounded-xl">

      <Text className="text-lg text-t-primaria 
      font-poppins-semibold text-center mx-auto my-2">
        componentes
      </Text>

      <BotaoPrimario tipo='cheio'
        onPress={mudarTema}
      >
        mudar tema
      </BotaoPrimario>

      <BotaoSecundario tipo='cheio'>
        {peso}
      </BotaoSecundario>

      <LinkSimples to='./cadastro'>
        login
      </LinkSimples>

        <InputSimples
        className="w-full"
          onChange={valor => setValor(valor)}
          valor={valor}
        />

        <InputSimples
        className="w-full"
          onChange={valor => setValor(valor)}
          valor={valor}
        />
      <View className="w-full flex flex-row gap-1 ">
        <InputRadio
          valor='masculino'
          selecionado={genero}
          onChange={setGenero}
        >
          masculino
        </InputRadio>

        <InputRadio
          valor='feminino'
          selecionado={genero}
          onChange={setGenero}
        >
          feminino
        </InputRadio>
      </View>

      <InputRange
        valor={peso}
        onChange={value => setPeso(value)}
        min={20}
        max={200}
        recomendadoMax={100}
        recomendadoMin={20}
      />

    </View>


    </View>
  );
}