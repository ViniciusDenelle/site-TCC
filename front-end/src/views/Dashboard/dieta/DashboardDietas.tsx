import { useNavigate } from 'react-router-dom'

import { DietaCard } from '../../../componentes/dieta/DIetaCard'
import Texto from '../../../componentes/organizacao/Texto'

import dietasMock from '../../../logicas/dashboard/dieta/DietaMock'
import useFetchDietas from '../../../logicas/dashboard/dieta/FetchDietas'
import { useState } from 'react'

const imagensDietas: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
    '2': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    '3': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    '4': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600',
}

export default function DashboardDietas() {

    const navigate = useNavigate()

    const [pagina, setPagina] = useState<number>(1)

    const {
        dietas
    } = useFetchDietas(pagina)
    console.log(dietas)

    return (
        <div className="w-full font-poppins">

            {/* CABEÇALHO */}
            <div className="mb-6 flex flex-col gap-1">

                <Texto
                    tipo="subtitulo"
                    className="!text-xl sm:!text-2xl text-t-primaria"
                >
                    Planos de Dieta
                </Texto>

                <Texto
                    tipo="subtexto"
                    className="text-t-terciaria"
                >
                    Escolha um plano ideal para o seu objetivo
                </Texto>

            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

                {dietas?.data?.map((dieta) => (

                    <DietaCard
                        key={dieta.id}

                        dieta={dieta}
                    />

                ))}

            </div>

        </div>
    )
}