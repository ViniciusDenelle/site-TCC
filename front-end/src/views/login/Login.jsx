
import { useState } from 'react'
import InputSimples from '../../componentes/inputs/InputSimples'
import BotaoSimples from '../../componentes/botoes/BotaoSecundario'
import BotaoPrimario from '../../componentes/botoes/BotaoPrimario'
import GoogleIcone from '../../assets/icones/googleIcone.svg'
import LinkSimples from '../../componentes/links/LinkSimples'
import useCadastro from '../../logicas/cadastro/useCadastro'
import useConfirmacao from '../../logicas/usuario/useConfirmacao'
import { Mail } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../api'
import toast from 'react-hot-toast'

const Login = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState([])

    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: async ({ email, senha }) => {
            console.log(email, senha)
            const res = await api.post('/login', {
                email,
                senha,
            })
            return res.data
        },
        onSuccess: ({token, usuario}) => {
            queryClient.setQueryData(['usuario'], usuario)
            localStorage.setItem('token', String(token))
            localStorage.setItem('usuario', JSON.stringify(usuario))
            localStorage.removeItem('dados_cadastro')
            navigation.navigate('/dashboard')
        },
        onError: error => {
            const erros = error.response?.data?.errors
            toast.error('não foi possivel realizar o login')
            console.log(error)
            if(erros){
                setErros(erros)
            }
        }
    })

    function cadastro() {
        loginMutation.mutate({
            email: email,
            senha: senha,
        })
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">email:</label>
                <InputSimples
                    type={"email"}
                    name={"email"}
                    value={email}
                    maximo={30}
                    minimo={7}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                {erros['email'] && (
                    <span className="text-red-500 text-sm">
                        {erros['email']}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="senha">senha:</label>
                <InputSimples
                    type={"password"}
                    name={"senha"}
                    value={senha}
                    maximo={30}
                    minimo={4}
                    onChange={ev => setSenha(ev.target.value)}
                />
                {erros['senha'] && (
                    <span className="text-red-500 text-sm">
                        {erros['senha']}
                    </span>
                )}
            </div>
            
            <p className='mx-auto'>ou</p>

            <BotaoPrimario
                tipo='vazio'
                classeAdcional="gap-4"
                texto='google'
            />
                
            

            <BotaoPrimario
                tipo='cheio'
                classeAdcional="mt-1"
                onClick={cadastro}
                texto='login'
            />

            <div className='flex flex-col items-center gap-1'>

                <div className='flex flex-col sm:flex-row items-center gap-2'>
                    <p>não tem uma conta?</p>
                    <LinkSimples classeAdcional='text-destaque-s-escuro 
                    font-semibold' to='/cadastro'>
                        crie uma conta
                    </LinkSimples>
                </div>

                <LinkSimples
                    classeAdcional='text-destaque-s-escuro 
                  font-semibold'
                    to='recuperar-senha'>
                    esqueceu sua senha?
                </LinkSimples>

            </div>
        </>
    )
}

export default Login
