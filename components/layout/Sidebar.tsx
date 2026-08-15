'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
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
      <div className="flex flex-col items-center pt-4 sm:pt-[32px] pb-0">
        <Link href="/" onClick={onClose}>
          <Image
            src="/assets/sidebar-logo.png"
            alt="Logo"
            width={145}
            height={218}
            priority
            unoptimized
            className="object-contain w-[90px] h-[135px] sm:w-[120px] sm:h-[180px] lg:w-[145px] lg:h-[218px]"
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-[10px] mx-auto mt-0" style={{ width: '200px' }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-[10px] px-[14px] py-[8px] text-[14px] leading-[1.3] transition-colors ${
                active
                  ? 'text-bg font-medium rounded-[4px]'
                  : 'text-dark-200 font-normal hover:text-dark-100'
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
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className={
                  active
                    ? 'brightness-0 invert sepia-[0.3] saturate-[2] hue-rotate-[350deg] drop-shadow-[0_0_3px_rgba(255,255,255,0.85)]'
                    : 'brightness-0 sepia saturate-[6] hue-rotate-[5deg] drop-shadow-[0_0_4px_rgba(251,191,36,0.65)]'
                }
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="mx-auto pb-6" style={{ width: '200px' }}>
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-[10px] px-[14px] py-[8px] text-[14px] leading-[1.3] text-dark-200 font-normal hover:text-dark-100 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <Image
            src="/assets/icons/logout-icon.svg"
            alt=""
            width={18}
            height={18}
            className="brightness-0 sepia saturate-[6] hue-rotate-[5deg] drop-shadow-[0_0_4px_rgba(251,191,36,0.65)]"
            aria-hidden="true"
          />
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}
