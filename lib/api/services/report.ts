import apiClient from '../axios';

export interface ReportAttachment {
  id: string;
  originalName: string;
  mimeType: string;
  size: number | string;
  objectKey: string;
  url?: string;
}

export interface ReportItem {
  id: number;
  title: string;
  visitDate: string;
  parish: string;
  propertyId: number;
  fieldRep?: string;
  clientId?: number;

  attachmentId?: string | null;
  attachment?: ReportAttachment | null;

  pdfUrl?: string;

  createdAt?: string;

  property?: {
    id: number;
    name: string;
    parish: string;
    city: string;
  };
}

const normalizeReport = (report: ReportItem): ReportItem => {
  return {
    ...report,
    pdfUrl: report.attachment?.url || report.pdfUrl,
  };
};

export const reportService = {
  async getMyReports(): Promise<ReportItem[]> {
    try {
      const res = await apiClient.get<{
        message: string;
        data: ReportItem[] | ReportItem;
      }>('/reports/me');

      const data = res.data.data;

      const reports = Array.isArray(data)
        ? data
        : data
          ? [data]
          : [];

      return reports.map(normalizeReport);
    } catch {
      const res = await apiClient.get<{
        message: string;
        data: ReportItem[];
      }>('/reports');

      return (res.data.data || []).map(normalizeReport);
    }
  },

  async getPropertyReports(
    propertyId: number | string,
  ): Promise<ReportItem[]> {
    const res = await apiClient.get<{
      message: string;
      data: ReportItem[] | ReportItem;
    }>(`/reports/property/${propertyId}`);

    const data = res.data.data;

    const reports = Array.isArray(data)
      ? data
      : data
        ? [data]
        : [];

    return reports.map(normalizeReport);
  },

  async getReportById(
    id: number | string,
  ): Promise<ReportItem> {
    const res = await apiClient.get<{
      message: string;
      data: ReportItem;
    }>(`/reports/${id}`);

    return normalizeReport(res.data.data);
  },
};