import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { 
    Activity, 
    Cake, 
    CalendarClock, 
    Clock, 
    Flame, 
    Footprints, 
    GraduationCap, 
    HeartPulse, 
    Ruler, 
    Target, 
    Utensils, 
    VenusAndMars, 
    Weight, 
    WeightTilde 
} from 'lucide-react'
import CadastroContext from '../../../contextos/CadastroContexto'

const ExibirInfo = () => {
    const {dados} = useContext(CadastroContext)

    const {
        genero,
        peso,
        tipoPeso,
        pesoFinal,
        altura,
        idade,
        nivelAtividade,
        objetivo,
        experiencia,
        GET,
        calDiaria,
        tempo,
        veloPerda,
    } = dados

    let atividadeNome = ''

    switch (nivelAtividade) {
        case 1.2:
            atividadeNome = 'sedentario'
            break;
        case 1.375:
            atividadeNome = 'leve'
            break;
        case 1.55:
            atividadeNome = 'moderado'
            break;
        case 1.75:
            atividadeNome = 'intenso'
            break;
        default:
            break;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-2"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                suas informações
            </h2>

            <div className="flex flex-col gap-3 mb-2 text-sm">
                <div className="flex flex-col px-4 w-full rounded-lg 
                ring-2 ring-base-quaternaria bg-base-terciaria
                divide-y divide-contraste-primaria">

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <VenusAndMars/>
                            genero: 
                            <p className='text-t-primaria'>
                                {genero}
                            </p>
                        </h2>

                        <h2 className="flex gap-1">
                            <Cake/>
                            idade: 
                            <p className='text-t-primaria'>
                                {idade}
                            </p>
                        </h2>
                    </div>

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <Weight/>
                            peso: 
                            <p className='text-t-primaria'>
                                {peso}
                            </p>
                            {tipoPeso}
                        </h2>

                        <h2 className="flex gap-1">
                            <Ruler/>
                            altura: 
                            <p className='text-t-primaria'>
                                {altura}
                            </p>
                        </h2>
                    </div>

                </div>

                <div className="flex justify-center py-1 w-full rounded-lg 
                ring-2 ring-base-quaternaria bg-base-terciaria
                divide-x divide-contraste-primaria">

                    <div className="flex flex-col gap-1 px-5 w-full">
                        <h2 className="flex flex-col gap-1">
                            
                            atividade: 
                            <p className='text-t-primaria'>
                                <Activity/> {atividadeNome}
                            </p>
                        </h2>

                        <h2 className="flex flex-col gap-1">
                            
                            objetivo: 
                            <p className='text-t-primaria flex gap-1'>
                                <Target/> {objetivo.replace('_', ' ' )}
                            </p>
                        </h2>

                        <h2 className="flex flex-col gap-1">
                            
                            experiencia: 
                            <p className='text-t-primaria flex gap-1'>
                                <GraduationCap/> {experiencia}
                            </p>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-1 px-5 w-full">
                        <h2 className="flex flex-col gap-1">
                            
                            gasto calorico total: 
                            <p className='text-t-primaria flex gap-1'>
                                <Flame/> {GET} kcal
                            </p>
                            
                        </h2>

                        <h2 className="flex flex-col gap-1">
                            
                            calorias diarias: 
                            <p className='text-t-primaria flex gap-1'>
                                <Footprints/> {calDiaria}  kcal
                            </p>
                           
                        </h2>

                        <h2 className="flex flex-col gap-1">
                            
                            velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
                            <p className='text-t-primaria flex gap-1'>
                                <HeartPulse/> {veloPerda}kg/semana
                            </p>
                        </h2>
                    </div>

                </div>

                <div className="flex flex-col px-4 w-full rounded-lg 
                ring-2 ring-base-quaternaria bg-base-terciaria
                divide-y divide-contraste-primaria">

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <WeightTilde/>
                            peso final: 
                            <p className='text-t-primaria'>
                                {pesoFinal} kg
                            </p>
                        </h2>

                        <h2 className="flex gap-1">
                            {objetivo === 'perder_peso' ? (
                                <>
                                    <Footprints/>
                                    peso a perder
                                    <p className="text-t-primaria">
                                        {peso - pesoFinal} kg
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Utensils/>
                                    peso a ganhar
                                    <p className="text-t-primaria">
                                        {pesoFinal - peso} kg
                                    </p>
                                </>
                            )}
                        </h2>
                    </div>

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <Clock/>
                            <div className="flex flex-col justify-baseline">
                                tempo estimado: 
                                <p className='text-t-primaria'>
                                    {tempo.meses} meses e  {tempo.semanas}semanas
                                </p>
                                
                                <p className='text-t-primaria'>
                                    
                                </p>
                                
                            </div>
                        </h2>

                        <h2 className="flex flex-col gap-1">
                            <p className="flex gap-1">
                                <CalendarClock/>
                                previsão de termino: 
                            </p>
                            <p className='text-t-primaria ml-7'>
                                {tempo.previsao}
                            </p>
                        </h2>
                    </div>

                </div>
            </div>

        </motion.div>
    )
}

export default ExibirInfo