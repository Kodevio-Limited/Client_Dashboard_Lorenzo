'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/lib/api/hooks/useAuthHooks';

interface SidebarProps {
  drawerClassName?: string;
  onClose?: () => void;
}

export default function Sidebar({ drawerClassName, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const isActive = (href: string) => {
    if (href === '/dashboard/account/profile') {
      return pathname.startsWith('/dashboard/account');
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    if (onClose) onClose();
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        router.push('/login');
      },
    });
  };

  const navItems = [
    {
      label: 'My Properties',
      href: '/dashboard/property',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path
            d="M8 12.8V9.93119L10.4 7.53119L12.8 9.93119V12.8H8Z"
            fill={active ? '#1A1100' : 'currentColor'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10.4C0.0002 8.72 0.4056 7.07 1.1818 5.586C1.9579 4.1 3.0818 2.824 4.4575 1.866C5.8333 0.908 7.4202 0.297 9.0831 0.085C10.746 -0.127 12.4356 0.065 14.0079 0.647C15.5802 1.228 16.9886 2.181 18.1131 3.425C19.2376 4.668 20.0449 6.165 20.4662 7.787C20.8875 9.41 20.9103 11.11 20.5327 12.743C20.1552 14.377 19.3883 15.895 18.2976 17.168L23.7664 22.633L22.6352 23.764L17.1664 18.297C15.6561 19.591 13.8065 20.425 11.8369 20.7C9.8671 20.974 7.86 20.679 6.0533 19.847C4.2465 19.016 2.716 17.684 1.6431 16.01C0.5703 14.335 0.00004 12.388 0 10.4ZM14.1664 9.033L10.9664 5.833C10.817 5.684 10.6094 5.6 10.4 5.6C10.1906 5.6 9.9829 5.684 9.8336 5.833L6.6336 9.033C6.4842 9.183 6.4 9.39 6.4 9.6V13.6C6.4 14.041 6.758 14.4 7.2 14.4H13.6C14.041 14.4 14.4 14.041 14.4 13.6V9.6C14.4 9.39 14.315 9.183 14.1664 9.033Z"
            fill={active ? '#1A1100' : 'currentColor'}
          />
        </svg>
      ),
    },
    {
      label: 'Reports',
      href: '/dashboard/reports',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path
            d="M13 9H18.5L13 3.5V9ZM6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.89 4.89 2 6 2ZM7 20H9V14H7V20ZM11 20H13V12H11V20ZM15 20H17V16H15V20Z"
            fill={active ? '#1A1100' : 'currentColor'}
          />
        </svg>
      ),
    },
    {
      label: 'Photos',
      href: '/dashboard/photos',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="16" cy="8" r="2" fill={active ? '#1A1100' : 'currentColor'} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.4 1.44C4.97 1.63 3.83 2.04 2.93 2.93C2.04 3.83 1.63 4.97 1.44 6.41C1.25 7.82 1.25 9.63 1.25 11.94V12.06C1.25 14.37 1.25 16.18 1.44 17.59C1.63 19.03 2.04 20.17 2.93 21.07C3.83 21.96 4.97 22.37 6.41 22.56C7.82 22.75 9.63 22.75 11.94 22.75H12.06C14.37 22.75 16.18 22.75 17.59 22.56C19.03 22.37 20.17 21.96 21.07 21.07C21.96 20.17 22.37 19.03 22.56 17.59C22.75 16.18 22.75 14.37 22.75 12.06V11.94C22.75 9.63 22.75 7.82 22.56 6.41C22.37 4.97 21.96 3.83 21.07 2.93C20.17 2.04 19.03 1.63 17.59 1.44C16.18 1.25 14.37 1.25 12.06 1.25H11.94C9.63 1.25 7.82 1.25 6.4 1.44ZM4 4C4.56 3.42 5.33 3.1 6.61 2.93C7.91 2.75 9.62 2.75 12 2.75C14.38 2.75 16.09 2.75 17.39 2.93C18.66 3.1 19.44 3.42 20 4C20.57 4.56 20.9 5.33 21.07 6.61C21.25 7.91 21.25 9.62 21.25 12L21.25 13.28L21.03 13.25C18.18 12.86 15.58 14.33 14.25 16.56C12.55 12.24 8.03 9.29 2.98 10.01L2.75 10.05C2.77 8.64 2.8 7.53 2.93 6.61C3.1 5.33 3.43 4.56 4 4Z"
            fill={active ? '#1A1100' : 'currentColor'}
          />
        </svg>
      ),
    },
    {
      label: 'Profile',
      href: '/dashboard/account/profile',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7ZM8 13C5.79 13 4 14.79 4 17C4 19.21 5.79 21 8 21H16C18.21 21 20 19.21 20 17C20 14.79 18.21 13 16 13H8Z"
            fill={active ? '#1A1100' : 'currentColor'}
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`w-[260px] bg-dark-600 flex flex-col shrink-0 h-screen overflow-y-auto ${drawerClassName || ''}`}
      style={{ borderRadius: drawerClassName ? '0 16px 16px 0' : '16px' }}
    >
      {onClose && (
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={onClose}
            className="text-dark-200 hover:text-white transition-colors p-1"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Brand Logo and Client Portal Header */}
      <div className="flex flex-col items-center pt-6 sm:pt-8 pb-6">
        <Link href="/dashboard/property" onClick={onClose} className="flex flex-col items-center group">
          <Image
            src="/assets/sidebar-logo.png"
            alt="Nexus Logo"
            width={110}
            height={130}
            priority
            unoptimized
            className="object-contain w-[85px] h-[100px] sm:w-[95px] sm:h-[110px] transition-transform group-hover:scale-105"
          />
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#D1A736] uppercase mt-2.5 select-none drop-shadow-[0_0_8px_rgba(209,167,54,0.3)]">
            Client Portal
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-2 mx-auto w-[210px]">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 text-[14px] leading-tight transition-all rounded-[6px] ${
                active
                  ? 'text-[#1A1100] font-semibold shadow-md shadow-gold-mid/10'
                  : 'text-dark-200 font-normal hover:text-white hover:bg-white/5'
              }`}
              style={
                active
                  ? {
                      background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)',
                    }
                  : undefined
              }
              aria-label={item.label}
            >
              {item.icon(active)}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Logout button at bottom */}
      <div className="mx-auto pb-6 w-[210px]">
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-dark-200 font-normal hover:text-white hover:bg-white/5 rounded-[6px] transition-all cursor-pointer"
          aria-label="Logout"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-dark-200 group-hover:text-white">
            <path d="M7 15H3.5C2.67 15 2 14.33 2 13.5V4.5C2 3.67 2.67 3 3.5 3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 13L16 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Log Out'}</span>
        </button>
      </div>
    </aside>
  );
}
