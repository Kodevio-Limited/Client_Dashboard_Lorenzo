'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';

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

const pageIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const bellIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const mockHistory = [
  {
    id: '1',
    event: 'Final Report Generated',
    date: '2026-08-10',
    icon: pdfIcon,
  },
  {
    id: '2',
    event: 'Inspection completed on-site',
    date: '2026-08-10',
    icon: pageIcon,
  },
  {
    id: '3',
    event: 'Property Verification Requested',
    date: '2026-08-10',
    icon: bellIcon,
  },
];

export default function PropertyHistoryPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        {/* Circular Back button */}
        <Link
          href="/dashboard/property"
          className="w-10 h-10 rounded-full border border-dark-400 flex items-center justify-center text-dark-200 hover:text-white hover:border-white transition-colors mb-6 cursor-pointer"
          aria-label="Back to properties"
        >
          {arrowLeftIcon}
        </Link>

        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3]">Villa Kingston</h2>
          <span className="text-[14px] text-dark-200 leading-[1.3]">
            Recent Activity & Inspections
          </span>
        </div>

        <div className="bg-dark-600 rounded-[8px] p-6 max-w-6xl">
          <div className="flex flex-col">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b border-dark-400/30 py-4 last:border-0 last:pb-0 first:pt-0"
              >
                <div className="w-[60px] h-[72px] rounded-[4px] overflow-hidden shrink-0 bg-[#2B2B2B] flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-medium text-white leading-[1.3]">
                    {item.event}
                  </h3>
                  <div className="flex items-center gap-2 text-dark-200 text-[13px] mt-1.5">
                    {calendarIcon}
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
