'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const pinIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const documentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const photoIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const clockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const properties = [
  { id: '1', name: 'Villa Kingston', address: 'Kingston, Jamaica', date: '2026-08-10', image: '/assets/photo-1.svg' },
  { id: '2', name: 'Villa Kingston', address: 'Kingston, Jamaica', date: '2026-08-10', image: '/assets/photo-2.svg' },
  { id: '3', name: 'Villa Kingston', address: 'Kingston, Jamaica', date: '2026-08-10', image: '/assets/photo-3.svg' },
];

export default function PropertyPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3] tracking-wide">My Properties</h2>
          <span className="text-[14px] text-dark-200 leading-[1.3]">
            Select a property below to view its reports, media, and history
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-dark-600 rounded-[8px] p-6 flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-[88px] h-[88px] rounded-[6px] overflow-hidden shrink-0 relative">
                  <Image
                    src={property.image}
                    alt={property.name}
                    width={88}
                    height={88}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[20px] font-bold text-white leading-[1.2]">
                    {property.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-dark-200 text-[14px]">
                      <span className="text-dark-300">{pinIcon}</span>
                      <span>{property.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-dark-200 text-[14px]">
                      <span className="text-dark-300">{calendarIcon}</span>
                      <span>Inspected: {property.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons on the right */}
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/reports"
                  className="rounded-[4px] px-6 py-3 text-[14px] font-semibold text-bg hover:brightness-110 transition-all flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)',
                  }}
                >
                  {documentIcon}
                  <span>Report</span>
                </Link>
                <Link
                  href="/dashboard/property/media"
                  className="bg-dark-400/50 hover:bg-dark-400 rounded-[4px] px-6 py-3 text-[14px] font-semibold text-white transition-colors flex items-center gap-2"
                >
                  {photoIcon}
                  <span>Media</span>
                </Link>
                <Link
                  href="/dashboard/property/history"
                  className="bg-dark-400/50 hover:bg-dark-400 rounded-[4px] px-6 py-3 text-[14px] font-semibold text-white transition-colors flex items-center gap-2"
                >
                  {clockIcon}
                  <span>History</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
