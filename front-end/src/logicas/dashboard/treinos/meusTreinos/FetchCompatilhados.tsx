import { useQuery } from "@tanstack/react-query"
import api from "../../../../api"

const useFetchCompartilhados = () => {

    const {
        data: 
    } = useQuery({
        queryKey: ['meusTreinosCompatilhados'],
        queryFn: async () => {
            const res = await api.get('')
            return res.data
        }
    })

}