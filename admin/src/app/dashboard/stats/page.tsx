'use client';
import { useMemo } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useEmployees } from '@/hooks/useEmployees';
import { useShifts } from '@/hooks/useShifts';
import { useCandidates } from '@/hooks/useCandidates';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { LEAD_STATUS_LABELS } from '@/lib/types';
import type { LeadStatus } from '@/lib/types';
import { TrendingUp, Users, CalendarDays, UserCheck, Target, Activity } from 'lucide-react';

function BarChart({ data, color = 'bg-navy' }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map(({ label, value }) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-medium text-gray-600">{value > 0 ? value : ''}</span>
          <div className="w-full flex items-end" style={{ height: '80px' }}>
            <div
              className={`w-full rounded-t-md ${color} transition-all duration-500`}
              style={{ height: `${(value / max) * 80}px`, minHeight: value > 0 ? '4px' : '0' }}
            />
          </div>
          <span className="text-[10px] text-gray-400 font-hebrew text-center leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutSegment({ pct, color, offset }: { pct: number; color: string; offset: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const gap  = circ - dash;
  return (
    <circle r={r} cx={50} cy={50} fill="none" strokeWidth={14}
      stroke={color} strokeDasharray={`${dash} ${gap}`}
      strokeDashoffset={-offset * circ / 100}
      transform="rotate(-90 50 50)" />
  );
}

function StatusDonut({ data }: { data: { label: string; value: number; color?: string; fill: string }[] }) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  let offset = 0;
  const segments = data.map((d) => {
    const pct = (d.value / total) * 100;
    const el = { ...d, pct, offset };
    offset += pct;
    return el;
  });

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0">
        <circle r={40} cx={50} cy={50} fill="none" strokeWidth={14} stroke="#f1f5f9" />
        {segments.filter((s) => s.pct > 0).map((s) => (
          <DonutSegment key={s.label} pct={s.pct} color={s.fill} offset={s.offset} />
        ))}
        <text x={50} y={50} textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-gray-700" fontSize={14} fontWeight="bold">
          {total}
        </text>
      </svg>
      <div className="space-y-1.5 flex-1">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0`} style={{ backgroundColor: d.fill }} />
            <span className="text-gray-600 font-hebrew flex-1">{d.label}</span>
            <span className="font-medium text-gray-800">{d.value}</span>
            <span className="text-gray-400">({Math.round((d.value / (total || 1)) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getLast8Weeks(leads: { createdAt: string }[]) {
  const weeks: { label: string; value: number }[] = [];
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(now.getDate() - i * 7 - now.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const count = leads.filter((l) => {
      const d = new Date(l.createdAt);
      return d >= start && d < end;
    }).length;
    const label = new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit' }).format(start);
    weeks.push({ label, value: count });
  }
  return weeks;
}

function getLast6Months(leads: { createdAt: string }[]) {
  const months: { label: string; value: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const count = leads.filter((l) => {
      const ld = new Date(l.createdAt);
      return ld.getFullYear() === d.getFullYear() && ld.getMonth() === d.getMonth();
    }).length;
    const label = new Intl.DateTimeFormat('he-IL', { month: 'short' }).format(d);
    months.push({ label, value: count });
  }
  return months;
}

export default function StatsPage() {
  const { leads, loading: leadsLoading }           = useLeads();
  const { employees, loading: empsLoading }        = useEmployees();
  const { shifts, loading: shiftsLoading }         = useShifts();
  const { candidates, loading: candidatesLoading } = useCandidates();

  const loading = leadsLoading || empsLoading || shiftsLoading || candidatesLoading;

  const activeEmps   = employees.filter((e) => e.status === 'active').length;
  const wonLeads     = leads.filter((l) => l.status === 'won').length;
  const convRate     = leads.length > 0 ? Math.round((wonLeads / leads.length) * 100) : 0;
  const todayShifts  = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return shifts.filter((s) => s.date === today).length;
  }, [shifts]);

  const weeksData  = useMemo(() => getLast8Weeks(leads), [leads]);
  const monthsData = useMemo(() => getLast6Months(leads), [leads]);

  const leadsByStatus: { label: string; value: number; color: string; fill: string }[] = [
    { label: LEAD_STATUS_LABELS.new,        value: leads.filter((l) => l.status === 'new').length,        color: 'bg-blue-500',   fill: '#3b82f6' },
    { label: LEAD_STATUS_LABELS.contacted,  value: leads.filter((l) => l.status === 'contacted').length,  color: 'bg-amber-500',  fill: '#f59e0b' },
    { label: LEAD_STATUS_LABELS.quote_sent, value: leads.filter((l) => l.status === 'quote_sent').length, color: 'bg-purple-500', fill: '#8b5cf6' },
    { label: LEAD_STATUS_LABELS.won,        value: wonLeads,                                               color: 'bg-green-500',  fill: '#22c55e' },
    { label: LEAD_STATUS_LABELS.lost,       value: leads.filter((l) => l.status === 'lost').length,       color: 'bg-gray-400',   fill: '#9ca3af' },
  ];

  const candidatesByStatus = [
    { label: 'חדש', value: candidates.filter((c) => c.status === 'new').length, fill: '#3b82f6' },
    { label: 'בוצעה שיחה', value: candidates.filter((c) => c.status === 'called').length, fill: '#f59e0b' },
    { label: 'ראיון', value: candidates.filter((c) => c.status === 'interview').length, fill: '#8b5cf6' },
    { label: 'התקבל', value: candidates.filter((c) => c.status === 'hired').length, fill: '#22c55e' },
    { label: 'לא מתאים', value: candidates.filter((c) => c.status === 'rejected').length, fill: '#9ca3af' },
  ];

  const shiftsByStatus = [
    { label: 'מתוכנן', value: shifts.filter((s) => s.status === 'planned').length, fill: '#3b82f6' },
    { label: 'בביצוע', value: shifts.filter((s) => s.status === 'in_progress').length, fill: '#f59e0b' },
    { label: 'הושלם', value: shifts.filter((s) => s.status === 'done').length, fill: '#22c55e' },
    { label: 'בוטל', value: shifts.filter((s) => s.status === 'cancelled').length, fill: '#9ca3af' },
  ];

  return (
    <>
      <Header title="סטטיסטיקות" />
      <div className="p-6 space-y-5" dir="rtl">
        {loading && <div className="py-20 text-center text-gray-400 font-hebrew text-sm">טוען נתונים...</div>}

        {!loading && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="סה״כ לידים" value={leads.length} icon={<TrendingUp size={18} className="text-navy" />} accent="bg-blue-50" />
              <StatCard label="אחוז המרה" value={`${convRate}%`} icon={<Target size={18} className="text-green-500" />} accent="bg-green-50" />
              <StatCard label="עובדים פעילים" value={activeEmps} icon={<Users size={18} className="text-purple-500" />} accent="bg-purple-50" />
              <StatCard label="משמרות היום" value={todayShifts} icon={<CalendarDays size={18} className="text-amber-500" />} accent="bg-amber-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-navy" />
                  <h3 className="text-sm font-semibold text-gray-700 font-hebrew">לידים — 8 שבועות אחרונים</h3>
                </div>
                {weeksData.every((d) => d.value === 0)
                  ? <p className="text-center text-gray-400 text-sm font-hebrew py-8">אין נתונים</p>
                  : <BarChart data={weeksData} color="bg-navy" />}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-gold" />
                  <h3 className="text-sm font-semibold text-gray-700 font-hebrew">לידים — 6 חודשים אחרונים</h3>
                </div>
                {monthsData.every((d) => d.value === 0)
                  ? <p className="text-center text-gray-400 text-sm font-hebrew py-8">אין נתונים</p>
                  : <BarChart data={monthsData} color="bg-gold" />}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-navy" />
                  <h3 className="text-sm font-semibold text-gray-700 font-hebrew">לידים לפי סטטוס</h3>
                </div>
                {leads.length === 0
                  ? <p className="text-center text-gray-400 text-sm font-hebrew py-6">אין נתונים</p>
                  : <StatusDonut data={leadsByStatus} />}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck size={16} className="text-purple-500" />
                  <h3 className="text-sm font-semibold text-gray-700 font-hebrew">מועמדים לפי סטטוס</h3>
                </div>
                {candidates.length === 0
                  ? <p className="text-center text-gray-400 text-sm font-hebrew py-6">אין נתונים</p>
                  : <StatusDonut data={candidatesByStatus} />}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays size={16} className="text-amber-500" />
                  <h3 className="text-sm font-semibold text-gray-700 font-hebrew">משמרות לפי סטטוס</h3>
                </div>
                {shifts.length === 0
                  ? <p className="text-center text-gray-400 text-sm font-hebrew py-6">אין נתונים</p>
                  : <StatusDonut data={shiftsByStatus} />}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">שכר חודשי משוער (כולל עובדים פעילים)</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'סה״כ ברוטו', value: `₪${employees.filter((e) => e.status === 'active').reduce((a, e) => a + (e.grossSalary ?? 0), 0).toLocaleString()}`, color: 'text-navy' },
                  { label: 'עובדים עם שכר מוגדר', value: employees.filter((e) => e.status === 'active' && (e.grossSalary ?? 0) > 0).length, color: 'text-gray-700' },
                  { label: 'מועמדים שהתקבלו', value: candidates.filter((c) => c.status === 'hired').length, color: 'text-green-600' },
                  { label: 'כניסות זכייה (לידים)', value: `${convRate}%`, color: 'text-gold' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-hebrew mb-1">{label}</p>
                    <p className={`text-xl font-bold ${color}`} dir="ltr">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
