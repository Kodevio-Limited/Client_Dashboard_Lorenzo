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

const playIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const mediaItems = [
  { id: '1', title: 'Front Elevation', url: '/assets/photo-1.svg', type: 'image' },
  { id: '2', title: 'Interior Living', url: '/assets/photo-2.svg', type: 'image' },
  { id: '3', title: 'Video Tour', url: '/assets/photo-3.svg', type: 'video' },
];

export default function PropertyMediaPage() {
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
            Property Media Gallery
          </span>
        </div>

        <div className="bg-dark-600 rounded-[8px] p-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-[6px] overflow-hidden bg-dark-500 cursor-pointer flex items-center justify-center border border-dark-400/20"
              >
                {/* Background Image */}
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-102"
                  unoptimized
                />
                
                {/* Overlay layer (semi-translucent black to make text/icon visible) */}
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/55 flex items-center justify-center p-4">
                  {item.type === 'video' ? (
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                      {playIcon}
                    </div>
                  ) : (
                    <span className="text-[20px] text-white font-bold text-center tracking-wide leading-tight">
                      {item.title}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
