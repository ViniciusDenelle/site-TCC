
// import useUsuarioContexto from "../../contextos/UsuarioContexto"
import { useEffect, useState } from "react"
import useFetchUsuario from "../../logicas/usuario/FetchUsuario"

const Botao = () => {
    const {dadosUsuario} = useFetchUsuario()
    const [valor, setValor] = useState(1)
    return (
        <button
            onClick={() => setValor(prev => prev + 1)}
        >
            {valor}{dadosUsuario.nome}
        </button>
    )
}

const Dashboard = () => {
        const {
            dadosUsuario,
            isPending,
            isError
        } = useFetchUsuario()
    if (isPending) return (<p>espere...</p>)
    if (isError) return (<p>deu erro neguin</p>)
        
    const {
        nome
    } = dadosUsuario
    return (
        <>
            <div className="h-screen w-full flex items-center justify-center bg-base-primaria">
                    
                <div className="p-4 border-2 border-base-terciaria rounded-lg bg-base-secundaria">
                    
                    <Botao />
                </div>

            </div>
        </>
    )
}

export default Dashboard