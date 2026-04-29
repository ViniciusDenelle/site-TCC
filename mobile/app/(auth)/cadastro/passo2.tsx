import { View, Text, Pressable } from 'react-native'
import React from 'react'
import useCadastroContext from '@/contextos/CadastroContexto'
import { useRouter } from 'expo-router'
import BotaoPrimario from '@/componentes/BotaoPrimario'

const index = () => {
    const {
        dados 
    } = useCadastroContext()

    const {
        email
    } = dados

    const router = useRouter()

    function proximo()
    {
      
    }

  return (
    <View className='bg-base-secundaria h-full 
    flex items-center justify-center'>
      <Text className='text-t-secundaria'>seu email: {email}</Text>
      <BotaoPrimario>
        proximo
      </BotaoPrimario>
    </View>
  )
}

export default index