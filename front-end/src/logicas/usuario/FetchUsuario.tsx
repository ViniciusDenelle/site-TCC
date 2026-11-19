
import { useQuery } from "@tanstack/react-query"
import api from "../../api"
import { useEffect } from "react"

export type RetornoUsuario = {
    id: number
  nome: string
  email: string
  senha?: string
  genero: string
  peso: number
  tipoPeso: 'kilos' | 'libras'
  pesoIdeal: number
  pesoMinimo?: number | null
  pesoMaximo?: number | null
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
  comeco?: string | null
  termino?: string | null
  duracao?: string | null
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
            return res.data.data
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
    
    console.log('dadosUsuario', dadosUsuario)

    return {
        dadosUsuario,
        isSuccess,
        isError,
        isPending
    }
}

export default useFetchUsuario