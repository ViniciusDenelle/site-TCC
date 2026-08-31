import { Image, ImagePlus, Minus, Plus } from "lucide-react"
import CardHorizontal from "../../../../componentes/CardHorizontal"
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone"
import Texto from "../../../../componentes/organizacao/Texto"
import InputSimples from "../../../../componentes/inputs/InputSimples"
import InputTextarea from "../../../../componentes/inputs/InputTextarea"
import useFetchBadgesCompartilhadas from "../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas"
import React, { useState } from "react"
import BotaoTerciario from "../../../../componentes/botoes/BotaoTerciario"
import useExercicioForm from "../../../../logicas/dashboard/treinos/exercicios/useExercicioForm"
import { Badge } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio"
import BotaoPrimario from "../../../../componentes/botoes/BotaoPrimario"
import useCriarExercicio from "../../../../logicas/dashboard/treinos/exercicios/CriarExercicio"
import useFetchBadge from "../../../../logicas/dashboard/treinos/FetchBadge"
import { ErrosValidacao, ResBadges, RespostaErroLaravel } from "../../../../logicas/dashboard/treinos/exercicios/exercicoProps"
import { AxiosError } from "axios"
import useTreinoForm from "../../../../logicas/dashboard/treinos/treino/useTreinoForm"
import Exercicios from "../Exercicios"
import PesquisarExercicios from "../pesquisar/PesquisarExercicios"

const SelecaoExercicio = () => {

    return (
        <div className="">
            <Texto>
                exercicio 1
            </Texto>
        </div>
    )
}

const CriarTreinos = () => {

    const {
        secoes,
        isPending,
        isSuccess
    } = useFetchBadgesCompartilhadas()

    const {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios
    } = useTreinoForm()

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col h-full gap-2 divide-base-terciaria">

                    <Texto tipo="titulo" className="font-thin">
                        Adcione imagem
                    </Texto>
                    <CardHorizontal>
                        <div className="flex items-center justify-center h-20">
                            <WrapperIcone>
                                <ImagePlus className="size-full" />
                            </WrapperIcone>
                        </div>
                    </CardHorizontal>

                    <Texto tipo="titulo" className="font-thin">
                        nome do Treino
                    </Texto>

                    <div className="flex flex-col">
                        <InputSimples
                            tipo="text"
                            valor={nome}
                            onChange={ev => setNome(ev.target.value)}
                            placeholder="nome do treino"

                        />
                        {/* {erros.nome && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.nome?.[0]}
                            </Texto>
                        )} */}
                    </div>

                    <Texto tipo="titulo" className="font-thin">
                        Descrição
                    </Texto>
                    
                    <div className="flex flex-col">
                        <InputTextarea
                            valor={descricao}
                            onChange={ev => setDescricao(ev.target.value)}
                            classeAdicional="h-20"
                            placeholder="descrição é opcional"
                        />
                        {/* {erros.descricao && (
                                <Texto tipo="subtexto" className="text-red-500">
                                    *{erros.descricao?.[0]}
                                </Texto>
                            )} */}

                    </div>

                    <div className="flex flex-col gap-2">

                        <Texto tipo="titulo" className="font-thin">
                            Adcionar exercicios
                        </Texto>
                        
                        <PesquisarExercicios />

                    </div>
                        <div className="flex flex-col gap-2">
                            {exercicios?.selecionados > 0 ? (
                                <Texto>
                                    Exercicios Selecionados
                                </Texto>

                                // {exercicios.selecionados.map(exercicio => (
                                //     <SelecaoExercicio />
                                // ))}
                            ) : (
                                <Texto>
                                    nenhum exercicios adcionado
                                </Texto>
                            )}
                        </div>

                    <BotaoPrimario
                        texto="salvar"
                        icone={Plus}
                        
                    />

                </div>
            </div>
        </div>
    )
}

export default CriarTreinos