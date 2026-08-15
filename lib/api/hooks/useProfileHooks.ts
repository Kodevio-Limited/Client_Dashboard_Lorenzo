import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, UpdateUserDto } from '../services/user';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { QUERY_KEYS } from '../query-keys';

export function useProfileQuery() {
  const setUser = useAuthStore((s) => s.setUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: async () => {
      const data = await userService.getSelfProfile();
      setUser(data);
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (dto: UpdateUserDto) => userService.updateMyProfile(dto),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(QUERY_KEYS.profile, updatedUser);
      addToast('Profile updated successfully!', 'success');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to update profile', 'error');
    },
  });
}
