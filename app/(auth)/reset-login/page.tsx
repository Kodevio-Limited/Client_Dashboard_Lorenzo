'use client';

import { useState } from 'react';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { useForgotPasswordMutation } from '@/lib/api/hooks/useAuthHooks';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function ResetLoginPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    forgotPasswordMutation.mutate(email, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
    });
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/reset.png)' }}
      />
      <div className="absolute inset-0 bg-black/60 lg:hidden" />

      {/* Desktop: left side hero image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden min-h-screen">
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
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10 py-12 lg:py-0">
        <div className="w-full max-w-[460px] bg-dark-600/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-[24px] p-8 sm:p-10 lg:p-0">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-[36px] font-bold text-white leading-tight mb-2.5">Reset Password</h1>
            <p className="text-dark-200 text-sm sm:text-[15px]">
              Enter the email associated with your account, and we'll send you a secure reset link.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {isSubmitted && (
              <div className="p-3.5 rounded-xl bg-success/15 border border-success/40 text-success text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-white">Reset Link Sent</p>
                  <p className="text-[13px] text-white/80 mt-0.5 leading-relaxed">
                    If an account exists for {email}, a password reset link has been dispatched to your inbox.
                  </p>
                </div>
              </div>
            )}

            <Input
              icon={envelopeIcon}
              label="Registered Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              autoComplete="email"
              required
            />
            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-full !py-3.5 !text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95"
              type="submit"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
            <div className="flex justify-center mt-2">
              <Link href="/login" className="text-sm text-gold-mid hover:text-gold-start transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
