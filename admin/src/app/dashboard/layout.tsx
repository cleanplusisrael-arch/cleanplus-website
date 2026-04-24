'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

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
        {/* Desktop Sidebar — hidden on mobile */}
        <div className="hidden md:flex md:w-64 flex-col">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto flex flex-col">
          {/* Mobile header with hamburger menu */}
          <div className="md:hidden sticky top-0 z-40 bg-navy px-4 py-3 flex items-center justify-between border-b border-navy/80">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <p className="text-white font-bold text-sm font-hebrew">Clean+</p>
            <div className="w-6" /> {/* Spacer for balance */}
          </div>

          {/* Page content */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile drawer backdrop and menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Mobile menu drawer */}
          <div className="fixed right-0 top-0 h-full w-64 z-40 md:hidden bg-navy flex flex-col shadow-lg animate-in slide-in-from-right-full duration-300">
            <Sidebar mobile={true} onLinkClick={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
