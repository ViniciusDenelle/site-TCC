import { createContext, useContext, useState } from "react";

const TemaContexto = createContext('')

export function TemaContextoProvider({children})
{
    const [tema, setTema] = useState(localStorage.getItem('tema'))
    document.documentElement.dataset.theme = tema

    function alterarTema(ev)
    {
        let temaFinal = !ev.target.value ? (tema === 'dark' ? '' : 'dark') : ev.target.value;

        document.documentElement.dataset.theme = temaFinal
        setTema(temaFinal)
        localStorage.setItem('tema', temaFinal)
    
    }

    return (
        <TemaContexto.Provider value={[tema, alterarTema]}>
            {children}
        </TemaContexto.Provider>
    )
} 

export default TemaContexto;