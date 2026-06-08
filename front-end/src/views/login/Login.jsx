
import { useState } from 'react'
import InputSimples from '../../componentes/InputSimples'
import BotaoSimples from '../../componentes/BotaoSecundario'
import BotaoPrimario from '../../componentes/BotaoPrimario'
import GoogleIcone from '../../assets/icones/googleIcone.svg'
import LinkSimples from '../../componentes/LinkSimples'
import useCadastro from '../../logicas/cadastro/useCadastro'
import useConfirmacao from '../../logicas/useConfirmacao'
import { Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../api'

const Login = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState([])

    const loginMutation = useMutation({
        mutationFn: async ({ email, senha }) => {
            const res = await api.post('/login', {
                email,
                senha,
            })
            return res.data
        },
        onSuccess: data => {
            console.log(data)
        },
        onError: error => {
            const erros = error.response?.data?.errors
            if(erros){
                setErros(erros)
            }
        }
    })

    function cadastro() {
        loginMutation.mutate({
            email,
            senha,
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
                    dataBinding={ev => setEmail(ev.target.value)}
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
                    dataBinding={ev => setSenha(ev.target.value)}
                />
                {erros['senha'] && (
                    <span className="text-red-500 text-sm">
                        {erros['senha']}
                    </span>
                )}
            </div>
            
            <p className='mx-auto'>ou</p>

            <BotaoPrimario
                classeAdcional="gap-4">
                <span className='flex relative'>
                    <img src={GoogleIcone} alt=""
                        className='h-6 absolute -left-7
                      '
                    />
                    google

                </span>
            </BotaoPrimario>

            <BotaoPrimario
                tipo='cheio'
                classeAdcional="mt-1"
                onClick={cadastro}
            >
                login
            </BotaoPrimario>

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
