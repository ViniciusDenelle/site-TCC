import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

type InfoVerticalProps = {
  icone: LucideIcon
  label: string
  valor: ReactNode
}

const InfoItemVertical = ({
  icone: Icone,
  label,
  valor
}: InfoVerticalProps) => {
  return (
    <div>
      <h2>{label}:</h2>

      <div className="flex items-center gap-1">
        <Icone />

        <span className="text-t-primaria">
          {valor}
        </span>
      </div>
    </div>
  )
}

export default InfoItemVertical