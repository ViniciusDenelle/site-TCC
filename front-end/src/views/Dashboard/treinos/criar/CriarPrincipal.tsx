import { Clipboard, Dumbbell, LucideIcon, Weight } from "lucide-react"
import CardHorizontal from "../../../../componentes/CardHorizontal"
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone"
import Texto from "../../../../componentes/organizacao/Texto"
import { Link, NavLink } from "react-router-dom"

const CriarPrincipal = () => {

    const Links = [
        {
            to: '/dashboard/treino/criarExercicio',
            legenda: 'Criar Exercicio',
            icone: Dumbbell,
            texto: `
                Inventar movimentos seguros exige atenção à biomecânica para criar variações estimulantes.
            `
        },
        {
            to: '/dashboard/treino/criarTreino',
            legenda: 'Criar Treino',
            icone: Weight,
            texto: `
                Montar rotinas estruturando ordem e cargas gera resultados e evita estagnação.
            `
        },
        {
            to: '/dashboard/treino/criarFicha',
            legenda: 'Criar Ficha',
            icone: Clipboard,
            texto: `
                Desenhar o documento organiza o uso diário e facilita registrar o progresso.
            `
        }
    ]

    return (
        <div className="height-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col gap-5 items-center h-full">

                    {Links.map(({to, legenda, texto, icone:Icone}) => (
                        <NavLink to={to} className='cursor-pointer w-full group'>
                            <CardHorizontal className="group-hover:bg-base-secundaria/80 p-5">
                                <div className="flex gap-4 items-center">
                                    <div className="">
                                        <WrapperIcone tamanho="xl">
                                            <div className="size-full scale-115 p-2 rounded-lg bg-base-terciaria">
                                                <Icone className="size-full text-destaque-p-escuro/80"/>
                                            </div>
                                        </WrapperIcone>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Texto tipo="titulo">
                                            {legenda}
                                        </Texto>
                                        <Texto tipo="subtexto" className="text-t-terciaria/80 line-clamp-3">
                                            {texto}
                                        </Texto>
                                    </div>
                                </div>
                            </CardHorizontal>
                        </NavLink>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default CriarPrincipal