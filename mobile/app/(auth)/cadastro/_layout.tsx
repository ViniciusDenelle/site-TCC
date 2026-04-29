
import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import { CadastroProvider } from '@/contextos/CadastroContexto'
import { Slot, Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const _layout = () => {

  return (
    <CadastroProvider>
        <CadastroLayout>
            <Slot />
        </CadastroLayout>
    </CadastroProvider>
  )
}

export default _layout
