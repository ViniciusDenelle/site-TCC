import React from 'react'
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'

const NivelAtividade = ({mudarDados}) => {
  const radios = [
    {
      nome: 'sedentario',
      valor: '1',
      descrição: 'você não pratica nenhum tipo de atividade fisica'
    },
    {
      nome: 'pouco ativo',
      valor: '1.2',
      descrição: 'pratica exercicio 1-3 vezes por semana'
    },
    {
      nome: 'moderado',
      valor: '1.35',
      descrição: 'pratica exercicio moderado 2-4 vezes por semana'
    },
    {
      nome: 'ativo',
      valor: '1.5',
      descrição: 'pratica exercicio pesado 3-7 vezes por semana'
    },
    {
      nome: 'atleta',
      valor: '1.75',
      descrição: 'pratica exercicio pesado todos os dias'
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
        escolha seu nivel de atividade fisica
      </div>

      <div className="grid grid-cols-2 grid-rows-3 gap-5 w-auto mx-auto my-5">
        {radios.map((radio, index) => (

          <div className={`flex justify-center items-center 
          ${index === radios.length -1 ? `col-span-2` : ``}`}>

            <RadioCustomizado
              classeAdcional="w-45 h-20 px-2"
              name="nivelAtividadeFisica"
              valor={radio.valor}
              dataBinding={ev => mudarDados('nivelAtividade', ev.target.value)}>
              <p className="flex flex-col">
                {radio.nome}
                <span className="text-xs">
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