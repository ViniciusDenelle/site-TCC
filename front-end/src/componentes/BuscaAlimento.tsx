import { useState } from 'react';
import { Search } from 'lucide-react';
import Texto from './organizacao/Texto';
import InputSimples from './inputs/InputSimples';
import AlimentoCard from './cards/AlimentoCard';
import useDebounce from '../logicas/useDebounce';
import useFetchAlimentos from '../logicas/dashboard/dieta/alimento/FetchAlimentos';
import { Alimento } from '../logicas/dashboard/dieta/DietaProps';

type Props = {
  onSelecionar: (alimento: Alimento) => void;
};

/**
 * Busca de alimentos usada nas telas de criar e editar dieta.
 * Mostra os primeiros alimentos assim que abre e filtra conforme digita.
 */
function BuscaAlimento({ onSelecionar }: Props) {
  const [termo, setTermo] = useState('');
  const termoDebounce = useDebounce(termo, 400);
  const { alimentos, isPending, isError, error } = useFetchAlimentos({ nome: termoDebounce }, 1);

  const lista = alimentos?.data ?? [];

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <InputSimples
          tipo="text"
          valor={termo}
          onChange={e => setTermo(e.target.value)}
          placeholder="buscar alimento..."
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-40" />
      </div>

      {isPending && (
        <Texto tipo="subtexto" className="opacity-60 animate-pulse">buscando...</Texto>
      )}

      {isError && (
        <Texto tipo="subtexto" className="text-red-400">
          Erro ao buscar alimentos{error?.response?.status ? ` (${error.response.status})` : ''}.
        </Texto>
      )}

      {!isPending && !isError && lista.length === 0 && (
        <Texto tipo="subtexto" className="opacity-60">Nenhum alimento encontrado.</Texto>
      )}

      {lista.length > 0 && (
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {lista.map(alimento => (
            <AlimentoCard
              key={alimento.id}
              alimento={alimento}
              onSelecionar={(a) => { onSelecionar(a); setTermo(''); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BuscaAlimento;