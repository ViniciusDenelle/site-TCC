import React, { useContext, useEffect } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import usuarioContext from '../contextos/usuarioContext'
import api from '../api'

const DashboardLayout = () => {
  const {
    usuarioAtual,
    setUsuarioAtual,
    usuarioAtualToken,
    setUsuarioAtualToken
    } = useContext(usuarioContext) 

    if(!usuarioAtualToken)
    {
        return <Navigate to="/"/>
    }

    useEffect(() => {
        if(!usuarioAtualToken) return;

        async function carregarUsuario () 
        {
            try 
            {
                const res = await api.get('/user')
                setUsuarioAtual(res.data)
            } 
            catch (error) 
            {
                 console.error(error)
            }
        } 

        carregarUsuario()
   }, [usuarioAtualToken]) 
  
 
   async function logout()
   {
        try {
            const res = await api.post('/logout')
            
            if(res.data.mensagem === 'sucesso')
            {
                localStorage.removeItem('token')
                setUsuarioAtual(null)
                setUsuarioAtualToken(null)

                return <Navigate to="/login" />
            }
            
        } catch (error) {
            console.error(error)
        }
   }

  return (
        <>
            <header className="bg-stone-100 w-full">
                <div className="container mx-auto">
                    <nav className="flex items-center p-3">
                        <h1 className="text-2xl">
                            DashboardLayout
                        </h1>

                        <ul className="flex gap-5 mx-auto">
                            <li>
                                <button onClick={logout}>
                                    logout
                                </button>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    home
                                </NavLink>
                            </li>
                        </ul>

                        <button>
                            {usuarioAtual.name}
                        </button>
                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default DashboardLayout
