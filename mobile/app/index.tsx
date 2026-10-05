import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { vars } from "nativewind";

import useTema from "@/contextos/TemaContexto";
import useUsuario from "@/contextos/UsuarioContexto";

export default function Index() {
  const { temaAtual } = useTema();
  const { autenticado, carregando } = useUsuario();

  // Enquanto lê a sessão salva no aparelho, mostra um loading (evita piscar o login)
  if (carregando) {
    return (
      <View
        style={vars(temaAtual)}
        className="flex-1 bg-base-primaria items-center justify-center"
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Já logado -> abas. Senão -> login.
  return <Redirect href={autenticado ? "/(tabs)" : "/(auth)/login"} />;
}