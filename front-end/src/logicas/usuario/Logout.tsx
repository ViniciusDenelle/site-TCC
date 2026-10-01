import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../api"

const useLogout = () => {
    const queryClient = useQueryClient()

    const {
        mutate: logout,
        isSuccess,
        isPending,
        isError
    } = useMutation({
        mutationFn: () => api.post('/logout'),
        onError: (error) => {
            console.log(error)
        },
        onSettled: (res) => {
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            queryClient.removeQueries({
                queryKey: ['usuario']
            })
            navigation.navigate('/login')
        }
    })

    return {
        logout,
        isSuccess,
        isError,
        isPending
    }
}

export default useLogout