import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
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
import DietListOnly from './views/Dashboard/dieta/DashboardDietas'




const Rota = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Home e Auth */}
            <Route path='/' element={<LayoutDefault />}>
                <Route index element={<App />} />

                <Route path="login" element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path='recuperar-senha' element={<RecuperarSenha />} />
                </Route>
                    
                <Route path="cadastro" element={<CadastroLayout />}>
                    <Route index element={<Cadastro />} />
                </Route>
            </Route>

            {/* Dashboard */}
            <Route path='/dashboard' element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />

                {/* Rotas de Treino */}
                <Route path='treino' element={<TreinosLayout />}>
                    <Route path='treinos' element={<Treinos />} />
                    <Route path='exercicios' element={<Exercicios />} />

                    <Route path='pesquisar' element={<PesquisarTreinosLayout />}>
                        <Route path='exercicio' element={<PesquisarExercicios />} />
                        <Route path='treino' element={<PesquisarTreino />} />
                    </Route>
                    {/* criação */}
                    <Route path='criarPrincipal' element={<CriarPrincipal/>} />
                    <Route path='criarExercicio' element={<CriarExercicios/>}/>

                    
                </Route>

                {/* Nova Rota de Dieta */}
                <Route path='dietas' element={<DietListOnly/>}/>
                {/* <Route path='dieta' element={<GymForgeDietPage />}>
                    
                    <Route index element={<Navigate to="dietas-prontas" replace />} />
                    <Route path='resumo' element={<div>Resumo da Dieta</div>} />
                    <Route path='dietas-prontas' element={<GymForgeDietPage />} />
                    <Route path='plano-do-dia' element={<div>Plano do Dia</div>} />
                </Route> */}
            </Route>
        </>
    )
)

export default Rota