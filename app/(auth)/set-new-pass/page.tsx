'use client';

import { useState, useEffect, Suspense } from 'react';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/lib/api/hooks/useAuthHooks';
import { useUIStore } from '@/store/uiStore';

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const keyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-1.5 1.5L12 11a5 5 0 1 0 4 4l5.5-5.5v-3H19v-2.5h-2.5V4Z" />
    <circle cx="7" cy="17" r="1" />
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

function SetNewPassContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';
  
  const [token, setToken] = useState(tokenFromUrl);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const router = useRouter();
  const addToast = useUIStore((s) => s.addToast);
  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      addToast('Reset token is required. Please check your reset link or enter the token.', 'error');
      return;
    }

    if (!pass1 || !pass2) {
      addToast('Please enter and confirm your new password.', 'error');
      return;
    }

    if (pass1.length < 8) {
      addToast('Password must be at least 8 characters long.', 'error');
      return;
    }

    if (pass1 !== pass2) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    resetPasswordMutation.mutate(
      {
        token,
        newPassword: pass1,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/set-new-pass.png)' }}
      />
      <div className="absolute inset-0 bg-black/60 lg:hidden" />

      {/* Desktop: left side hero image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden min-h-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/set-new-pass.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-12 lg:px-16 xl:px-24 relative z-10 py-8 sm:py-12 lg:py-0">
        <div className="w-full max-w-[460px] bg-dark-600/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-[24px] p-6 sm:p-10 lg:p-0">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-[36px] font-bold text-white leading-tight mb-2.5">Set New Password</h1>
            <p className="text-dark-200 text-sm sm:text-[15px]">Please choose a strong password to secure your Nexus account.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!tokenFromUrl && (
              <Input
                icon={keyIcon}
                label="Reset Token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter or paste reset token..."
                required
              />
            )}

            <Input
              icon={lockIcon}
              label="New Password"
              type={showPass1 ? 'text' : 'password'}
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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
              className="w-full mt-2 !rounded-full !py-3.5 !text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95"
              type="submit"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? 'Resetting Password...' : 'Set New Password'}
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

export default function SetNewPassPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-dark-200">Loading...</div>}>
      <SetNewPassContent />
    </Suspense>
  );
}
