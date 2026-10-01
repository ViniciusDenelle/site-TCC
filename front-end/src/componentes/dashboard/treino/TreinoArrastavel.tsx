import { useDraggable } from "@dnd-kit/core";
import Texto from "../../organizacao/Texto";

const TreinoArrastavel = ({ 
    id, 
    nome, 
    idDivisao 
}: { 
    id: number; 
    nome: string; 
    idDivisao: string 
}) => {
    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        isDragging 
    } = useDraggable({
        id: `treino-${idDivisao}-${id}`, // único por (divisão, treino), não só por treino
        data: { treinoId: id, nome },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
                opacity: isDragging ? 0.4 : 1,
                touchAction: 'none',
            }}
            className="flex items-center justify-between bg-base-terciaria rounded-lg px-2 py-1 cursor-grab active:cursor-grabbing"
        >
            <Texto tipo="subtexto">{nome}</Texto>
        </div>
    );
}

export default TreinoArrastavel