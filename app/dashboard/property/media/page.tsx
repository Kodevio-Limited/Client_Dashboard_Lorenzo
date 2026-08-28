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
            {propertyMedia.map((item, idx) => {
              const fileUrl =
                item.fileUrl ||
                item.attachment?.url ||
                `/assets/photo-${(idx % 3) + 1}.svg`;

              const isVideo = item.type === 'VIDEO';

              const title =
                item.title ||
                (isVideo
                  ? 'Video Tour'
                  : 'Property Photo');

              return (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-[6px] overflow-hidden bg-dark-500 cursor-pointer flex items-center justify-center border border-dark-400/20"
                  onClick={() =>
                    window.open(
                      fileUrl,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }
                >
                  {isVideo ? (
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
                  )}

                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/55 flex items-center justify-center p-4">
                    {isVideo ? (
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                        {playIcon}
                      </div>
                    ) : (
                      <span className="text-[20px] text-white font-bold text-center tracking-wide leading-tight">
                        {title}
                      </span>
                    )}
                  </div>
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