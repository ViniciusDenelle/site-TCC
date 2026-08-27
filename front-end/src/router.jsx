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
import TreinosLayout from './layouts/dashboard/treino/TreinosLayout'
import Treinos from './views/Dashboard/treinos/Treinos'
import Exercicios from './views/Dashboard/treinos/Exercicios'
import PesquisarTreinosLayout from './layouts/dashboard/treino/PesquisarTreinosLayout'
import PesquisarExercicios from './views/Dashboard/treinos/pesquisar/PesquisarExercicios'
import PesquisarTreino from './views/Dashboard/treinos/pesquisar/PesquisarTreino'
import CriarPrincipal from './views/Dashboard/treinos/criar/CriarPrincipal'
import CriarExercicios from './views/Dashboard/treinos/criar/CriarExercicios'

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

                <Route path='treino' element={<TreinosLayout/>}>
                    {/* tem que colocar os bagulho de treino aqui */}
                    
                    <Route path='treinos' element={<Treinos/>} />
                    <Route path='exercicios' element={<Exercicios/>}/>

                    <Route path='pesquisar' element={<PesquisarTreinosLayout/>}>
                        <Route path='exercicio' element={<PesquisarExercicios/>}/>
                        <Route path='treino' element={<PesquisarTreino/>}/>
                    </Route>
                    {/* criação */}
                    <Route path='criarPrincipal' element={<CriarPrincipal/>} />
                    <Route path='criarExercicio' element={<CriarExercicios/>}/>

                    
                </Route>
            </Route>
                
        
        </>
    )
)

export default Rota