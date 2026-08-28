import apiClient from '../axios';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message: string;
  data: {
    userId: number;
    accessToken: string;
  };
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message: string;
  data?: T;
}

export const authService = {
  async login(dto: LoginDto): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>('/auth/login', dto);
    return res.data;
  },

  async logout(): Promise<ApiResponse> {
    const res = await apiClient.post<ApiResponse>('/auth/logout');
    return res.data;
  },

  async forgotPassword(email: string): Promise<ApiResponse> {
    const res = await apiClient.post<ApiResponse>('/auth/forgot-password', { email });
    return res.data;
  },

  async resetPassword(dto: ResetPasswordDto): Promise<ApiResponse> {
    const res = await apiClient.post<ApiResponse>('/auth/reset-password', dto);
    return res.data;
  },

  async changePassword(dto: ChangePasswordDto): Promise<ApiResponse> {
    const res = await apiClient.post<ApiResponse>('/auth/change-password', dto);
    return res.data;
  },
};
