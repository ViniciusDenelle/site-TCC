import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../api"
import toast from "react-hot-toast"
import { ReqUsuarioProps } from "../cadastro/useCadastro"

const useUpdateUsuario = () => {
  const queryClient = useQueryClient()

  const {
    mutate: atualizarUsuario,
    isPending,
    isError,
    isSuccess,
    error
  } = useMutation({
    mutationFn: (dados: ReqUsuarioProps) => api.put('atualizarUsuario', dados),
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!')
      // Invalida a query 'usuario' para recarregar os dados novos automaticamente
      queryClient.invalidateQueries({ queryKey: ['usuario'] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Erro ao atualizar perfil')
    }
  })

  return {
    atualizarUsuario,
    isPending,
    isError,
    isSuccess,
    error
  }
}

export default useUpdateUsuario