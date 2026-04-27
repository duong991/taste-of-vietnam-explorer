import { useQuery } from '@tanstack/react-query';
import { loadCities } from '@/lib/content';
import type { City } from '@/types/content';

export function useCity(slug: string | undefined) {
  return useQuery({
    queryKey: ['cities'],
    queryFn: loadCities,
    select: (cities: City[]) => cities.find((c) => c.slug === slug),
    enabled: !!slug,
    staleTime: Infinity,
  });
}
