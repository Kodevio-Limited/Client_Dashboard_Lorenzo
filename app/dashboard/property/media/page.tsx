'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import { usePropertyDetailsQuery } from '@/lib/api/hooks/usePropertyHooks';
import { useMediaQuery } from '@/lib/api/hooks/useMediaHooks';

const arrowLeftIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const playIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="white"
    stroke="none"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

function PropertyMediaContent() {
  const searchParams = useSearchParams();

  const propertyId =
    searchParams.get('propertyId') || undefined;

  const { data: property } =
    usePropertyDetailsQuery(propertyId);

  const {
    data: allMedia,
    isLoading,
  } = useMediaQuery();

  const propertyMedia = allMedia?.filter((m) =>
    propertyId
      ? String(m.propertyId) === String(propertyId)
      : true,
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
      <Link
        href="/dashboard/property"
        className="w-10 h-10 rounded-full border border-dark-400 flex items-center justify-center text-dark-200 hover:text-white hover:border-white transition-colors mb-6 cursor-pointer"
        aria-label="Back to properties"
      >
        {arrowLeftIcon}
      </Link>

      <div className="flex flex-col items-start gap-[10px] mb-6">
        <h2 className="text-[24px] font-bold text-white leading-[1.3]">
          {property?.name || 'Property Media'}
        </h2>

        <span className="text-[14px] text-dark-200 leading-[1.3]">
          Property Media Gallery
        </span>
      </div>

      {isLoading ? (
        <div className="bg-dark-600 rounded-[8px] p-6 animate-pulse h-32" />
      ) : !propertyMedia || propertyMedia.length === 0 ? (
        <div className="bg-dark-600 rounded-[8px] p-8 text-center text-dark-200 text-sm">
          No photos or videos recorded for this property yet.
        </div>
      ) : (
        <div className="bg-dark-600 rounded-[8px] p-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertyMedia.map((item) => {
              const fileUrl =
                item.fileUrl ||
                item.attachment?.url ||
                '';

              const isRealMedia = fileUrl && !fileUrl.includes('photo-') && !fileUrl.endsWith('.svg');
              const isVideo = item.type === 'VIDEO';

              const title =
                item.title ||
                (isVideo
                  ? 'Video Tour'
                  : 'Property Photo');

              return (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-[10px] overflow-hidden bg-gradient-to-br from-[#1A221C] to-[#0D120E] cursor-pointer flex items-center justify-center border border-[#2D3830]/50 hover:border-gold-mid/40 shadow-lg transition-all"
                  onClick={() => {
                    if (fileUrl) {
                      window.open(fileUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  {isRealMedia && (
                    isVideo ? (
                      <video
                        src={fileUrl}
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={fileUrl}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )
                  )}

                  {!isRealMedia && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center mb-3">
                        {isVideo ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#D1A736">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        ) : (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D1A736" strokeWidth="1.8">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        )}
                      </div>
                      <span className="text-white font-bold text-[16px] tracking-wide leading-tight">
                        {title}
                      </span>
                    </div>
                  )}

                  {isRealMedia && (
                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/55 flex items-center justify-center p-4">
                      {isVideo ? (
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all">
                          {playIcon}
                        </div>
                      ) : (
                        <span className="text-[18px] text-white font-bold text-center tracking-wide leading-tight">
                          {title}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyMediaPage() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <div className="p-8 text-white">
            Loading media...
          </div>
        }
      >
        <PropertyMediaContent />
      </Suspense>
    </>
  );
}