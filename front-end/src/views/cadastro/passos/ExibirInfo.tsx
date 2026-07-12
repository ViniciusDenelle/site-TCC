
import {
  Activity,
  Cake,
  CalendarClock,
  Clock,
  Flame,
  Footprints,
  GraduationCap,
  HeartPulse,
  LucideIcon,
  Ruler,
  Target,
  Utensils,
  VenusAndMars,
  Weight,
  WeightTilde
} from 'lucide-react'

import useCadastroContexto from '../../../contextos/CadastroContexto'
import { motion } from 'framer-motion'
import InfoItem from '../../../componentes/organizacao/InfoItem'
import InfoItemVertical from '../../../componentes/organizacao/InfoItemVertical'
import Card from '../../../componentes/Card'

const BlocoDadosPessoais = ({
  dados
}) => {

  const {
    genero,
    idade,
    peso,
    altura,
    tipoPeso
  } = dados

  const itemsDadosPessoais1 = [
    {
      icone: VenusAndMars,
      label: 'genero',
      valor: genero
    },
    {
      icone: Cake,
      label: 'idade',
      valor: idade
    },
  ]

  const itemsDadosPessoais2 = [
    {
      icone: Weight,
      label: 'peso',
      valor: `${peso} ${tipoPeso}`
    },
    {
      icone: Ruler,
      label: 'altura',
      valor: `${altura} cm`
    }
  ]

  return (
    <Card className='px-4 py-2 flex-col'>
      <div className="flex justify-between py-1">

        {itemsDadosPessoais1.map(item => (
          <InfoItem
            key={item.label}
            icone={item.icone}
            label={item.label}
            valor={item.valor}
          />
        ))}

      </div>
      <div className="flex justify-between py-1 
        border-t border-base-quaternaria">

        {itemsDadosPessoais2.map(item => (
          <InfoItem
            key={item.label}
            icone={item.icone}
            label={item.label}
            valor={item.valor}
          />
        ))}

      </div>
    </Card>
  )
}

const BlocoObjetivo = ({
  dados
}) => {

  const {
    nivelAtividade,
    objetivo,
    experiencia,
    GET,
    calDiaria,
    veloPerda
  } = dados

  const niveis: Record<string, string> = {
    '1.2': 'sedentario',
    '1.375': 'leve',
    '1.55': 'moderado',
    '1.75': 'intenso'
  }

  const atividadeNome =
    niveis[String(nivelAtividade)] || ''

  const esquerda = [
    {
      icone: Activity,
      label: 'atividade',
      valor: atividadeNome
    },
    {
      icone: Target,
      label: 'objetivo',
      valor: objetivo.replace('_', ' ')
    },
    {
      icone: GraduationCap,
      label: 'experiência',
      valor: experiencia
    }
  ]

  const direita = [
    {
      icone: Flame,
      label: 'gasto calórico total',
      valor: `${GET} kcal`
    },
    {
      icone: Footprints,
      label: 'calorias diárias',
      valor: `${calDiaria} kcal`
    },
    {
      icone: HeartPulse,
      label: `velocidade de ${objetivo === 'perder_peso'
          ? 'perda'
          : 'ganho'
        }`,
      valor: `${veloPerda} kg/semana`
    }
  ]

  return (
    <Card>
      <div className="flex-1 px-4 py-2 space-y-3">
        {esquerda.map(item => (
          <InfoItemVertical
            key={item.label}
            {...item}
          />
        ))}
      </div>

      <div
        className="
    flex-1 px-4 py-2 space-y-3
    border-l border-base-quaternaria
  "
      >
        {direita.map(item => (
          <InfoItemVertical
            key={item.label}
            {...item}
          />
        ))}
      </div>
    </Card>
  )
}

const BlocoMeta = ({
  dados
}) => {

  const {
    objetivo,
    peso,
    pesoIdeal,
    tempo
  } = dados

  const diferenca =
    objetivo === 'perder_peso'
      ? peso - pesoIdeal
      : pesoIdeal - peso

  return (
    <Card className="flex-col px-4 py-2">

      <div className="flex justify-between pb-2">

        <InfoItem
          icone={WeightTilde}
          label="peso final"
          valor={`${pesoIdeal} kg`}
        />

        <InfoItem
          icone={
            objetivo === 'perder_peso'
              ? Footprints
              : Utensils
          }
          label={
            objetivo === 'perder_peso'
              ? 'peso a perder'
              : 'peso a ganhar'
          }
          valor={`${diferenca} kg`}
        />

      </div>

      <div
        className="
          flex items-start gap-2 py-2
          border-t border-base-quaternaria
        "
      >
        <Clock />

        <div>
          <p>tempo estimado:</p>

          <p className="text-t-primaria">
            {tempo.meses} meses e {tempo.semanas} semanas
          </p>
        </div>
      </div>

      <div
        className="
          flex items-start gap-2 pt-2
          border-t border-base-quaternaria
        "
      >
        <CalendarClock />

        <div>
          <p>previsão de término:</p>

          <p className="text-t-primaria">
            {tempo.previsao}
          </p>
        </div>
      </div>

    </Card>
  )
}


const BlocoManutencao = ({
  dados
}) => {

  const {
    atividadeNome,
    objetivo,
    experiencia,
    GET
  } = dados

  const itens = [
    {
      icone: Activity,
      label: 'atividade',
      valor: atividadeNome
    },
    {
      icone: Target,
      label: 'objetivo',
      valor: objetivo.replace('_', ' ')
    },
    {
      icone: GraduationCap,
      label: 'experiência',
      valor: experiencia
    },
    {
      icone: Flame,
      label: 'gasto calórico total',
      valor: `${GET} kcal`
    }
  ]

  return (
    <Card className="flex-col px-4 py-2">

      {itens.map((item, index) => (
        <InfoItem
          key={item.label}
          {...item}
          className={
            index > 0
              ? 'border-t border-base-quaternaria py-1'
              : ''
          }
        />
      ))}

    </Card>
  )
}

const ExibirInfo = () => {

  const {
    dados,
    GET,
    idade
  } = useCadastroContexto()

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-3 w-full"
    >

      <h1 className="mx-auto text-lg font-semibold text-t-primaria">
        suas informações
      </h1>

      {/* bloco 1 */}
      <BlocoDadosPessoais dados={{ ...dados, idade }} />


      {dados.objetivo !== 'manter_peso' ? (
        <>
          {/* bloco 2 */}
          <BlocoObjetivo dados={{ ...dados, GET }} />

          {/* bloco 3 */}
          <BlocoMeta dados={dados} />

        </>
      ) : (
        // bloco manter
        <BlocoManutencao dados={{ ...dados, GET }} />
      )}
    </motion.div>
  )
}

export default ExibirInfo