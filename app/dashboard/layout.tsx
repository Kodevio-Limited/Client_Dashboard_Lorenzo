'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Toast from '@/components/layout/Toast';
import { useUIStore } from '@/store/uiStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobileSidebarOpen = useUIStore((s) => s.mobileSidebarOpen);
  const setMobileSidebar = useUIStore((s) => s.setMobileSidebar);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative z-50 h-full w-[260px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              drawerClassName="relative z-50"
              onClose={() => setMobileSidebar(false)}
            />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto bg-bg scrollbar-thin">
        {children}
      </main>
      <Toast />
    </div>
  );
}
