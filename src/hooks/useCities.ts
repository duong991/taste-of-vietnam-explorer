import { useQuery } from '@tanstack/react-query';
import { loadCities } from '@/lib/content';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: loadCities,
    staleTime: Infinity,
  });
}
