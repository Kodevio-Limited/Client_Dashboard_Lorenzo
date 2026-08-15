export const QUERY_KEYS = {
  profile: ['profile'] as const,
  properties: ['properties'] as const,
  propertyDetails: (id: string | number) => ['properties', id] as const,
  reports: ['reports'] as const,
  propertyReports: (propertyId: string | number) => ['reports', 'property', propertyId] as const,
  reportDetails: (id: string | number) => ['reports', id] as const,
  media: ['media'] as const,
  reportMedia: (reportId: string | number) => ['media', 'report', reportId] as const,
};
