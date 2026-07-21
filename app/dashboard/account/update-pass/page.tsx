'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import { Button } from '@/components/shared/Button';

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const eyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const eyeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

function PasswordField({
  label,
  placeholder,
  show,
  onToggle,
}: {
  label: string;
  placeholder?: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-dark-200">{label}</label>
      <div className="flex items-center gap-4 bg-[#1E1E1E] rounded-[36px] px-[22px] py-[18px] focus-within:ring-2 focus-within:ring-gold-focus/60 transition-all">
        <span className="shrink-0 flex items-center justify-center">
          {lockIcon}
        </span>
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder || '********'}
          className="w-full bg-transparent border-none text-sm text-white placeholder-dark-200/50 focus:outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 flex items-center justify-center text-dark-200 hover:text-white transition-colors cursor-pointer"
        >
          {show ? eyeIcon : eyeOffIcon}
        </button>
      </div>
    </div>
  );
}

export default function UpdatePassPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">User Account</h2>
        </div>
      </div>
      <div className="px-8 pb-[20px]">
        <AccountNav />
      </div>

      {/* Centered card container — full width of card */}
      <div className="px-8 pb-10 flex justify-center">
        <div className="bg-dark-600 rounded-[8px] p-8 w-full max-w-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-[20px] font-bold text-white leading-[1.3]">Update Password</h3>
            <p className="text-[14px] text-dark-200">Choose a strong password to keep your account secure.</p>
          </div>

          <form className="flex flex-col gap-5">
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
            />
            <PasswordField
              label="New Password"
              placeholder="Enter new password"
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
            />
            <PasswordField
              label="Confirm New Password"
              placeholder="Confirm new password"
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />

            <Button
              variant="gold"
              type="submit"
              className="w-full !rounded-[44px] !py-[18px] !text-[15px] mt-2"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
