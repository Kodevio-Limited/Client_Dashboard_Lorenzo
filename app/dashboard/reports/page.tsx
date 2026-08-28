'use client';

import Header from '@/components/layout/Header';
import { useMyReportsQuery } from '@/lib/api/hooks/useReportHooks';
import { PropertyThumbnail } from '@/components/shared/PropertyThumbnail';

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-dark-300">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const pdfIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export default function ReportsPage() {
  const { data: reports, isLoading, isError, error } = useMyReportsQuery();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '2026-08-29';
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  };

  const handleViewPdf = (pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
        <div className="flex flex-col items-start gap-2 sm:gap-[10px] mb-6">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-white leading-[1.3] tracking-wide">Reports</h2>
          <p className="text-[13px] sm:text-[14px] text-dark-200 leading-[1.3]">
            View and download your finalized property inspection reports.
          </p>
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
            {(error as Error)?.message || 'Failed to load reports'}
          </div>
        )}

        {!isLoading && !isError && reports && reports.length === 0 && (
          <div className="bg-dark-600 rounded-[10px] p-8 text-center text-dark-200 text-sm">
            No inspection reports available for your properties yet.
          </div>
        )}

        {!isLoading && !isError && reports && reports.length > 0 && (
          <div className="flex flex-col gap-4">
            {reports.map((report) => {
              const propertyName = report.property?.name || report.title || 'Property Report';

              return (
                <div
                  key={report.id}
                  className="bg-dark-600 border border-[#282828] hover:border-gold-mid/30 rounded-[10px] p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 transition-all"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <PropertyThumbnail
                      name={propertyName}
                      size="md"
                    />
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight truncate">
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-2 text-dark-200 text-[13px] sm:text-[14px]">
                        {calendarIcon}
                        <span>Inspected: {formatDate(report.visitDate)}</span>
                      </div>
                      {report.property?.name && (
                        <div className="text-[12px] text-dark-100 font-medium">
                          Property: {report.property.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewPdf(report.pdfUrl)}
                    disabled={!report.pdfUrl}
                    className={`rounded-[6px] px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${
                      report.pdfUrl
                        ? 'bg-[#242424] hover:bg-[#2F2F2F] active:scale-[0.98] border border-[#3A3A3A] text-white cursor-pointer shadow-md'
                        : 'bg-dark-500/30 text-white/40 border border-transparent cursor-not-allowed'
                    }`}
                  >
                    {pdfIcon}
                    <span>{report.pdfUrl ? 'View PDF' : 'No PDF'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
