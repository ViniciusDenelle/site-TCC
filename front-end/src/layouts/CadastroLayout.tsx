import { Outlet } from 'react-router-dom'
import { CadastroProvider } from '../contextos/CadastroContexto.js'
import useFetchUsuario from '../logicas/usuario/FetchUsuario.js'

const Placeholder = () => {

  return (
    <p>espera</p>
  )
}

const CadastroLayout = () => {
  const {
    dadosUsuario,
    isSuccess,
    isPending,
  } = useFetchUsuario()
  const token = localStorage.getItem('token')
  
  if (token) {
      if(isSuccess || dadosUsuario) {
        navigation.navigate('/dashboard')
      }
    }
 
  return (
    <CadastroProvider>
      <Outlet />
    </CadastroProvider>
  )
}

export default CadastroLayout