import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { NavegacaoSuperiorTreinos } from './TreinosLayout'
import Texto from '../../../componentes/organizacao/Texto'
import InputSimples from '../../../componentes/inputs/InputSimples'
import BotaoTerciario from '../../../componentes/botoes/BotaoTerciario'
import { Filter, Plus, Search } from 'lucide-react'
import WrapperIcone from '../../../componentes/organizacao/WrapperIcone'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import BotaoSecundario from '../../../componentes/botoes/BotaoSecundario'

const NavBola = ({
    to,
    titulo
}) => {

    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div className={`rounded-full px-2 ${isActive ? `bg-base-terciaria` : `bg-base-secundaria`
                    }`}>
                    <Texto tipo='subtexto' className={`${isActive ? `text-destaque-s-medio` : `text-t-terciaria`
                        }`}>
                        {titulo}
                    </Texto>
                </div>
            )}
        </NavLink>
    )
}

const MeusTreinosLayout = () => {

    const nav = [
        {
            titulo: 'exercicios',
            to: 'exercicios'
        },
        {
            titulo: 'treinos',
            to: 'treinos'
        },
        {
            titulo: 'fichas',
            to: 'fichas'
        },
        {
            titulo: 'historico',
            to: 'historico'
        },

    ]

    return (
        <>
        <div className="flex flex-col w-full">
            <div className=" flex w-full">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <Texto tipo='titulo' className='text-t-primaria w-1/3'>
                                Meus Treinos
                            </Texto>

                        </div>

                        
                    </div>
                </div>
            </div>
            <Outlet />

        </div>

        </>
    )
}

export default MeusTreinosLayout