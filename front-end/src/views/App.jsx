import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation()
  const usuario = location.state

  return (
    <>
      <h1>
        {usuario.name}
      </h1>
    </>
  )
}

export default App
