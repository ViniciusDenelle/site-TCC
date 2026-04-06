import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import App from './views/App'
import Login from './views/Login'
import Cadastro from './views/cadastro/cadastro'
import CadastroLayout from './layouts/CadastroLayout'
let ddd = 'dfadfasd'
const Rota = createBrowserRouter(
    
    createRoutesFromElements(
        <Route path='/' element={<LayoutDefault />}>
            <Route index element={<App />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/cadastro" element={<CadastroLayout/>} >
                  <Route index element={<Cadastro/>} />
            </Route> 
          </Route>
    )
)

export default Rota