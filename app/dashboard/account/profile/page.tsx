'use client';

import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const userIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const mailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const phoneIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.07 3.37a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const cameraIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export default function ProfilePage() {
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

      {/* Centered card container */}
      <div className="px-8 pb-10 flex justify-center">
        <div className="bg-dark-600 rounded-[8px] p-8 w-full max-w-2xl flex flex-col gap-6">

          {/* Photo upload container */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[120px] h-[120px] rounded-full bg-[#2B2B2B] border-2 border-dark-400 flex items-center justify-center relative cursor-pointer hover:border-gold-mid transition-colors group">
              {cameraIcon}
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[11px] text-white font-medium">Upload</span>
              </div>
            </div>
            <span className="text-[12px] text-dark-200">Click to upload photo</span>
          </div>

          {/* Full-width form fields */}
          <form className="flex flex-col gap-5">
            {/* Full Name field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-dark-200">Full Name</label>
              <div className="flex items-center gap-4 bg-[#1E1E1E] rounded-[36px] px-[22px] py-[18px] focus-within:ring-2 focus-within:ring-gold-focus/60 transition-all">
                <span className="shrink-0 flex items-center justify-center">
                  {userIcon}
                </span>
                <input
                  type="text"
                  defaultValue="Sarah Jessie"
                  className="w-full bg-transparent border-none text-sm text-white placeholder-dark-200/50 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-dark-200">Email Address</label>
              <div className="flex items-center gap-4 bg-[#1E1E1E] rounded-[36px] px-[22px] py-[18px] focus-within:ring-2 focus-within:ring-gold-focus/60 transition-all">
                <span className="shrink-0 flex items-center justify-center">
                  {mailIcon}
                </span>
                <input
                  type="email"
                  defaultValue="Sarah@gmail.com"
                  className="w-full bg-transparent border-none text-sm text-white placeholder-dark-200/50 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-dark-200">Phone Number</label>
              <div className="flex items-center gap-4 bg-[#1E1E1E] rounded-[36px] px-[22px] py-[18px] focus-within:ring-2 focus-within:ring-gold-focus/60 transition-all">
                <span className="shrink-0 flex items-center justify-center">
                  {phoneIcon}
                </span>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full bg-transparent border-none text-sm text-white placeholder-dark-200/50 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Save changes button (gold) */}
            <Button
              variant="gold"
              type="submit"
              className="w-full !rounded-[44px] !py-[18px] !text-[15px] mt-2"
            >
              Save changes
            </Button>

            {/* Update password button (gray) */}
            <Link
              href="/dashboard/account/update-pass"
              className="w-full flex items-center justify-center rounded-[44px] py-[18px] text-[15px] font-semibold text-dark-200 bg-[#1E1E1E] hover:bg-dark-400 transition-colors"
            >
              Update password
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
