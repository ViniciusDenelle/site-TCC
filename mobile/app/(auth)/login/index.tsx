import { View, Text, Image } from "react-native";
import { vars } from "nativewind";
import { useState } from "react";
import { router } from "expo-router";

import useTema from "../../../contextos/TemaContexto";
import InputSimples from "../../../componentes/InputSimples";
import BotaoPrimario from "../../../componentes/BotaoPrimario";
import LinkSimples from "../../../componentes/LinkSimples";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
WebBrowser.maybeCompleteAuthSession()

export default function Login() {
   const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '475207158467-0jte55h3ilb2rlloiev634kdsj8oano6.apps.googleusercontent.com'
})
    const { temaAtual } = useTema();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function entrar() {
        console.log({
            email,
            senha
        })

        router.push('/')
    }

    return (
        <View
            style={vars(temaAtual)}
            className="flex-1 bg-base-primaria justify-center items-center px-4"
        >

            <View
                className="w-full max-w-[420px] 
                bg-base-secundaria rounded-3xl 
                p-6 gap-4"
            >

                <View className="items-center gap-2 mb-2">

                    <View
                        className="w-20 h-20 rounded-full 
                        bg-base-terciaria items-center justify-center"
                    >
                        <Text
                            className="text-2xl 
                            font-poppins-bold text-t-primaria"
                        >
                            FF
                        </Text>
                    </View>

                    <Text
                        className="text-3xl text-t-primaria 
                        font-poppins-bold"
                    >
                        Fit Forge
                    </Text>

                    <Text
                        className="text-sm text-t-secundaria 
                        font-poppins text-center"
                    >
                        Transforme seu corpo. Evolua sua mente.
                    </Text>

                </View>

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

                <BotaoPrimario
                    tipo="cheio"
                    onPress={entrar}
                >
                    Entrar
                </BotaoPrimario>

                <BotaoPrimario
                    tipo="cheio"
                    onPress={() => promptAsync()}
                >
                    Entrar com Google
                </BotaoPrimario>

                <View
                    className="flex flex-row 
                    justify-center items-center gap-1"
                >

                    <Text
                        className="text-t-secundaria 
                        font-poppins"
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