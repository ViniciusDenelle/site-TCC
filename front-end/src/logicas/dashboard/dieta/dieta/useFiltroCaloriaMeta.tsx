// logicas/dashboard/dietas/useFiltroCaloriasMeta.ts
import { useState } from 'react';

function useFiltroCaloriasMeta(caloriasMetaUsuario?: number) {
    const [ativo, setAtivo] = useState(false);
    const [tolerancia, setTolerancia] = useState(200); // kcal de margem, ajustável

    function params() {
        if (!ativo || !caloriasMetaUsuario) return {};

        return {
            calorias_meta: caloriasMetaUsuario,
            tolerancia_kcal: tolerancia,
        };
    }

    return { ativo, setAtivo, tolerancia, setTolerancia, params };
}

export default useFiltroCaloriasMeta;