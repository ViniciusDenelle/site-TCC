import React, { useState } from 'react'
import { motion } from 'motion/react'
import InputSimples from '../../../componentes/InputSimples'
import BotaoPrimario from '../../../componentes/BotaoPrimario'
import LinkSimples from '../../../componentes/LinkSimples'
import { Eye, EyeClosed } from 'lucide-react'
import GoogleIcone from '../../../assets/icones/googleIcone.svg'
import { useContext } from 'react'
import CadastroContext from '../../../contextos/CadastroContexto'

const ConfirmarEmail = () => {
    const {dados, mudarDados} = useContext(CadastroContext)

    const {
        codigoConfirmacao
    } = dados

  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-4 h-full"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                confirmar sua senha
            </h2>

            <div className="h-full w-full flex justify-center items-center">
                <InputSimples
                    type='text'
                    value={codigoConfirmacao}
                    dataBinding={ev => mudarDados('codigoConfirmacao', ev.target.value)}
                    classeAdcional='h-15'
                />
            </div>

    </motion.div>
    )
}

export default ConfirmarEmail