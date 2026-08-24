import { useMemo, useState } from 'react'
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

type Dieta = {
    id: string
    nome: string
    objetivo: string
    calorias: string
    refeicoes: number
    cor: string
}

const dietas: Dieta[] = [
    {
        id: '1',
        nome: 'Dieta para Ganho de Massa',
        objetivo: 'Hipertrofia',
        calorias: '2800 kcal',
        refeicoes: 6,
        cor: '#ff5b5b',
    },
    {
        id: '2',
        nome: 'Dieta para Emagrecimento',
        objetivo: 'Perda de gordura',
        calorias: '1900 kcal',
        refeicoes: 5,
        cor: '#4cd964',
    },
    {
        id: '3',
        nome: 'Dieta para Definição',
        objetivo: 'Definição muscular',
        calorias: '2200 kcal',
        refeicoes: 5,
        cor: '#ffbd59',
    },
    {
        id: '4',
        nome: 'Dieta de Manutenção',
        objetivo: 'Manutenção de peso',
        calorias: '2400 kcal',
        refeicoes: 5,
        cor: '#5ac8fa',
    },
]

function CardDieta({
    dieta,
    onPress,
}: {
    dieta: Dieta
    onPress: (dieta: Dieta) => void
}) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onPress(dieta)}
        >
            <View
                style={[
                    styles.cardIndicator,
                    { backgroundColor: dieta.cor },
                ]}
            />

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {dieta.nome}
                </Text>

                <Text style={styles.objective}>
                    {dieta.objetivo}
                </Text>

                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.infoLabel}>
                            Calorias
                        </Text>

                        <Text style={styles.infoValue}>
                            {dieta.calorias}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.infoLabel}>
                            Refeições
                        </Text>

                        <Text style={styles.infoValue}>
                            {dieta.refeicoes}
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
    )
}

export default function Dietas() {
    const [busca, setBusca] = useState('')

    const [menuSelecionado, setMenuSelecionado] = useState<
        'dietas' | 'minhas' | 'criar'
    >('dietas')

    const [minhasDietas, setMinhasDietas] = useState<Dieta[]>([
        dietas[0],
    ])

    const dietasFiltradas = useMemo(() => {
        return dietas.filter((dieta) =>
            dieta.nome
                .toLowerCase()
                .includes(busca.toLowerCase())
        )
    }, [busca])

    const adicionarDieta = (dieta: Dieta) => {
        const jaExiste = minhasDietas.some(
            (item) => item.id === dieta.id
        )

        if (!jaExiste) {
            setMinhasDietas((prev) => [...prev, dieta])
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Dietas
                </Text>

                <Text style={styles.subtitle}>
                    Suas dietas e planos alimentares
                </Text>
            </View>

            {/* MENU */}
            <View style={styles.menu}>
                <TouchableOpacity
                    style={[
                        styles.menuItem,
                        menuSelecionado === 'dietas' &&
                            styles.menuItemAtivo,
                    ]}
                    onPress={() =>
                        setMenuSelecionado('dietas')
                    }
                >
                    <Text
                        style={[
                            styles.menuText,
                            menuSelecionado === 'dietas' &&
                                styles.menuTextAtivo,
                        ]}
                    >
                        Dietas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.menuItem,
                        menuSelecionado === 'minhas' &&
                            styles.menuItemAtivo,
                    ]}
                    onPress={() =>
                        setMenuSelecionado('minhas')
                    }
                >
                    <Text
                        style={[
                            styles.menuText,
                            menuSelecionado === 'minhas' &&
                                styles.menuTextAtivo,
                        ]}
                    >
                        Minhas dietas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.menuItem,
                        menuSelecionado === 'criar' &&
                            styles.menuItemAtivo,
                    ]}
                    onPress={() =>
                        setMenuSelecionado('criar')
                    }
                >
                    <Text
                        style={[
                            styles.menuText,
                            menuSelecionado === 'criar' &&
                                styles.menuTextAtivo,
                        ]}
                    >
                        Criar
                    </Text>
                </TouchableOpacity>
            </View>

            {/* ABA DIETAS */}
            {menuSelecionado === 'dietas' && (
                <>
                    <View style={styles.searchContainer}>
                        <TextInput
                            value={busca}
                            onChangeText={setBusca}
                            placeholder="Buscar dieta..."
                            placeholderTextColor="#636366"
                            style={styles.search}
                        />
                    </View>

                    <FlatList
                        data={dietasFiltradas}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <CardDieta
                                dieta={item}
                                onPress={(dieta) => {
                                    adicionarDieta(dieta)

                                    console.log(
                                        'Dieta selecionada:',
                                        dieta.nome
                                    )
                                }}
                            />
                        )}
                        ListEmptyComponent={
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>
                                    Nenhuma dieta encontrada.
                                </Text>
                            </View>
                        }
                    />
                </>
            )}

            {/* ABA MINHAS DIETAS */}
            {menuSelecionado === 'minhas' && (
                <FlatList
                    data={minhasDietas}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <CardDieta
                            dieta={item}
                            onPress={(dieta) => {
                                console.log(
                                    'Minha dieta:',
                                    dieta.nome
                                )
                            }}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>
                                Você ainda não possui dietas.
                            </Text>
                        </View>
                    }
                />
            )}

            {/* ABA CRIAR */}
            {menuSelecionado === 'criar' && (
                <View style={styles.criarContainer}>
                    <Text style={styles.criarTitle}>
                        Criar nova dieta
                    </Text>

                    <Text style={styles.criarSubtitle}>
                        Monte uma dieta personalizada para seus
                        objetivos.
                    </Text>

                    <TextInput
                        placeholder="Nome da dieta"
                        placeholderTextColor="#636366"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Objetivo"
                        placeholderTextColor="#636366"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Calorias diárias"
                        placeholderTextColor="#636366"
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            console.log(
                                'Criar dieta clicado'
                            )
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Criar dieta
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

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
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2e',
    },

    menuItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },

    menuItemAtivo: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff',
    },

    menuText: {
        color: '#636366',
        fontSize: 14,
        fontWeight: '500',
    },

    menuTextAtivo: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

    /* BUSCA */

    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },

    search: {
        height: 40,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        paddingHorizontal: 14,
        color: '#ffffff',
        fontSize: 15,
    },

    /* LISTA */

    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 30,
    },

    /* CARD */

    card: {
        flexDirection: 'row',
        backgroundColor: '#1c1c1e',
        borderRadius: 14,
        marginBottom: 12,
        overflow: 'hidden',
        minHeight: 130,
    },

    cardIndicator: {
        width: 5,
    },

    cardContent: {
        flex: 1,
        padding: 16,
    },

    cardTitle: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    objective: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 4,
    },

    infoContainer: {
        flexDirection: 'row',
        gap: 35,
        marginTop: 16,
    },

    infoLabel: {
        color: '#636366',
        fontSize: 11,
    },

    infoValue: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
    },

    arrow: {
        color: '#636366',
        fontSize: 28,
        alignSelf: 'center',
        marginRight: 15,
    },

    /* VAZIO */

    empty: {
        alignItems: 'center',
        paddingTop: 40,
    },

    emptyText: {
        color: '#8e8e93',
        fontSize: 14,
    },

    /* CRIAR */

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