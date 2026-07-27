import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Texto from "../organizacao/Texto";
import WrapperIcone, { WrapperIconeTamanhos } from "../organizacao/WrapperIcone";

interface BotaoTerciarioProps {
  texto?: string;
  icone?: LucideIcon;
  classeAdicional?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  tamanhoIcone?: WrapperIconeTamanhos
}

const MotionButton = motion.button as any;

const BotaoTerciario = ({
  texto,
  icone: Icone,
  classeAdicional = "",
  disabled = false,
  type = "button",
  onClick,
  tamanhoIcone = 'sm'
}: BotaoTerciarioProps) => {
  return (
    <MotionButton
      whileHover={disabled ? undefined : { scale: 1.08, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.92, y: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={classeAdicional}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {Icone && (
        <WrapperIcone tamanho={tamanhoIcone}>
          <Icone className="size-full" />
        </WrapperIcone>
      )}

      {texto && (
        <Texto>
          {texto}
        </Texto>
      )}
    </MotionButton>
  );
};

export default BotaoTerciario;