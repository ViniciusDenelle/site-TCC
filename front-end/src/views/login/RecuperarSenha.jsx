import React, { useState } from 'react'
import InputSimples from '../../componentes/inputs/InputSimples'
import BotaoSimples from '../../componentes/botoes/BotaoSecundario'
import BotaoPrimario from '../../componentes/botoes/BotaoPrimario'
import useConfirmacao from '../../logicas/usuario/useConfirmacao'
import { Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../api'
import LinkSimples from '../../componentes/links/LinkSimples'
import useCadastro from '../../logicas/cadastro/useCadastro'
import { useNavigate } from 'react-router-dom'

const RecuperarSenha = () => {
    const [email, setEmail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [senhaNova, setSenhaNova] = useState('')
    const [errosRec, setErrosRec] = useState([])

    const { emailMutation } = useCadastro()

    const {
        enviarEmailHandler,
        contagem,
        isSuccess,
        isLoading,
        isError,
        erros
    } = useConfirmacao(emailMutation, {
        email: email,
        tipo: 'login'
    })

    const navigate = useNavigate()

    const recuperarMutation = useMutation({
        mutationFn: async ({email, senhaNova, codigo}) => {
            const res = await api.post('/recuperar-senha', {
                email,
                senhaNova, 
                codigo
            })
            return res.data
        },
        onSuccess: data => {
            navigate('/dashboard/')
        },
        onError: error => {
            const erros = error.response?.data?.errors
            if(erros){
                setErrosRec(erros)
            }
        }
    })

    function recuperarSenhaHandler() {
        recuperarMutation.mutate({
            email,
            senhaNova,
            codigo
        })
    }
    
    return (
        <>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">email:</label>
                <InputSimples
                    tipo={"email"}
                    name={"email"}
                    value={email}
                    maximo={30}
                    minimo={7}
                    onChange={ev => setEmail(ev.target.value)}
                />
                {erros['email'] && (
                    <span className='text-red-500 text-sm'>
                        {erros['email']}
                    </span>
                )}
            </div >


            <div className="flex flex-col gap-2">
                {isSuccess && (
                    <>
                        <h2 className='text-t-terciaria/80'>
                            codigo de confirmação:
                        </h2>

                        <InputSimples
                            tipo='number'
                            value={codigo}
                            onChange={ev => setCodigo(ev.target.value)}
                        />

                        {errosRec['codigo'] && (
                            <span className="text-red-500 text-sm">
                                {errosRec['codigo']}
                            </span>
                        )}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="senha">nova senha:</label>
                            <InputSimples
                                tipo={"password"}
                                name={"senha"}
                                value={senhaNova}
                                maximo={30}
                                minimo={4}
                                onChange={ev => setSenhaNova(ev.target.value)}
                            />

                            {errosRec['senhaNova'] && (
                                <span className="text-red-500 text-sm">
                                    {errosRec['senhaNova']}
                                </span>
                            )}

                        </div>
                    </>

                )}

                <BotaoSimples
                    disabled={contagem > 0}
                    onClick={() => enviarEmailHandler()}
                    texto={isLoading ? 'carregando' : contagem > 0 ? `reenviar codigo em ${contagem}s` : 'enviar codigo'} 
                    icone={!isLoading && contagem === 0 ? Mail : null}
                />

            </div>

            <BotaoPrimario
                tipo='cheio'
                classeAdcional="mt-1"
                disabled={!isSuccess}
                onClick={recuperarSenhaHandler}
                texto={'login'}
            />

            <div className='flex flex-col items-center gap-1'>

                <div className='flex flex-col items-center sm:flex-row gap-2'>
                    <p>não tem uma conta?</p>
                    <LinkSimples classeAdcional='text-destaque-s-escuro 
                    font-semibold' to='/cadastro'>
                        crie uma conta
                    </LinkSimples>
                </div>

                <LinkSimples
                    classeAdcional='text-destaque-s-escuro 
                  font-semibold'
                    to='/login'>
                    lembrou sua senha?
                </LinkSimples>

            </div>
        </>
    )
}

export default RecuperarSenha
