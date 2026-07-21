'use client';

import { useState } from 'react';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent, demoEmail?: string, demoPass?: string) => {
    e?.preventDefault();
    const finalEmail = demoEmail || email;
    const finalPass = demoPass || password;

    if (finalEmail === 'admin@demo.com' && finalPass === 'admin123') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left side background image */}
      <div className="w-[983px] shrink-0 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-16">
        <div className="w-full max-w-[520px]">
          <div className="mb-10 text-center">
            <h1 className="text-[38px] font-bold text-white leading-[1.2] mb-2">Welcome Back</h1>
            <p className="text-dark-200 text-[15px]">Enter your credentials to access your dashboard.</p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <Input
              icon={envelopeIcon}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
            <div className="flex flex-col gap-1.5">
              <Input
                icon={lockIcon}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? eyeIcon : eyeOffIcon}
                  </button>
                }
              />
            </div>
            <div className="flex justify-end">
              <Link href="/reset-login" className="text-[13px] text-gold-mid hover:text-gold-start transition-colors">
                Forgot password?
              </Link>
            </div>
            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-[44px] !py-[22px] !text-[15px]"
              type="submit"
            >
              Secure Login
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
