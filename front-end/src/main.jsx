import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Rota from './router.jsx'
import { TemaContextoProvider } from './contextos/TemaContexto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaContextoProvider>
      <RouterProvider router={Rota} />
    </TemaContextoProvider>
  </StrictMode>
)
