import { useQuery } from '@tanstack/react-query';
import { mediaService } from '../services/media';
import { useAuthStore } from '@/store/authStore';
import { QUERY_KEYS } from '../query-keys';

export function useMediaQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.media,
    queryFn: () => mediaService.getMedia(),
    enabled: isAuthenticated,
  });
}

export function useReportMediaQuery(reportId: number | string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.reportMedia(reportId || ''),
    queryFn: () => mediaService.getMediaByReportId(reportId!),
    enabled: isAuthenticated && !!reportId,
  });
}
