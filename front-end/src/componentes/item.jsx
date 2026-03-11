import React, { useState } from 'react'
import api from '../api'

const Item = ({nome, id, onDelete}) => {
    const classe = `
        rounded-md bg-zinc-200/50 ring-1 ring-zinc-200/50
        p-3 hover:bg-zinc-200 hover:ring-zinc-200 transition-all
        duration-200 flex justify-between
    `

    const [atualizavel ,setAtualizavel] = useState(false)
    const [Nome, setNome] = useState(nome)

    async function update()
    {
      try {
        const res = await api.put(`/dashboard/update/${id}`, {
          nome: Nome,
        })

        setNome(res.data.itemNome)
        setAtualizavel(false)
      } catch (error) {
        console.error(error.response.data)
      }
    }

    function deletar()
    {
      onDelete(id)
    }

  return (
    <div
    className={classe}>
      <h1 className="text-lg">
        {atualizavel ?(
          <>
            <label htmlFor="">
              nome:
            </label>
            <input type="text" 
            className='rounded bg-zinc-300'
            value={Nome}
            name='nome'
            onChange={ev => setNome(ev.target.value)}
            />
          </>
        ) : (
          Nome
        )}
      </h1>


      <div className="flex gap-2">

        {atualizavel ?(
          <>
            <button className="rounded-md p-1 bg-red-500/50
            cursor-pointer hover:bg-red-500"
            onClick={() => setAtualizavel(false)}>
              cancelar
            </button>

            <button className='rounded bg-green-500/50
            p-1 hover:bg-green-500 cursor-pointer'
            onClick={update}>
              confirmar
            </button>

          </>
        ) : (
          <>
            <button className="rounded-md p-1 bg-sky-500/50
            cursor-pointer hover:bg-sky-500"
            onClick={() => setAtualizavel(true)}>
              update
            </button>

            <button className="rounded-md p-1 bg-red-500/50
            cursor-pointer hover:bg-red-500"
            onClick={deletar}>
              delete
            </button>
          </>
        )}
        
      </div>
    </div>
  )
}

export default Item