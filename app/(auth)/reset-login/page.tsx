'use client';

import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Image from 'next/image';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function ResetLoginPage() {
  return (
    <div className="min-h-screen bg-bg flex relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/reset.png)' }}
      />
      <div className="absolute inset-0 bg-black/40 lg:hidden" />

      {/* Desktop: left side background image */}
      <div className="hidden lg:block w-[983px] shrink-0 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/reset.png)',
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
            <h1 className="text-[38px] font-bold text-white leading-[1.2] mb-2">Reset Password</h1>
            <p className="text-dark-200 text-[15px]">
              Enter the email associated with your account, and we'll send you a secure reset link.
            </p>
          </div>
          <form className="flex flex-col gap-4">
            <Input
              icon={envelopeIcon}
              label="Registered Email Address"
              type="email"
              placeholder="Enter your email..."
              required
            />
            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-[44px] !py-[22px] !text-[15px]"
              type="submit"
            >
              Sent Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
