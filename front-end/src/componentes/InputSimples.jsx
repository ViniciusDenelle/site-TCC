import React from 'react'
import { motion } from 'motion/react'

const InputSimples = ({
  type,
  name,
  value,
  maximo,
  minimo,
  dataBinding,
  placeholder,
  classeAdcional
}) => {
  const classeBase = `rounded-xl bg-base-terciaria p-1 border-2 
    border-base-quaternaria cursor-pointer hover:bg-base-quaternaria/50
    hover:border-contraste-principal/50 transition-colors duration-200
    focus:outline-none focus:border-destaque-s-medio invalid:border-red-500
    invalid:focus:border-red-500 invalid:hover:border-red-500`

  const invalidadores = type === 'number' ? {
    max : maximo,
    min : minimo
  } : {
    maxLength : maximo,
    minLength : minimo
  }

  return (
    <motion.input 
    whileFocus={{ scale: 1.02}}
    type={type} 
    name={name} 
    value={value} 
    onChange={dataBinding} 
    placeholder={placeholder}
    {...invalidadores}
    className={`${classeBase} ${classeAdcional ?? ``}`}/>
  )
}

export default InputSimples