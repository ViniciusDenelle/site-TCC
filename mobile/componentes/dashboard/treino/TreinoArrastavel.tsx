import Texto from "../../organizacao/Texto";
import { Pressable, View } from 'react-native'

const TreinoArrastavel = ({ 
    id, 
    nome, 
    idDivisao 
}: { 
    id: number; 
    nome: string; 
    idDivisao: string 
}) => {

    return (
        <Pressable className="flex-row items-center justify-between bg-base-terciaria rounded-lg px-2 py-2">
            <View>
                <Texto tipo="subtexto">{nome}</Texto>
            </View>
        </Pressable>
    );
}

export default TreinoArrastavel