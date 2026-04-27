
import { CadastroProvider } from '@/contextos/CadastroContexto'
import useTema from '@/contextos/TemaContexto'
import { Stack } from 'expo-router'
import { vars } from 'nativewind'
import React from 'react'
import { View } from 'react-native'

const _layout = () => {
    const { temaAtual } = useTema()

  return (
    <CadastroProvider>
        <View style={vars(temaAtual)} className='flex-1'>
            <Stack 
                screenOptions={{headerShown: false}}
            />
        </View>
    </CadastroProvider>
  )
}

export default _layout
