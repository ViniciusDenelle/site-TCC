import { Dispatch, SetStateAction } from "react"

export type useTreinoFormProps = {
    nome: string
    setNome: Dispatch<SetStateAction<string>>
    descricao: string
    setDescricao: Dispatch<SetStateAction<string>>
}