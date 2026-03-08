import { useContext } from "react"
import { useLocation } from "react-router-dom"
import usuarioContext from "../contextos/usuarioContext"

function App() {
  const {usuarioAtual, usuarioAtualToken} = useContext(usuarioContext)


  return (
    <>
      <h1>
        {usuarioAtual}
      </h1>
    </>
  )
}

export default App
