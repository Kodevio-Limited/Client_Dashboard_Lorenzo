'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import { usePropertyDetailsQuery } from '@/lib/api/hooks/usePropertyHooks';
import { usePropertyReportsQuery } from '@/lib/api/hooks/useReportHooks';

const arrowLeftIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const pdfIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1A736" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <text x="6" y="16" fontSize="6" fontWeight="bold" fill="#D1A736" stroke="none" fontFamily="sans-serif">PDF</text>
  </svg>
);

function PropertyHistoryContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId') || undefined;

  const { data: property } = usePropertyDetailsQuery(propertyId);
  const { data: reports, isLoading } = usePropertyReportsQuery(propertyId);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
      {/* Circular Back button */}
      <Link
        href="/dashboard/property"
        className="w-10 h-10 rounded-full border border-dark-400 flex items-center justify-center text-dark-200 hover:text-white hover:border-white transition-colors mb-6 cursor-pointer"
        aria-label="Back to properties"
      >
        {arrowLeftIcon}
      </Link>

      <div className="flex flex-col items-start gap-[10px] mb-6">
        <h2 className="text-[24px] font-bold text-white leading-[1.3]">
          {property?.name || 'Property History'}
        </h2>
        <span className="text-[14px] text-dark-200 leading-[1.3]">
          Recent Activity & Verification History
        </span>
      </div>

      {isLoading ? (
        <div className="bg-dark-600 rounded-[8px] p-6 animate-pulse h-32" />
      ) : !reports || reports.length === 0 ? (
        <div className="bg-dark-600 rounded-[8px] p-8 text-center text-dark-200 text-sm">
          No history or past verification reports recorded for this property yet.
        </div>
      ) : (
        <div className="bg-dark-600 rounded-[8px] p-6 max-w-6xl">
          <div className="flex flex-col">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex gap-4 items-center border-b border-dark-400/30 py-4 last:border-0 last:pb-0 first:pt-0"
              >
                <div className="w-[60px] h-[72px] rounded-[4px] overflow-hidden shrink-0 bg-[#2B2B2B] flex items-center justify-center">
                  {pdfIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-medium text-white leading-[1.3]">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-dark-200 text-[13px] mt-1.5">
                    {calendarIcon}
                    <span>Verified: {formatDate(report.visitDate)}</span>
                  </div>
                </div>
                {report.pdfUrl && (
                  <button
                    onClick={() => window.open(report.pdfUrl, '_blank')}
                    className="text-xs text-gold-mid hover:underline font-semibold"
                  >
                    View Report
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyHistoryPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="p-8 text-white">Loading history...</div>}>
        <PropertyHistoryContent />
      </Suspense>
    </>
  );
}
