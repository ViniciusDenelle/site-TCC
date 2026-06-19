import { Redirect } from "expo-router";

export default function Index() {
  // Sempre que o app abrir na raiz '/', ele joga o usuário instantaneamente para o login
  return <Redirect href="/(auth)/login" />;
}