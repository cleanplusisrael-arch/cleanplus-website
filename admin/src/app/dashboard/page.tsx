'use client';
import { useLeads } from '@/hooks/useLeads';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { Users, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/Badge';
import { LEAD_SERVICE_LABELS } from '@/lib/types';

export default function DashboardPage() {
  const { leads, loading } = useLeads();

  const stats = {
    total:    leads.length,
    new:      leads.filter((l) => l.status === 'new').length,
    won:      leads.filter((l) => l.status === 'won').length,
    rate:     leads.length > 0
      ? Math.round((leads.filter((l) => l.status === 'won').length / leads.length) * 100)
      : 0,
  };

  const recent = leads.slice(0, 5);

  return (
    <>
      <Header title="לוח בקרה" />
      <div className="p-6 space-y-6" dir="rtl">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="סה״כ לידים"
            value={loading ? '...' : stats.total}
            icon={<Users size={20} className="text-navy" />}
            accent="bg-blue-50"
          />
          <StatCard
            label="לידים חדשים"
            value={loading ? '...' : stats.new}
            sub="ממתינים לטיפול"
            icon={<Clock size={20} className="text-amber-600" />}
            accent="bg-amber-50"
          />
          <StatCard
            label="לקוחות סגורים"
            value={loading ? '...' : stats.won}
            icon={<CheckCircle2 size={20} className="text-green-600" />}
            accent="bg-green-50"
          />
          <StatCard
            label="אחוז המרה"
            value={loading ? '...' : `${stats.rate}%`}
            icon={<TrendingUp size={20} className="text-gold" />}
            accent="bg-gold/10"
          />
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-700 font-hebrew">לידים אחרונים</h2>
            <Link href="/dashboard/leads" className="text-sm text-gold hover:text-gold/80 font-hebrew transition-colors">
              כל הלידים ←
            </Link>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-400 font-hebrew text-sm">טוען...</div>
          ) : recent.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-hebrew text-sm">אין לידים עדיין</div>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {recent.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <td className="ps-5 pe-3 py-3.5">
                      <Link href={`/dashboard/leads/${lead.id}`} className="font-medium text-gray-800 hover:text-navy font-hebrew">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-gray-500 font-hebrew text-xs">
                      {lead.service ? LEAD_SERVICE_LABELS[lead.service] : '—'}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-3 py-3.5 text-gray-400 text-xs" dir="ltr">
                      {lead.createdAt
                        ? new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(lead.createdAt))
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
