
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from 'react-router-dom'

import LayoutDefault from './layouts/layout'
import App from './views/App'
import Cadastro from './views/cadastro/cadastro'
import CadastroLayout from './layouts/CadastroLayout'

import LoginLayout from './views/login/LoginLayout'
import Login from './views/login/Login'
import RecuperarSenha from './views/login/RecuperarSenha'

import Dashboard from './views/Dashboard/Dashboard'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import Home from './views/Dashboard/Home/Home'
import AtualizarPerfil from './views/Dashboard/Home/AtualizarPerfil'
import SobreNos from './views/Dashboard/SobreNos'
import Progresso from './views/Dashboard/progresso/progresso'

// Treinos
import TreinosLayout from './layouts/dashboard/treino/TreinosLayout'
import MeusTreinosLayout from './layouts/dashboard/treino/MeusTreinosLayout'
import PesquisarTreinosLayout from './layouts/dashboard/treino/PesquisarTreinosLayout'

import Treinos from './views/Dashboard/treinos/Treinos'
import Exercicios from './views/Dashboard/treinos/Exercicios'
import BibliotecaTreinosHome from './views/Dashboard/treinos/meusTreinos/BibliotecaTreinosHome'

import PesquisarExercicios from './views/Dashboard/treinos/pesquisar/PesquisarExercicios'
import PesquisarTreino from './views/Dashboard/treinos/pesquisar/PesquisarTreino'
import PesquisarFichas from './views/Dashboard/treinos/pesquisar/PesquisarFichas'

import CriarPrincipal from './views/Dashboard/treinos/criar/CriarPrincipal'
import CriarExercicios from './views/Dashboard/treinos/criar/CriarExercicios'
import CriarTreinos from './views/Dashboard/treinos/criar/CriarTreinos'
import CriarFichaTreino from './views/Dashboard/treinos/criar/CriarFicha'

import VerTreino from './views/Dashboard/treinos/ver/VerTreino'
import VerExercicio from './views/Dashboard/treinos/ver/VerExercicio'
import VerFicha from './views/Dashboard/treinos/ver/VerFicha'

import EditarTreino from './views/Dashboard/treinos/editar/EditarTreino'
import EditarExercicio from './views/Dashboard/treinos/editar/EditarExercicio'
import EditarFicha from './views/Dashboard/treinos/editar/EditarFicha'

// Dietas
import DietaLayout from './layouts/dashboard/dieta/DietaLayout'

import MinhasDietas from './views/Dashboard/dieta/ver/minhasDietas'
import VerDieta from './views/Dashboard/dieta/ver/VerDieta'

import CriarOpcoesDieta from './views/Dashboard/dieta/criar/Criar'
import CriarDieta from './views/Dashboard/dieta/criar/CriarDieta'
import CriarAlimento from './views/Dashboard/dieta/criar/CriarAlimento'

import PesquisarDietas from './views/Dashboard/dieta/pesquisar/PesquisarDietas'
import PesquisarDietaHome from './views/Dashboard/dieta/pesquisar/PesquisarDietaHome'
import PesquisarAlimentos from './views/Dashboard/dieta/pesquisar/PesquisarAlimentos'

const Rota = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Home e autenticação */}
            <Route path='/' element={<LayoutDefault />}>
                <Route index element={<App />} />

                <Route path='login' element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path='recuperar-senha' element={<RecuperarSenha />} />
                </Route>

                <Route path='cadastro' element={<CadastroLayout />}>
                    <Route index element={<Cadastro />} />
                </Route>
            </Route>

            {/* Dashboard */}
            <Route path='/dashboard' element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />

                {/* Home e perfil */}
                <Route path='home' element={<Home />}>
                    <Route path='atualizarPerfil' element={<AtualizarPerfil />} />
                </Route>

                <Route path='perfil' element={<Home />} />

                {/* Sobre nós */}
                <Route path='sobre-nos' element={<SobreNos />} />

                {/* Progresso */}
                <Route path='progresso' element={<Progresso />} />

                {/* Treinos */}
                <Route path='treino' element={<TreinosLayout />}>
                    <Route index element={<Treinos />} />

                    <Route path='exercicios' element={<Exercicios />} />

                    {/* Meus treinos */}
                    <Route path='meusTreinos' element={<MeusTreinosLayout />}>
                        <Route index element={<BibliotecaTreinosHome />} />
                        <Route path='biblioteca' element={<BibliotecaTreinosHome />} />
                    </Route>

                    {/* Pesquisar treinos */}
                    <Route path='pesquisar' element={<PesquisarTreinosLayout />}>
                        <Route path='exercicio' element={<PesquisarExercicios />} />
                        <Route path='treino' element={<PesquisarTreino />} />
                        <Route path='ficha' element={<PesquisarFichas />} />
                    </Route>

                    {/* Criar */}
                    <Route path='criarPrincipal' element={<CriarPrincipal />} />
                    <Route path='criarExercicio' element={<CriarExercicios />} />
                    <Route path='criarTreino' element={<CriarTreinos />} />
                    <Route path='criarFichaTreino' element={<CriarFichaTreino />} />

                    {/* Visualizar */}
                    <Route path='verTreino/:id' element={<VerTreino />} />
                    <Route path='verExercicio/:id' element={<VerExercicio />} />
                    <Route path='verFicha/:id' element={<VerFicha />} />

                    {/* Editar */}
                    <Route path='editarTreino/:id' element={<EditarTreino />} />
                    <Route path='editarExercicio/:id' element={<EditarExercicio />} />
                    <Route path='editarFicha/:id' element={<EditarFicha />} />
                </Route>

                {/* Dietas */}
                <Route path='dieta' element={<DietaLayout />}>

                    {/* Minhas dietas */}
                    <Route index element={<MinhasDietas />} />
                    <Route path='minhasDietas' element={<MinhasDietas />} />

                    {/* Criar dieta ou alimento */}
                    <Route path='criarPrincipal' element={<CriarOpcoesDieta />} />
                    <Route path='CriarDieta' element={<CriarDieta />} />
                    <Route path='CriarAlimento' element={<CriarAlimento />} />

                    {/* Visualizar dieta */}
                    <Route path='verDieta/:id' element={<VerDieta />} />

                    {/* Pesquisar */}
                    <Route path='pesquisar' element={<div>Pesquisar Dietas</div>} />
                    <Route path='pesquisarPrincipal' element={<PesquisarDietaHome />} />
                    <Route path='pesquisarDietas' element={<PesquisarDietas />} />
                    <Route path='pesquisarAlimentos' element={<PesquisarAlimentos />} />

                </Route>
            </Route>

            {/* Redirecionamentos */}
            <Route
                path='dietas'
                element={<Navigate to='/dashboard/dieta' replace />}
            />

            <Route
                path='Home'
                element={<Navigate to='/dashboard/home' replace />}
            />

            <Route
                path='Progresso'
                element={<Navigate to='/dashboard/progresso' replace />}
            />
        </>
    )
)

export default Rota
 