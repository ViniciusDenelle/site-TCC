import React from 'react';
import useFetchTreinos from '../../../logicas/dashboard/treinos/treino/FetchTreinos';
import BotaoSecundario from '../../../componentes/BotaoSecundario';
import CardHorizontal from '../../../componentes/CardHorizontal';
import BotaoPrimario from '../../../componentes/BotaoPrimario';
import useFetchExercicios, { ResExercicioProps } from '../../../logicas/dashboard/treinos/exercicios/FetchExercicio';
import useShowExercicio from '../../../logicas/dashboard/treinos/exercicios/ShowExercicio';
import { Dumbbell, Image, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';


const ExercicioCard = ({exercicio} :{exercicio : ResExercicioProps}) => {
  
  const obterCorNivel = {
    'Iniciante': 'border-green-600 text-green-600',
    'Intermediário': 'border-yellow-600 text-yellow-600',
    'Avançado': 'border-red-600 text-red-600'
  }

  const corNivel = obterCorNivel[exercicio.nivel.nome]
  
  return (
    <NavLink to={''}>
      <CardHorizontal className='hover:bg-base-terciaria/60'>
        <div className="flex justify-between items-center gap-2 text-base">
          <div className="flex gap-1">

            <div className="size-14 rounded-md overflow-hidden">
              <Dumbbell className='size-full' strokeWidth={1}/>
            </div>

            <div className="flex flex-col gap-1">

              <div className="flex flex-row gap-2 items-baseline">

                <h1 className="font-semibold text-t-primaria">
                  {exercicio.nome}
                </h1>

                <div className={`
                  rounded-full border-2 p-1 text-sm font-semibold opacity-80 ${corNivel}
                `}>
                  {exercicio.nivel.nome}
                </div>

              </div>
              <div className="flex flex-row gap-1 text-xs items-center">
                {exercicio.musculos.map(musculo => (
                  musculo.tipo.nome === 'Primário' ? (
                    <span className='font-semibold text-sm'>
                      {musculo.nome}
                    </span>
                  ) : (
                    <span>
                      {musculo.nome}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            {/* <BotaoPrimario tipo='vazio' redondo classeAdicional='ring-transparent'>
                ver
            </BotaoPrimario> */}

            <BotaoSecundario tipo='cheio' redondo>
              <Plus/>
            </BotaoSecundario>
          </div>
        </div>
      </CardHorizontal>
    </NavLink>
  )
}
// Agora o componente pode receber a lista de treinos e treinadores diretamente via props da API
const Exercicios = () => {

  // const {
  //   treinos,
  //   isPending
  // } = useFetchTreinos()

  const {
    exercicios,
    isPending
  } = useFetchExercicios()
  

  // Caso os dados ainda estejam carregando da API, exibe um feedback visual elegante (Skeleton)
  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-base-primaria text-t-secundaria">
        <div className="animate-pulse text-sm font-medium">Carregando treinos...</div>
      </div>
    );
  }

  // // Mapeamento prático para garantir cores dinâmicas com base no nível que vem do banco de dados
  // const obterCorNivel = (nivel) => {
  //   switch (nivel?.toLowerCase()) {
  //     case 'iniciante': return 'text-green-400';
  //     case 'avançado': return 'text-red-400';
  //     default: return 'text-amber-400'; // Intermediário ou padrão
  //   }
  // };

  // // Função para gerar iniciais dinâmicas caso o usuário não tenha foto de perfil
  // const obterIniciais = (nome) => {
  //   if (!nome) return '??';
  //   const partes = nome.split(' ');
  //   if (partes.length > 1) {
  //     return (partes[0][0] + partes[1][0]).toUpperCase();
  //   }
  //   return partes[0].substring(0, 2).toUpperCase();
  // };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 pt-10 lg:p-8 overflow-y-auto">
      

      {/* GRID DINÂMICO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        
        {/* COLUNA ESQUERDA: TREINOS DINÂMICOS */}
        <section className="flex flex-col gap-3 lg:col-span-7 xl:col-span-8">
          <h2 className="text-lg font-bold text-t-primaria px-1">Treinos da Comunidade</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">

            {exercicios.length === 0 ? (
              <p className="text-xs text-t-secundaria/60 p-2">Nenhum treino criado ainda. Seja o primeiro!</p>
            ) : (
              exercicios.map((exercicio) => (
                <ExercicioCard 
                  key={exercicio.id}
                  exercicio={exercicio} 
                />
                
              ))
            )}
          </div>
        </section>

        {/* COLUNA DIREITA: TREINADORES DINÂMICOS */}
        <section className="flex flex-col gap-3 lg:col-span-5 xl:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-t-primaria px-1">Treinadores</h2>
            <span className="hidden sm:inline text-[10px] font-bold tracking-widest text-t-secundaria/40">POR PROFISSIONAIS</span>
          </div>

          {/* <div className="flex flex-col gap-4">
            {treinadoresVindosDaApi.length === 0 ? (
              <p className="text-xs text-t-secundaria/60 p-2">Nenhum instrutor disponível.</p>
            ) : (
              treinadoresVindosDaApi.map((coach) => (
                <div 
                  key={coach.id || coach._id}
                  className="flex items-center justify-between p-5 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria rounded-xl hover:ring-base-quaternaria/80 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    Avatar com imagem ou iniciais geradas na hora
                    {coach.fotoUrl ? (
                      <img src={coach.fotoUrl} alt={coach.nome} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-base-quaternaria text-t-primaria">
                        {obterIniciais(coach.nome)}
                      </div>
                    )}
                    
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-base font-semibold text-t-primaria flex items-center gap-1 truncate">
                        {coach.nome} {coach.verificado && <span className="text-blue-400 text-xs flex-shrink-0">✓</span>}
                      </h3>
                      <p className="text-xs text-t-secundaria/60 truncate">{coach.especialidade || 'Personal Trainer'} {coach.cref && `• CREF ${coach.cref}`}</p>
                      {coach.tagDestaque && <p className="text-xs font-semibold text-red-500 mt-1">{coach.tagDestaque}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-12 flex-shrink-0 pl-2">
                    <span className="text-xs font-bold text-amber-400">★ {coach.nota || '5.0'}</span>
                    <button className="text-xs text-t-secundaria/60 hover:text-t-primaria transition-colors cursor-pointer">
                      Ver →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div> */}
        </section>

      </div>

    </div>
  );
};

export default Exercicios;