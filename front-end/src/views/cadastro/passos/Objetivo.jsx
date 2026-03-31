import React from 'react'
import { motion } from 'motion/react'
import RadioCustomizado from '../../../componentes/radioCustomizado'

const Objetivo = ({
    dados,
    mudarDados,
}) => {
    const radios = [
    {
      nome: 'perda de peso',
      valor: '1',
    },
    {
      nome: 'ganho de peso',
      valor: '1.2',
    },
    {
      nome: 'manter peso',
      valor: '1.35',
    },
    {
      nome: 'outro',
      valor: '1.5',
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
        escolha seu objetivo e experiência
      </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {radios.map(radio => (
            
                    <RadioCustomizado
                    classeAdcional="w-45 h-20 p-1"
                    name="nivelAtividadeFisica"
                    valor={radio.valor}
                    dataBinding={ev => mudarDados('objetivo', ev.target.value)}>
                    <p className="flex flex-col">
                        {radio.nome}
                    </p>
                </RadioCustomizado>
                
            
            ))}
        </div>

    </motion.div>
  )
}

export default Objetivo