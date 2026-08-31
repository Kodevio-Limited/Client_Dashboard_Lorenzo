'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import { usePropertiesQuery } from '@/lib/api/hooks/usePropertyHooks';
import { PropertyThumbnail } from '@/components/shared/PropertyThumbnail';

const pinIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-dark-300">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-dark-300">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const documentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1100" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const photoIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const clockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function PropertyPage() {
  const { data: properties, isLoading, isError, error } = usePropertiesQuery();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '2026-08-29';
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
        <div className="flex flex-col items-start gap-2 sm:gap-[10px] mb-6">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-white leading-[1.3] tracking-wide">My Properties</h2>
          <span className="text-[13px] sm:text-[14px] text-dark-200 leading-[1.3]">
            Select a property below to view its reports, media, and history
          </span>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-dark-600 rounded-[10px] p-6 animate-pulse h-28" />
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-md text-sm">
            {(error as Error)?.message || 'Failed to load properties'}
          </div>
        )}

        {!isLoading && !isError && properties && properties.length === 0 && (
          <div className="bg-dark-600 rounded-[10px] p-8 text-center text-dark-200 text-sm">
            No properties found registered under your client account.
          </div>
        )}

        {!isLoading && !isError && properties && properties.length > 0 && (
          <div className="flex flex-col gap-4">
            {properties.map((property) => {
              const imageSrc =
                property.attachments && property.attachments.length > 0
                  ? property.attachments[0].fileUrl
                  : null;

              const fullAddress = [property.city, property.parish].filter(Boolean).join(', ') || 'Kingston, Jamaica';
              const verificationDate = formatDate(property.nextVisitDate || property.updatedAt || property.createdAt);

              return (
                <div
                  key={property.id}
                  className="bg-dark-600 border border-[#282828] hover:border-gold-mid/30 rounded-[10px] p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                    {/* Modern luxury thumbnail fallback */}
                    <PropertyThumbnail
                      src={imageSrc}
                      name={property.name}
                      size="md"
                    />

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight truncate">
                        {property.name}
                      </h3>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-dark-200 text-[13px] sm:text-[14px]">
                          {pinIcon}
                          <span>{fullAddress}</span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-200 text-[13px] sm:text-[14px]">
                          {calendarIcon}
                          <span>Verified: {verificationDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons matching Figma */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                    <Link
                      href={`/dashboard/reports?propertyId=${property.id}`}
                      className="rounded-[6px] px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-semibold text-[#1A1100] shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
                      style={{
                        background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)',
                      }}
                    >
                      {documentIcon}
                      <span>Report</span>
                    </Link>
                    <Link
                      href={`/dashboard/property/media?propertyId=${property.id}`}
                      className="bg-[#242424] hover:bg-[#2F2F2F] active:scale-[0.98] border border-[#3A3A3A] rounded-[6px] px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-medium text-white transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
                    >
                      {photoIcon}
                      <span>Media</span>
                    </Link>
                    <Link
                      href={`/dashboard/property/history?propertyId=${property.id}`}
                      className="bg-[#242424] hover:bg-[#2F2F2F] active:scale-[0.98] border border-[#3A3A3A] rounded-[6px] px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-medium text-white transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
                    >
                      {clockIcon}
                      <span>History</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
