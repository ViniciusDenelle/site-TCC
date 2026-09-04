import { motion } from 'framer-motion';

// Card 1: Métricas Principais
export const CardMetrica = ({ titulo, valor, variacao, icon }: any) => (
  <motion.div 
    whileHover={{ scale: 1.03, translateY: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="p-5 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria/60 hover:ring-destaque-p-medio/50 rounded-2xl flex flex-col justify-between gap-3 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-t-secundaria/70 uppercase tracking-wider group-hover:text-t-primaria transition-colors">
        {titulo}
      </span>
      <span className="text-base p-2 bg-base-quaternaria/30 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </span>
    </div>
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-2xl font-black text-t-primaria tracking-tight">{valor}</p>
      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg ring-1 ring-green-500/20">
        {variacao}
      </span>
    </div>
  </motion.div>
);

// Card 2: Carga com Barra Reativa à Paleta
export const CardCarga = ({ nome, carga, evolucao, porcentagem }: any) => (
  <motion.div 
    whileHover={{ x: 6 }}
    className="p-3 bg-black/20 hover:bg-black/30 rounded-2xl ring-1 ring-white/5 hover:ring-white/10 flex flex-col gap-2 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-center text-xs">
      <span className="font-semibold text-t-primaria">{nome}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-t-primaria">{carga}</span>
        <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md">
          {evolucao}
        </span>
      </div>
    </div>
    <div className="w-full bg-base-quaternaria/40 rounded-full h-2 overflow-hidden p-0.5">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${porcentagem}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        /* Substituído o gradiente fixo amber pela cor dinâmica de destaque da paleta */
        className="bg-destaque-p-medio h-full rounded-full transition-colors duration-300"
      />
    </div>
  </motion.div>
);

// Card 3: Medição com Microinteração
export const CardMedicao = ({ nome, valor, data, periodo }: any) => (
  <motion.div 
    whileHover={{ scale: 1.01, x: 4 }}
    className="flex items-center justify-between p-3 bg-black/20 hover:bg-black/30 rounded-2xl ring-1 ring-white/5 hover:ring-destaque-p-medio/30 transition-all cursor-pointer"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-base-quaternaria/40 flex items-center justify-center text-sm shrink-0">
        📐
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-t-primaria truncate">{nome}</span>
        <span className="text-[10px] text-t-secundaria/60 truncate">{data} • {periodo}</span>
      </div>
    </div>
    <span className="text-sm font-extrabold text-destaque-p-medio shrink-0 ml-2 transition-colors duration-300">
      {valor}
    </span>
  </motion.div>
);