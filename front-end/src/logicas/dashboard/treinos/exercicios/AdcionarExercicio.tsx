import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../../../../api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useAdcionarExercicio = (id:number|string) => {

    const navigate = useNavigate()

    const {
        mutate: AdcionarExercicio,
        isSuccess,
        isError,
        isPending
    } = useMutation({
        mutationFn: async () => {
            const res = await api.post(`dashboard/treinos/exercicio/adcionar/${id}`)
            return res.data
        }, onSuccess: () => {
            toast.success('exercicio adcionado com sucesso')
            navigate('/dashboard/treino/meusTreinos')
        }
    })

    return {
        AdcionarExercicio,
        isSuccess,
        isError,
        isPending
    }

}

export default useAdcionarExercicio