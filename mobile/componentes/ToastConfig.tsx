import { CheckCircle, XCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import Texto from "./Texto";
import { vars } from "nativewind";
import useTema from "@/contextos/TemaContexto";

type textos ={
    text1?: string,
    text2?: string
}


export const toastConfig = {
    success: ({text1, text2} : textos) => {
        const {temaAtual} = useTema()

        return (
            <View style={vars(temaAtual)} className="rounded-lg bg-base-secundaria flex flex-row gap-2 p-2">
                <CheckCircle color={'rgb(88, 222, 46)'} />
                <View className="flex-col gap-1">
                    <Texto>
                        {text1}
                    </Texto>
                    {text2 && (
                        <Texto variante="legenda">
                            {text1}
                        </Texto>
                    )}
                </View>
            </View>
        )
    },
    error: ({text1, text2} : textos) => {
        const {temaAtual} = useTema()

        return (
            <View style={vars(temaAtual)} className="rounded-lg bg-base-secundaria flex flex-row gap-2 p-2">
                <XCircle color={'rgb(230, 34, 0)'} />
                <View className="flex-col gap-1">
                    <Texto>
                        {text1}
                    </Texto>
                    {text2 && (
                        <Texto variante="legenda">
                            {text1}
                        </Texto>
                    )}
                </View>
            </View>
        )
    },
}