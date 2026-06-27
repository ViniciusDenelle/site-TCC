import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import LayoutDefault from './layouts/layout'
import App from './views/App'
import Cadastro from './views/cadastro/cadastro'
import CadastroLayout from './layouts/CadastroLayout'
import LoginLayout from './views/login/LoginLayout'
import Login from './views/login/Login'
import RecuperarSenha from './views/login/RecuperarSenha'
import Dashboard from './views/Dashboard/Dashboard'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import TreinosLayout from './layouts/dashboard/TreinosLayout'
import Treino from './views/Dashboard/treinos/Treino'
let ddd = 'dfadfasd'
const Rota = createBrowserRouter(
    
    createRoutesFromElements(
        <>
            {/* home e Auth */}
            <Route path='/' element={<LayoutDefault/>}>
                <Route index element={<App />} />

                <Route path="login" element={<LoginLayout />} >
                    <Route index element={<Login />} />
                    <Route path='recuperar-senha' element={<RecuperarSenha />} />
                </Route>
                    
                <Route path="cadastro" element={<CadastroLayout/>} >
                        <Route index element={<Cadastro/>} />
                </Route>
            </Route>

                {/* dashboard */}
            <Route path='/dashboard' element={<DashboardLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='treinos' element={<TreinosLayout/>}>
                    <Route index element={<Treino/>} />
                </Route>
            </Route>
                
        
        </>
    )
)

export default Rota