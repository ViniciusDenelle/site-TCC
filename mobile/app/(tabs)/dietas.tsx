import { useMemo, useState } from 'react'
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import useTema from '@/contextos/TemaContexto'
import CreateDietForm from '../../componentes/CreateDietForm'

/* =========================================================
   TIPOS
========================================================= */

type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos'

type DietaPronta = {
    id: string
    emoji: string
    nome: string
    objetivo: string
    refeicoes: number
    duracao: string
    nivel: Nivel
}

type Refeicao = {
    id: string
    horario: string
    nome: string
    calorias: number
    alimentos: string[]
    concluida: boolean
}

type MenuTab = 'resumo' | 'prontas' | 'plano' | 'criar'

/* =========================================================
   DADOS MOCK
========================================================= */

const DIETAS_PRONTAS: DietaPronta[] = [
    {
        id: '1',
        emoji: '🔥',
        nome: 'Cutting — Definição',
        objetivo: 'Perda de gordura',
        refeicoes: 5,
        duracao: '8 sem',
        nivel: 'Intermediário',
    },
    {
        id: '2',
        emoji: '💪',
        nome: 'Bulking Limpo',
        objetivo: 'Ganho de massa',
        refeicoes: 6,
        duracao: '12 sem',
        nivel: 'Intermediário',
    },
    {
        id: '3',
        emoji: '⚖️',
        nome: 'Manutenção Atlética',
        objetivo: 'Manter composição',
        refeicoes: 5,
        duracao: 'Contínuo',
        nivel: 'Todos',
    },
    {
        id: '4',
        emoji: '⚡',
        nome: 'Low Carb + Proteína',
        objetivo: 'Recomposição',
        refeicoes: 4,
        duracao: '6 sem',
        nivel: 'Avançado',
    },
]

const REFEICOES_INICIAIS: Refeicao[] = [
    {
        id: '1',
        horario: '07h',
        nome: 'Café da manhã',
        calorias: 480,
        alimentos: ['Ovos mexidos', 'Pão integral', 'Café preto'],
        concluida: true,
    },
    {
        id: '2',
        horario: '10h',
        nome: 'Lanche',
        calorias: 210,
        alimentos: ['Whey protein', 'Banana'],
        concluida: true,
    },
    {
        id: '3',
        horario: '13h',
        nome: 'Almoço',
        calorias: 720,
        alimentos: ['Arroz integral', 'Frango grelhado', 'Brócolis'],
        concluida: false,
    },
    {
        id: '4',
        horario: '16h',
        nome: 'Pré-treino',
        calorias: 320,
        alimentos: ['Batata doce', 'Atum'],
        concluida: false,
    },
    {
        id: '5',
        horario: '19h',
        nome: 'Jantar',
        calorias: 510,
        alimentos: ['Omelete', 'Salada verde', 'Aveia'],
        concluida: false,
    },
]

const META_CALORIAS = 2240

const NIVEL_CORES: Record<Nivel, { bg: string; texto: string }> = {
    Iniciante: { bg: '#1f3a2a', texto: '#4cd964' },
    Todos: { bg: '#1f3a2a', texto: '#4cd964' },
    Intermediário: { bg: '#3a3320', texto: '#e0b93d' },
    Avançado: { bg: '#3a1f22', texto: '#ff5b5b' },
}

/* =========================================================
   COMPONENTES AUXILIARES
========================================================= */

function Tag({ texto }: { texto: string }) {
    return (
        <View style={styles.tag}>
            <Text style={styles.tagText}>{texto}</Text>
        </View>
    )
}

function BarraProgresso({ percentual, cores }: { percentual: number; cores?: any }) {
    const largura = Math.min(Math.max(percentual, 0), 1) * 100
    const corFundo = cores ? cores.quaternaria : '#2c2c2e'
    const corBarra = cores ? cores.destaque : '#ff5b6d'

    return (
        <View style={[styles.barraFundo, { backgroundColor: corFundo }]}>
            <View style={[styles.barraPreenchida, { width: `${largura}%`, backgroundColor: corBarra }]} />
        </View>
    )
}

function CardDietaPronta({
    dieta,
    onPress,
    temaAtual,
    formatarCor,
}: {
    dieta: DietaPronta
    onPress: (dieta: DietaPronta) => void
    temaAtual: any
    formatarCor: (color: string, opacidade: number) => string
}) {
    const cores = NIVEL_CORES[dieta.nivel]
    const corCard = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corIconWrapper = formatarCor(temaAtual['--color-base-terciaria'], 1)
    const corNome = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corDescricao = formatarCor(temaAtual['--color-t-secundaria'], 1)

    return (
        <TouchableOpacity
            style={[styles.prontaCard, { backgroundColor: corCard }]}
            activeOpacity={0.8}
            onPress={() => onPress(dieta)}
        >
            <View style={[styles.prontaIconWrapper, { backgroundColor: corIconWrapper }]}>
                <Text style={styles.prontaIcon}>{dieta.emoji}</Text>
            </View>

            <View style={styles.prontaContent}>
                <Text style={[styles.prontaNome, { color: corNome }]}>{dieta.nome}</Text>
                <Text style={[styles.prontaDescricao, { color: corDescricao }]}>
                    {dieta.objetivo} · {dieta.refeicoes} refeições · {dieta.duracao}
                </Text>
            </View>

            <View style={[styles.badge, { backgroundColor: cores.bg }]}>
                <Text style={[styles.badgeText, { color: cores.texto }]}>
                    {dieta.nivel}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

type RascunhoRefeicao = {
    calorias: string
    horario: string
    alimentos: string[]
    novoAlimento: string
}

function CardRefeicao({
    refeicao,
    emEdicao,
    rascunho,
    onEditar,
    onCancelar,
    onSalvar,
    onMudarRascunho,
    onRemoverAlimento,
    onAdicionarAlimento,
    onMarcarComido,
    temaAtual,
    formatarCor,
}: {
    refeicao: Refeicao
    emEdicao: boolean
    rascunho: RascunhoRefeicao | null
    onEditar: () => void
    onCancelar: () => void
    onSalvar: () => void
    onMudarRascunho: (campo: 'calorias' | 'horario' | 'novoAlimento', valor: string) => void
    onRemoverAlimento: (index: number) => void
    onAdicionarAlimento: () => void
    onMarcarComido: (comido: boolean) => void
    temaAtual: any
    formatarCor: (color: string, opacidade: number) => string
}) {
    const corCard = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corTextoSecundario = formatarCor(temaAtual['--color-t-secundaria'], 1)
    const corInputBg = formatarCor(temaAtual['--color-base-terciaria'], 1)
    const corDestaque = formatarCor(temaAtual['--color-destaque-p-medio'], 1)
    const corAlimento = formatarCor(temaAtual['--color-base-terciaria'], 1)

    if (emEdicao && rascunho) {
        return (
            <View style={[styles.refeicaoCard, styles.refeicaoCardEdicao, { backgroundColor: corCard, borderColor: corDestaque }]}>
                <View style={styles.refeicaoHeaderRow}>
                    <View>
                        <Text style={[styles.refeicaoHorarioLabel, { color: corTextoSecundario }]}>
                            {refeicao.horario}
                        </Text>
                        <Text style={[styles.refeicaoNome, { color: corTexto }]}>{refeicao.nome}</Text>
                        <Text style={[styles.refeicaoKcalSub, { color: corTextoSecundario }]}>
                            {rascunho.calorias || 0} kcal
                        </Text>
                    </View>

                    <View style={styles.refeicaoHeaderBotoes}>
                        <TouchableOpacity
                            style={[styles.botaoCancelar, { backgroundColor: corInputBg }]}
                            onPress={onCancelar}
                        >
                            <Text style={[styles.botaoCancelarTexto, { color: corTextoSecundario }]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botaoSalvar, { backgroundColor: corDestaque }]}
                            onPress={onSalvar}
                        >
                            <Text style={[styles.botaoSalvarTexto, { color: corTexto }]}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.camposDuploContainer}>
                    <View style={styles.campoDuplo}>
                        <Text style={[styles.campoLabel, { color: corTextoSecundario }]}>CALORIAS</Text>
                        <TextInput
                            value={rascunho.calorias}
                            onChangeText={(v) => onMudarRascunho('calorias', v)}
                            keyboardType="numeric"
                            style={[styles.campoInput, { backgroundColor: corInputBg, color: corTexto }]}
                            placeholderTextColor={corTextoSecundario}
                        />
                    </View>

                    <View style={styles.campoDuplo}>
                        <Text style={[styles.campoLabel, { color: corTextoSecundario }]}>HORÁRIO</Text>
                        <TextInput
                            value={rascunho.horario}
                            onChangeText={(v) => onMudarRascunho('horario', v)}
                            style={[styles.campoInput, { backgroundColor: corInputBg, color: corTexto }]}
                            placeholderTextColor={corTextoSecundario}
                        />
                    </View>
                </View>

                <Text style={[styles.campoLabel, { color: corTextoSecundario }]}>ALIMENTOS</Text>

                {rascunho.alimentos.map((alimento, index) => (
                    <View key={`${alimento}-${index}`} style={[styles.alimentoLinha, { backgroundColor: corAlimento }]}>
                        <Text style={[styles.alimentoTexto, { color: corTexto }]}>{alimento}</Text>

                        <TouchableOpacity onPress={() => onRemoverAlimento(index)}>
                            <Text style={[styles.alimentoRemover, { color: corTextoSecundario }]}>×</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.adicionarAlimentoRow}>
                    <TextInput
                        value={rascunho.novoAlimento}
                        onChangeText={(v) => onMudarRascunho('novoAlimento', v)}
                        placeholder="Adicionar alimento..."
                        placeholderTextColor={corTextoSecundario}
                        style={[styles.adicionarAlimentoInput, { backgroundColor: corInputBg, color: corTexto }]}
                        onSubmitEditing={onAdicionarAlimento}
                    />

                    <TouchableOpacity
                        style={[styles.botaoAdd, { backgroundColor: corInputBg }]}
                        onPress={onAdicionarAlimento}
                    >
                        <Text style={[styles.botaoAddTexto, { color: corDestaque }]}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.comidoRow}>
                    <TouchableOpacity
                        style={[styles.botaoNaoComi, { backgroundColor: corInputBg }]}
                        onPress={() => onMarcarComido(false)}
                    >
                        <Text style={[styles.botaoNaoComiTexto, { color: corTextoSecundario }]}>Não comi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.botaoComi, { backgroundColor: corDestaque }]}
                        onPress={() => onMarcarComido(true)}
                    >
                        <Text style={[styles.botaoComiTexto, { color: corTexto }]}>Comi ✓</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View
            style={[
                styles.refeicaoCard,
                refeicao.concluida && styles.refeicaoCardConcluida,
                { backgroundColor: corCard },
            ]}
        >
            <View style={styles.refeicaoHeaderRow}>
                <View>
                    <Text style={[styles.refeicaoHorarioLabel, { color: corTextoSecundario }]}>
                        {refeicao.horario}
                    </Text>
                    <Text style={[styles.refeicaoNome, { color: corTexto }]}>{refeicao.nome}</Text>
                    <Text style={[styles.refeicaoKcalSub, { color: corTextoSecundario }]}>
                        {refeicao.calorias} kcal
                    </Text>
                </View>

                <View style={styles.refeicaoHeaderBotoes}>
                    <TouchableOpacity
                        style={[styles.botaoEditar, { backgroundColor: corInputBg }]}
                        onPress={onEditar}
                    >
                        <Text style={[styles.botaoEditarTexto, { color: corTexto }]}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.checkCirculo,
                            refeicao.concluida && { ...styles.checkCirculoAtivo, backgroundColor: corDestaque },
                        ]}
                        onPress={() => onMarcarComido(!refeicao.concluida)}
                    >
                        {refeicao.concluida && (
                            <Text style={[styles.checkMarca, { color: corTexto }]}>✓</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tagsRow}>
                {refeicao.alimentos.map((alimento, index) => (
                    <Tag key={`${alimento}-${index}`} texto={alimento} />
                ))}
            </View>
        </View>
    )
}

/* =========================================================
   TELA PRINCIPAL
========================================================= */

export default function Dietas() {
    const { temaAtual, formatarCor } = useTema()

    const cores = {
        fundo: formatarCor(temaAtual['--color-base-primaria'], 1),
        card: formatarCor(temaAtual['--color-base-secundaria'], 1),
        cardTerciaria: formatarCor(temaAtual['--color-base-terciaria'], 1),
        texto: formatarCor(temaAtual['--color-t-primaria'], 1),
        textoSecundario: formatarCor(temaAtual['--color-t-secundaria'], 1),
        destaque: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        quaternaria: formatarCor(temaAtual['--color-base-quaternaria'], 1),
    }

    const [menuSelecionado, setMenuSelecionado] = useState<MenuTab>('plano')
    // dietas criadas localmente via formulário
    const [createdDietas, setCreatedDietas] = useState<DietaPronta[]>([])

    /* --- dietas prontas --- */
    const [minhasDietasProntas, setMinhasDietasProntas] = useState<string[]>([])

    const adicionarDietaPronta = (dieta: DietaPronta) => {
        setMinhasDietasProntas((prev) =>
            prev.includes(dieta.id) ? prev : [...prev, dieta.id]
        )
    }

    const handleCreateDieta = (dieta: DietaPronta) => {
        setCreatedDietas((prev) => [dieta, ...prev])
        setMinhasDietasProntas((prev) => (prev.includes(dieta.id) ? prev : [...prev, dieta.id]))
        setMenuSelecionado('prontas')
    }

    /* --- plano do dia --- */
    const [refeicoes, setRefeicoes] = useState<Refeicao[]>(REFEICOES_INICIAIS)
    const [editandoId, setEditandoId] = useState<string | null>(null)
    const [rascunho, setRascunho] = useState<RascunhoRefeicao | null>(null)

    const resumoDia = useMemo(() => {
        const consumidas = refeicoes
            .filter((r) => r.concluida)
            .reduce((soma, r) => soma + r.calorias, 0)

        const concluidas = refeicoes.filter((r) => r.concluida).length

        return {
            consumidas,
            restantes: Math.max(META_CALORIAS - consumidas, 0),
            percentual: consumidas / META_CALORIAS,
            concluidas,
            total: refeicoes.length,
        }
    }, [refeicoes])

    const iniciarEdicao = (refeicao: Refeicao) => {
        setEditandoId(refeicao.id)
        setRascunho({
            calorias: String(refeicao.calorias),
            horario: refeicao.horario,
            alimentos: [...refeicao.alimentos],
            novoAlimento: '',
        })
    }

    const cancelarEdicao = () => {
        setEditandoId(null)
        setRascunho(null)
    }

    const salvarEdicao = (id: string) => {
        if (!rascunho) return

        setRefeicoes((prev) =>
            prev.map((r) =>
                r.id === id
                    ? {
                          ...r,
                          calorias: Number(rascunho.calorias) || 0,
                          horario: rascunho.horario,
                          alimentos: rascunho.alimentos,
                      }
                    : r
            )
        )

        setEditandoId(null)
        setRascunho(null)
    }

    const marcarComido = (id: string, comido: boolean) => {
        setRefeicoes((prev) =>
            prev.map((r) => (r.id === id ? { ...r, concluida: comido } : r))
        )

        if (editandoId === id) {
            setEditandoId(null)
            setRascunho(null)
        }
    }

    const mudarCampoRascunho = (
        campo: 'calorias' | 'horario' | 'novoAlimento',
        valor: string
    ) => {
        setRascunho((prev) => (prev ? { ...prev, [campo]: valor } : prev))
    }

    const removerAlimentoRascunho = (index: number) => {
        setRascunho((prev) =>
            prev
                ? {
                      ...prev,
                      alimentos: prev.alimentos.filter((_, i) => i !== index),
                  }
                : prev
        )
    }

    const adicionarAlimentoRascunho = () => {
        setRascunho((prev) => {
            if (!prev || !prev.novoAlimento.trim()) return prev

            return {
                ...prev,
                alimentos: [...prev.alimentos, prev.novoAlimento.trim()],
                novoAlimento: '',
            }
        })
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: cores.texto }]}>Dieta</Text>
                <Text style={[styles.subtitle, { color: cores.textoSecundario }]}>
                    Suas dietas e planos alimentares
                </Text>
            </View>

            {/* MENU */}
            <View style={[styles.menu, { backgroundColor: cores.card }]}>
                {(
                    [
                        { id: 'resumo', label: 'Resumo' },
                        { id: 'prontas', label: 'Dietas Prontas' },
                        { id: 'plano', label: 'Plano do Dia' },
                        { id: 'criar', label: 'Criar' },
                    ] as { id: MenuTab; label: string }[]
                ).map((item) => {
                    const ativo = menuSelecionado === item.id

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                ativo && {
                                    ...styles.menuItemAtivo,
                                    backgroundColor: cores.destaque,
                                },
                            ]}
                            onPress={() => setMenuSelecionado(item.id)}
                        >
                            <Text
                                style={[
                                    styles.menuText,
                                    { color: ativo ? cores.texto : cores.textoSecundario },
                                    ativo && styles.menuTextAtivo,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            {/* ABA RESUMO */}
            {menuSelecionado === 'resumo' && (
                <ScrollView
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.resumoCard, { backgroundColor: cores.card }]}>
                        <View style={styles.resumoTopo}>
                            <Text style={[styles.resumoKcal, { color: cores.texto }]}>
                                {resumoDia.consumidas}
                                <Text style={[styles.resumoKcalUnidade, { color: cores.textoSecundario }]}> kcal</Text>
                            </Text>

                            <Text style={[styles.resumoPercentual, { color: cores.destaque }]}>
                                {Math.round(resumoDia.percentual * 100)}%
                            </Text>
                        </View>

                        <Text style={[styles.resumoMeta, { color: cores.textoSecundario }]}>
                            de {META_CALORIAS} kcal hoje
                        </Text>

                        <BarraProgresso percentual={resumoDia.percentual} cores={cores} />

                        <View style={styles.resumoRodape}>
                            <Text style={[styles.resumoRodapeTexto, { color: cores.textoSecundario }]}>
                                {resumoDia.concluidas} de {resumoDia.total}{' '}
                                refeições concluídas
                            </Text>

                            <Text style={styles.resumoRodapeTexto}>
                                {resumoDia.restantes} kcal restantes
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.secaoTitulo, { color: cores.texto }]}>Suas dietas prontas</Text>

                    {minhasDietasProntas.length === 0 ? (
                        <View style={styles.empty}>
                            <Text style={[styles.emptyText, { color: cores.textoSecundario }]}>
                                Você ainda não adicionou nenhuma dieta pronta.
                            </Text>
                        </View>
                    ) : (
                        DIETAS_PRONTAS.filter((d) =>
                            minhasDietasProntas.includes(d.id)
                        ).map((dieta) => (
                            <CardDietaPronta
                                key={dieta.id}
                                dieta={dieta}
                                onPress={() => setMenuSelecionado('prontas')}
                                temaAtual={temaAtual}
                                formatarCor={formatarCor}
                            />
                        ))
                    )}
                </ScrollView>
            )}

            {/* ABA DIETAS PRONTAS */}
            {menuSelecionado === 'prontas' && (
                <FlatList
                    data={DIETAS_PRONTAS}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <CardDietaPronta
                            dieta={item}
                            onPress={adicionarDietaPronta}
                            temaAtual={temaAtual}
                            formatarCor={formatarCor}
                        />
                    )}
                />
            )}

            {/* ABA PLANO DO DIA */}
            {menuSelecionado === 'plano' && (
                <FlatList
                    data={refeicoes}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    ListHeaderComponent={
                        <View style={styles.resumoCard}>
                            <View style={styles.resumoTopo}>
                                <Text style={styles.resumoKcal}>
                                    {resumoDia.consumidas}
                                    <Text style={styles.resumoKcalUnidade}>
                                        {' '}
                                        kcal
                                    </Text>
                                </Text>

                                <Text style={[styles.resumoPercentual, { color: cores.destaque }]}>
                                    {Math.round(resumoDia.percentual * 100)}%
                                </Text>
                            </View>

                            <Text style={styles.resumoMeta}>
                                de {META_CALORIAS} kcal hoje
                            </Text>

                            <BarraProgresso percentual={resumoDia.percentual} cores={cores} />

                            <View style={styles.resumoRodape}>
                                <Text style={styles.resumoRodapeTexto}>
                                    {resumoDia.concluidas} de {resumoDia.total}{' '}
                                    refeições concluídas
                                </Text>

                                <Text style={styles.resumoRodapeTexto}>
                                    {resumoDia.restantes} kcal restantes
                                </Text>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <CardRefeicao
                            refeicao={item}
                            emEdicao={editandoId === item.id}
                            rascunho={editandoId === item.id ? rascunho : null}
                            onEditar={() => iniciarEdicao(item)}
                            onCancelar={cancelarEdicao}
                            onSalvar={() => salvarEdicao(item.id)}
                            onMudarRascunho={mudarCampoRascunho}
                            onRemoverAlimento={removerAlimentoRascunho}
                            onAdicionarAlimento={adicionarAlimentoRascunho}
                            onMarcarComido={(comido) =>
                                marcarComido(item.id, comido)
                            }
                            temaAtual={temaAtual}
                            formatarCor={formatarCor}
                        />
                    )}
                />
            )}

            {/* ABA CRIAR (melhorada) */}
            {menuSelecionado === 'criar' && (
                <View style={styles.criarContainer}>
                    <Text style={styles.criarTitle}>Criar nova dieta</Text>

                    <Text style={styles.criarSubtitle}>
                        Monte uma dieta personalizada para seus objetivos.
                    </Text>

                    <CreateDietForm onCreate={handleCreateDieta} />

                    {createdDietas.length > 0 && (
                        <>
                            <Text style={[styles.secaoTitulo, { marginTop: 12, color: cores.texto }]}>
                                Dietas criadas
                            </Text>

                            {createdDietas.map((d) => (
                                <CardDietaPronta
                                    key={d.id}
                                    dieta={d}
                                    onPress={() => adicionarDietaPronta(d)}
                                />
                            ))}
                        </>
                    )}
                </View>
            )}
        </SafeAreaView>
    )
}

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },

    /* HEADER */

    header: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },

    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    subtitle: {
        color: '#8e8e93',
        fontSize: 14,
        marginTop: 4,
    },

    /* MENU */

    menu: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#121214',
        borderRadius: 12,
        padding: 4,
    },

    menuItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 9,
    },

    menuItemAtivo: {
        backgroundColor: '#ff5b6d',
    },

    menuText: {
        color: '#8e8e93',
        fontSize: 12,
        fontWeight: '600',
    },

    menuTextAtivo: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

    /* LISTA */

    list: {
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 30,
    },

    /* RESUMO / PLANO - CARD DE CALORIAS */

    resumoCard: {
        backgroundColor: '#121214',
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
    },

    resumoTopo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    resumoKcal: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
    },

    resumoKcalUnidade: {
        color: '#8e8e93',
        fontSize: 15,
        fontWeight: '500',
    },

    resumoPercentual: {
        color: '#ff5b6d',
        fontSize: 15,
        fontWeight: 'bold',
    },

    resumoMeta: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 2,
        marginBottom: 12,
    },

    resumoRodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    resumoRodapeTexto: {
        color: '#8e8e93',
        fontSize: 12,
    },

    /* BARRA DE PROGRESSO
       Obs: usei cor sólida (#ff5b6d) em vez do gradiente laranja->vermelho
       da imagem, pois RN puro não suporta gradiente sem uma lib como
       expo-linear-gradient. Posso adicionar o gradiente se vocês já usam Expo. */

    barraFundo: {
        height: 6,
        backgroundColor: '#2c2c2e',
        borderRadius: 3,
        overflow: 'hidden',
    },

    barraPreenchida: {
        height: '100%',
        backgroundColor: '#ff5b6d',
        borderRadius: 3,
    },

    secaoTitulo: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    /* DIETAS PRONTAS */

    prontaCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121214',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    prontaIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#1c1c1e',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    prontaIcon: {
        fontSize: 20,
    },

    prontaContent: {
        flex: 1,
    },

    prontaNome: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    prontaDescricao: {
        color: '#8e8e93',
        fontSize: 12,
        marginTop: 3,
    },

    badge: {
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginLeft: 8,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },

    /* REFEIÇÃO - CARD PADRÃO */

    refeicaoCard: {
        backgroundColor: '#121214',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },

    refeicaoCardConcluida: {
        backgroundColor: '#1c1416',
    },

    refeicaoCardEdicao: {
        borderWidth: 1,
        borderColor: '#ff5b6d',
    },

    refeicaoHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    refeicaoHorarioLabel: {
        color: '#8e8e93',
        fontSize: 12,
        marginBottom: 2,
    },

    refeicaoNome: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    refeicaoKcalSub: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 2,
    },

    refeicaoHeaderBotoes: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 14,
    },

    tag: {
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    tagText: {
        color: '#c7c7cc',
        fontSize: 12,
    },

    botaoEditar: {
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    botaoEditarTexto: {
        color: '#d1d1d6',
        fontSize: 12,
        fontWeight: '600',
    },

    checkCirculo: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: '#48484a',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkCirculoAtivo: {
        backgroundColor: '#ff5b6d',
        borderColor: '#ff5b6d',
    },

    checkMarca: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
    },

    /* REFEIÇÃO - MODO EDIÇÃO */

    botaoCancelar: {
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    botaoCancelarTexto: {
        color: '#d1d1d6',
        fontSize: 12,
        fontWeight: '600',
    },

    botaoSalvar: {
        backgroundColor: '#ff5b6d',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    botaoSalvarTexto: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    camposDuploContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        marginBottom: 16,
    },

    campoDuplo: {
        flex: 1,
    },

    campoLabel: {
        color: '#636366',
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 6,
    },

    campoInput: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2e',
        paddingBottom: 6,
    },

    alimentoLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 8,
    },

    alimentoTexto: {
        color: '#ffffff',
        fontSize: 14,
    },

    alimentoRemover: {
        color: '#8e8e93',
        fontSize: 16,
    },

    adicionarAlimentoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
        marginBottom: 18,
    },

    adicionarAlimentoInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        paddingHorizontal: 12,
        color: '#ffffff',
        fontSize: 14,
    },

    botaoAdd: {
        backgroundColor: '#3a1f22',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },

    botaoAddTexto: {
        color: '#ff5b6d',
        fontSize: 13,
        fontWeight: 'bold',
    },

    comidoRow: {
        flexDirection: 'row',
        gap: 10,
    },

    botaoNaoComi: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
    },

    botaoNaoComiTexto: {
        color: '#d1d1d6',
        fontSize: 14,
        fontWeight: '600',
    },

    botaoComi: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        backgroundColor: '#ff5b6d',
        borderRadius: 10,
    },

    botaoComiTexto: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    /* VAZIO */

    empty: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },

    emptyText: {
        color: '#8e8e93',
        fontSize: 14,
        textAlign: 'center',
    },

    /* CRIAR (mantida do original) */

    criarContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    criarTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    criarSubtitle: {
        color: '#8e8e93',
        fontSize: 14,
        marginTop: 6,
        marginBottom: 20,
    },

    input: {
        height: 48,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        paddingHorizontal: 14,
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 12,
    },

    button: {
        height: 48,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },

    buttonText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
    },
})
