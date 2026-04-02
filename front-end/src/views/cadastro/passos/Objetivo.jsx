import React from 'react'
import { motion } from 'motion/react'
import RadioCustomizado from '../../../componentes/radioCustomizado'

const Objetivo = ({
    dados,
    mudarDados,
}) => {

    const radiosObjetivo = [
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

  const radiosExperiencia = [
    
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col w-full gap-2 my-2">

      <h2 className="mx-auto text-lg ">
        escolha seu objetivo
      </h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-y-2 w-85 mx-auto">
            {radiosObjetivo.map(radio => (

                    <div className="flex justify-center items-center w-full h-full">
                      <RadioCustomizado
                      classeAdcional="w-40 h-10"
                      name="nivelAtividadeFisica"
                      valor={radio.valor}
                      dataBinding={ev => mudarDados('objetivo', ev.target.value)}>
                        <p className="flex flex-col">
                            {radio.nome}
                        </p>
                    </RadioCustomizado>
                    </div>
            ))}
        </div>

        <h2 className="mx-auto text-lg ">
          escolha sua experiencia de treino
        </h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-y-2 w-85 mx-auto">
            {radiosExperiencia.map(radio => (

                    <div className="flex justify-center items-center w-full h-full">
                      <RadioCustomizado
                      classeAdcional="w-40 h-10 p-1"
                      name="nivelAtividadeFisica"
                      valor={radio.valor}
                      dataBinding={ev => mudarDados('objetivo', ev.target.value)}>
                        <p className="flex flex-col">
                            {radio.nome}
                        </p>
                    </RadioCustomizado>
                    </div>
            ))}
        </div>

    </motion.div>
  )
}

export default Objetivo