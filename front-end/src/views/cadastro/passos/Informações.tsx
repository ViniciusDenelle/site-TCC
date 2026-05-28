import React, { useContext } from 'react'
import { motion } from 'framer-motion'

import BotaoSimples from '../../../componentes/BotaoSimples.tsx'
import InputSimples from '../../../componentes/InputSimples.tsx'
import RadioCustomizado from '../../../componentes/RadioCustomizado'
import SliderCustomizado from '../../../componentes/SliderCustomizado'

import CadastroContext from '../../../contextos/CadastroContexto'

import type {
  UseCadastroReturn
} from '../../../tipos'

const Informacoes = () => {

  const contexto =
    useContext(
      CadastroContext
    ) as UseCadastroReturn | null

  if (!contexto) {

    throw new Error(
      'CadastroContext precisa de um Provider'
    )

  }

  const {
    dados,
    mudarDados,
    errosCampo,
  } = contexto

  const {
    peso,
    tipoPeso,
    genero,
    altura,
    dataDeNascimento,
  } = dados

  const minPeso =
    tipoPeso === 'kilos'
      ? 20
      : 40

  const maxPeso =
    tipoPeso === 'kilos'
      ? 400
      : 800

  function alterarPeso(
    pesoAtual: number
  ): void {

    if (tipoPeso !== 'kilos') {

      mudarDados(
        'peso',
        Math.round(
          pesoAtual / 2.20462
        )
      )

    } else {

      mudarDados(
        'peso',
        Math.round(
          pesoAtual * 2.20462
        )
      )

    }
  }

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
      className="
        relative grid grid-cols-1
        grid-rows-4 grid-flow-col
        w-full mx-auto h-full gap-y-2
      "
    >

      <h2
        className="
          absolute -top-7 text-center
          text-lg text-t-primaria
          w-full
        "
      >
        informações básicas
      </h2>

      {/* genero */}
      <div className="flex flex-col gap-1">

        <h2 className="text-t-principal">
          escolha seu genero:
        </h2>

        <div className="grid grid-cols-2 gap-1">

          <RadioCustomizado
            name="genero"
            valor="feminino"
            onChange={(
              ev: React.ChangeEvent<HTMLInputElement>
            ) =>
              mudarDados(
                'genero',
                ev.target.value
              )
            }
            checked={
              genero === 'feminino'
            }
            classeAdicional="w-full"
          >
            feminino
          </RadioCustomizado>

          <RadioCustomizado
            name="genero"
            valor="masculino"
            onChange={(
              ev: React.ChangeEvent<HTMLInputElement>
            ) =>
              mudarDados(
                'genero',
                ev.target.value
              )
            }
            checked={
              genero === 'masculino'
            }
            classeAdicional="w-full"
          >
            masculino
          </RadioCustomizado>

        </div>

        {errosCampo.genero && (

          <span className="text-red-500 text-sm">
            {errosCampo.genero}
          </span>

        )}

      </div>

      {/* nascimento */}
      <div className="flex flex-col gap-1">

        <h2 className="text-t-principal">
          escolha sua data de nascimento:
        </h2>

        <InputSimples
          type="date"
          classeAdicional="h-10"
          value={dataDeNascimento}
          onChange={(
            ev: React.ChangeEvent<HTMLInputElement>
          ) =>
            mudarDados(
              'dataDeNascimento',
              ev.target.value
            )
          }
        />

      </div>

      {/* peso */}
      <div className="flex flex-col gap-1">

        <h2>
          seu peso em {tipoPeso}:
        </h2>

        <div className="flex w-full gap-2">

          <div className="relative w-2/3 h-full">

            <SliderCustomizado
              mudarValor={(
                value: number
              ) =>
                mudarDados(
                  'peso',
                  value
                )
              }
              valor={peso}
              min={minPeso}
              max={maxPeso}
            />

            <div
              className="
                absolute -bottom-3 left-0
                flex justify-between
                w-full
              "
            >

              <span>
                {minPeso}
              </span>

              <span>
                {maxPeso / 2}
              </span>

              <span>
                {maxPeso}
              </span>

            </div>

          </div>

          <div className="flex gap-1 w-1/3">

            <InputSimples
              classeAdicional="w-full"
              type="number"
              value={String(peso)}
              onChange={(
                ev: React.ChangeEvent<HTMLInputElement>
              ) =>
                mudarDados(
                  'peso',
                  Number(
                    ev.target.value
                  )
                )
              }
              maximo={500}
              minimo={20}
            />

            <BotaoSimples
              classeAdicional="w-full"
              tipo="cheio"
              onClick={() => {

                mudarDados(
                  'tipoPeso',
                  tipoPeso === 'kilos'
                    ? 'libras'
                    : 'kilos'
                )

                alterarPeso(peso)

              }}
            >

              {tipoPeso}

            </BotaoSimples>

          </div>

        </div>

        {errosCampo.peso && (

          <span className="text-red-500 text-sm">
            {errosCampo.peso}
          </span>

        )}

      </div>

      {/* altura */}
      <div className="flex flex-col gap-1">

        <h2>
          sua altura em centímetros:
        </h2>

        <div className="flex w-full gap-2">

          <div className="relative w-2/3 h-full">

            <SliderCustomizado
              mudarValor={(
                value: number
              ) =>
                mudarDados(
                  'altura',
                  value
                )
              }
              valor={altura}
              min={80}
              max={250}
            />

            <div
              className="
                absolute -bottom-3 left-0
                flex justify-between
                w-full
              "
            >

              <span>80</span>
              <span>160</span>
              <span>250</span>

            </div>

          </div>

          <div
            className="
              flex gap-1 items-center
              w-1/3
            "
          >

            <InputSimples
              classeAdicional="w-full"
              type="number"
              value={String(altura)}
              onChange={(
                ev: React.ChangeEvent<HTMLInputElement>
              ) =>
                mudarDados(
                  'altura',
                  Number(
                    ev.target.value
                  )
                )
              }
            />

            <span>
              cm
            </span>

          </div>

        </div>

        {errosCampo.altura && (

          <span className="text-red-500 text-sm">
            {errosCampo.altura}
          </span>

        )}

      </div>

    </motion.div>
  )
}

export default Informacoes