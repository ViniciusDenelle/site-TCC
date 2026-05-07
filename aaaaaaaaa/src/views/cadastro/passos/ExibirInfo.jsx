import React, { useContext, useMemo } from 'react'
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
    const { dados, GET, idade } = useContext(CadastroContext)

    const {
        genero,
        peso,
        tipoPeso,
        pesoFinal,
        altura,
        nivelAtividade,
        objetivo,
        experiencia,
        calDiaria,
        tempo,
        veloPerda,
    } = dados

    const niveis = {
        '1.2': 'sedentario',
        '1.375': 'leve',
        '1.55': 'moderado',
        '1.75': 'intenso'
    }

    const atividadeNome = niveis[String(nivelAtividade)] || ''

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

            <div className="flex flex-col gap-3 mb-2 text-xs sm:text-sm">

                <div className="flex flex-col px-4 w-full rounded-lg 
                ring-2 ring-base-quaternaria bg-base-terciaria
                divide-y divide-contraste-primaria">

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <VenusAndMars />
                            genero:
                            <p className='text-t-primaria'>
                                {genero}
                            </p>
                        </h2>

                        <h2 className="flex gap-1">
                            <Cake />
                            idade:
                            <p className='text-t-primaria'>
                                {idade}
                            </p>
                        </h2>
                    </div>

                    <div className="flex justify-between py-2">
                        <h2 className="flex gap-1">
                            <Weight />
                            peso:
                            <p className='text-t-primaria'>
                                {peso}
                            </p>
                            {tipoPeso}
                        </h2>

                        <h2 className="flex gap-1">
                            <Ruler />
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

                    <div className="flex flex-col pl-2 gap-1 w-full">
                        <h2 className="flex flex-col gap-1">

                            atividade:
                            <p className='text-t-primaria flex'>
                                <Activity /> {atividadeNome}
                            </p>
                        </h2>

                        <h2 className="flex flex-col gap-1">

                            objetivo:
                            <p className='text-t-primaria flex gap-1'>
                                <Target /> {objetivo.replace('_', ' ')}
                            </p>
                        </h2>

                        <h2 className="flex flex-col gap-1">

                            experiencia:
                            <p className='text-t-primaria flex gap-1'>
                                <GraduationCap /> {experiencia}
                            </p>
                        </h2>
                    </div>

                    <div className="flex flex-col pl-2 gap-1 w-full">
                        <h2 className="flex flex-col gap-1">

                            gasto calorico total:
                            <p className='text-t-primaria flex gap-1'>
                                <Flame /> {GET} kcal
                            </p>

                        </h2>

                        <h2 className="flex flex-col gap-1">

                            calorias diarias:
                            <p className='text-t-primaria flex gap-1'>
                                <Footprints /> {calDiaria}  kcal
                            </p>

                        </h2>

                        <h2 className="flex flex-col gap-1">

                            velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
                            <p className='text-t-primaria flex gap-1'>
                                <HeartPulse /> {veloPerda}kg/semana
                            </p>
                        </h2>
                    </div>

                </div>

                <div className="flex flex-col px-4 w-full rounded-lg 
                ring-2 ring-base-quaternaria bg-base-terciaria
                divide-y divide-contraste-primaria">

                    <div className="flex justify-between py-2">

                        <div className="flex gap-1">
                            <WeightTilde />
                            <h2 className='flex flex-col sm:flex-row gap-1'>
                                peso final:
                                <p className='text-t-primaria'>
                                    {pesoFinal} kg
                                </p>
                            </h2>
                        </div>

                        <div className="flex gap-1">
                            {objetivo === 'perder_peso' ? (
                                <>
                                    <Footprints />
                                    <h2 className='flex sm:flex-row flex-col gap-1'>
                                        peso a perder
                                        <p className="text-t-primaria">
                                            {peso - pesoFinal} kg
                                        </p>
                                    </h2>
                                </>
                            ) : (
                                <>
                                <Utensils />
                                <h2 className='flex flex-col sm:flex-row gap-1'>
                                    peso a ganhar
                                    <p className="text-t-primaria">
                                        {pesoFinal - peso} kg
                                    </p>
                                </h2>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 py-2">
                        <Clock />
                        <div className="flex flex-col justify-between w-full">
                            <h3>tempo estimado: </h3>

                            <p className='text-t-primaria'>
                                {tempo.meses} meses e  {tempo.semanas}semanas
                            </p>

                        </div>
                    </div>

                    <div className="flex gap-2 py-2">

                        <CalendarClock />
                        <div className="flex flex-col justify-between">
                            <p className="flex gap-1">
                                previsão de termino:
                            </p>
                            <p className='text-t-primaria'>
                                {tempo.previsao}
                            </p>

                        </div>

                    </div>

                </div>
            </div>

        </motion.div>
    )
}

export default ExibirInfo