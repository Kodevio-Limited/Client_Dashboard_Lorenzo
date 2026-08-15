import apiClient from '../axios';
import { UserProfile } from '@/store/authStore';

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
}

export const userService = {
  async getSelfProfile(): Promise<UserProfile> {
    const res = await apiClient.get<{ message: string; data: UserProfile }>('/users/me');
    return res.data.data;
  },

  async updateMyProfile(dto: UpdateUserDto): Promise<UserProfile> {
    const res = await apiClient.patch<{ message: string; data: UserProfile }>('/users/me', dto);
    return res.data.data;
  },
};
