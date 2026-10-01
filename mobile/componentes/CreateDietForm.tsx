import React, { useState } from 'react'
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native'
import useTema from '@/contextos/TemaContexto'

type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos'

export type DietaPronta = {
	id: string
	emoji: string
	nome: string
	objetivo: string
	refeicoes: number
	duracao: string
	nivel: Nivel
}

export default function CreateDietForm({
	onCreate,
}: {
	onCreate: (d: DietaPronta) => void
}) {
	const { temaAtual, formatarCor } = useTema()

	const cores = {
		inputBg: formatarCor(temaAtual['--color-base-secundaria'], 1),
		inputBtnBg: formatarCor(temaAtual['--color-base-terciaria'], 1),
		texto: formatarCor(temaAtual['--color-t-primaria'], 1),
		textoSecundario: formatarCor(temaAtual['--color-t-secundaria'], 1),
		destaque: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
		destaqueEscuro: formatarCor(temaAtual['--color-destaque-p-escuro'], 1),
		base: formatarCor(temaAtual['--color-base-terciaria'], 1),
	}

	const [nome, setNome] = useState('')
	const [objetivo, setObjetivo] = useState('')
	const [calorias, setCalorias] = useState('')
	const [nivel, setNivel] = useState<Nivel>('Iniciante')
	const [duracao, setDuracao] = useState('4 sem')
	const [refeicoesCount, setRefeicoesCount] = useState(3)
	const [meals, setMeals] = useState<string[]>([])
	const [novoMeal, setNovoMeal] = useState('')

	const niveis: Nivel[] = ['Iniciante', 'Intermediário', 'Avançado', 'Todos']

	const adicionarRefeicao = () => {
		const v = novoMeal.trim()
		if (!v) return
		setMeals((p) => [...p, v])
		setNovoMeal('')
		setRefeicoesCount((c) => Math.max(c, meals.length + 1))
	}

	const removerRefeicao = (idx: number) =>
		setMeals((p) => p.filter((_, i) => i !== idx))

	const validar = () => {
		if (!nome.trim()) return 'Nome é obrigatório'
		if (!objetivo.trim()) return 'Objetivo é obrigatório'
		if (Number(calorias) <= 0 || !calorias.trim())
			return 'Calorias diárias válidas são necessárias'
		return null
	}

	const submit = () => {
		const err = validar()
		if (err) {
			console.warn('Validation:', err)
			return
		}

		const nova: DietaPronta = {
			id: String(Date.now()),
			emoji: '🥗',
			nome: nome.trim(),
			objetivo: objetivo.trim(),
			refeicoes: refeicoesCount,
			duracao: duracao.trim() || 'Contínuo',
			nivel,
		}

		onCreate(nova)

		// reset
		setNome('')
		setObjetivo('')
		setCalorias('')
		setNivel('Iniciante')
		setDuracao('4 sem')
		setRefeicoesCount(3)
		setMeals([])
		setNovoMeal('')
	}

	return (
		<View style={s.container}>
			<Text style={[s.label, { color: cores.textoSecundario }]}>Nome da dieta</Text>
			<TextInput
				value={nome}
				onChangeText={setNome}
				placeholder="Ex: Bulking Limpo"
				placeholderTextColor={cores.textoSecundario}
				style={[s.input, { backgroundColor: cores.inputBg, color: cores.texto }]}
			/>

			<Text style={[s.label, { color: cores.textoSecundario }]}>Objetivo</Text>
			<TextInput
				value={objetivo}
				onChangeText={setObjetivo}
				placeholder="Ex: Ganho de massa"
				placeholderTextColor={cores.textoSecundario}
				style={[s.input, { backgroundColor: cores.inputBg, color: cores.texto }]}
			/>

			<View style={s.row}>
				<View style={{ flex: 1, marginRight: 8 }}>
					<Text style={[s.label, { color: cores.textoSecundario }]}>Calorias diárias</Text>
					<TextInput
						value={calorias}
						onChangeText={setCalorias}
						placeholder="2240"
						placeholderTextColor={cores.textoSecundario}
						keyboardType="numeric"
						style={[s.input, { backgroundColor: cores.inputBg, color: cores.texto }]}
					/>
				</View>

				<View style={{ width: 120 }}>
					<Text style={[s.label, { color: cores.textoSecundario }]}>Nível</Text>
					<View style={s.pickerRow}>
						{niveis.map((n) => {
							const ativo = n === nivel
							return (
								<TouchableOpacity
									key={n}
									onPress={() => setNivel(n)}
									style={[
										s.nivelBtn,
										{
											backgroundColor: cores.base,
										},
										ativo && {
											backgroundColor: cores.destaque,
										},
									]}
								>
									<Text
										style={[
											s.nivelText,
											{ color: cores.textoSecundario },
											ativo && {
												color: cores.texto,
												fontWeight: 'bold',
											},
										]}
									>
										{n.split(' ')[0]}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				</View>
			</View>

			<View style={s.row}>
				<View style={{ flex: 1, marginRight: 8 }}>
					<Text style={[s.label, { color: cores.textoSecundario }]}>Duração</Text>
					<TextInput
						value={duracao}
						onChangeText={setDuracao}
						placeholder="Ex: 8 sem"
						placeholderTextColor={cores.textoSecundario}
						style={[s.input, { backgroundColor: cores.inputBg, color: cores.texto }]}
					/>
				</View>

				<View style={{ width: 120 }}>
					<Text style={[s.label, { color: cores.textoSecundario }]}>Refeições</Text>
					<View
						style={[
							s.countRow,
							{
								backgroundColor: cores.base,
							},
						]}
					>
						<TouchableOpacity
							onPress={() => setRefeicoesCount((c) => Math.max(1, c - 1))}
							style={[s.countBtn, { backgroundColor: cores.inputBg }]}
						>
							<Text style={[s.countText, { color: cores.texto }]}>−</Text>
						</TouchableOpacity>

						<Text style={[s.countValue, { color: cores.texto }]}>
							{refeicoesCount}
						</Text>

						<TouchableOpacity
							onPress={() => setRefeicoesCount((c) => c + 1)}
							style={[s.countBtn, { backgroundColor: cores.inputBg }]}
						>
							<Text style={[s.countText, { color: cores.texto }]}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<Text style={[s.label, { marginTop: 8, color: cores.textoSecundario }]}>
				Refeições (lista)
			</Text>
			{meals.length === 0 ? (
				<Text style={[s.hint, { color: cores.textoSecundario }]}>
					Adicione itens para compor as refeições
				</Text>
			) : (
				<FlatList
					data={meals}
					keyExtractor={(_, i) => String(i)}
					renderItem={({ item, index }) => (
						<View
							style={[
								s.mealRow,
								{
									backgroundColor: cores.inputBg,
								},
							]}
						>
							<Text style={[s.mealText, { color: cores.texto }]}>
								{item}
							</Text>
							<TouchableOpacity onPress={() => removerRefeicao(index)}>
								<Text
									style={[
										s.remove,
										{ color: cores.textoSecundario },
									]}
								>
									×
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			)}

			<View style={s.addMealRow}>
				<TextInput
					value={novoMeal}
					onChangeText={setNovoMeal}
					placeholder="Adicionar refeição (ex: Café da manhã)"
					placeholderTextColor={cores.textoSecundario}
					style={[
						s.input,
						{
							flex: 1,
							backgroundColor: cores.inputBg,
							color: cores.texto,
						},
					]}
					onSubmitEditing={adicionarRefeicao}
				/>
				<TouchableOpacity
					style={[s.addBtn, { backgroundColor: cores.base }]}
					onPress={adicionarRefeicao}
				>
					<Text style={[s.addBtnText, { color: cores.destaque }]}>
						+ Add
					</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={[s.submitBtn, { backgroundColor: cores.destaque }]}
				onPress={submit}
			>
				<Text style={[s.submitText, { color: cores.texto }]}>
					Criar dieta
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		paddingVertical: 12,
	},
	label: {
		fontSize: 12,
		marginBottom: 6,
		fontWeight: '600',
	},
	input: {
		height: 44,
		borderRadius: 10,
		paddingHorizontal: 12,
		fontSize: 14,
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pickerRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 6,
	},
	nivelBtn: {
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderRadius: 8,
		marginRight: 6,
	},
	nivelText: {
		fontSize: 12,
		fontWeight: '600',
	},
	countRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		padding: 6,
	},
	countBtn: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 6,
	},
	countText: {
		fontSize: 16,
		fontWeight: '700',
	},
	countValue: {
		fontSize: 15,
		fontWeight: '700',
	},
	mealRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		marginBottom: 8,
	},
	mealText: {},
	remove: {
		fontSize: 18,
	},
	addMealRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	addBtn: {
		marginLeft: 8,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 14,
	},
	addBtnText: {
		fontWeight: '700',
	},
	submitBtn: {
		height: 48,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
	},
	submitText: {
		fontWeight: '700',
		fontSize: 15,
	},
	hint: {
		marginBottom: 8,
	},
})
