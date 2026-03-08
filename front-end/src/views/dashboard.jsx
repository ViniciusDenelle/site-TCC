import { useContext, useEffect } from "react"
import usuarioContext from "../contextos/usuarioContext"


const Dashboard = () => {
    const {usuarioAtual} = useContext(usuarioContext)

  return (
    <>
        <h1>{usuarioAtual.name}</h1>
    </>
  )
}

export default Dashboard