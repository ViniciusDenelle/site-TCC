import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Rota from './router.jsx'
import { UsuarioContextProvider } from './contextos/usuarioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioContextProvider>
      <RouterProvider router={Rota} />
    </UsuarioContextProvider>
  </StrictMode>,
)
