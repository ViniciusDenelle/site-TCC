import React, { useState } from 'react'
import InputSimples from '../../../componentes/InputSimples'
import BotaoPrimario from '../../../componentes/BotaoPrimario'
import { useMutation } from '@tanstack/react-query'
import api from '../../../api'
import { AxiosError, AxiosResponse } from 'axios'
import useFetchUsuario from '../../../logicas/querys/FetchUsuario'
import useCriarFicha from '../../../logicas/dashboard/treinos/fichas/CriarFicha'
import useShowFicha from '../../../logicas/dashboard/treinos/fichas/ShowFicha'
import useFetchFichas from '../../../logicas/dashboard/treinos/fichas/FetchFichas'
import useUpdateFicha from '../../../logicas/dashboard/treinos/fichas/UpdateFicha'
import useDeleteFicha from '../../../logicas/dashboard/treinos/fichas/DeleteFicha'


const Treino = () => {
    const [nomeFicha, setNomeFicha] = useState('treino abc')
    const [diasSemana, setDiasSemana] = useState<number[]>([
        1, 2, 4
    ])
    const [divisao, setDivisao] = useState<string[]>([
        'a', 'b', 'c'
    ])
    const [descricao, setDescricao] = useState<string>('')

    const [nomeFichaNovo, setNomeFichaNovo] = useState('treino ab')
    const [diasSemanaNovo, setDiasSemanaNovo] = useState<number[]>([
        1, 3
    ])
    const [divisaoNovo, setDivisaoNovo] = useState<string[]>([
        'a', 'b'
    ])
    const [descricaoNovo, setDescricaoNovo] = useState<string>('treininho novo')

    const {criarFichaHandler} = useCriarFicha({
        nome: nomeFicha,
        diasSemana: diasSemana,
        divisao: divisao,
        descricao: descricao
    })

    const {updateFichaHandler} = useUpdateFicha({
        id: 2,
        nome: nomeFichaNovo,
        diasSemana: diasSemanaNovo,
        divisao: divisaoNovo,
        descricao: descricaoNovo
    })

    const {deleteFichaHandler} = useDeleteFicha(3)

    const {fichas} = useFetchFichas()
    console.log(fichas)
  return (
    <>
        <InputSimples
        
        />
        
        <BotaoPrimario onClick={criarFichaHandler}>
            criar
        </BotaoPrimario>
        <BotaoPrimario onClick={updateFichaHandler}>
            update
        </BotaoPrimario>
        <BotaoPrimario onClick={deleteFichaHandler}>
            deletar
        </BotaoPrimario>
    </>
  )
}

export default Treino
