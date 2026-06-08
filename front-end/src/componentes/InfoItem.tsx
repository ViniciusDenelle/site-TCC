import { LucideIcon } from "lucide-react"

type InfoItemProps = {
  icone: LucideIcon,
  valor: number | string
  label: string,
  className?: string
}

const InfoItem = ({
  icone: Icone,
  valor,
  label,
  className
}: InfoItemProps) => {

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Icone />
      <h1>{label}:</h1>

      <h1 className="text-t-primaria">
        {valor}
      </h1>
    </div>
  )
}

export default InfoItem