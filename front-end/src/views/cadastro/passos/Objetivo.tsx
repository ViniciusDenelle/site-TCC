import { useContext } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'motion/react'

import RadioCustomizado from '../../../componentes/inputs/RadioCustomizado'
import CadastroContext from '../../../contextos/CadastroContexto'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import Texto from '../../../componentes/organizacao/Texto'

const Objetivo = () => {
  const {
    dados,
    mudarDados
  } = useCadastroContexto()

  const { 
    objetivo, 
    experiencia, 
    peso, 
    altura 
  } = dados

  // Array dos inputs para objetivo
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

  // Array dos inputs para experiencia
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

  // Garante o cálculo matemático seguro convertendo para Number
  const imc = Number(peso) / ((Number(altura) * Number(altura)) / 10000)
  
  let aviso = 'nenhum'
  if (imc < 18.5) {
    aviso = 'perder_peso'
  } else if (imc > 25) {
    aviso = 'ganhar_peso'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex flex-col w-full gap-3 my-2"
    >
      {/* {aviso === objetivo && (
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-sm text-red-500">
          não recomendado
        </span>
      )} */}

      <Texto tipo='subtitulo' className='mx-auto text-t-primaria'>
         Escolha seu Objetivo
      </Texto>

      {/* Seção: Objetivo */}
      <div className="grid grid-cols-1 grid-rows-3 gap-y-2 w-full mx-auto">
        {radiosObjetivo.map((radio) => (
          <div key={radio.valor} className="w-full h-full">
            <RadioCustomizado
              classeAdicional="w-full justify-start pl-2"
              name="objetivo"
              valor={radio.valor}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => 
                mudarDados('objetivo', ev.target.value)
              }
              checked={objetivo === radio.valor}
            >
              <h2 className="text-t-secundaria">
                {radio.nome}
              </h2>
            </RadioCustomizado>
          </div>
        ))}
      </div>

      <Texto tipo='subtitulo' className='mx-auto text-t-primaria'>
         Escolha sua experiencia de treino
      </Texto>

      {/* Seção: Experiência */}
      <div className="grid grid-cols-1 grid-rows-4 gap-y-2 w-full mx-auto">
        {radiosExperiencia.map((radio) => (
          <div key={radio.nome} className="w-full h-full">
            <RadioCustomizado
              classeAdicional="w-full pl-2 justify-start"
              name="experiencia"
              valor={radio.nome}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => 
                mudarDados('experiencia', ev.target.value)
              }
              checked={experiencia === radio.nome}
            >
              <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
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