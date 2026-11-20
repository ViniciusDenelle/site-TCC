import { useContext, useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Mail, User2Icon } from 'lucide-react'

import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import InputSimples from '../../../componentes/inputs/InputSimples'
import useConfirmacao from '../../../logicas/usuario/useConfirmacao'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import BotaoSecundario from '../../../componentes/botoes/BotaoSecundario'
import CardHorizontal from '../../../componentes/CardHorizontal'
import InputImagem from '../../../componentes/inputs/InputImagem'

const Credenciais = () => {
  const contexto = useCadastroContexto()

  if (!contexto) {
    throw new Error('CadastroContext precisa de um Provider')
  }

  const {
    emailMutation,
    dados,
    mudarDados,
    cadastroHandler,
    cadastrarMutation,
    errosCampo
  } = contexto

  const {
    nome,
    email,
    senha,
    codigoConfirmacao
  } = dados

  const {
    enviarEmailHandler,
    isSuccess,
    isPending,
    contagem,
    erros
  } = useConfirmacao(emailMutation, {
    email,
    tipo: 'cadastro'
  })

  const [senhaVisivel, setSenhaVisivel] = useState(false)

  console.log('foto', dados.foto)

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3 w-full"
      >
        <h2 className="mx-auto text-lg font-semibold">
          suas credenciais
        </h2>

        {/* Google */}
        {/* <BotaoPrimario
          texto='google'
        />

        <p className="mx-auto">ou</p> */}

        {/* <div 
        onClick={() => setMenuFotoAberto(prev => !prev)}
        className="relative size-40 group cursor-pointer border-full flex justify-center items-center mx-auto 
        bg-base-terciaria border border-base-terciaria/30 rounded-full p-4">
          {menuFotoAberto && (
            <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 
            bg-base-terciaria border border-base-terciaria/30 rounded-md p-2">
              <CardHorizontal>
                <div className="flex gap-2 items-center">
                  
                </div>
              </CardHorizontal>
            </div>
          )}

          <User2Icon className="size-full group-hover:text-destaque-p-medio transition-colors"/>
        </div> */}

        <InputImagem 
          valor={dados.foto}
          onChange={(ev) => mudarDados('foto', ev)}
          redondo
          disabled={false}
        />

        
        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label>nome:</label>

          <InputSimples
            valor={nome}
            placeholder="seu nome"
            maximo={30}
            minimo={2}
            onChange={(ev) =>
              mudarDados('nome', ev.target.value)
            }
          />

          {errosCampo.nome && (
            <span className="text-red-500 text-sm">
              {errosCampo.nome}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label>email:</label>

          <InputSimples
            tipo="email"
            valor={email}
            placeholder="seu@email.com"
            maximo={40}
            minimo={7}
            onChange={(ev) =>
              mudarDados('email', ev.target.value)
            }
          />

          {(erros.email || errosCampo.email) && (
            <span className="text-red-500 text-sm">
              {erros.email}
              {' '}
              {errosCampo.email}
            </span>
          )}
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1">
          <label>senha:</label>

          <div className="relative">
            <InputSimples
              tipo={senhaVisivel ? 'text' : 'password'}
              valor={senha}
              placeholder="mínimo 4 caracteres"
              maximo={30}
              minimo={4}
              onChange={(ev) =>
                mudarDados('senha', ev.target.value)
              }
              classeAdicional='w-full'
            />

            <button
              type="button"
              onClick={() =>
                setSenhaVisivel(prev => !prev)
              }
              className="absolute right-3 top-2 z-10 cursor-pointer" 
            >
              {senhaVisivel ? (
                <Eye size={20} />
              ) : (
                <EyeOff size={20} />
              )}
            </button>
          </div>

          {errosCampo.senha && (
            <span className="text-red-500 text-sm">
              {errosCampo.senha}
            </span>
          )}
        </div>

        {/* Código */}
        <div className="flex flex-col gap-2">
          <label
            className={!isSuccess ? 'opacity-70' : ''}
          >
            código de confirmação:
          </label>

          <InputSimples
            tipo="number"
            valor={codigoConfirmacao}
            disabled={!isSuccess && !codigoConfirmacao}
            onChange={(ev) =>
              mudarDados(
                'codigoConfirmacao',
                ev.target.value
              )
            }
          />

          <BotaoSecundario
            tipo="cheio"
            disabled={contagem > 0}
            onClick={enviarEmailHandler}
            texto={
              isPending 
              ? `carregando...` 
              : contagem > 0 
              ? ` reenviar em ${contagem}` 
              : `enviar codigo`
            }
          />
        </div>
      </motion.div>
  )
}

export default Credenciais