'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  // Auto-close drawer on page navigation
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mx-auto mb-3">
            <span className="text-gold font-bold">C+</span>
          </div>
          <p className="text-sm text-gray-400 font-hebrew">טוען...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className="flex min-h-screen" dir="rtl">
        {/* Desktop sidebar — hidden below md (768px) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          {/* Mobile top bar — visible below md only */}
          <div className="md:hidden sticky top-0 z-30 bg-navy px-4 py-3 flex items-center justify-between">
            <span className="text-white font-bold text-sm font-hebrew">Clean+ ניהול</span>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="פתח תפריט"
              className="text-white p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>

          {children}
        </main>
      </div>

      {/* Mobile drawer — rendered outside flex to avoid layout interference */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" dir="rtl">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer slides in from the right (RTL start side) */}
          <div className="absolute top-0 right-0 h-full w-64 overflow-y-auto shadow-2xl">
            <Sidebar onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
