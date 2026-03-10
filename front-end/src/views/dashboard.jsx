import { useContext, useEffect, useState } from "react"
import usuarioContext from "../contextos/usuarioContext"
import Item from "../componentes/item"
import api from "../api"


const Dashboard = () => {
    const {usuarioAtual} = useContext(usuarioContext)
    const [itemNome, setItemNome] = useState(null)

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


    function mudarItem(ev)
    {
        setItemNome(ev.target.value)
    }

    async function criarItem()
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

  return (
    <>
        <main className="h-screen w-full">
          <div className="container mx-auto h-full 
          flex flex-col justify-center items-center">

            <div className="p-3 bg-zinc-100 w-full
            lg:w-3/5 my-3 flex items-center flex-col">

              <h1 className="text-xl">
                criar item
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
                  onChange={mudarItem}/>

                  <button className="rounded lg bg-green-500/50
                  cursor-pointer hover:bg-green-500 p-1"
                  onClick={criarItem}>
                    criar
                  </button>
                </div>
              </div>

            </div>

            <div className="grid grid-rows-5 w-full lg:w-3/5 p-5 
            bg-slate-100 gap-2">

              {items.length === 0 ? (
                <p>nenhum item criado</p>
              ) : (
                items.map(item => (
                  <Item nome={item.nome} key={item.id} id={item.id}/>
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