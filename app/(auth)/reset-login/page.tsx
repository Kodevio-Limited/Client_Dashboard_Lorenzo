'use client';

import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function ResetLoginPage() {
  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left side background image */}
      <div className="w-[983px] shrink-0 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/reset.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-16">
        <div className="w-full max-w-[520px]">
          <div className="mb-10 text-center">
            <h1 className="text-[38px] font-bold text-white leading-[1.2] mb-2">Reset Password</h1>
            <p className="text-dark-200 text-[15px]">
              Enter the email associated with your account, and we'll send you a secure reset link.
            </p>
          </div>
          <form className="flex flex-col gap-5">
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
