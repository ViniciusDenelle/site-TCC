import { useContext, useEffect, useState } from "react"
import usuarioContext from "../contextos/usuarioContext"
import Item from "../componentes/item"
import api from "../api"
import BarraCriarItem from "../componentes/barraCriarItem"
import BarraDePesquisa from "../componentes/barraDePesquisa"


const Dashboard = () => {
    const {usuarioAtual} = useContext(usuarioContext)

    const [barraDePesquisa, setBarraDePesquisa] = useState(false)

    const [items, setItems] = useState([])

    

    async function indexarItems()
    {
      try {
        const res = await api.get('/dashboard/index')
        
        setItems(res.data.items)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      indexarItems()
    }, [])

    async function criarItem(itemNome)
    {
      try {
        const res = await api.post('/dashboard/criar', {
          nome: itemNome
        })
        
        setItems(prev => [...prev, res.data.item])
      } catch (error) {
        console.error(error)
      }
    }

    async function deletar(id)
    {
      try {
        await api.delete(`/dashboard/delete/${id}`)

        indexarItems()
      } catch (error) {
        console.error(error.response.data)
      }
    }

  return (
    <>
        <main className="h-screen w-full">
          <div className="container mx-auto h-full 
          flex flex-col justify-center items-center">

            <div className="flex gap-2">

              <button 
              className={`rounded p-1
              ${!barraDePesquisa ?
                `bg-green-500`:
                `bg-zinc-200 cursor-pointer`
              }`}
              onClick={() => setBarraDePesquisa(false)}
              disabled={!barraDePesquisa}>
                criar
              </button>

              <button 
              className={`rounded p-1
              ${barraDePesquisa ?
                `bg-green-500`:
                `bg-zinc-200 cursor-pointer`
              }`}
              onClick={() => setBarraDePesquisa(true)}
              disabled={barraDePesquisa}>
                pesquisa
              </button>

            </div>

            {barraDePesquisa ? (
              <BarraDePesquisa />
            ) : (
              <BarraCriarItem 
              criarItem={criarItem}
              />
            )}

            <div className="grid grid-rows-5 w-full lg:w-3/5 p-5 
            bg-slate-100 gap-2">

              {items.length === 0 ? (
                <p>nenhum item criado</p>
              ) : (
                items.map(item => (
                  <Item 
                  nome={item.nome} 
                  key={item.id} 
                  id={item.id}
                  onDelete={deletar}/>
                ))
              )
            }
            </div>

          </div>
        </main>
    </>
  )
}

export default Dashboard