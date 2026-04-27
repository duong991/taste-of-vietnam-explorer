import { useQuery } from '@tanstack/react-query';
import { loadDishes } from '@/lib/content';

export function useDishes() {
  return useQuery({
    queryKey: ['dishes'],
    queryFn: loadDishes,
    staleTime: Infinity,
  });
}
