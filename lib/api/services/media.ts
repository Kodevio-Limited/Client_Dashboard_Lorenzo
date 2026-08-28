import apiClient from '../axios';

export interface MediaAttachment {
  id: string;
  originalName: string;
  mimeType: string;
  size: number | string;
  objectKey: string;
  url?: string;
}

export interface MediaItem {
  id: number;
  reportId?: number;
  propertyId?: number;
  type: 'PHOTO' | 'VIDEO' | string;

  attachmentId?: string;

  attachment?: MediaAttachment | null;

  fileUrl?: string;

  title?: string;

  createdAt?: string;

  property?: {
    id: number;
    name: string;
  };
}

const normalizeMedia = (media: MediaItem): MediaItem => {
  return {
    ...media,
    fileUrl: media.attachment?.url || media.fileUrl,
  };
};

export const mediaService = {
  async getMedia(): Promise<MediaItem[]> {
    const res = await apiClient.get<{
      message: string;
      data: MediaItem[];
    }>('/media');

    return (res.data.data || []).map(normalizeMedia);
  },

  async getMediaByReportId(
    reportId: number | string,
  ): Promise<MediaItem[]> {
    const res = await apiClient.get<{
      message: string;
      data: MediaItem[];
    }>(`/media/report/${reportId}`);

    return (res.data.data || []).map(normalizeMedia);
  },

  async getMediaById(
    id: number | string,
  ): Promise<MediaItem> {
    const res = await apiClient.get<{
      message: string;
      data: MediaItem;
    }>(`/media/${id}`);

    return normalizeMedia(res.data.data);
  },
};