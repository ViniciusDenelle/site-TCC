import { View, Text, Image } from "react-native";
import { vars } from "nativewind";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import useTema from "../../../contextos/TemaContexto";
import InputSimples from "../../../componentes/InputSimples";
import BotaoPrimario from "../../../componentes/BotaoPrimario";
import LinkSimples from "../../../componentes/LinkSimples";
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import Toast from "react-native-toast-message";
import useUsuario from "@/contextos/UsuarioContexto";
import { RespostaLogin } from "@/logicas/tipagens/UsuarioProps";
import { mensagemDeErro } from "@/logicas/auth/mensagemDeErro";


WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    const { temaAtual } = useTema();
    const { entrar } = useUsuario();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // LOGIN GOOGLE
    const redirectUri = AuthSession.makeRedirectUri();

    console.log(redirectUri);

    const [request, response, promptAsync] =
    Google.useAuthRequest({
        clientId:
            '336196057614-6sevla699fpvhcvcj45pjmh8avh48247.apps.googleusercontent.com',
    });

    // CAPTURA RESPOSTA LOGIN GOOGLE
    useEffect(() => {

        if (response?.type === "success") {

            const { authentication } = response;

            fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${authentication?.accessToken}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((user) => {

                    console.log("USUÁRIO GOOGLE:");
                    console.log(user);

                    /*
                        user.name
                        user.email
                        user.picture
                    */

                    // Mudado para substituir a rota e empurrar para as Abas
                    router.replace("/(tabs)");
                });
        }

    }, [response]);

    const loginMutation = useMutation({
    mutationFn: async ({ email, senha } : {email: string, senha: string}) => {
        const res = await api.post<RespostaLogin>('/login', {
            email,
            senha,
        })
        return res.data
    },
    onSuccess: async data => {
        // Guarda token + usuário (AsyncStorage) e libera as rotas protegidas
        await entrar(data.token, data.usuario)

        // Redireciona para as abas limpando o histórico para ele não voltar ao login com o botão "Voltar"
        router.replace("/(tabs)");
    },
    onError: error => {
        Toast.show({
            type: "error",
            text1: mensagemDeErro(error),
        });
    }
})

    function cadastro() {
        loginMutation.mutate({
            email,
            senha,
        })
    }

    return (

        <View
            style={vars(temaAtual)}
            className="flex-1 bg-base-primaria justify-center items-center px-4"
        >

            <View
                className="
                w-full max-w-[420px]
                bg-base-secundaria
                rounded-3xl
                p-6
                gap-4
            "
            >

                {/* LOGO */}
                <View className="items-center gap-2 mb-2">

                    <View
                        className="
                        w-20 h-20 rounded-full
                        bg-base-terciaria
                        items-center justify-center
                    "
                    >

                        <Text
                            className="
                            text-2xl
                            font-poppins-bold
                            text-t-primaria
                        "
                        >
                            FF
                        </Text>

                    </View>

                    <Text
                        className="
                        text-3xl
                        text-t-primaria
                        font-poppins-bold
                    "
                    >
                        Fit Forge
                    </Text>

                    <Text
                        className="
                        text-sm
                        text-t-secundaria
                        font-poppins
                        text-center
                    "
                    >
                        Transforme seu corpo. Evolua sua mente.
                    </Text>

                </View>

                {/* INPUTS */}
                <View className="gap-3">

                    <InputSimples
                        className="w-full"
                        valor={email}
                        onChange={setEmail}
                        placeholder="Digite seu email"
                    />

                    <InputSimples
                        className="w-full"
                        valor={senha}
                        onChange={setSenha}
                        placeholder="Digite sua senha"
                        senha
                    />

                </View>

                {/* BOTÃO LOGIN NORMAL */}
                <BotaoPrimario
                    tipo="cheio"
                    onPress={cadastro}
                >
                    Entrar
                </BotaoPrimario>

                {/* DIVISOR */}
                <View
                    className="
                    flex-row items-center gap-2
                "
                >

                    <View className="flex-1 h-[1px] bg-zinc-400" />

                    <Text
                        className="
                        text-t-secundaria
                        font-poppins
                    "
                    >
                        ou
                    </Text>

                    <View className="flex-1 h-[1px] bg-zinc-400" />

                </View>

                {/* LOGIN GOOGLE */}
                <BotaoPrimario
                    tipo="vazio"
                    onPress={() => promptAsync()}
                >

                    <View
                        className="
                        flex-row
                        items-center
                        justify-center
                        gap-3
                    "
                    >

                        <Image
                            source={{
                                uri:
                                    "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                            }}
                            style={{
                                width: 22,
                                height: 22,
                            }}
                        />

                        <Text
                            className="
                            text-t-primaria
                            font-poppins-bold
                        "
                        >
                            Entrar com Google
                        </Text>

                    </View>

                </BotaoPrimario>

                {/* CADASTRO */}
                <View
                    className="
                    flex-row
                    justify-center
                    items-center
                    gap-1
                "
                >

                    <Text
                        className="
                        text-t-secundaria
                        font-poppins
                    "
                    >
                        Não possui conta?
                    </Text>

                    <LinkSimples to="./cadastro">
                        Criar conta
                    </LinkSimples>

                </View>

            </View>

        </View>
    );
}