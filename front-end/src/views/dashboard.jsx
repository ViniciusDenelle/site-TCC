import { useContext, useEffect } from "react"
import usuarioContext from "../contextos/usuarioContext"
import Item from "../componentes/item"


const Dashboard = () => {
    const {usuarioAtual} = useContext(usuarioContext)

  return (
    <>
        <main className="h-screen w-full">
          <div className="container mx-auto h-full 
          flex justify-center items-center">

            <div className="grid grid-rows-5 w-full lg:w-3/5 p-5 
            bg-slate-100 gap-2">

              <Item 
              nome="item"
              id='1'
              id_usuario={usuarioAtual.id}
              />

            </div>

          </div>
        </main>
    </>
  )
}

export default Dashboard