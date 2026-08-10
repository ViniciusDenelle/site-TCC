import React from 'react'
import CardHorizontal from '../../CardHorizontal'
import Texto from '../../organizacao/Texto'

const ModalPlayerDescricao = ({descricao}) => {
  return (
    <CardHorizontal>
        <div className="flex flex-col gap-2">
            <Texto tipo='titulo' className='text-t-secundaria'>
                Descrição:
            </Texto>
            <Texto tipo='subtitulo' className='font-thin'>
                {descricao}
            </Texto>

        </div>
    </CardHorizontal>

  )
}

export default ModalPlayerDescricao
