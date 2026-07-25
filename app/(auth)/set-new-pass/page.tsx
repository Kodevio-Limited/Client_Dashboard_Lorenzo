'use client';

import { useState } from 'react';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Image from 'next/image';

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const eyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const eyeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export default function SetNewPassPage() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/set-new-pass.png)' }}
      />
      <div className="absolute inset-0 bg-black/40 lg:hidden" />

      {/* Desktop: left side background image */}
      <div className="hidden lg:block w-[983px] shrink-0 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/set-new-pass.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent flex flex-col justify-center px-20 lg:px-24 py-16">
          <p className="text-gold-mid text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Nexus Property Verification
          </p>
          <h2 className="text-white text-[38px] font-bold leading-[1.2] mb-3">
            Jamaica's Trusted<br />Inspection Partner
          </h2>
          <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
            Professional property verification, local representation, and inspection services across Jamaica.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-8 lg:px-16 relative z-10 pt-10 sm:pt-16 lg:pt-0 pb-8 lg:pb-0">
        <div className="w-full max-w-[520px] bg-dark-600/90 lg:bg-transparent backdrop-blur-sm rounded-[20px] p-8 lg:p-0">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/sidebar-logo.png"
              alt="Nexus"
              width={100}
              height={150}
              priority
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-[38px] font-bold text-white leading-[1.2] mb-2">Set New Password</h1>
            <p className="text-dark-200 text-[15px]">Please choose a strong password to secure your Nexus account.</p>
          </div>
          <form className="flex flex-col gap-4">
            <Input
              icon={lockIcon}
              label="New Password"
              type={showPass1 ? 'text' : 'password'}
              placeholder="********"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass1(!showPass1)}
                  className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                >
                  {showPass1 ? eyeIcon : eyeOffIcon}
                </button>
              }
            />
            <Input
              icon={lockIcon}
              label="Confirm New Password"
              type={showPass2 ? 'text' : 'password'}
              placeholder="********"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass2(!showPass2)}
                  className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                >
                  {showPass2 ? eyeIcon : eyeOffIcon}
                </button>
              }
            />
            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-[44px] !py-[22px] !text-[15px]"
              type="submit"
            >
              Set New Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
