'use client';

import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useProfileQuery } from '@/lib/api/hooks/useProfileHooks';

export default function Header() {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayName = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const dateStr = `${dayName}, ${day} ${month} ${year}`;

  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar);
  const storeUser = useAuthStore((s) => s.user);
  
  // Also query profile to keep in sync
  const { data: profile } = useProfileQuery();
  const currentUser = profile || storeUser;

  const fullName = currentUser
    ? [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || 'Client User'
    : 'Client User';

  const email = currentUser?.email || 'info@nexuspbs.net';

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || 'C'}${currentUser.lastName?.[0] || 'U'}`.toUpperCase()
    : 'CU';

  return (
    <div className="bg-dark-600 mt-12">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-4 pb-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden text-white hover:text-amber-300 transition-colors p-1.5 -ml-1.5"
            aria-label="Toggle sidebar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex flex-col items-start gap-0.5 min-w-0">
            <h1 className="text-[16px] sm:text-[20px] font-medium text-white leading-[1.3] truncate">
              Good Morning
            </h1>
            <span className="text-[11px] sm:text-[13px] font-normal text-white/70 leading-[1.3] truncate max-w-[200px] sm:max-w-none">
              {dateStr}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-[10px] shrink-0">
          <div
            className="w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-full flex items-center justify-center text-bg text-[13px] sm:text-[15px] font-bold shrink-0"
            style={{ background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)' }}
            aria-label="Client avatar"
          >
            {initials}
          </div>
          <div className="hidden sm:flex flex-col gap-[2px] min-w-0">
            <span className="text-white leading-[1.2] text-[15px] font-medium truncate">
              {fullName}
            </span>
            <span className="text-dark-100 leading-[1.2] text-[11px] font-medium truncate max-w-[160px]">
              {email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
