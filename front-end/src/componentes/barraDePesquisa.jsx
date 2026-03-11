import React, { useEffect, useState } from 'react'
import ItemPesquisa from './itemPesquisa'
import api from '../api'

const BarraDePesquisa = () => {
    const [query, setQuery] = useState('')
    const [listaAberta, setListaAberta] = useState(false)
    const [itemsPesquisados, setItemsPesquisados] = useState([])

    function pesquisar(ev)
    {
        setQuery(ev.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(query.trim() === ''){
                setListaAberta(false)
                return
            }

           async function buscarItems()
           {
                try {
                    const res = await api.post('/dashboard/pesquisa', {
                        query: query
                    })

                    setItemsPesquisados(res.data.items)
                    setListaAberta(true)
                } catch (error) {
                    console.error(error);
                }
           } 

           buscarItems()

        }, 1000)

        return () => clearTimeout(timeout)
    }, [query])

    return (
    <div className="relative p-3 bg-zinc-100 w-full
    lg:w-3/5 my-3 flex items-center flex-col">

            <h1 className="text-xl">
                pesquisar Items
            </h1>

            <div className="w-full">
                <label htmlFor="">
                    item:
                </label>

                <div className="flex justify-between w-full gap-2">

                    <input type="text"
                        className="rounded-md bg-zinc-300/50
                        cursor-pointer hover:bg-zinc-300 w-full"
                        name="item"
                        onChange={pesquisar}
                    />

                    
                </div>
            </div>

        {listaAberta ? (

            <div className="absolute top-full left-0 w-full
            bg-zinc-300 p-3 rounded-b z-20
            flex flex-col gap-2 ">
                {itemsPesquisados.length === 0 ? (
                    <h1>nenhum item pesquisado</h1>
                ) : (
                    itemsPesquisados.map(item => (
                        <ItemPesquisa
                        key={item.id}
                        nome={item.nome}
                        />
                    ))
                )}

            </div>
        ) : ''}

    </div>
    )
}

export default BarraDePesquisa