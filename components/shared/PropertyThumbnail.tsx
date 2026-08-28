'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropertyThumbnailProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PropertyThumbnail({
  src,
  name,
  size = 'md',
  className = '',
}: PropertyThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  // Generate clean 2-letter monogram from property name (e.g. "Duplex Villa" -> "DV")
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'PV';

  const sizeClasses = {
    sm: 'w-14 h-14 rounded-[8px]',
    md: 'w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-[10px]',
    lg: 'w-24 h-24 sm:w-28 sm:h-28 rounded-[12px]',
  };

  const isRealImage =
    src &&
    !src.includes('photo-') &&
    !src.endsWith('.svg') &&
    !imageError;

  if (isRealImage) {
    return (
      <div
        className={`relative overflow-hidden shrink-0 bg-dark-500 border border-white/10 ${sizeClasses[size]} ${className}`}
      >
        <Image
          src={src}
          alt={name}
          fill
          sizes="120px"
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>
    );
  }

  // Modern Luxury Architectural Monogram Badge (when no real photo is available)
  return (
    <div
      className={`relative overflow-hidden shrink-0 flex flex-col items-center justify-center p-2 border border-gold-mid/30 shadow-[0_4px_16px_rgba(0,0,0,0.6)] ${sizeClasses[size]} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1C241E 0%, #101612 50%, #080D0A 100%)',
      }}
    >
      {/* Subtle ambient gold radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(209,167,54,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Villa / Architectural Outline Icon */}
      <svg
        width={size === 'sm' ? 18 : 22}
        height={size === 'sm' ? 18 : 22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#D1A736"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-1 drop-shadow-[0_0_6px_rgba(209,167,54,0.4)] z-10"
      >
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1M9 18h1M14 18h1" />
      </svg>

      {/* Monogram Badge */}
      <span
        className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FCE688] uppercase z-10 leading-none"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
      >
        {initials}
      </span>
    </div>
  );
}
