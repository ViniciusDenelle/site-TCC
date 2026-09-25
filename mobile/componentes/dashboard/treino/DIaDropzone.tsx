import { X } from "lucide-react-native";
import Texto from "../../organizacao/Texto";
import { Pressable, View } from "react-native";

const DiaDropzone = ({
    dia,
    label,
    treinoNome,
    divisaoNome,
    onLimpar,
}: {
    dia: string;
    label: string;
    treinoNome: string | null;
    divisaoNome: string | null;
    onLimpar: () => void;
}) => {

    return (
        <View className="flex-row items-center justify-between gap-2 rounded-lg px-2 py-2 border-2 border-dashed border-base-terciaria/40">
            <View className="">

                <Texto tipo="subtexto" className="w-20 shrink-0">
                    {label}
                </Texto>

                    <Texto tipo="subtexto" className="opacity-50 text-xs">
                        {divisaoNome ?? `descanso`}
                    </Texto>
            </View>

            {treinoNome ? (
                <View className="flex flex-col flex-1 bg-base-secundaria rounded-lg px-2 py-1">
                    <View className="flex-row items-center justify-between">
                        <Texto tipo="subtexto">{treinoNome}</Texto>
                        <Pressable onPress={onLimpar}>
                            <X className="size-3 opacity-60" />
                        </Pressable>
                    </View>

                </View>
            ) : (
                <Texto tipo="subtexto" className="opacity-40 flex-1">Descanso</Texto>
            )}
        </View>
    );
}

export default DiaDropzone