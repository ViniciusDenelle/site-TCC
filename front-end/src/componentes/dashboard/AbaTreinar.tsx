import React from 'react'
import { NavLink } from 'react-router-dom'
import Texto from '../organizacao/Texto'
import BotaoSecundario from '../botoes/BotaoSecundario'
import ModalPlayer from './player/ModalPlayer'
import useExecutarTreinoContext from '../../contextos/ExecutarTreinoContexto'
import BotaoPrimario from '../botoes/BotaoPrimario'

const AbaTreinar = () => {

    const {
            temTreinoAtivo,
            exercicioData,
            exercicioExecucao,
            modalAberto,
            setModalAberto
        } = useExecutarTreinoContext()

  return (
    <div className="md:w-4/10 md:border-l-2 bg-base-secundaria/50 border-base-secundaria md:p-4 ">

                        {temTreinoAtivo ? (
                            <>
                            
                                <BotaoPrimario 
                                        texto={modalAberto ? 'Fechar Player' : 'Abrir Player'}
                                        onClick={() => setModalAberto(!modalAberto)}
                                        classeAdicional='hidden md:flex'
                                    />
                                {(modalAberto && exercicioData) && (
                                    <ModalPlayer />
                                )}
                                 
                            </>
                        ) : (
                            <div className="hidden md:flex flex-col justify-center align-center h-screen gap-4">
                            <Texto>
                                você ainda não tem nenhum treino em execução, inicie um treino para acompanhar seu progresso
                            </Texto>

                            <NavLink to="/dashboard/treino/pesquisar/treino" 
                            className="w-full flex justify-center items-center">
                                {({ isActive }) => (
                                    isActive ? (
                                        <Texto className="text-destaque-s-medio text-center">
                                            inicie um treino clicando nos tres pontinhos ao lado do treino desejado
                                        </Texto>
                                    ) : (
                                        <BotaoSecundario 
                                            texto="Iniciar Treino"
                                        />
                                    )
                                )}
                            </NavLink>
                        </div>
                        )}

                        
                    </div>
  )
}

export default AbaTreinar