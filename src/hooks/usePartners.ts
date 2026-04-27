import { useQuery } from '@tanstack/react-query';
import { loadPartners } from '@/lib/content';
import type { Partner } from '@/types/content';

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: loadPartners,
    staleTime: Infinity,
  });
}

export function usePartner(id: string | undefined) {
  return useQuery({
    queryKey: ['partners'],
    queryFn: loadPartners,
    select: (partners: Partner[]) => partners.find((p) => p.id === id),
    enabled: !!id,
    staleTime: Infinity,
  });
}
