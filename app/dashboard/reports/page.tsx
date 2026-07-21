'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';

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

const mockReports = [
  { id: '1', title: 'Villa Kingston', date: '2026-08-10', image: '/assets/photo-1.svg' },
  { id: '2', title: 'Villa Kingston', date: '2026-08-10', image: '/assets/photo-2.svg' },
  { id: '3', title: 'Villa Kingston', date: '2026-08-10', image: '/assets/photo-3.svg' },
];

export default function ReportsPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3] tracking-wide">Reports</h2>
          <p className="text-[14px] text-dark-200 leading-[1.3]">
            View and download your finalized property reports.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="bg-dark-600 rounded-[8px] p-6 flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-[88px] h-[88px] rounded-[6px] overflow-hidden shrink-0 relative">
                  <Image
                    src={report.image}
                    alt={report.title}
                    width={88}
                    height={88}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[20px] font-bold text-white leading-[1.2]">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-dark-200 text-[14px]">
                    <span className="text-dark-300">{calendarIcon}</span>
                    <span>Inspected: {report.date}</span>
                  </div>
                </div>
              </div>
              <button
                className="bg-dark-400/50 hover:bg-dark-400 rounded-[4px] px-6 py-3 text-[14px] font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                {pdfIcon}
                <span>View Pdf</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
