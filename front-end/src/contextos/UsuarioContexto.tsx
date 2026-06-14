
// import { createContext, ReactNode, useContext } from "react";
// import useFetchUsuario, { RetornoUsuario } from "../logicas/querys/FetchUsuario";


// type UsuarioProviderProps = {
//     children: ReactNode
// }

// const UsuarioContext = createContext<RetornoUsuario | null>(null)

// export const UsuarioProvider = ({
//     children
// } : UsuarioProviderProps) => {

//     const {
//         dadosUsuario,
//         isSuccess
//     } = useFetchUsuario()

//     return (
//         <UsuarioContext.Provider value={
            
//         }>
//             {children}
//         </UsuarioContext.Provider>
//     )
// }

// const useUsuarioContexto = () => {
//     const usuario = useContext(UsuarioContext);

//     return usuario;
// }

// export default useUsuarioContexto