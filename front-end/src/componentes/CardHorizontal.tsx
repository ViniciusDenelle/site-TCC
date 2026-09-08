import { ReactNode } from "react"

type CardHorizontalProps = {
    children: ReactNode,
    className?: string
}

const CardHorizontal = ({
    children,
    className = ''
}: CardHorizontalProps) => {
    const classeBase = `relative w-full p-3 rounded-2xl
        bg-base-terciaria/70 backdrop-blur-md shadow-md shadow-gray-900/20
        transition-colors duration-200 text-t-terciaria`
    return (
        <div className={`${classeBase} ${className}`}>
            {children}
        </div>
    )
}

export default CardHorizontal