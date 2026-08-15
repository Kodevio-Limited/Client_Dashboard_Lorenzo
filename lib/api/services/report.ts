import apiClient from '../axios';

export interface ReportItem {
  id: number;
  title: string;
  visitDate: string;
  parish: string;
  propertyId: number;
  fieldRep?: string;
  clientId?: number;
  pdfUrl?: string;
  createdAt?: string;
  property?: {
    id: number;
    name: string;
    parish: string;
    city: string;
  };
}

export const reportService = {
  async getMyReports(): Promise<ReportItem[]> {
    try {
      const res = await apiClient.get<{ message: string; data: ReportItem[] | ReportItem }>('/reports/me');
      const data = res.data.data;
      return Array.isArray(data) ? data : data ? [data] : [];
    } catch {
      // Fallback to /reports if /reports/me fails or returns empty
      const res = await apiClient.get<{ message: string; data: ReportItem[] }>('/reports');
      return res.data.data || [];
    }
  },

  async getPropertyReports(propertyId: number | string): Promise<ReportItem[]> {
    const res = await apiClient.get<{ message: string; data: ReportItem[] | ReportItem }>(
      `/reports/property/${propertyId}`
    );
    const data = res.data.data;
    return Array.isArray(data) ? data : data ? [data] : [];
  },

  async getReportById(id: number | string): Promise<ReportItem> {
    const res = await apiClient.get<{ message: string; data: ReportItem }>(`/reports/${id}`);
    return res.data.data;
  },
};
