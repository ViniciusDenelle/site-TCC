import { useContext, useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Mail } from 'lucide-react'

import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import InputSimples from '../../../componentes/inputs/InputSimples'
import useConfirmacao from '../../../logicas/querys/useConfirmacao'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import BotaoSecundario from '../../../componentes/botoes/BotaoSecundario'

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
        <BotaoPrimario
          texto='google'
        />

        <p className="mx-auto">ou</p>

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