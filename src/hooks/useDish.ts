import { useQuery } from '@tanstack/react-query';
import { loadDishes } from '@/lib/content';
import type { Dish } from '@/types/content';

export function useDish(slug: string | undefined) {
  return useQuery({
    queryKey: ['dishes'],
    queryFn: loadDishes,
    select: (dishes: Dish[]) => dishes.find((d) => d.slug === slug),
    enabled: !!slug,
    staleTime: Infinity,
  });
}
