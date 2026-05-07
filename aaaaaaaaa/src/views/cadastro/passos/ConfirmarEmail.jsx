import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import InputSimples from '../../../componentes/InputSimples'
import BotaoPrimario from '../../../componentes/BotaoPrimario'
import LinkSimples from '../../../componentes/LinkSimples'
import { Eye, EyeClosed } from 'lucide-react'
import GoogleIcone from '../../../assets/icones/googleIcone.svg'
import { useContext } from 'react'
import CadastroContext from '../../../contextos/CadastroContexto'
import BotaoSimples from '../../../componentes/BotaoSimples'

const ConfirmarEmail = () => {
    const {
        dados,
        mudarDados,
        emailMutation
    } = useContext(CadastroContext)

    const [emailReenviado, setemailReenviado] = useState(false)
    const [contagem, setContagem] = useState(0)

    const {
        mutate: reenviarEmail,
        isSuccess,
        isLoading,
        isError,
    } = emailMutation

    function enviarEmailHandler() {
        reenviarEmail(dados.email)
    }

    useEffect(() => {
        if (isSuccess) {
            setContagem(30)
        }
    }, [isSuccess])

    useEffect(() => {
        if (contagem <= 0) return

        const interval = setInterval(() => {
            setContagem(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [contagem])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-4"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                confirmar sua senha
            </h2>

            <div className="h-full w-full flex flex-col 
            justify-center items-center gap-3">
                <InputSimples
                    type='text'
                    value={dados.codigoConfirmacao}
                    dataBinding={ev => mudarDados('codigoConfirmacao', ev.target.value)}
                    classeAdcional='h-15'
                />
                <div className='flex flex-col w-full 
                justify-center items-center gap-1'>
                    {contagem > 0 && (
                        <h3 className="text-green-500">
                            email enviado com sucesso
                        </h3>
                    )}
                    <BotaoSimples
                        disabled={isLoading || contagem > 0}
                        onClick={enviarEmailHandler}>
                        {contagem > 0 
                        ? `reenviar email em ${contagem}` 
                        : `reenviar email`}
                    </BotaoSimples>
                </div>
            </div>


        </motion.div>
    )
}

export default ConfirmarEmail