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
import SecaoBadges from "../../../../componentes/SecaoBadges"

const CriarExercicios = () => {

    const {
        secoes,
        isPending,
        isSuccess
    } = useFetchBadgesCompartilhadas('exercicio')

    const [expandidas, setExpandidas] = useState<Record<string, boolean>>({})

    const toggleExpandido = (campo: string) => {
        setExpandidas(prev => {
            return {
                ...prev,
                [campo]: !prev[campo]
            }
        })
    }

    const {
        nome,
        setNome,
        descricao,
        setDescricao,
        tipo,
        nivel,
        foco,
        equipamentos,
        musculos,
        montarPayload,
    } = useExercicioForm();

    const comportamentoPorTipo: Record<string, { isSelecionado: (id: number) => boolean; onToggle: (item: Badge) => void }> = {
        musculos: {
            isSelecionado: musculos.isSelecionado,
            onToggle: (item) => musculos.toggle(item, 1)
        },
        equipamentos: {
            isSelecionado: equipamentos.isSelecionado,
            onToggle: equipamentos.toggle
        },
        niveis: {
            isSelecionado: nivel.isSelecionado,
            onToggle: nivel.selecionar
        },
        focos: {
            isSelecionado: foco.isSelecionado,
            onToggle: foco.selecionar
        },
        tipos: {
            isSelecionado: tipo.isSelecionado,
            onToggle: tipo.selecionar
        },
    };

    const chaveErroPorTipo: Record<keyof ResBadges, keyof ErrosValidacao> = {
        tipos: 'tipo_id',
        niveis: 'nivel_id',
        focos: 'foco_id',
        musculos: 'musculos',
        equipamentos: 'equipamentos',
    };

    const limiteItems = 6

    const {
        mutate,
        isError,
        error
    } = useCriarExercicio()

    const erros = isError ? ((error as AxiosError<RespostaErroLaravel>).response?.data.errors ?? {}) : {}

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
                        nome do exercicio
                    </Texto>

                    <div className="flex flex-col">
                        <InputSimples
                            tipo="text"
                            valor={nome}
                            onChange={ev => setNome(ev.target.value)}
                            placeholder="nome do exercicio"

                        />
                        {erros.nome && (
                            <Texto tipo="subtexto" className="text-red-500">
                                *{erros.nome?.[0]}
                            </Texto>
                        )}
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
                        {erros.descricao && (
                                <Texto tipo="subtexto" className="text-red-500">
                                    *{erros.descricao?.[0]}
                                </Texto>
                            )}

                    </div>

                    <div className="flex flex-col gap-2">

                        {!isSuccess ? (
                            <Texto className="animate-pulse">procurando filtros</Texto>
                        ) : secoes.map(secao => (
                            <SecaoBadges
                                limiteItems={limiteItems}
                                key={secao.tipo}
                                titulo={secao.titulo}
                                itens={secao.dados}
                                error={erros[chaveErroPorTipo[secao.tipo]]?.[0]}
                                {...comportamentoPorTipo[secao.tipo]}
                            />
                        ))}

                    </div>

                    <BotaoPrimario
                        texto="salvar"
                        icone={Plus}
                        onClick={() => mutate(montarPayload())}
                    />

                </div>
            </div>
        </div>
    )
}

export default CriarExercicios