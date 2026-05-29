import { Stack } from "expo-router";
import './globals.css'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { TemaProvider } from '../contextos/TemaContexto'
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { toastConfig } from "@/componentes/ToastConfig";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <Stack
          screenOptions={{
            headerShown: false
          }}/>
          <Toast config={toastConfig}/>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TemaProvider>
  );
}
