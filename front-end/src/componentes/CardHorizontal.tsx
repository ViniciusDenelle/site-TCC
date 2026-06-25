import { ReactNode } from "react"

type CardHorizontalProps = {
    children: ReactNode,
    className?: string
}

const CardHorizontal = ({
    children,
    className = ''
}: CardHorizontalProps) => {
    const classeBase = `w-full p-3 border-2 border-base-terciaria rounded-2xl
        bg-base-terciaria/30 backdrop-blur-md 
        transition-colors duration-200 text-t-terciaria`
    return (
        <div className={`${classeBase} ${className}`}>
            {children}
        </div>
    )
}

export default CardHorizontal