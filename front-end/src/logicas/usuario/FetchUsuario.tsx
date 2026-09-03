
import { useQuery } from "@tanstack/react-query"
import api from "../../api"
import { useEffect } from "react"

export type RetornoUsuario = {
  nome: string
  email: string
  senha?: string
  genero: string
  peso: number
  tipoPeso: 'kilos' | 'libras'
  pesoIdeal: number
  altura: number
  dataDeNascimento: string
  nivelDeAtividade: string | number | null
  objetivo: string
  experiencia: string
  caloriasDiarias: number
  veloPerda: string | number
  idade: number
  TMB: number
  GET: number
}

const useFetchUsuario = () => {

    const {
        data: dadosUsuario,
        isSuccess,
        isError,
        isPending
    } = useQuery<RetornoUsuario>({
        queryKey: ['usuario'],
        queryFn: async () => {
            const res = await api.get('/usuario')
            return res.data.data.data
        },
        initialData: () => {
            const salvo = localStorage.getItem('usuario')
            
            return salvo
                ? JSON.parse(salvo)
                : undefined
        },
        staleTime: 1000 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (dadosUsuario) {
            localStorage.setItem(
                'usuario',
                JSON.stringify(dadosUsuario)
            )
        }
    }, [dadosUsuario])

    return {
        dadosUsuario,
        isSuccess,
        isError,
        isPending
    }
}

export default useFetchUsuario