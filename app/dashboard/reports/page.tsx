'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';
import { useMyReportsQuery } from '@/lib/api/hooks/useReportHooks';

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const pdfIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export default function ReportsPage() {
  const { data: reports, isLoading, isError, error } = useMyReportsQuery();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
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
        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3] tracking-wide">Reports</h2>
          <p className="text-[14px] text-dark-200 leading-[1.3]">
            View and download your finalized property reports.
          </p>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-dark-600 rounded-[8px] p-6 animate-pulse h-28" />
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-md text-sm">
            {(error as Error)?.message || 'Failed to load reports'}
          </div>
        )}

        {!isLoading && !isError && reports && reports.length === 0 && (
          <div className="bg-dark-600 rounded-[8px] p-8 text-center text-dark-200 text-sm">
            No inspection reports available for your properties yet.
          </div>
        )}

        {!isLoading && !isError && reports && reports.length > 0 && (
          <div className="flex flex-col gap-4">
            {reports.map((report, idx) => {
              const imageSrc = `/assets/photo-${(idx % 3) + 1}.svg`;

              return (
                <div
                  key={report.id}
                  className="bg-dark-600 rounded-[8px] p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-[6px] overflow-hidden shrink-0 relative bg-dark-500">
                      <Image
                        src={imageSrc}
                        alt={report.title}
                        width={88}
                        height={88}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-[1.2] truncate">
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-2 text-dark-200 text-[13px] sm:text-[14px]">
                        <span className="text-dark-300">{calendarIcon}</span>
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
                    className={`rounded-[4px] px-6 py-3 text-[14px] font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                      report.pdfUrl
                        ? 'bg-dark-400/50 hover:bg-dark-400 cursor-pointer'
                        : 'bg-dark-500/30 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {pdfIcon}
                    <span>{report.pdfUrl ? 'View Pdf' : 'No PDF'}</span>
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
