'use client';

import Header from '@/components/layout/Header';
import { useMediaQuery } from '@/lib/api/hooks/useMediaHooks';

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

export default function PhotosPage() {
  const {
    data: mediaItems,
    isLoading,
    isError,
    error,
  } = useMediaQuery();

  return (
    <>
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
        <div className="flex flex-col items-start gap-[10px] mb-6">
          <h2 className="text-[24px] font-bold text-white leading-[1.3] tracking-wide">
            Photos & Videos
          </h2>

          <span className="text-[14px] text-dark-200 leading-[1.3]">
            View media assets captured during recent inspections.
          </span>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-[6px] bg-dark-600 animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-md text-sm">
            {(error as Error)?.message || 'Failed to load media assets'}
          </div>
        )}

        {!isLoading &&
          !isError &&
          mediaItems &&
          mediaItems.length === 0 && (
            <div className="bg-dark-600 rounded-[8px] p-8 text-center text-dark-200 text-sm">
              No inspection photos or videos found for your properties.
            </div>
          )}

        {!isLoading &&
          !isError &&
          mediaItems &&
          mediaItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaItems.map((item, idx) => {
                const fileUrl =
                  item.fileUrl ||
                  item.attachment?.url ||
                  `/assets/photo-${(idx % 3) + 1}.svg`;

                const isVideo = item.type === 'VIDEO';

                const label = isVideo ? 'Video' : 'Image';

                const title =
                  item.title ||
                  (isVideo ? 'Inspection Video' : 'Inspection Photo');

                const propertyName =
                  item.property?.name || 'Property Media';

                return (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/3] rounded-[6px] overflow-hidden bg-dark-500 cursor-pointer flex flex-col justify-between p-6 border border-dark-400/20"
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

                    <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/60 z-0" />

                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                      <div>
                        <span className="text-[12px] uppercase font-bold text-white/60 tracking-wider">
                          {label}
                        </span>

                        <h3 className="text-[20px] font-bold text-white mt-1 leading-tight">
                          {title}
                        </h3>
                      </div>

                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
                            {playIcon}
                          </div>
                        </div>
                      )}

                      <span className="text-[14px] text-white/70 font-semibold mt-auto">
                        {propertyName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </>
  );
}