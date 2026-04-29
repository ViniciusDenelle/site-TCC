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
        nome
    } = dados

    const router = useRouter()

    function proximo()
    {
      router.push('/cadastro/passo2')
    }

  return (

    <View>
      <Text className='text-t-secundaria'>seu nome: {nome}</Text>
    </View>
      
  )
}

export default index