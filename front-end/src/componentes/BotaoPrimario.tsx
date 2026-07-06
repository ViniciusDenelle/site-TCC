import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'
import Texto from './Texto'
import WrapperIcone from './WrapperIcone'

interface BotaoPrimarioProps {
  texto?: string,
  icone?: LucideIcon,
  tipo?: 'cheio' | 'vazio'
  classeAdicional?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  redondo?: boolean
}

// O TRUQUE: Mudamos o tipo do componente para 'any'. 
// Isso desativa o "modo detetive" do TS especificamente para as tags do Motion.
const MotionButton = motion.button as any

const BotaoPrimario = ({
  texto,
  icone: Icone,
  tipo = 'cheio',
  classeAdicional = '',
  disabled = false,
  type = 'button',
  redondo,
  onClick
}: BotaoPrimarioProps) => {

  const classeBase = `
    p-1 flex justify-center items-center transition-colors gap-1
    duration-300 ${disabled ? 'opacity-70' : 'cursor-pointer'}
    ${redondo ? `rounded-full px-3` : `rounded-lg`}
  `.trim()

  const classeTipo = tipo === 'cheio'
    ? `bg-destaque-p-escuro text-base-secundaria hover:bg-destaque-p-medio
         hover:shadow-sm shadow-destaque-p-medio/30`
    : `text-destaque-p-escuro bg-base-terciaria ring-2
         ring-destaque-p-medio hover:text-destaque-p-medio
         hover:bg-base-secundaria hover:ring-destaque-p-medio`

  return (
    <MotionButton
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.95, y: 2 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${classeBase} ${classeTipo} ${classeAdicional}`.trim()}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {Icone && (
        <WrapperIcone tamanho="sm">
          <Icone className="size-full" />
        </WrapperIcone>
      )}
      {texto && (
        <Texto className='font-semibold'>
          {texto}
        </Texto>
      )}
    </MotionButton>
  )
}

export default BotaoPrimario