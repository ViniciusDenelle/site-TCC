import { useState } from 'react'
import { motion } from 'motion/react'
import { Flame, Utensils, EllipsisVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Texto from '../organizacao/Texto'
import Dieta from '../../logicas/dashboard/dieta/DietaProps'
import WrapperIcone from '../organizacao/WrapperIcone'
import BotaoTerciario from '../botoes/BotaoTerciario'
import MenuDieta from '../dashboard/player/menus/MenuDieta'

type Props = {
  dieta: Dieta
  onAdicionar?: (dieta: Dieta) => void | Promise<void>
  onRemover?: (dieta: Dieta) => void | Promise<void>
}

export function DietaCard({ dieta, onAdicionar, onRemover }: Props) {
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState<boolean>(false)

  const totalCaloriasDia = dieta.refeicoes.reduce(
    (soma, refeicao) =>
      soma + refeicao.alimentos.reduce((s, a) => s + a.calorias, 0),
    0
  )

  return (
    <>
      {/* O menu fica FORA do card animado */}
      <MenuDieta
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
        dieta={dieta}
        adicionar={onAdicionar}
        remover={onRemover}
      />

      <motion.div
        className="max-w-sm w-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div
          className="bg-base-secundaria rounded-3xl p-5 border border-base-terciaria/20 shadow-xl flex flex-col gap-4 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/dashboard/dieta/verDieta/${dieta.id}`)}
        >
          {dieta?.imagem ? (
            <div className="w-full h-24 rounded-2xl bg-base-terciaria flex items-center justify-center">
              <img src={dieta.imagem} alt="" className="size-full object-cover rounded-lg" />
            </div>
          ) : (
            <div className="w-full h-24 rounded-2xl bg-base-terciaria flex items-center justify-center">
              <Utensils className="size-10 text-destaque-p-claro" strokeWidth={1.5} />
            </div>
          )}
        
          <div className="flex flex-col gap-2.5">
            <Texto tipo="titulo" className="text-t-primaria leading-snug">
              {dieta.nome}
            </Texto>

            <div className="flex flex-wrap items-center gap-1.5">
              <div className="rounded-full bg-destaque-s-medio/10 border border-destaque-p-claro/20 px-2 py-0.5">
                <Texto tipo="subtexto" className="text-destaque-s-medio font-medium">
                  {dieta.objetivo.nome}
                </Texto>
              </div>
              <div className="rounded-full bg-base-terciaria/20 border border-base-terciaria/30 px-2 py-0.5">
                <Texto tipo="subtexto" className="text-t-primaria font-medium">
                  {dieta.nivel.nome}
                </Texto>
              </div>
            </div>

            {dieta.descricao && (
              <Texto tipo="subtexto" className="text-t-terciaria line-clamp-2 leading-relaxed">
                {dieta.descricao}
              </Texto>
            )}
          </div>

          <div className="relative pt-3 border-t border-base-terciaria/40 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <WrapperIcone tamanho='sm'>
                  <Flame className="size-full text-destaque-p-medio" />
                </WrapperIcone>
                <Texto tipo="subtexto" className="font-bold text-t-primaria">
                  {totalCaloriasDia} kcal
                </Texto>
              </div>
              <Texto tipo="subtexto" className="text-t-terciaria">
                {dieta.refeicoes.length} refeições
              </Texto>
            </div>

            <div
              className="absolute bottom-0 right-0 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <BotaoTerciario
                icone={EllipsisVertical}
                tamanhoIcone='md'
                onClick={() => setMenuAberto(prev => !prev)}
              />
            </div>
          </div>

        </div>
      </motion.div>
    </>
  )
}

export default DietaCard