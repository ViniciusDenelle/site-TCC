
import { Outlet } from 'react-router-dom'
import useFetchUsuario from '../../logicas/querys/FetchUsuario'

const LoginLayout = () => {
  const {
      dadosUsuario,
      isSuccess,
      isPending,
    } = useFetchUsuario()
    const token = localStorage.getItem('token')
    
    if (token) {
      if(isSuccess || dadosUsuario) {
        navigation.navigate('/dashboard')
      }
    }

  return (
    <main className='h-screen w-full bg-base-primaria'>

      <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

      <div className="container mx-auto h-full w-full">

        <div className="w-full h-full flex flex-col gap-2  justify-center items-center">

          <h1 className='text-xl font-semibold text-t-primaria z-10'>
            faça login
          </h1>

          <div className='ring-1 ring-base-quaternaria z-10 p-5 
             bg-base-terciaria/40 backdrop-blur-md rounded-xl w-9/10 md:w-120'  >

            <div className=" flex flex-col gap-2">

              <Outlet />

            </div>

          </div>


        </div>

      </div>
    </main>
  )
}

export default LoginLayout