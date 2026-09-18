import React, { useState } from 'react'
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native'

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
			<Text style={s.label}>Nome da dieta</Text>
			<TextInput
				value={nome}
				onChangeText={setNome}
				placeholder="Ex: Bulking Limpo"
				placeholderTextColor="#636366"
				style={s.input}
			/>

			<Text style={s.label}>Objetivo</Text>
			<TextInput
				value={objetivo}
				onChangeText={setObjetivo}
				placeholder="Ex: Ganho de massa"
				placeholderTextColor="#636366"
				style={s.input}
			/>

			<View style={s.row}>
				<View style={{ flex: 1, marginRight: 8 }}>
					<Text style={s.label}>Calorias diárias</Text>
					<TextInput
						value={calorias}
						onChangeText={setCalorias}
						placeholder="2240"
						placeholderTextColor="#636366"
						keyboardType="numeric"
						style={s.input}
					/>
				</View>

				<View style={{ width: 120 }}>
					<Text style={s.label}>Nível</Text>
					<View style={s.pickerRow}>
						{niveis.map((n) => {
							const ativo = n === nivel
							return (
								<TouchableOpacity
									key={n}
									onPress={() => setNivel(n)}
									style={[s.nivelBtn, ativo && s.nivelBtnAtivo]}
								>
									<Text style={[s.nivelText, ativo && s.nivelTextAtivo]}>
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
					<Text style={s.label}>Duração</Text>
					<TextInput
						value={duracao}
						onChangeText={setDuracao}
						placeholder="Ex: 8 sem"
						placeholderTextColor="#636366"
						style={s.input}
					/>
				</View>

				<View style={{ width: 120 }}>
					<Text style={s.label}>Refeições</Text>
					<View style={s.countRow}>
						<TouchableOpacity
							onPress={() => setRefeicoesCount((c) => Math.max(1, c - 1))}
							style={s.countBtn}
						>
							<Text style={s.countText}>−</Text>
						</TouchableOpacity>

						<Text style={s.countValue}>{refeicoesCount}</Text>

						<TouchableOpacity
							onPress={() => setRefeicoesCount((c) => c + 1)}
							style={s.countBtn}
						>
							<Text style={s.countText}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<Text style={[s.label, { marginTop: 8 }]}>Refeições (lista)</Text>
			{meals.length === 0 ? (
				<Text style={s.hint}>Adicione itens para compor as refeições</Text>
			) : (
				<FlatList
					data={meals}
					keyExtractor={(_, i) => String(i)}
					renderItem={({ item, index }) => (
						<View style={s.mealRow}>
							<Text style={s.mealText}>{item}</Text>
							<TouchableOpacity onPress={() => removerRefeicao(index)}>
								<Text style={s.remove}>×</Text>
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
					placeholderTextColor="#636366"
					style={[s.input, { flex: 1 }]}
					onSubmitEditing={adicionarRefeicao}
				/>
				<TouchableOpacity style={s.addBtn} onPress={adicionarRefeicao}>
					<Text style={s.addBtnText}>+ Add</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={s.submitBtn} onPress={submit}>
				<Text style={s.submitText}>Criar dieta</Text>
			</TouchableOpacity>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		paddingVertical: 12,
	},
	label: {
		color: '#8e8e93',
		fontSize: 12,
		marginBottom: 6,
		fontWeight: '600',
	},
	input: {
		height: 44,
		backgroundColor: '#1c1c1e',
		borderRadius: 10,
		paddingHorizontal: 12,
		color: '#ffffff',
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
		backgroundColor: '#121214',
		borderRadius: 8,
		marginRight: 6,
	},
	nivelBtnAtivo: {
		backgroundColor: '#ff5b6d',
	},
	nivelText: { color: '#c7c7cc', fontSize: 12, fontWeight: '600' },
	nivelTextAtivo: { color: '#fff' },
	countRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#121214',
		borderRadius: 8,
		padding: 6,
	},
	countBtn: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		backgroundColor: '#1c1c1e',
		borderRadius: 6,
	},
	countText: { color: '#fff', fontSize: 16, fontWeight: '700' },
	countValue: { color: '#fff', fontSize: 15, fontWeight: '700' },
	mealRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#1c1c1e',
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		marginBottom: 8,
	},
	mealText: { color: '#fff' },
	remove: { color: '#8e8e93', fontSize: 18 },
	addMealRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	addBtn: {
		marginLeft: 8,
		backgroundColor: '#3a1f22',
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 14,
	},
	addBtnText: { color: '#ff5b6d', fontWeight: '700' },
	submitBtn: {
		height: 48,
		backgroundColor: '#ff5b6d',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
	},
	submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },
	hint: { color: '#8e8e93', marginBottom: 8 },
})
