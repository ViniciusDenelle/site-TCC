export interface AlimentoFormulario {
  id: string
  nome: string
  quantidade: string
  calorias: number | ''
  proteinas: number | ''
  carboidratos: number | ''
  gorduras: number | ''
}

export interface RefeicaoFormulario {
  id: string
  nome: string
  horario: string
  alimentos: AlimentoFormulario[]
}

export interface DiaSemana {
  id: string
  label: string
  short: string
}