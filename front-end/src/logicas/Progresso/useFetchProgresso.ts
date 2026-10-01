import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useFetchProgresso() {
  return useQuery({
    queryKey: ['progresso-usuario'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api'); // Ajuste a URL da sua API
      return response.data;
    },
  });
}