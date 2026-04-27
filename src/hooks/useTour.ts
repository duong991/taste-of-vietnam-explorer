import { useQuery } from '@tanstack/react-query';
import { loadTours } from '@/lib/content';
import type { Tour } from '@/types/content';

export function useTour(slug: string | undefined) {
  return useQuery({
    queryKey: ['tours'],
    queryFn: loadTours,
    select: (tours: Tour[]) => tours.find((t) => t.slug === slug),
    enabled: !!slug,
    staleTime: Infinity,
  });
}
