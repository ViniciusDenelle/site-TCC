import React from 'react'
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'

const NivelAtividade = () => {
  const radios = [
    'sedentario',
    'pouco ativo',
    'moderado',
    'ativo',
    'atleta'
  ]

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0,}}
    transition={{duration: 0.4, ease: "easeOut"}}
     className="flex flex-col w-full ">
        <div className="flex justify-around items-center">
          <h1 className="text-lg font-semibold text-t-primaria">
            2700 kcal
          </h1>

          <h1 className="text-lg font-semibold">
            0 kcal
          </h1>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 w-auto mx-auto gap-5 my-5">
            {radios.map(radio => (
              radio === 'atleta' ? (
                <div className="col-span-2 flex justify-center">
                  <RadioCustomizado
                  classeAdcional="w-40 h-15"
                  name="nivelAtividadeFisica"
                  valor={radio}>
                    {radio}
                  </RadioCustomizado>
                </div>
              ) : (

                <RadioCustomizado
                classeAdcional="w-40 h-15"
                name="nivelAtividadeFisica"
                valor={radio}>
                  {radio}
                </RadioCustomizado>
              )

            ))}
        </div>
    </motion.div>
  )
}

export default NivelAtividade