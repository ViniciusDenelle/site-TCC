const CardPaleta = ({
    corBase = '',
    corComplementar = '',
    corPrimaria = ''
} : any) => {

    return (
        <div className="relative size-20 rounded-xl overflow-hidden 
        grid grid-cols-2 grid-row-2 border-2 
        border-base-terciaria group cursor-pointer">

            <div className="absolute inset-0 bg-base-primaria/20 group-hover:bg-transparent transition-colors"/>
            <div className={`col-span-2 bg-${corBase}`} />
            <div className={`bg-${corComplementar}`} />
            <div className={`bg-${corPrimaria}`} />
        </div>
    )
}

export default CardPaleta