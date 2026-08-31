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
            View media assets captured during recent property verification visits.
          </span>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
              No verification photos or videos found for your properties.
            </div>
          )}

        {!isLoading &&
          !isError &&
          mediaItems &&
          mediaItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mediaItems.map((item) => {
                const fileUrl =
                  item.fileUrl ||
                  item.attachment?.url ||
                  '';

                const isRealMedia = fileUrl && !fileUrl.includes('photo-') && !fileUrl.endsWith('.svg');
                const isVideo = item.type === 'VIDEO';

                const label = isVideo ? 'Video' : 'Image';

                const title =
                  item.title ||
                  (isVideo ? 'Verification Video' : 'Verification Photo');

                const propertyName =
                  item.property?.name || 'Property Media';

                return (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/3] rounded-[10px] overflow-hidden bg-gradient-to-br from-[#1A221C] to-[#0D120E] cursor-pointer flex flex-col justify-between p-6 border border-[#2D3830]/50 hover:border-gold-mid/40 shadow-lg transition-all"
                    onClick={() => {
                      if (fileUrl) {
                        window.open(
                          fileUrl,
                          '_blank',
                          'noopener,noreferrer',
                        );
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

                    <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/60 z-0" />

                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                      <div>
                        <span className="text-[11px] uppercase font-bold text-gold-mid tracking-wider bg-black/40 px-2 py-0.5 rounded-full border border-gold-mid/20 w-fit inline-block">
                          {label}
                        </span>

                        <h3 className="text-[18px] sm:text-[20px] font-bold text-white mt-2 leading-tight">
                          {title}
                        </h3>
                      </div>

                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all">
                            {playIcon}
                          </div>
                        </div>
                      )}

                      <span className="text-[13px] sm:text-[14px] text-white/80 font-semibold mt-auto flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-mid" />
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