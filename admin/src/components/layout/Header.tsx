'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const router   = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.push('/login');
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between" dir="rtl">
      <h1 className="text-base sm:text-lg font-bold text-navy font-hebrew">{title}</h1>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors relative">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2.5 ps-3 border-s border-gray-100">
          <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
            <span className="text-navy text-xs font-bold">
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700 font-hebrew">
              {user?.email ?? 'מנהל'}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors ms-1"
            title="התנתק"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
