export const segundosParaMinutos = (segundos: number) => {
  const minutos = Math.floor(segundos / 60)
  const restante = segundos % 60

  return `${String(minutos).padStart(2, '0')}:${String(restante).padStart(2, '0')}`
}

export default segundosParaMinutos