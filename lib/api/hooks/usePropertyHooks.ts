import { useQuery } from '@tanstack/react-query';
import { propertyService } from '../services/property';
import { useAuthStore } from '@/store/authStore';
import { QUERY_KEYS } from '../query-keys';

export function usePropertiesQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.properties,
    queryFn: () => propertyService.getProperties(),
    enabled: isAuthenticated,
  });
}

export function usePropertyDetailsQuery(id: number | string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.propertyDetails(id || ''),
    queryFn: () => propertyService.getPropertyById(id!),
    enabled: isAuthenticated && !!id,
  });
}
