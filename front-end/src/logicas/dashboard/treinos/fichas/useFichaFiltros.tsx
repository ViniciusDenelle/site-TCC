// logicas/dashboard/treinos/fichas/useFiltrosFicha.ts
import { useState } from 'react';

const useFiltrosFicha = () => {
    const [pesquisa, setPesquisa] = useState('');

    return { pesquisa, setPesquisa };
};

export default useFiltrosFicha;