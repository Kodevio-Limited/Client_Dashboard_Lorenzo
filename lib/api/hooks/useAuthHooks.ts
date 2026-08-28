import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  authService,
  LoginDto,
  ChangePasswordDto,
  ResetPasswordDto,
} from '../services/auth';
import { userService } from '../services/user';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { QUERY_KEYS } from '../query-keys';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: async (res) => {
      setAuth({ accessToken: res.data.accessToken });
      try {
        // Fetch user profile immediately on login
        const profile = await userService.getSelfProfile();
        setAuth({ accessToken: res.data.accessToken, user: profile });
        queryClient.setQueryData(QUERY_KEYS.profile, profile);
      } catch (err) {
        console.error('Failed to fetch user profile after login:', err);
      }
      addToast('Login successful!', 'success');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Login failed. Please check credentials.', 'error');
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      addToast('Logged out successfully', 'info');
    },
  });
}

export function useForgotPasswordMutation() {
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (res) => {
      addToast(
        res.message || 'If an account exists with this email, a password reset link has been sent.',
        'success'
      );
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to send reset link', 'error');
    },
  });
}

export function useResetPasswordMutation() {
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (dto: ResetPasswordDto) => authService.resetPassword(dto),
    onSuccess: (res) => {
      addToast(res.message || 'Password reset successfully', 'success');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to reset password', 'error');
    },
  });
}

export function useChangePasswordMutation() {
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (dto: ChangePasswordDto) => authService.changePassword(dto),
    onSuccess: () => {
      addToast('Password updated successfully!', 'success');
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to change password', 'error');
    },
  });
}
