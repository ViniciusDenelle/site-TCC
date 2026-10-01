import { useState } from 'react'
import { Plus, X, Utensils, Clock } from 'lucide-react'

import Texto from '../../../../componentes/organizacao/Texto'
import InputSimples from '../../../../componentes/inputs/InputSimples'
import InputTextarea from '../../../../componentes/inputs/InputTextarea'
import BotaoPrimario from '../../../../componentes/botoes/BotaoPrimario'
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario'
import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario'
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone'

interface AlimentoFormulario {
    id: string
    nome: string
    quantidade: string
    calorias: string
    proteinas: string
    carboidratos: string
    gorduras: string
}

interface RefeicaoFormulario {
    id: string
    nome: string
    horario: string
    alimentos: AlimentoFormulario[]
}

const CriarDieta = () => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [objetivo, setObjetivo] = useState('')
    const [nivel, setNivel] = useState('')
    const [duracao, setDuracao] = useState('')

    const [refeicoes, setRefeicoes] = useState<RefeicaoFormulario[]>([])

    const [nomeNovaRefeicao, setNomeNovaRefeicao] = useState('')
    const [horarioNovaRefeicao, setHorarioNovaRefeicao] = useState('')

    const [refeicaoAberta, setRefeicaoAberta] = useState<string | null>(null)

    function adicionarRefeicao() {

        if (!nomeNovaRefeicao.trim()) return

        const novaRefeicao: RefeicaoFormulario = {
            id: crypto.randomUUID(),
            nome: nomeNovaRefeicao.trim(),
            horario: horarioNovaRefeicao || '--:--',
            alimentos: [],
        }

        setRefeicoes(prev => [...prev, novaRefeicao])

        setNomeNovaRefeicao('')
        setHorarioNovaRefeicao('')

        setRefeicaoAberta(novaRefeicao.id)
    }

    function removerRefeicao(id: string) {

        setRefeicoes(prev =>
            prev.filter(refeicao => refeicao.id !== id)
        )

        if (refeicaoAberta === id) {
            setRefeicaoAberta(null)
        }
    }

    function adicionarAlimento(refeicaoId: string) {

        const novoAlimento: AlimentoFormulario = {
            id: crypto.randomUUID(),
            nome: '',
            quantidade: '',
            calorias: '',
            proteinas: '',
            carboidratos: '',
            gorduras: '',
        }

        setRefeicoes(prev =>
            prev.map(refeicao =>
                refeicao.id === refeicaoId
                    ? {
                        ...refeicao,
                        alimentos: [
                            ...refeicao.alimentos,
                            novoAlimento,
                        ],
                    }
                    : refeicao
            )
        )
    }

    function removerAlimento(
        refeicaoId: string,
        alimentoId: string
    ) {

        setRefeicoes(prev =>
            prev.map(refeicao =>
                refeicao.id === refeicaoId
                    ? {
                        ...refeicao,
                        alimentos: refeicao.alimentos.filter(
                            alimento => alimento.id !== alimentoId
                        ),
                    }
                    : refeicao
            )
        )
    }

    function atualizarAlimento(
        refeicaoId: string,
        alimentoId: string,
        campo: keyof AlimentoFormulario,
        valor: string
    ) {

        setRefeicoes(prev =>
            prev.map(refeicao =>
                refeicao.id === refeicaoId
                    ? {
                        ...refeicao,
                        alimentos: refeicao.alimentos.map(
                            alimento =>
                                alimento.id === alimentoId
                                    ? {
                                        ...alimento,
                                        [campo]: valor,
                                    }
                                    : alimento
                        ),
                    }
                    : refeicao
            )
        )
    }

    function salvarDieta() {

        const dieta = {
            nome,
            descricao,
            objetivo,
            nivel,
            duracao,
            refeicoes,
        }

        console.log('Dieta criada:', dieta)

        alert('Dieta criada com sucesso!')
    }

    return (
        <div className="min-h-screen w-full">

            <div className="container mx-auto flex flex-col gap-4">

                <Texto
                    tipo="titulo"
                    className="font-thin"
                >
                    Nome da dieta
                </Texto>

                <InputSimples
                    tipo="text"
                    valor={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="ex: Plano Alimentar"
                />

                <Texto
                    tipo="titulo"
                    className="font-thin"
                >
                    Descrição
                </Texto>

                <InputTextarea
                    valor={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    classeAdicional="h-20"
                    placeholder="descrição da dieta"
                />

                <Texto
                    tipo="titulo"
                    className="font-thin mt-2"
                >
                    Objetivo
                </Texto>

                <InputSimples
                    tipo="text"
                    valor={objetivo}
                    onChange={e => setObjetivo(e.target.value)}
                    placeholder="ex: Manutenção, desempenho..."
                />

                <Texto
                    tipo="titulo"
                    className="font-thin"
                >
                    Nível
                </Texto>

                <InputSimples
                    tipo="text"
                    valor={nivel}
                    onChange={e => setNivel(e.target.value)}
                    placeholder="ex: Iniciante, Intermediário..."
                />

                <Texto
                    tipo="titulo"
                    className="font-thin"
                >
                    Duração
                </Texto>

                <InputSimples
                    tipo="text"
                    valor={duracao}
                    onChange={e => setDuracao(e.target.value)}
                    placeholder="ex: 8 semanas"
                />

                <div className="flex gap-1 items-center mt-3">

                    <WrapperIcone>
                        <Utensils className="size-full" />
                    </WrapperIcone>

                    <Texto
                        tipo="titulo"
                        className="font-thin"
                    >
                        Refeições
                    </Texto>

                </div>

                <Texto
                    tipo="subtexto"
                    className="opacity-50 -mt-2"
                >
                    adicione as refeições que farão parte da dieta
                </Texto>

                <div className="flex flex-col sm:flex-row gap-2">

                    <InputSimples
                        tipo="text"
                        valor={nomeNovaRefeicao}
                        onChange={e =>
                            setNomeNovaRefeicao(e.target.value)
                        }
                        placeholder="ex: Café da manhã"
                        classeAdicional="w-full"
                    />

                    <InputSimples
                        tipo="time"
                        valor={horarioNovaRefeicao}
                        onChange={e =>
                            setHorarioNovaRefeicao(e.target.value)
                        }
                        classeAdicional="sm:w-40"
                    />

                    <BotaoSecundario
                        icone={Plus}
                        onClick={adicionarRefeicao}
                        tipo="cheio"
                    />

                </div>

                <div className="flex flex-col gap-3">

                    {refeicoes.map(refeicao => (

                        <div
                            key={refeicao.id}
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-base-terciaria/70
                                shadow-md
                                shadow-gray-900/20
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <WrapperIcone>

                                        <Clock className="size-full" />

                                    </WrapperIcone>

                                    <div>

                                        <Texto tipo="subtitulo">
                                            {refeicao.nome}
                                        </Texto>

                                        <Texto
                                            tipo="subtexto"
                                            className="opacity-60"
                                        >
                                            {refeicao.horario}
                                        </Texto>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removerRefeicao(refeicao.id)
                                    }
                                >
                                    <X className="size-4 opacity-60" />
                                </button>

                            </div>

                            <BotaoTerciario
                                texto={
                                    refeicaoAberta === refeicao.id
                                        ? 'fechar refeição'
                                        : 'editar refeição'
                                }
                                onClick={() =>
                                    setRefeicaoAberta(
                                        refeicaoAberta === refeicao.id
                                            ? null
                                            : refeicao.id
                                    )
                                }
                                classeAdicional="w-full mt-3"
                            />

                            {refeicaoAberta === refeicao.id && (

                                <div className="flex flex-col gap-3 mt-4">

                                    <Texto
                                        tipo="subtexto"
                                        className="opacity-60"
                                    >
                                        Alimentos
                                    </Texto>

                                    {refeicao.alimentos.map(alimento => (

                                        <div
                                            key={alimento.id}
                                            className="
                                                p-3
                                                rounded-xl
                                                bg-base-secundaria
                                                border
                                                border-base-terciaria/30
                                                flex flex-col gap-2
                                            "
                                        >

                                            <div className="flex justify-between items-center">

                                                <Texto tipo="subtexto">
                                                    Alimento
                                                </Texto>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removerAlimento(
                                                            refeicao.id,
                                                            alimento.id
                                                        )
                                                    }
                                                >
                                                    <X className="size-4 opacity-60" />
                                                </button>

                                            </div>

                                            <InputSimples
                                                tipo="text"
                                                valor={alimento.nome}
                                                onChange={e =>
                                                    atualizarAlimento(
                                                        refeicao.id,
                                                        alimento.id,
                                                        'nome',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nome do alimento"
                                            />

                                            <InputSimples
                                                tipo="text"
                                                valor={alimento.quantidade}
                                                onChange={e =>
                                                    atualizarAlimento(
                                                        refeicao.id,
                                                        alimento.id,
                                                        'quantidade',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Quantidade"
                                            />

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                                                <InputSimples
                                                    tipo="number"
                                                    valor={alimento.calorias}
                                                    onChange={e =>
                                                        atualizarAlimento(
                                                            refeicao.id,
                                                            alimento.id,
                                                            'calorias',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Kcal"
                                                />

                                                <InputSimples
                                                    tipo="number"
                                                    valor={alimento.proteinas}
                                                    onChange={e =>
                                                        atualizarAlimento(
                                                            refeicao.id,
                                                            alimento.id,
                                                            'proteinas',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Proteínas"
                                                />

                                                <InputSimples
                                                    tipo="number"
                                                    valor={alimento.carboidratos}
                                                    onChange={e =>
                                                        atualizarAlimento(
                                                            refeicao.id,
                                                            alimento.id,
                                                            'carboidratos',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Carboidratos"
                                                />

                                                <InputSimples
                                                    tipo="number"
                                                    valor={alimento.gorduras}
                                                    onChange={e =>
                                                        atualizarAlimento(
                                                            refeicao.id,
                                                            alimento.id,
                                                            'gorduras',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Gorduras"
                                                />

                                            </div>

                                        </div>

                                    ))}

                                    <BotaoTerciario
                                        texto="adicionar alimento"
                                        icone={Plus}
                                        onClick={() =>
                                            adicionarAlimento(refeicao.id)
                                        }
                                        classeAdicional="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        "
                                    />

                                </div>

                            )}

                        </div>

                    ))}

                </div>

                <BotaoPrimario
                    texto="salvar dieta"
                    icone={Plus}
                    onClick={salvarDieta}
                />

            </div>

        </div>
    )
}

export default CriarDieta