import { Stack } from "expo-router";
import './globals.css'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import useTema, { TemaProvider } from '../contextos/TemaContexto'
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { toastConfig } from "@/componentes/ToastConfig";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { vars } from 'nativewind'
import TemaToggle from '@/componentes/TemaToggle'
import { StatusBar } from 'expo-status-bar'

const queryClient = new QueryClient()

function AppContent() {
  const { tema, temaAtual } = useTema()

  return (
    <View style={vars(temaAtual)} className="flex-1 bg-base-primaria">
      <StatusBar style={tema === 'dark' ? 'light' : 'dark'} translucent />

      <Stack
        screenOptions={{
          headerShown: false
        }}
      />

      <TemaToggle />
      <Toast config={toastConfig}/>
    </View>
  )
}

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppContent />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TemaProvider>
  );
}
