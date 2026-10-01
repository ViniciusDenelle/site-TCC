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
import CriarTreinos from './views/Dashboard/treinos/criar/CriarTreinos'
import DietaLayout from './layouts/dashboard/dieta/DietaLayout'
import DashboardDietas from './views/Dashboard/dieta/DashboardDietas'
import Home from './views/Dashboard/Home/Home'
import AtualizarPerfil from './views/Dashboard/Home/AtualizarPerfil'
import VerTreino from './views/Dashboard/treinos/ver/VerTreino'
import EditarTreino from './views/Dashboard/treinos/editar/EditarTreino'
import VerExercicio from './views/Dashboard/treinos/ver/VerExercicio'
import Progresso from './views/Dashboard/progresso/progresso'
import EditarExercicio from './views/Dashboard/treinos/editar/EditarExercicio'
import CriarFichaTreino from './views/Dashboard/treinos/criar/CriarFicha'
import VerFicha from './views/Dashboard/treinos/ver/VerFicha'
import EditarFicha from './views/Dashboard/treinos/editar/EditarFicha'
import PesquisarFichas from './views/Dashboard/treinos/pesquisar/PesquisarFichas'
import CriarDieta from './views/Dashboard/dieta/criar/CriarDieta'
import VerDieta from './views/Dashboard/dieta/ver/VerDieta'
import MeusTreinosLayout from './layouts/dashboard/treino/MeusTreinosLayout'
import BibliotecaTreinosHome from './views/Dashboard/treinos/meusTreinos/BibliotecaTreinosHome'

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

                {/* Rotas de Home e Perfil */}
                <Route path='home' element={<Home />}>
                    <Route path='atualizarPerfil' element={<AtualizarPerfil />} />
                </Route>
                <Route path='perfil' element={<Home />} />

                {/* Rota do Progresso */}
                <Route path='progresso' element={<Progresso />} />

                {/* Rotas de Treino */}
                <Route path='treino' element={<TreinosLayout />}>
                    <Route index element={<Treinos />} />
                    <Route path='exercicios' element={<Exercicios />} />

                    <Route path='pesquisar' element={<PesquisarTreinosLayout />}>
                        <Route path='exercicio' element={<PesquisarExercicios />} />
                        <Route path='treino' element={<PesquisarTreino />} />
                        <Route path='ficha' element={<PesquisarFichas />} />
                    </Route>

                    <Route path='meusTreinos' element={<MeusTreinosLayout />}>
                        <Route index element={<BibliotecaTreinosHome />} />
                    </Route>

                    {/* Criação */}
                    <Route path='criarPrincipal' element={<CriarPrincipal />} />
                    <Route path='criarExercicio' element={<CriarExercicios />} />
                    <Route path='criarTreino' element={<CriarTreinos />} />
                    <Route path='criarFichaTreino' element={<CriarFichaTreino />} />

                    <Route path='verTreino/:id' element={<VerTreino />} />
                    <Route path='verExercicio/:id' element={<VerExercicio />} />
                    <Route path='verFicha/:id' element={<VerFicha />} />

                    <Route path='editarTreino/:id' element={<EditarTreino />} />
                    <Route path='editarExercicio/:id' element={<EditarExercicio />} />
                    <Route path='editarFicha/:id' element={<EditarFicha />} />

                </Route>

                {/* Rotas de Dieta */}
                <Route path='dieta' element={<DietaLayout />}>
                    <Route index element={<DashboardDietas />} />
                    <Route path='dieta' element={<div>Página Dieta</div>} />
                    <Route path='pesquisar' element={<div>Pesquisar Dietas</div>} />
                    <Route path='criarPrincipal' element={<CriarDieta />} />

                    <Route path='verDieta/:id' element={<VerDieta />} />
                </Route>

                {/* Redirecionamentos de segurança */}
                <Route path='dietas' element={<Navigate to="/dashboard/dieta" replace />} />
                <Route path='Home' element={<Navigate to="/dashboard/home" replace />} />
                <Route path='Progresso' element={<Navigate to="/dashboard/progresso" replace />} />
            </Route>
        </>
    )
)

export default Rota