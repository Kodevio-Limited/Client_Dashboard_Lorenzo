import { useQuery } from '@tanstack/react-query';
import { reportService } from '../services/report';
import { useAuthStore } from '@/store/authStore';
import { QUERY_KEYS } from '../query-keys';

export function useMyReportsQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.reports,
    queryFn: () => reportService.getMyReports(),
    enabled: isAuthenticated,
  });
}

export function usePropertyReportsQuery(propertyId: number | string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.propertyReports(propertyId || ''),
    queryFn: () => reportService.getPropertyReports(propertyId!),
    enabled: isAuthenticated && !!propertyId,
  });
}
