import { useState } from "react";
import { Badge } from "../logicas/dashboard/treinos/exercicios/FetchExercicio";
import Texto from "./organizacao/Texto";
import BotaoTerciario from "./botoes/BotaoTerciario";
import { Minus, Plus } from "lucide-react";

type Props = {
    titulo: string;
    itens: Badge[];
    isSelecionado: (id: number) => boolean;
    onToggle: (item: Badge) => void;
    limiteItems?: number;
    error?: string;
};

const SecaoBadges = ({
    titulo,
    itens,
    isSelecionado,
    onToggle,
    limiteItems,
    error
}: Props) => {

    const [expandido, setExpandido] = useState<boolean>(false)

    const itensVisiveis = (expandido || !limiteItems) ? itens : itens.slice(0, limiteItems)
    const itensRestantes = limiteItems ? itens.length - limiteItems : null

    return (
        <div>
            <Texto tipo="titulo" className="font-thin">
                {titulo}
            </Texto>
            <div className="grid grid-cols-2 gap-2">
                {itensVisiveis.map(item => (
                    <BotaoTerciario
                        key={item.id}
                        texto={item.nome}
                        classeAdicional={`p-1 bg-base-terciaria/80 rounded-lg ${isSelecionado(item.id) ? 'bg-base-secundaria' : ''}`}
                        onClick={() => onToggle(item)}
                        textoClassName={isSelecionado(item.id) ? 'text-destaque-p-escuro' : ''}
                    />
                ))}
            </div>
            {(limiteItems && itens.length > limiteItems) && (
                <BotaoTerciario
                    classeAdicional="flex items-center mx-auto"
                    onClick={() => setExpandido(prev => !prev)}
                    texto={`${expandido ? 'mostrar menos' : 'mostrar mais'} ${itensRestantes}`}
                    icone={expandido ? Minus : Plus}
                />
            )}
            {error && error.length > 0 && (
                <Texto tipo="subtexto" className="text-red-500">
                    *{error}
                </Texto>
            )}
        </div>
    );
}

export default SecaoBadges