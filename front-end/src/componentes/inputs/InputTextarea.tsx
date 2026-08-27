import { motion } from 'framer-motion'
import type { ChangeEvent } from 'react'

interface InputTextareaProps {
  name?: string
  valor?: string
  maximo?: number
  minimo?: number
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  classeAdicional?: string
  disabled?: boolean
  rows?: number
}

const InputTextarea = ({
  name,
  valor,
  maximo,
  minimo,
  onChange,
  placeholder,
  classeAdicional,
  disabled = false,
  rows = 1,
}: InputTextareaProps) => {

  const classeBase = `
    rounded-xl bg-base-terciaria p-1 border-2 resize-none
    border-base-quaternaria cursor-pointer hover:bg-base-secundaria
    hover:border-contraste-principal/50 transition-colors duration-200
    focus:outline-none focus:border-destaque-s-medio
    invalid:border-red-500 invalid:focus:border-red-500
    invalid:hover:border-red-500
    disabled:border-none disabled:hover:bg-base-terciaria
    disabled:cursor-default
  `

  return (
    <motion.textarea
      whileFocus={{ scale: 1.02 }}
      name={name}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      maxLength={maximo}
      minLength={minimo}
      className={`${classeBase} ${classeAdicional ?? ''}`}
    />
  )
}

export default InputTextarea