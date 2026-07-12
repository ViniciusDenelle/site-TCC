import type { ReactNode, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface InputCheckboxProps {
  name: string
  valor: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  className?: string
  checked?: boolean
  semCheckbox?: boolean
}

const InputCheckbox = ({
  name,
  valor,
  onChange,
  children,
  className = '',
  checked = false,
  semCheckbox = false,
}: InputCheckboxProps) => {

  const classeBase = `
    flex gap-2 justify-start items-center
    transition-colors duration-200
  `

  return (
    <label className="block cursor-pointer group">

      <input
        type="checkbox"
        name={name}
        value={valor}
        className="peer hidden"
        onChange={onChange}
        checked={checked}
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`${classeBase} ${className}`}
      >

        {!semCheckbox && (
          <span
            className="
              flex justify-center items-center
              size-5
              rounded-md
              border-2 border-base-quaternaria
              transition-colors duration-200

              group-has-checked:border-destaque-s-escuro
              group-has-checked:bg-destaque-s-escuro
            "
          >
            <Check
              className="
                size-3 text-base-secundaria
                opacity-0 scale-50
                transition-all duration-200

                group-has-checked:opacity-100
                group-has-checked:scale-100
              "
              strokeWidth={3}
            />
          </span>
        )}

        {children}

      </motion.div>

    </label>
  )
}

export default InputCheckbox