import BotaoPrimario from "@/componentes/BotaoPrimario"
import CadastroLayout from "@/componentes/layouts/CadastroLayout"
import Texto from "@/componentes/Texto"
import useCadastro from "@/logicas/cadastro/useCadastro"
import useConfirmacao from "@/logicas/useConfirmacao"

const confirmacao = () => {

    const {
        emailMutation,
        dados
    } = useCadastro()

    const {
        enviarEmailHandler,
        isSuccess,
        isLoading: isPending,
        isError,
        contagem,
        erros
    } = useConfirmacao(emailMutation, {
        email: dados.email,
        tipo: 'cadastro'
    })

    return (
        <CadastroLayout>

            (isSuccess && (
                <Texto>
                    email enviado com sucesso
                </Texto>

            ))
            <BotaoPrimario
                onPress={enviarEmailHandler}
            >
                enviar email
            </BotaoPrimario>
        </CadastroLayout>
    )
}

export default confirmacao