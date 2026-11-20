import React from 'react'

import {
  Pencil,
  Flame,
  Target,
  User,
  Loader2,
  HeartPulse,
  Zap,
  Scale
} from 'lucide-react'

import useFetchUsuario from '../../../logicas/usuario/FetchUsuario'
import CardHorizontal from '../../../componentes/CardHorizontal'
import Texto from '../../../componentes/organizacao/Texto'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import BotaoSecundario from '../../../componentes/botoes/BotaoSecundario'
import { NavLink, Outlet } from 'react-router-dom'
import RankingCompeticao from '../../../componentes/RankingCompeticao'

export default function Home() {

  const {
    dadosUsuario,
    isPending,
    isError
  } = useFetchUsuario()

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-base-primaria text-white gap-3">
        <Loader2 className="w-9 h-9 animate-spin text-blue-500" />

        <Texto tipo="subtitulo">
          Carregando informações...
        </Texto>
      </div>
    )
  }

  if (isError || !dadosUsuario) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-base-primaria text-white p-4 gap-4">

        <Texto
          tipo="paragrafo"
          className="text-gray-400 text-center"
        >
          Erro ao carregar dados do usuário.
        </Texto>

        <BotaoPrimario
          tipo="cheio"
          onClick={() => window.location.reload()}
          texto="tentar novamente"
        />

      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-base-primaria p-4 sm:p-6 md:p-8 text-white font-poppins space-y-6 pt-6">

      {/* ===================================================== */}
      {/* 1. HEADER DO USUÁRIO */}
      {/* ===================================================== */}

      <CardHorizontal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-base-terciaria border-2 border-blue-500/30 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
            <User size={40} />
          </div>

          <div className="space-y-1">

            <div className="flex items-center gap-3">

              <Texto
                tipo="titulo"
                className="text-t-primaria text-2xl font-bold capitalize"
              >
                {dadosUsuario.nome}
              </Texto>

              <div className="rounded-full border-2 border-blue-500 px-2.5 py-0.5 text-blue-400">

                <Texto
                  tipo="subtitulo"
                  className="font-semibold capitalize"
                >
                  {dadosUsuario.experiencia}
                </Texto>

              </div>

            </div>

            <Texto
              tipo="subtitulo"
              className="text-sm font-medium text-gray-400"
            >
              {dadosUsuario.email}
            </Texto>

            <Texto
              tipo="paragrafo"
              className="text-xs text-gray-500"
            >
              {dadosUsuario.idade} anos • {dadosUsuario.altura} cm • Gênero: {dadosUsuario.genero}
            </Texto>

          </div>

        </div>

        <NavLink to="atualizarPerfil">

          <BotaoPrimario
            tipo="cheio"
            icone={Pencil}
            texto="Editar perfil"
          />

        </NavLink>

      </CardHorizontal>


      {/* ===================================================== */}
      {/* 2. MÉTRICAS PRINCIPAIS */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Peso Atual */}

        <CardHorizontal className="flex items-center gap-4 p-5">

          <div className="p-3.5 rounded-xl bg-base-terciaria text-blue-400 shrink-0">
            <Scale size={26} />
          </div>

          <div className="flex flex-col">

            <Texto
              tipo="subtitulo"
              className="text-xs text-gray-400 font-medium"
            >
              Peso Atual
            </Texto>

            <Texto
              tipo="titulo"
              className="text-t-primaria text-2xl font-bold"
            >
              {dadosUsuario.peso} {dadosUsuario.tipoPeso}
            </Texto>

            <Texto
              tipo="paragrafo"
              className="text-xs text-emerald-400"
            >
              Meta: {dadosUsuario.pesoIdeal} {dadosUsuario.tipoPeso}
            </Texto>

          </div>

        </CardHorizontal>


        {/* Calorias Diárias */}

        <CardHorizontal className="flex items-center gap-4 p-5">

          <div className="p-3.5 rounded-xl bg-base-terciaria text-amber-400 shrink-0">
            <Flame size={26} />
          </div>

          <div className="flex flex-col">

            <Texto
              tipo="subtitulo"
              className="text-xs text-gray-400 font-medium"
            >
              Meta Calórica
            </Texto>

            <Texto
              tipo="titulo"
              className="text-t-primaria text-2xl font-bold"
            >
              {dadosUsuario.caloriasDiarias} kcal
            </Texto>

            <Texto
              tipo="paragrafo"
              className="text-xs text-gray-400"
            >
              Consumo diário recomendado
            </Texto>

          </div>

        </CardHorizontal>


        {/* GET */}

        <CardHorizontal className="flex items-center gap-4 p-5">

          <div className="p-3.5 rounded-xl bg-base-terciaria text-purple-400 shrink-0">
            <Zap size={26} />
          </div>

          <div className="flex flex-col">

            <Texto
              tipo="subtitulo"
              className="text-xs text-gray-400 font-medium"
            >
              Gasto Total (GET)
            </Texto>

            <Texto
              tipo="titulo"
              className="text-t-primaria text-2xl font-bold"
            >
              {dadosUsuario.GET} kcal
            </Texto>

            <Texto
              tipo="paragrafo"
              className="text-xs text-gray-400"
            >
              Gasto calórico estimado
            </Texto>

          </div>

        </CardHorizontal>


        {/* TMB */}

        <CardHorizontal className="flex items-center gap-4 p-5">

          <div className="p-3.5 rounded-xl bg-base-terciaria text-rose-400 shrink-0">
            <HeartPulse size={26} />
          </div>

          <div className="flex flex-col">

            <Texto
              tipo="subtitulo"
              className="text-xs text-gray-400 font-medium"
            >
              Metabolismo Basal
            </Texto>

            <Texto
              tipo="titulo"
              className="text-t-primaria text-2xl font-bold"
            >
              {dadosUsuario.TMB} kcal
            </Texto>

            <Texto
              tipo="paragrafo"
              className="text-xs text-gray-400"
            >
              TMB em repouso
            </Texto>

          </div>

        </CardHorizontal>

      </div>


      
      {/* ===================================================== */}
      {/* 4. DETALHES DO PLANO E OBJETIVOS */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Objetivo de Treino */}

        <CardHorizontal className="flex flex-col gap-4 p-6">

          <div className="flex items-center justify-between">

            <Texto
              tipo="titulo"
              className="text-t-primaria text-lg font-semibold"
            >
              Objetivo Atual
            </Texto>

            <div className="px-3 py-1 rounded-lg bg-base-terciaria border border-base-terciaria">

              <Texto
                tipo="subtitulo"
                className="text-xs text-t-secundaria"
              >
                Ritmo: {dadosUsuario.veloPerda} kg/sem
              </Texto>

            </div>

          </div>


          <div className="flex items-center gap-4 pt-2">

            <div className="w-14 h-14 rounded-2xl bg-base-terciaria flex items-center justify-center text-blue-400 shrink-0">
              <Target size={30} />
            </div>

            <div className="space-y-1">

              <Texto
                tipo="titulo"
                className="text-t-primaria text-lg font-bold capitalize"
              >
                {dadosUsuario.objetivo}
              </Texto>

              <Texto
                tipo="paragrafo"
                className="text-sm text-gray-400"
              >
                Ajustado para redução progressiva de massa gorda mantendo o déficit calórico adequado.
              </Texto>

            </div>

          </div>


          <div className="pt-2 flex gap-3">

            <BotaoSecundario
              tipo="cheio"
              texto="alterar objetivo"
            />

          </div>

        </CardHorizontal>


        {/* Resumo Físico */}

        <CardHorizontal className="flex flex-col gap-4 p-6">

          <Texto
            tipo="titulo"
            className="text-t-primaria text-lg font-semibold"
          >
            Parâmetros Físicos
          </Texto>


          <div className="grid grid-cols-2 gap-4 pt-1">

            <div className="p-3.5 rounded-xl bg-base-terciaria/50 border border-base-terciaria">

              <Texto
                tipo="subtitulo"
                className="text-xs text-gray-400 block"
              >
                Nível de Atividade
              </Texto>

              <Texto
                tipo="paragrafo"
                className="text-base font-semibold"
              >
                {dadosUsuario.nivelDeAtividade}x (Fator)
              </Texto>

            </div>


            <div className="p-3.5 rounded-xl bg-base-terciaria/50 border border-base-terciaria">

              <Texto
                tipo="subtitulo"
                className="text-xs text-gray-400 block"
              >
                Experiência
              </Texto>

              <Texto
                tipo="paragrafo"
                className="text-base font-semibold capitalize"
              >
                {dadosUsuario.experiencia}
              </Texto>

            </div>


            <div className="p-3.5 rounded-xl bg-base-terciaria/50 border border-base-terciaria">

              <Texto
                tipo="subtitulo"
                className="text-xs text-gray-400 block"
              >
                Altura
              </Texto>

              <Texto
                tipo="paragrafo"
                className="text-base font-semibold"
              >
                {dadosUsuario.altura} cm
              </Texto>

            </div>


            <div className="p-3.5 rounded-xl bg-base-terciaria/50 border border-base-terciaria">

              <Texto
                tipo="subtitulo"
                className="text-xs text-gray-400 block"
              >
                Diferença para o Ideal
              </Texto>

              <Texto
                tipo="paragrafo"
                className="text-base font-semibold text-amber-400"
              >
                {(dadosUsuario.peso - dadosUsuario.pesoIdeal).toFixed(0)} {dadosUsuario.tipoPeso}
              </Texto>

            </div>

          </div>

        </CardHorizontal>

      </div>

      {/* ===================================================== */}
      {/* 3. COMPETIÇÕES */}
      {/* ===================================================== */}

      <RankingCompeticao />

      <Outlet />

    </div>
  )
}