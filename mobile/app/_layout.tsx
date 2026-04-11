import { Stack } from "expo-router";
import './globals.css'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { TemaProvider } from './contextos/TemaContexto'
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <TemaProvider>
      <Stack
      />
    </TemaProvider>
  );
}
