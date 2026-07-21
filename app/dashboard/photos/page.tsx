'use client';

import Image from 'next/image';
import Header from '@/components/layout/Header';

const playIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const mediaItems = [
  { id: '1', label: 'Image', title: 'Front Elevation', property: 'Villa Kingston', url: '/assets/photo-1.svg', type: 'image' },
  { id: '2', label: 'Image', title: 'Interior Living', property: 'Villa Kingston', url: '/assets/photo-2.svg', type: 'image' },
  { id: '3', label: 'Video', title: 'Video Tour', property: 'Villa Kingston', url: '/assets/photo-3.svg', type: 'video' },
];

export default function PhotosPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3] tracking-wide">Photos & Videos</h2>
          <span className="text-[14px] text-dark-200 leading-[1.3]">
            View media assets captured during recent inspections.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-[6px] overflow-hidden bg-dark-500 cursor-pointer flex flex-col justify-between p-6 border border-dark-400/20"
            >
              {/* Background Image */}
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-102"
                unoptimized
              />

              {/* Overlay with semi-translucent black to ensure text readability */}
              <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/60 z-0" />

              {/* Card content aligned inside the overlay */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <span className="text-[12px] uppercase font-bold text-white/60 tracking-wider">
                    {item.label}
                  </span>
                  <h3 className="text-[20px] font-bold text-white mt-1 leading-tight">
                    {item.type === 'video' ? item.title : item.title}
                  </h3>
                </div>

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
                      {playIcon}
                    </div>
                  </div>
                )}

                <span className="text-[14px] text-white/70 font-semibold mt-auto">
                  {item.property}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
