import { useContext } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'motion/react'

import RadioCustomizado from "../../../componentes/RadioCustomizado"
import CadastroContext from '../../../contextos/CadastroContexto'
import type { UseCadastroReturn } from '../../../logicas/cadastro/useCadastro'

const NivelAtividade = () => {
  const contexto = useContext(CadastroContext) as UseCadastroReturn | null

  if (!contexto) {
    throw new Error('CadastroContext precisa de um Provider')
  }

  const { dados, mudarDados } = contexto
  const { nivelAtividade } = dados

  const radios = [
    {
      nome: 'sedentario',
      valor: 1.2,
      descricao: 'você não pratica nenhum tipo de atividade fisica'
    },
    {
      nome: 'leve',
      valor: 1.375,
      descricao: 'pratica exercicio 1-3 vezes por semana'
    },
    {
      nome: 'moderado',
      valor: 1.55,
      descricao: 'pratica exercicio moderado 2-4 vezes por semana'
    },
    {
      nome: 'intenso',
      valor: 1.725,
      descricao: 'pratica exercicio pesado 3-7 vezes por semana'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col w-full"
    >
      <div className="flex justify-around items-center">
        <h2 className="text-lg text-t-secundaria">
          escolha seu nivel de atividade fisica
        </h2>
      </div>

      <div className="grid grid-cols-1 grid-rows-4 gap-2 w-full mx-auto mt-2">
        {radios.map(radio => (
          <div key={radio.nome} className="w-full">
            <RadioCustomizado
              classeAdicional="w-full h-20 pl-2 justify-start"
              name="nivelAtividadeFisica"
              valor={radio.valor}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => 
                mudarDados('nivelAtividade', Number(ev.target.value))
              }
              checked={nivelAtividade === radio.valor}
            >
              <p className="flex flex-col">
                {radio.nome}
                <span className="text-sm">
                  {radio.descricao}
                </span>
              </p>
            </RadioCustomizado>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default NivelAtividade