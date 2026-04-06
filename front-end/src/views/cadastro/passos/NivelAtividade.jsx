import React, { useContext } from 'react'
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'
import CadastroContext from '../../../contextos/CadastroContexto'

const NivelAtividade = () => {
  const {dados, mudarDados} = useContext(CadastroContext)
  const {nivelAtividade} = dados

  const radios = [
    {
      nome: 'sedentario',
      valor: '1.2',
      descrição: 'você não pratica nenhum tipo de atividade fisica'
    },
    {
      nome: 'leve',
      valor: '1.375',
      descrição: 'pratica exercicio 1-3 vezes por semana'
    },
    {
      nome: 'moderado',
      valor: '1.55',
      descrição: 'pratica exercicio moderado 2-4 vezes por semana'
    },
    {
      nome: 'intenso',
      valor: '1.725',
      descrição: 'pratica exercicio pesado 3-7 vezes por semana'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col w-full ">

      <div className="flex justify-around items-center">
        <h2 className="text-lg text-t-secundaria">
          escolha seu nivel de atividade fisica
        </h2>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full mx-auto my-5">
        {radios.map(radio => (

          <div className="not-last:flex justify-center items-center">

            <RadioCustomizado
              classeAdcional="w-full h-25 p-1"
              name="nivelAtividadeFisica"
              valor={radio.valor}
              dataBinding={ev => mudarDados('nivelAtividade', ev.target.value)}
              checked={nivelAtividade === radio.valor}
              >
              <p className="flex flex-col">
                {radio.nome}
                <span className="text-sm">
                  {radio.descrição}
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