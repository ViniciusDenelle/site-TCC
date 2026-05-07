import { Outlet } from 'react-router-dom'
import { CadastroProvider } from '../contextos/CadastroContexto.js'

const CadastroLayout = () => {

  return (
    <CadastroProvider>
      <Outlet />
    </CadastroProvider>
  )
}

export default CadastroLayout