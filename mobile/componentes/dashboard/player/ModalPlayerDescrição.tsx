import React from 'react'
import CardHorizontal from '../../CardHorizontal'
import Texto from '../../organizacao/Texto'
import { View } from 'react-native'

const ModalPlayerDescricao = ({descricao}) => {
  return (
    <CardHorizontal>
        <View className="flex flex-col gap-2">
            <Texto tipo='titulo' className='text-t-secundaria'>
                Descrição:
            </Texto>
            <Texto tipo='subtitulo' className='font-thin'>
                {descricao}
            </Texto>

        </View>
    </CardHorizontal>

  )
}

export default ModalPlayerDescricao
