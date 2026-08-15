import apiClient from '../axios';

export interface MediaItem {
  id: number;
  reportId?: number;
  propertyId?: number;
  type: 'PHOTO' | 'VIDEO' | string;
  attachmentId?: string;
  attachment?: {
    id: string;
    fileUrl: string;
  };
  fileUrl?: string;
  title?: string;
  createdAt?: string;
  property?: {
    id: number;
    name: string;
  };
}

export const mediaService = {
  async getMedia(): Promise<MediaItem[]> {
    const res = await apiClient.get<{ message: string; data: MediaItem[] }>('/media');
    return res.data.data || [];
  },

  async getMediaByReportId(reportId: number | string): Promise<MediaItem[]> {
    const res = await apiClient.get<{ message: string; data: MediaItem[] }>(
      `/media/report/${reportId}`
    );
    return res.data.data || [];
  },

  async getMediaById(id: number | string): Promise<MediaItem> {
    const res = await apiClient.get<{ message: string; data: MediaItem }>(`/media/${id}`);
    return res.data.data;
  },
};
