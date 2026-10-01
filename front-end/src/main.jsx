import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Rota from './router.jsx'
import { TemaContextoProvider } from './contextos/TemaContexto.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TemaContextoProvider>
        <RouterProvider router={Rota} />
        <Toaster 
          toastOptions={{
            className: 'bg-base-terciaria text-t-secundaria',
            success: {className: 'bg-base-terciaria rounded-lg text-t-secundaria'},
            error: {className: 'bg-base-terciaria rounded-lg text-t-secundaria'}
          }}
        />
      </TemaContextoProvider>
    </QueryClientProvider>
  </StrictMode>
)
