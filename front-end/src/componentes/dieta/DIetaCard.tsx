import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Plus, Flame, Utensils, EllipsisVertical, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Texto from '../organizacao/Texto'
import BotaoPrimario from '../botoes/BotaoPrimario'
import Dieta from '../../logicas/dashboard/dieta/DietaProps'
import WrapperIcone from '../organizacao/WrapperIcone'
import BotaoTerciario from '../botoes/BotaoTerciario'

type Props = {
  dieta: Dieta
  onAdicionar?: (dieta: Dieta) => void | Promise<void>
}

type EstadoAdicionar = 'parado' | 'adicionando' | 'adicionada' | 'erro'

export function DietaCard({ dieta, onAdicionar }: Props) {
  const navigate = useNavigate()

  const [menuAberto, setMenuAberto] = useState(false)
  const [estado, setEstado] = useState<EstadoAdicionar>('parado')
  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    if (!menuAberto) return

    const aoClicarFora = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAberto(false)
      }
    }

    document.addEventListener('mousedown', aoClicarFora)
    return () => document.removeEventListener('mousedown', aoClicarFora)
  }, [menuAberto])

  const adicionar = async () => {
    if (!onAdicionar || estado === 'adicionando' || estado === 'adicionada') return

    setEstado('adicionando')

    try {
      await onAdicionar(dieta)
      setEstado('adicionada')
      setTimeout(() => setMenuAberto(false), 1200)
    } catch {
      setEstado('erro')
    }
  }

  const totalCaloriasDia = dieta.refeicoes.reduce(
    (soma, refeicao) =>
      soma + refeicao.alimentos.reduce((s, a) => s + a.calorias, 0),
    0
  )

  const textoAdicionar = {
    parado: 'Adicionar às minhas dietas',
    adicionando: 'Adicionando...',
    adicionada: 'Adicionada!',
    erro: 'Erro. Tentar de novo',
  }[estado]

  return (
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

        <div className="w-full h-24 rounded-2xl bg-base-terciaria flex items-center justify-center">
          <Utensils className="size-10 text-destaque-p-claro" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2.5">
          <Texto tipo="titulo" className="text-t-primaria leading-snug">
            {dieta.nome}
          </Texto>

          <div className="flex flex-wrap items-center gap-1.5">
            <div className="rounded-full bg-destaque-s-medio/10 border border-destaque-p-claro/20 px-2 py-0.5">
              <Texto tipo="subtexto" className=" text-destaque-s-medio font-medium">
                {dieta.objetivo.nome}
              </Texto>
            </div>
            <div className="rounded-full bg-base-terciaria/20 border border-base-terciaria/30 px-2 py-0.5">
              <Texto tipo="subtexto" className=" text-t-primaria font-medium">
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
            <Texto tipo="subtexto" className=" text-t-terciaria">
              {dieta.refeicoes.length} refeições
            </Texto>
          </div>

          {(
            <div
              ref={menuRef}
              className="absolute bottom-0 right-0 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <BotaoTerciario
                icone={EllipsisVertical}
                tamanhoIcone='md'
                onClick={() => setMenuAberto((aberto) => !aberto)}
              />

              {menuAberto && (
                <div className="absolute bottom-full right-0 mb-1 z-20 rounded-xl bg-base-secundaria border border-base-terciaria/30 shadow-xl p-1 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={adicionar}
                    disabled={!onAdicionar || estado === 'adicionando' || estado === 'adicionada'}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 w-full text-left hover:bg-destaque-p-claro/10 disabled:opacity-70 disabled:hover:bg-transparent"
                  >
                    {estado === 'adicionada' ? (
                      <Check className="size-4 text-destaque-p-claro" />
                    ) : (
                      <Plus className="size-4 text-destaque-p-claro" />
                    )}
                    <Texto tipo="subtexto" className="text-t-primaria">
                      {textoAdicionar}
                    </Texto>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  )
}

export default DietaCard