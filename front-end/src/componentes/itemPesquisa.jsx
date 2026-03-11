import React from 'react'

const ItemPesquisa = ({nome}) => {
  return (
    <div className='bg-zinc-100 w-full p-2 rounded
    flex justify-between'>
        <h1 className="text-lg">
            {nome}
        </h1>

        <button className="bg-green-400 p-1 rounded">
            adcionar
        </button>
    </div>
  )
}

export default ItemPesquisa