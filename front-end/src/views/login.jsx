import { useContext, useState } from "react"
import api from '../api'
import { Navigate, useNavigate } from "react-router-dom"
import usuarioContext from "../contextos/usuarioContext"

function Login()
{
    
    // dados form
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dados, setDados] = useState([])

    const {
        usuarioAtualToken,
        setUsuarioAtual,
        setUsuarioAtualToken,
    } = useContext(usuarioContext)

    if(usuarioAtualToken)
    {
       return <Navigate to="/dashboard" />
    }
    
    const login = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/login',{
                name: nome,
                email: email,
                password: password
            })
            let dados = response.data

            setUsuarioAtualToken(dados.usuarioToken)
            localStorage.setItem('token', dados.usuarioToken)

            return <Navigate to="/dashboard" />
        } 
        catch (error) {
            console.error(error.response?.data || error.message);
        }
    }
    

    return (
        <section className="h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex justify-center items-center h-full">

                    <form onSubmit={login}
                    className="flex flex-col gap-5 p-5 bg-slate-50">
                        <div className="w-full flex items-center">
                            <h1 className="text-xl font-bold">
                                login 
                            </h1>
                        </div>
                        <div className="flex gap-3">

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="">
                                    nome
                                    <input type="text"
                                    className="rouded-md bg-stone-200/50
                                    cursor-pointer hover:bg-stone-200 transition-all
                                    duration-200 p-1" 
                                    onChange={(e) =>{
                                        setNome(e.target.value)
                                    }}/>
                                </label>

                                <label htmlFor="">
                                    email
                                    <input type="email"
                                    className="rouded-md bg-stone-200/50
                                    cursor-pointer hover:bg-stone-200 transition-all
                                    duration-200 p-1"
                                    onChange={(e) =>{
                                        setEmail(e.target.value)
                                    }} />
                                </label>

                                <label htmlFor="">
                                    senha
                                    <input type="password"
                                    className="rouded-md bg-stone-200/50
                                    cursor-pointer hover:bg-stone-200 transition-all
                                    duration-200 p-1"
                                    onChange={(e) =>{
                                        setPassword(e.target.value)
                                    }} />
                                </label>
                            </div>

                            <div className="flex justify-end items-end w-full">
                                <button className="rounded bg-green-500/50
                                cursor-pointer hover:bg-green-500 p-1"
                                type="submit">
                                    logar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login