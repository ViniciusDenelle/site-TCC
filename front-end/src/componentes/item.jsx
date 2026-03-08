import React from 'react'

const Item = ({nome, id, id_usuario}) => {
    const classe = `
        rounded-md bg-zinc-200/50 ring-1 ring-zinc-200/50
        p-3 hover:bg-zinc-200 hover:ring-zinc-200 transition-all
        duration-200
    `

  return (
    <div 
    key={id}
    className={classe}>
        {nome}
        {id}
        {id_usuario}
    </div>
  )
}

export default Item