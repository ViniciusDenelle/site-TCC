import { ReactNode } from "react"


const Card = ({
  children,
  className = ''
}: {
  children: ReactNode,
  className?: string
}) => {

  const classeBase = `flex rounded-xl text-sm
    bg-base-terciaria border border-base-quaternaria
  `

  return (
    <div className={`${classeBase} ${className ?? ``}`}>
      {children}
    </div>
  )
}

export default Card