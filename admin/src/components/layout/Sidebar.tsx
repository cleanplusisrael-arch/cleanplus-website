'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Users, Briefcase, CalendarDays, Clock, DollarSign,
  FileText, BarChart3, UserCheck, LayoutDashboard, Building2,
} from 'lucide-react';

const NAV = [
  { href: '/dashboard',             icon: LayoutDashboard, label: 'לוח בקרה' },
  { href: '/dashboard/leads',       icon: Users,           label: 'CRM לידים' },
  { href: '/dashboard/clients',     icon: Building2,       label: 'לקוחות' },
  { href: '/dashboard/recruitment', icon: UserCheck,       label: 'CRM גיוס' },
  { href: '/dashboard/employees',   icon: Briefcase,       label: 'עובדים' },
  { href: '/dashboard/planning',    icon: CalendarDays,    label: 'תכנון משמרות' },
  { href: '/dashboard/timeclock',   icon: Clock,           label: 'נוכחות' },
  { href: '/dashboard/payroll',     icon: DollarSign,      label: 'שכר ורווחה' },
  { href: '/dashboard/documents',   icon: FileText,        label: 'מסמכים' },
  { href: '/dashboard/stats',       icon: BarChart3,       label: 'סטטיסטיקות' },
];

export function Sidebar({ mobile = false, onLinkClick }: { mobile?: boolean; onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`${mobile ? 'w-full' : 'w-64'} bg-navy flex flex-col border-e border-navy/80 ${mobile ? 'min-h-auto' : 'min-h-screen'}`} dir="rtl">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <Image src="/logo.png" alt="Clean+" width={44} height={44} className="object-contain" />
          </div>
          <div>
            <p className="text-white font-bold text-sm font-hebrew leading-tight">Clean+</p>
            <p className="text-white/40 text-xs font-hebrew">לוח ניהול</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${active
                  ? 'bg-gold/15 text-gold border border-gold/20'
                  : 'text-white/65 hover:text-white hover:bg-white/8'
                }`}
            >
              <Icon size={17} className="shrink-0" />
              <span className="font-hebrew">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-white/25 text-xs text-center font-hebrew">admin.cleanplus.co.il</p>
      </div>
    </aside>
  );
}
