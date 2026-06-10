import api from "@/api"
import { useQuery } from "@tanstack/react-query"

export type RetornoUsuario = {
  nome: string
  email: string
  senha: string
  genero: string
  peso: number
  tipo_peso: "kilos" | "libras"
  peso_ideal: number
  altura: number
  data_de_nascimento: string
  nivel_atividade: number | null
  objetivo: string
  experiencia: string
  calDiaria: number
  veloPerda: number
  idade: number
  TMB: number
  GET: number
}

const useFetchUsuario = () => {
  const {
    data: usuario,
    isSuccess,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["usuario"],
    queryFn: async () => {
      const { data } = await api.get<RetornoUsuario>("/usuario")
      return data
    },
  })

  return {
    usuario,
    isSuccess,
    isError,
    isPending,
  }
}

export default useFetchUsuario