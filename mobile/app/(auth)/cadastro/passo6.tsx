import BotaoPrimario from "@/componentes/BotaoPrimario"
import BotaoSecundario from "@/componentes/BotaoSecundario"
import InputSimples from "@/componentes/InputSimples"
import CadastroLayout from "@/componentes/layouts/CadastroLayout"
import Texto from "@/componentes/Texto"
import useCadastroContext from "@/contextos/CadastroContexto"
import useTema from "@/contextos/TemaContexto"
import useConfirmacao from "@/logicas/useConfirmacao"
import { Eye, EyeOff, Mail } from "lucide-react-native"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"

const confirmacao = () => {

    const {
        emailMutation,
        dados,
        mudarDados,
        podeSeguir,
        cadastroHandler,
        cadastrarMutation,
        errosCampo
    } = useCadastroContext()

    const {
        nome,
        senha,
        email,
        codigoConfirmacao
    } = dados

    const {
        enviarEmailHandler,
        isSuccess,
        isLoading,
        isError,
        contagem,
        erros
    } = useConfirmacao(emailMutation, {
        email: dados.email,
        tipo: 'cadastro'
    })

    function proximo()
    {
        cadastroHandler()
        if(cadastrarMutation.isSuccess){
            
        }
    }

    const [senhaVisivel, setSenhaVisivel] = useState(false)

    function mudarVisibilidadeSenha()
    {
        setSenhaVisivel(prev => !prev)
    }

    const {corIcone} = useTema()

    return (
        <CadastroLayout
            proximo={proximo}
            podeProximo={podeSeguir(6)}
        >

            <View className="flex flex-col gap-3">

                <Texto className="mx-auto text-lg">
                    suas credenciais
                </Texto>

                {/* botão google */}
                <BotaoPrimario >
                    <View className="flex flex-row items-center gap-2">
                        {/* aqui entraria o icone svg */}
                        <Texto>
                            google
                        </Texto>
                    </View>
                </BotaoPrimario>

                <Texto className="mx-auto">
                    ou
                </Texto>

                {/* nome */}
                <View className="flex flex-col gap-1">
                    <Texto>
                        nome:
                    </Texto>

                    <InputSimples
                        valor={nome}
                        onChange={valor => mudarDados('nome', valor)}
                        placeholder="seu nome"
                        maximo={30}
                        minimo={2}
                    />

                    {errosCampo['nome'] && (
                                <Text className="text-red-500 text-sm">
                                  {errosCampo['nome']}
                                </Text>
                              )}
                </View>

                {/* email */}
                <View className="flex flex-col gap-1">
                    <Texto>
                        email:
                    </Texto>

                    <InputSimples
                        valor={email}
                        onChange={valor => mudarDados('email', valor)}
                        placeholder="seu@email.com"
                        tipo="text"
                        maximo={40}
                        minimo={7}
                    />

                    {(erros['email'] || errosCampo['email']) && (
                        <Texto variante="legenda" className="text-red-500">
                            {erros['email']} {errosCampo['email']}
                        </Texto>
                    )}
                </View>

                {/* senha */}
                <View className="flex flex-col gap-1 relative">

                    <Texto>
                        senha:
                    </Texto>

                    <View className="relative">

                        <InputSimples
                            valor={senha}
                            onChange={valor => mudarDados('senha', valor)}
                            placeholder="minimo 4 caracteres"
                            tipo='text'
                            maximo={30}
                            minimo={4}
                            visivel={senhaVisivel}
                        />

                        <Pressable
                            onPress={mudarVisibilidadeSenha}
                            className="absolute right-3 top-3"
                        >
                            {senhaVisivel ? (
                                <Eye size={22}  color={corIcone} />
                            ) : (
                                <EyeOff size={22} color={corIcone} />
                            )}
                        </Pressable>

                    </View>

                    {errosCampo['senha'] && (
                                <Text className="text-red-500 text-sm">
                                  {errosCampo['senha']}
                                </Text>
                              )}

                </View>

                {/* codigo confirmação */}
                <View className="flex flex-col gap-2">

                    <Texto
                        className={!isSuccess ? 'opacity-70' : ''}
                    >
                        codigo de confirmação:
                    </Texto>

                    <InputSimples
                        valor={codigoConfirmacao}
                        onChange={valor =>
                            mudarDados('codigoConfirmacao', valor)
                        }
                        tipo="number"
                        abilitado={isSuccess || codigoConfirmacao !== ''}
                    />

                    <BotaoSecundario
                        tipo="cheio"
                        onPress={enviarEmailHandler}
                        disabled={contagem > 0}
                    >

                        {isLoading ? (
                            <Texto>
                                carregando...
                            </Texto>
                        ) : contagem > 0 ? (
                            <Texto>
                                reenviar em {contagem}s
                            </Texto>
                        ) : (
                            <View className="flex flex-row items-center gap-2">
                                <Text className="text-stone-200 font-poppins">
                                    enviar codigo
                                </Text>

                                <Mail 
                                    color={'rgb(226, 232, 240)'} 
                                    size={18} 
                                />
                            </View>
                        )}

                    </BotaoSecundario>

                </View>

            </View>

        </CadastroLayout>
    )
}

export default confirmacao