import React, { useContext } from 'react'
import { motion } from 'motion/react'
import RadioCustomizado from '../../../componentes/radioCustomizado'
import CadastroContext from '../../../contextos/CadastroContexto'

const Objetivo = () => {

  const {dados, mudarDados} = useContext(CadastroContext)

  const {
    objetivo,
    experiencia,
    peso,
    altura
  } = dados

  // array dos inputs para objetivo, gerar eles por meio de um array é mior
  const radiosObjetivo = [
    {
      nome: 'manter peso',
      valor: 'manter_peso',
    },
    {
      nome: 'perda de peso',
      valor: 'perder_peso',
    },
    {
      nome: 'ganho de peso',
      valor: 'ganhar_peso',
    },
  ]

  // array dos inputs para experiencia, gerar eles por meio de um array é mior
  const radiosExperiencia = [
    {
      nome: 'iniciante',
      descricao: 'treina a 5 meses'
    },
    {
      nome: 'intermediario',
      descricao: 'treina de 1 a 3 anos'
    },
    {
      nome: 'avançado',
      descricao: 'treina a 3 anos'
    },
    {
      nome: 'atleta',
      descricao: 'atleta de alto rendimento'
    },
  ]

  const imc = peso / ((altura * altura) / 10000)
  let aviso = ''
  if(imc < 18.5){
    aviso = 'perder_peso'
  } else if (imc > 25){
    aviso = 'ganhar_peso'
  } else {
    aviso = 'nenhum'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col w-full gap-3 my-2">

      {aviso === objetivo ? (
          <span className="absolute -top-1.5 left-1/2 
          -translate-x-1/2 text-sm text-red-500">
            não recomendado
          </span>
        ) : ''}

      <h2 className="relative mx-auto text-lg text-t-primaria">
        escolha seu objetivo
        
      </h2>

      {/* objetivo */}
      <div className="grid grid-cols-2 grid-rows-2 gap-y-2 w-85 mx-auto">
        {radiosObjetivo.map((radio, index) => (

          // o primeiro input vai usar duas colunas do grid
          <div className={`flex justify-center items-center w-full h-full
          ${index === 0 ? `col-span-2` : `col-span-1`}`}>

            <RadioCustomizado
              classeAdcional="w-40 h-15"
              name="objetivo"
              valor={radio.valor}
              dataBinding={ev => mudarDados('objetivo', ev.target.value)}
              checked={objetivo === radio.valor}
            >

              <h2 className="text-t-secundaria">
                {radio.nome}
              </h2>

            </RadioCustomizado>

          </div>
        ))}
      </div>

      <h2 className="mx-auto text-lg text-t-primaria">
        escolha sua experiencia de treino
      </h2>

      {/* experiencia */}
      <div className="grid grid-cols-2 grid-rows-2 gap-y-2 w-85 mx-auto">

        {radiosExperiencia.map(radio => (

          <div className="flex justify-center items-center w-full h-full">

            <RadioCustomizado
              classeAdcional="w-40 h-20 p-1"
              name="experiencia"
              valor={radio.nome}
              dataBinding={ev => mudarDados('experiencia', ev.target.value)}
              checked={experiencia === radio.nome}
            >

              <span className="flex flex-col">
                <h2 className='text-t-secundaria'>
                  {radio.nome}
                </h2>
                <p className='text-sm'>
                  {radio.descricao}
                </p>
              </span>

            </RadioCustomizado>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default Objetivo