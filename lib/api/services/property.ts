import apiClient from '../axios';

export interface PropertyItem {
  id: number;
  name: string;
  clientId: number;
  parish: string;
  city: string;
  gpsCoordinates?: string;
  type: string;
  fieldRep?: string;
  servicePlanType?: string;
  nextVisitDate?: string;
  reportSubmissionStatus?: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  attachments?: Array<{
    id: string;
    type: string;
    fileUrl: string;
  }>;
}

export const propertyService = {
  async getProperties(): Promise<PropertyItem[]> {
    const res = await apiClient.get<{ message: string; data: PropertyItem[] }>('/properties');
    return res.data.data;
  },

  async getPropertyById(id: number | string): Promise<PropertyItem> {
    const res = await apiClient.get<{ message: string; data: PropertyItem }>(`/properties/${id}`);
    return res.data.data;
  },
};
