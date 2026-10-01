import { NavLink, Outlet } from 'react-router-dom'
import { Plus } from 'lucide-react'

import Texto from '../../../componentes/organizacao/Texto'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import BotaoTerciario from '../../../componentes/botoes/BotaoTerciario'

export default function DietaLayout() {
    return (
        <div className="w-full font-poppins">

            {/* CABEÇALHO */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                    <Texto
                        tipo="titulo"
                        className="text-t-primaria"
                    >
                        Dietas
                    </Texto>

                    <Texto
                        tipo="subtexto"
                        className="text-t-terciaria"
                    >
                        Gerencie seus planos alimentares.
                    </Texto>
                </div>

                <NavLink to="/dashboard/dieta/criarPrincipal">
                    <BotaoPrimario
                        texto="Criar dieta"
                        icone={Plus}
                        tipo="cheio"
                    />
                </NavLink>

            </div>


            {/* NAVEGAÇÃO */}

            <div className="flex gap-2 mb-6">

                <NavLink to="/dashboard/dieta">
                    {({ isActive }) => (
                        <BotaoTerciario
                            texto="Minhas dietas"
                            classeAdicional={
                                isActive
                                    ? 'bg-destaque-p-claro/10'
                                    : ''
                            }
                        />
                    )}
                </NavLink>

                <NavLink to="/dashboard/dieta/pesquisar">
                    {({ isActive }) => (
                        <BotaoTerciario
                            texto="Pesquisar"
                            classeAdicional={
                                isActive
                                    ? 'bg-destaque-p-claro/10'
                                    : ''
                            }
                        />
                    )}
                </NavLink>

            </div>


            {/* CONTEÚDO */}

            <Outlet />

        </div>
    )
}