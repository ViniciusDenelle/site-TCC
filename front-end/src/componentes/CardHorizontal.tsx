import { ReactNode } from "react"

type CardHorizontalProps = {
    children: ReactNode
}

const CardHorizontal = ({
    children
}: CardHorizontalProps) => {

    return (
        <div className="w-full p-2 border-2 border-base-terciaria rounded-2xl
        bg-base-terciaria/30 backdrop-blur-md 
        transition-colors duration-200 text-t-terciaria">
            {children}
        </div>
    )
}

export default CardHorizontal