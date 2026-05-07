import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import useCadastroContext from '@/contextos/CadastroContexto'
import { useRouter } from 'expo-router'
import BotaoPrimario from '@/componentes/BotaoPrimario'
import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import Texto from '@/componentes/Texto'
import BotaoSecundario from '@/componentes/BotaoSecundario'
import { ArrowLeft } from 'lucide-react-native'
import useCadastro from '@/logicas/cadastro/useCadastro'
import InputRadio from '@/componentes/InputRadio'
import useTema from '@/contextos/TemaContexto'

const index = () => {
  const { dados, mudarDados, parseNumero } = useCadastro()

  const { nivelAtividade } = dados

  const radios = [
    {
      nome: 'sedentario',
      valor: 1.2,
      descricao: 'você não pratica nenhum tipo de atividade fisica',
    },
    {
      nome: 'leve',
      valor: 1.375,
      descricao: 'pratica exercicio 1-3 vezes por semana',
    },
    {
      nome: 'moderado',
      valor: 1.55,
      descricao: 'pratica exercicio moderado 2-4 vezes por semana',
    },
    {
      nome: 'intenso',
      valor: 1.725,
      descricao: 'pratica exercicio pesado 3-7 vezes por semana',
    },
  ]

  const router = useRouter()

  function proximo() {
    router.push('/cadastro/passo3')
  }

  return (
    <CadastroLayout
      proximo={proximo}
    >

      
      <View className="flex flex-col w-full">
        <View className="justify-center items-center">
          <Texto variante='titulo'>
            escolha seu nivel de atividade fisica{nivelAtividade}
          </Texto>
        </View>

        <View className="mt-3 gap-2">
          {radios.map((radio) => {
            

            return (
              <InputRadio
                key={radio.nome}
                valor={String(radio.valor)}
                selecionado={String(nivelAtividade)}
                onChange={valor => mudarDados('nivelAtividade', parseNumero(valor))}
                className='w-full h-20 px-4 justify-between'
              >
                <View className='flex-1'>
                  <Texto>
                    {radio.nome}
                  </Texto>
                  <Texto>
                    {radio.descricao}
                  </Texto>
                </View>
              </InputRadio>
            )
          })}
        </View>
      </View>
    </CadastroLayout>
  )
}

export default index