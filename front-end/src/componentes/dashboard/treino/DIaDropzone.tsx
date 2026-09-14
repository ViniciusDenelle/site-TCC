import { X } from "lucide-react";
import Texto from "../../organizacao/Texto";
import { useDroppable } from "@dnd-kit/core";

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
    const { setNodeRef, isOver } = useDroppable({ id: `dia-${dia}`, data: { dia } });

    return (
        <div
            ref={setNodeRef}
            className={`flex items-center justify-between gap-2 rounded-lg px-2 py-2 border-2 border-dashed transition-colors
                ${isOver ? 'border-primaria bg-primaria/10' : 'border-base-terciaria/40'}`}
        >
            <div className="">

                <Texto tipo="subtexto" className="w-20 shrink-0">
                    {label}
                </Texto>

                    <Texto tipo="subtexto" className="opacity-50 text-xs">
                        {divisaoNome ?? `descanso`}
                    </Texto>
            </div>

            {treinoNome ? (
                <div className="flex flex-col flex-1 bg-base-secundaria rounded-lg px-2 py-1">
                    <div className="flex items-center justify-between">
                        <Texto tipo="subtexto">{treinoNome}</Texto>
                        <button onClick={onLimpar}>
                            <X className="size-3 opacity-60" />
                        </button>
                    </div>

                </div>
            ) : (
                <Texto tipo="subtexto" className="opacity-40 flex-1">Descanso</Texto>
            )}
        </div>
    );
}

export default DiaDropzone