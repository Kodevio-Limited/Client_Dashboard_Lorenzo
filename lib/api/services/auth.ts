import apiClient from '../axios';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    userId: number;
    accessToken: string;
  };
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  async login(dto: LoginDto): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>('/auth/login', dto);
    return res.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const res = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return res.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const res = await apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
    return res.data;
  },

  async changePassword(dto: ChangePasswordDto): Promise<{ message: string }> {
    const res = await apiClient.post<{ message: string }>('/auth/change-password', dto);
    return res.data;
  },
};
