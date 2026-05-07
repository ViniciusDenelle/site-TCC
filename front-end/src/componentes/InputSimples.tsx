import { motion } from 'framer-motion'
import type { ChangeEvent } from 'react'

interface InputSimplesProps {
  type?: 'text' | 'number' | 'email' | 'password'
  name?: string
  value?: string | number
  maximo?: number
  minimo?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  classeAdicional?: string
  disabled?: boolean
}

const InputSimples = ({
  type = 'text',
  name,
  value,
  maximo,
  minimo,
  onChange,
  placeholder,
  classeAdicional,
  disabled = false,
}: InputSimplesProps) => {

  const classeBase = `
    rounded-xl bg-base-terciaria p-1 border-2
    border-base-quaternaria cursor-pointer hover:bg-base-secundaria
    hover:border-contraste-principal/50 transition-colors duration-200
    focus:outline-none focus:border-destaque-s-medio
    invalid:border-red-500 invalid:focus:border-red-500
    invalid:hover:border-red-500
    disabled:border-none disabled:hover:bg-base-terciaria
    disabled:cursor-default
  `

  const invalidadores =
    type === 'number'
      ? {
          max: maximo,
          min: minimo
        }
      : {
          maxLength: maximo,
          minLength: minimo
        }

  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...invalidadores}
      className={`${classeBase} ${classeAdicional ?? ''}`}
    />
  )
}

export default InputSimples