import { useQuery } from '@tanstack/react-query';
import { loadTours } from '@/lib/content';

export function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: loadTours,
    staleTime: Infinity,
  });
}
