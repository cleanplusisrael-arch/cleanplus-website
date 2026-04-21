'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, Briefcase, CalendarDays, Clock, DollarSign,
  FileText, BarChart3, UserCheck, LayoutDashboard,
} from 'lucide-react';

const NAV = [
  { href: '/dashboard',             icon: LayoutDashboard, label: 'לוח בקרה' },
  { href: '/dashboard/leads',       icon: Users,           label: 'CRM לידים' },
  { href: '/dashboard/recruitment', icon: UserCheck,       label: 'CRM גיוס' },
  { href: '/dashboard/employees',   icon: Briefcase,       label: 'עובדים' },
  { href: '/dashboard/planning',    icon: CalendarDays,    label: 'תכנון משמרות' },
  { href: '/dashboard/timeclock',   icon: Clock,           label: 'נוכחות' },
  { href: '/dashboard/payroll',     icon: DollarSign,      label: 'שכר ורווחה' },
  { href: '/dashboard/documents',   icon: FileText,        label: 'מסמכים' },
  { href: '/dashboard/stats',       icon: BarChart3,       label: 'סטטיסטיקות' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col border-e border-navy/80" dir="rtl">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span className="text-gold font-bold text-sm">C+</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm font-hebrew">Clean+</p>
            <p className="text-white/40 text-xs">לוח ניהול</p>
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
