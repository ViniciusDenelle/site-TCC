
// import useUsuarioContexto from "../../contextos/UsuarioContexto"
import { useState } from "react"
import useFetchUsuario from "../../logicas/querys/FetchUsuario"

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
            isPending
        } = useFetchUsuario()
    if (isPending) return (<p>espere...</p>)
        
    const {
        nome
    } = dadosUsuario
    return (
        <>
            <div className="h-screen w-full flex items-center justify-center bg-base-terciaria">

                <div className="p-4 border-2 border-base-terciaria rounded-lg bg-base-secundaria">
                    {nome}
                    <Botao />
                </div>

            </div>
        </>
    )
}

export default Dashboard