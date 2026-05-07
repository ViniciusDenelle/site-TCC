import BotaoSecundario from '@/componentes/BotaoSecundario'
import InputRadio from '@/componentes/InputRadio'
import CadastroLayout from '@/componentes/layouts/CadastroLayout'
import Texto from '@/componentes/Texto'
import useCadastro from '@/logicas/cadastro/useCadastro'
import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'


const Objetivo = () => {

    const { dados, mudarDados } = useCadastro()

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
    if (imc < 18.5) {
        aviso = 'perder_peso'
    } else if (imc > 25) {
        aviso = 'ganhar_peso'
    } else {
        aviso = 'nenhum'
    }

    const router = useRouter()
    
      function proximo() {
        router.push('/cadastro/passo4')
      }

    return (
        <CadastroLayout
            proximo={proximo}
        >
            <View>

                {aviso === objetivo ? (
                    <View className="absolute -top-1.5 left-1/2 
            -translate-x-1/2 ">
                    <Text className='text-sm text-red-500 font-poppins'>
                        não recomendado
                    </Text>
                        
                    </View>
                ) : ''}

                <Texto>
                    escolha seu objetivo

                </Texto>

                {/* objetivo */}
                <View className="w-full gap-y-2">
                    {radiosObjetivo.map((radio) => {

                        return (
                            <InputRadio
                                key={radio.nome}
                                valor={radio.valor}
                                selecionado={objetivo}
                                onChange={valor => mudarDados('objetivo', valor)}
                                className='w-full h-16  pl-2'
                            >

                                <Texto>
                                    {radio.nome}
                                </Texto>
                            </InputRadio>
                        )
                    })}
                </View>

                <Texto className="mx-auto text-lg text-t-primaria">
                    escolha sua experiencia de treino
                </Texto>

                {/* experiencia */}
                <View className="w-full gap-y-2">
                    {radiosExperiencia.map((radio) => {


                        return (
                            <InputRadio
                                key={radio.nome}
                                valor={radio.nome}
                                selecionado={experiencia}
                                onChange={valor => mudarDados('experiencia', valor)}
                                className='w-full pl-2 h-16'
                            >

                                {/* textos */}
                                <View className="flex-1">
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

export default Objetivo