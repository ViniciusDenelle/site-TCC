import { View, Text } from 'react-native'
import React, { useState } from 'react'
import useCadastroContext from '@/contextos/CadastroContexto'
import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import InputRadio from '@/componentes/InputRadio'
import InputSimples from '@/componentes/InputSimples'
import InputRange from '@/componentes/InputRange'
import BotaoSecundario from '@/componentes/BotaoSecundario'
import Texto from '@/componentes/Texto'
import { router } from 'expo-router'
import InputDate from '@/componentes/inputDate'

const index = () => {
  const {
    dados,
    mudarDados,
    parseNumero,
    podeSeguir
  } = useCadastroContext()

  const {
    genero,
    dataDeNascimento,
    peso,
    tipoPeso,
    altura
  } = dados

  const [mostrarData, setMostrarData] = useState(false)

  const minPeso = tipoPeso === 'kilos' ? 20 : 40
  const maxPeso = tipoPeso === 'kilos' ? 400 : 800

  function alterarPeso() {
    if (tipoPeso !== 'kilos') {
      mudarDados('peso', Math.round(peso / 2.20462))
    } else {
      mudarDados('peso', Math.round(peso / 0.453591830542594))
    }
  }

  function proximoPasso() {
    if(podeSeguir(1)) router.push('/cadastro/passo2')
   
  }

  return (
    <CadastroLayout
      proximo={proximoPasso}
      podeProximo={podeSeguir(1)}
    >
      <View className='flex flex-col gap-2'>
        <View className='flex flex-row gap-1'>
          <View className='w-[50%]'>
            <InputRadio
              valor='feminino'
              onChange={valor => mudarDados('genero', valor)}
              selecionado={genero}
              className='w-full pl-2'
            >
              feminino
            </InputRadio>
          </View>


          <View className='w-[50%]'>
            <InputRadio
              valor='masculino'
              onChange={valor => mudarDados('genero', valor)}
              selecionado={genero}
              className='w-full pl-2'
            >
              masculino
            </InputRadio>
          </View>

        </View>

        <View className="flex flex-col gap-1">

          <Texto className="text-t-primaria">
            data de nascimento: {new Date(dataDeNascimento).toLocaleDateString('pt-BR')}
          </Texto>

          <BotaoSecundario
            tipo='cheio'
            onPress={() => setMostrarData(prev => !prev)}
          >
            exibir calendario
          </BotaoSecundario>

          <InputDate
            valor={new Date(dataDeNascimento)}
            onChange={(_, valor) => mudarDados('dataDeNascimento', valor?.toISOString() ?? '')}
            mostrar={mostrarData}
            setMostrar={setMostrarData}
          />

          {/* {errosCampo['idade'] && (
            <span className="text-red-500 text-sm">
              {errosCampo['idade']}
            </span>
          )} */}

        </View>

        <View className="flex flex-col gap-1">

          <View className='flex flex-row justify-between w-full items-center'>
            <Texto>
              seu peso: {parseNumero(String(peso))}
            </Texto>
            {/* input peso e btn mudar tipo peso */}
            <View className=" flex flex-row gap-1 w-[50%]">

              <View className='w-[50%]'>
                <InputSimples
                  tipo="number"
                  valor={String(peso)}
                  onChange={(valor) => mudarDados('peso', parseNumero(valor))}
                  maximo={500}
                  minimo={20}
                />

              </View>


              <View className='w-[50%]'>
                <BotaoSecundario
                  tipo="cheio"
                  onPress={() => {
                    mudarDados('tipoPeso', tipoPeso === 'kilos' ? 'libras' : 'kilos')
                    alterarPeso()
                  }}>
                  {tipoPeso}
                </BotaoSecundario>
              </View>
            </View>

          </View>


          {/* slider peso */}
          <View className="relative w-full">
            <InputRange
              onChange={value => mudarDados('peso', value)}
              valor={peso}
              min={minPeso}
              max={maxPeso}
            />

            <View className="absolute -bottom-3 let-0 
              flex flex-row justify-between w-full">
              <Texto variante='legenda'> {minPeso}  </Texto>
              <Texto variante='legenda'> {maxPeso / 2}  </Texto>
              <Texto variante='legenda'> {maxPeso}  </Texto>
            </View>

          </View>



          {/* {errosCampo['peso'] && (
            <span className="text-red-500 text-sm">
              {errosCampo['peso']}
            </span>
          )} */}

        </View>

        {/* altura */}
        <View className="flex flex-col gap-1">
          
          <View className='flex flex-row justify-between w-full items-center'>
            <Texto>
              sua altura:
            </Texto>

            {/* input altura */}
            <View className="flex flex-row gap-1 justify-start items-center w-[50%] ">
                <View className='w-[80%]'>
                  <InputSimples
                    tipo="number"
                    valor={String(altura)}
                    onChange={valor => mudarDados('altura', parseNumero(valor))}
                  />

                </View>
                <View className='flex justify-center items-center'>
                  <Texto>
                    cm
                  </Texto>
                </View>
                
            </View>

          </View>

            {/* slider altura */}
          <View className="relative w-full">
              <InputRange
                onChange={valor => mudarDados('altura', valor)}
                valor={altura}
                min={80}
                max={250}
              />

              <View className="absolute -bottom-3 let-0 
                flex flex-row justify-between w-full">
                <Texto variante='legenda'> 80  </Texto>
                <Texto variante='legenda'> 160  </Texto>
                <Texto variante='legenda'> 250 </Texto>
              </View>

          </View>

          {/* {errosCampo['altura'] && (
            <span className="text-red-500 text-sm">
              {errosCampo['altura']}
            </span>
          )} */}

        </View>

      </View>
    </CadastroLayout>
  )
}

export default index