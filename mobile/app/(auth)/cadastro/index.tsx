import { View, Text } from 'react-native'
import React from 'react'
import useCadastroContext from '@/contextos/CadastroContexto'

const index = () => {
    const {
        dados 
    } = useCadastroContext()

    const {
        nome
    } = dados

  return (
    <View className='bg-base-secundaria h-full 
    flex items-center justify-center'>
      <Text className='text-t-secundaria'>seu nome: {nome}</Text>
    </View>
  )
}

export default index