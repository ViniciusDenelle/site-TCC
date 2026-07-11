import { useEffect, useState } from 'react';

const useDebounce = <T>(valor : T, delay = 300) : T => {
    const [valorDebounce, setValorDebounce] = useState(valor);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValorDebounce(valor);
        }, delay);

        return () => clearTimeout(timeout);
    }, [valor, delay]);

    return valorDebounce;
};

export default useDebounce;