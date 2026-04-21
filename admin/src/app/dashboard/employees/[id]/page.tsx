'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeHistory } from '@/hooks/useEmployeeHistory';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS, ZONES } from '@/lib/employee-types';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS } from '@/lib/shift-types';
import type { ShiftStatus } from '@/lib/shift-types';
import { calcHours } from '@/lib/timeclock-types';
import {
  ArrowRight, Phone, Mail, MapPin, Calendar, FileText,
  Clock, Briefcase, TrendingUp, Save, ChevronDown, ChevronUp,
} from 'lucide-react';

// Israeli salary calculator
const TAX_BRACKETS = [
  { max: 7010, rate: 0.10 }, { max: 10060, rate: 0.14 },
  { max: 16150, rate: 0.20 }, { max: 21240, rate: 0.31 },
  { max: 44290, rate: 0.35 }, { max: 56370, rate: 0.47 },
  { max: Infinity, rate: 0.50 },
];
function calcTax(gross: number) {
  let tax = 0; let prev = 0;
  for (const b of TAX_BRACKETS) { const top = Math.min(gross, b.max); if (top <= prev) break; tax += (top - prev) * b.rate; prev = b.max; if (gross <= b.max) break; }
  return tax;
}
function calcBL(gross: number) {
  const c = Math.min(gross, 49030);
  return c <= 7522 ? c * 0.004 : 7522 * 0.004 + (c - 7522) * 0.07;
}
function calcNet(gross: number, nek: number) {
  return Math.round(gross - Math.max(0, calcTax(gross) - nek * 242) - calcBL(gross));
}

function fmtDate(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
}
function fmtTime(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
}
function fmtHours(h: number | null) {
  if (h === null) return '—';
  return `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
}

export default function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { employees, updateEmployee } = useEmployees();
  const emp = employees.find((e) => e.id === id);
  const { shifts, clock, loading } = useEmployeeHistory(id);
  const [tab, setTab]         = useState<'shifts' | 'clock' | 'pay'>('shifts');
  const [notes, setNotes]     = useState('');
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  if (!emp && !loading) return (
    <>
      <Header title="פרטי עובד" />
      <div className="p-6 text-center py-20">
        <p className="text-gray-400 font-hebrew mb-4">העובד לא נמצא</p>
        <Link href="/dashboard/employees" className="text-gold font-hebrew text-sm">חזרה לרשימה</Link>
      </div>
    </>
  );

  if (!emp) return <><Header title="פרטי עובד" /><div className="p-6 py-20 text-center text-gray-400 font-hebrew text-sm">טוען...</div></>;

  // init notes from emp
  if (notes === '' && emp.notes) { /* set once */ }
  const empNotes = notes !== '' ? notes : (emp.notes ?? '');

  const gross   = emp.grossSalary ?? 0;
  const nek     = emp.nekudotZikui ?? 2.25;
  const net     = calcNet(gross, nek);
  const tax     = Math.max(0, calcTax(gross) - nek * 242);
  const bl      = calcBL(gross);

  const doneShifts = shifts.filter((s) => s.status === 'done').length;
  const thisMonth  = new Date().toISOString().slice(0, 7);
  const monthClock = clock.filter((e) => e.date.startsWith(thisMonth));
  const monthHours = monthClock.reduce((a, e) => a + (calcHours(e) ?? 0), 0);

  // Group clock by month for history
  const clockByMonth = clock.reduce((acc, e) => {
    const m = e.date.slice(0, 7);
    if (!acc[m]) acc[m] = [];
    acc[m].push(e);
    return acc;
  }, {} as Record<string, typeof clock>);

  async function saveNotes() {
    setSaving(true);
    await updateEmployee(id, { ...emp!, notes: empNotes });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Header title="פרטי עובד" />
      <div className="p-6 space-y-5" dir="rtl">
        {/* Breadcrumb + name */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/employees" className="text-gray-400 hover:text-navy"><ArrowRight size={20} className="rtl:rotate-180" /></Link>
          <h2 className="text-xl font-bold text-navy font-hebrew">{emp.name}</h2>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${emp.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
            {emp.status === 'active' ? 'פעיל' : 'לא פעיל'}
          </span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'ברוטו חודשי', value: gross ? `₪${gross.toLocaleString()}` : '—', icon: <TrendingUp size={16} className="text-navy" />, bg: 'bg-blue-50' },
            { label: 'נטו חודשי', value: gross ? `₪${net.toLocaleString()}` : '—', icon: <TrendingUp size={16} className="text-green-500" />, bg: 'bg-green-50' },
            { label: 'משמרות שהושלמו', value: doneShifts, icon: <Briefcase size={16} className="text-purple-500" />, bg: 'bg-purple-50' },
            { label: `שעות ${thisMonth.replace('-', '/')}`, value: fmtHours(monthHours), icon: <Clock size={16} className="text-amber-500" />, bg: 'bg-amber-50' },
          ].map(({ label, value, icon, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 border border-white`}>
              <div className="flex items-center gap-2 mb-1">{icon}<p className="text-xs text-gray-500 font-hebrew">{label}</p></div>
              <p className="text-xl font-bold text-gray-800" dir="ltr">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left — info + tabs */}
          <div className="lg:col-span-2 space-y-5">
            {/* Info card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">פרטים אישיים</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { icon: <Phone size={13} className="text-gray-400" />, label: 'טלפון', val: emp.phone, href: `tel:${emp.phone}`, dir: 'ltr' },
                  { icon: <Mail size={13} className="text-gray-400" />, label: 'אימייל', val: emp.email ?? '—', href: emp.email ? `mailto:${emp.email}` : undefined, dir: 'ltr' },
                  { icon: <MapPin size={13} className="text-gray-400" />, label: 'אזור', val: emp.zone ?? '—' },
                  { icon: <Calendar size={13} className="text-gray-400" />, label: 'תחילת עבודה', val: fmtDate(emp.hireDate), dir: 'ltr' },
                  { icon: <Briefcase size={13} className="text-gray-400" />, label: 'סוג חוזה', val: emp.contractType ? CONTRACT_LABELS[emp.contractType] : '—' },
                  { icon: <FileText size={13} className="text-gray-400" />, label: 'נקודות זיכוי', val: String(nek) },
                ].map(({ icon, label, val, href, dir }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 font-hebrew mb-0.5 flex items-center gap-1">{icon}{label}</p>
                    {href && val !== '—'
                      ? <a href={href} className="text-sm text-navy hover:underline font-hebrew" dir={dir as 'ltr' | 'rtl' | undefined}>{val}</a>
                      : <p className="text-sm text-gray-700 font-hebrew" dir={dir as 'ltr' | 'rtl' | undefined}>{val}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {([['shifts', 'משמרות'], ['clock', 'נוכחות'], ['pay', 'שכר']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setTab(key)}
                    className={`flex-1 py-3 text-sm font-hebrew transition-colors ${tab === key ? 'text-navy border-b-2 border-navy font-semibold' : 'text-gray-400 hover:text-gray-600'}`}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Shifts tab */}
              {tab === 'shifts' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50/50 border-b border-gray-50">
                      {['תאריך', 'לקוח', 'שעות', 'סטטוס'].map((h) => (
                        <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {loading && <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
                      {!loading && shifts.length === 0 && <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-hebrew text-sm">אין משמרות</td></tr>}
                      {shifts.slice(0, 30).map((s) => (
                        <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/40">
                          <td className="ps-4 pe-3 py-3 text-gray-600" dir="ltr">{fmtDate(s.date)}</td>
                          <td className="px-3 py-3 font-hebrew text-gray-700">{s.clientName}</td>
                          <td className="px-3 py-3 text-gray-600" dir="ltr">{s.startTime}–{s.endTime}</td>
                          <td className="px-3 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-hebrew ${SHIFT_STATUS_COLORS[s.status as ShiftStatus]}`}>
                              {SHIFT_STATUS_LABELS[s.status as ShiftStatus]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Timeclock tab */}
              {tab === 'clock' && (
                <div className="p-4 space-y-3">
                  {loading && <p className="text-center text-gray-400 font-hebrew text-sm py-8">טוען...</p>}
                  {!loading && clock.length === 0 && <p className="text-center text-gray-400 font-hebrew text-sm py-8">אין רשומות נוכחות</p>}
                  {Object.entries(clockByMonth).sort(([a], [b]) => b.localeCompare(a)).slice(0, showMonths ? undefined : 3).map(([month, entries]) => {
                    const totalH = entries.reduce((a, e) => a + (calcHours(e) ?? 0), 0);
                    const monthLabel = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' }).format(new Date(month + '-01'));
                    return (
                      <div key={month} className="border border-gray-100 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/50">
                          <p className="text-sm font-semibold text-gray-700 font-hebrew">{monthLabel}</p>
                          <span className="text-xs text-gray-500" dir="ltr">סה״כ: <strong>{fmtHours(totalH)}</strong></span>
                        </div>
                        <table className="w-full text-xs">
                          <tbody>
                            {entries.map((e) => (
                              <tr key={e.id} className="border-t border-gray-50">
                                <td className="ps-4 py-2 text-gray-500" dir="ltr">{fmtDate(e.date)}</td>
                                <td className="px-3 py-2 text-gray-600" dir="ltr">{fmtTime(e.clockIn)}</td>
                                <td className="px-3 py-2 text-gray-600" dir="ltr">{fmtTime(e.clockOut)}</td>
                                <td className="pe-4 py-2 font-medium text-gray-700" dir="ltr">{fmtHours(calcHours(e))}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                  {Object.keys(clockByMonth).length > 3 && (
                    <button onClick={() => setShowMonths((v) => !v)} className="w-full text-xs text-gray-400 hover:text-navy font-hebrew flex items-center justify-center gap-1 py-1">
                      {showMonths ? <><ChevronUp size={13} />פחות</> : <><ChevronDown size={13} />הצג עוד חודשים</>}
                    </button>
                  )}
                </div>
              )}

              {/* Payroll tab */}
              {tab === 'pay' && (
                <div className="p-5 space-y-3">
                  {gross === 0
                    ? <p className="text-center text-gray-400 font-hebrew text-sm py-8">לא הוגדר שכר לעובד זה</p>
                    : <>
                      <div className="space-y-2 text-sm">
                        {[
                          { label: 'שכר ברוטו', val: `₪${gross.toLocaleString()}`, color: '' },
                          { label: 'מס הכנסה', val: `-₪${Math.round(tax).toLocaleString()}`, color: 'text-red-500' },
                          { label: 'ביטוח לאומי', val: `-₪${Math.round(bl).toLocaleString()}`, color: 'text-red-500' },
                        ].map(({ label, val, color }) => (
                          <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-600 font-hebrew">{label}</span>
                            <span className={`font-medium ${color}`} dir="ltr">{val}</span>
                          </div>
                        ))}
                        <div className="flex justify-between py-3 bg-green-50 rounded-xl px-4 mt-2">
                          <span className="font-bold text-gray-800 font-hebrew">נטו לתשלום</span>
                          <span className="font-bold text-green-700 text-lg" dir="ltr">₪{net.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 font-hebrew text-center">* אומדן בלבד — מדרגות 2024</p>
                      <Link href="/dashboard/documents" className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:border-navy/30 hover:text-navy font-hebrew mt-2">
                        <FileText size={14} />צור חוזה עבודה
                      </Link>
                    </>
                  }
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">הערות פנימיות</h3>
              <textarea
                value={empNotes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="הערות פנימיות על העובד..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none leading-relaxed"
              />
              <div className="flex items-center justify-end gap-3 mt-2">
                {saved && <p className="text-xs text-green-600 font-hebrew">✓ נשמר</p>}
                <button onClick={saveNotes} disabled={saving}
                  className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-60">
                  <Save size={13} />{saving ? 'שומר...' : 'שמור'}
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Quick actions */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">פעולות מהירות</h3>
              <div className="space-y-2">
                <a href={`tel:${emp.phone}`}
                  className="flex items-center gap-2.5 w-full bg-navy/5 hover:bg-navy/10 text-navy rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                  <Phone size={15} />התקשר
                </a>
                {emp.phone && (
                  <a href={`https://wa.me/972${emp.phone.replace(/^0/, '').replace(/-/g, '')}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2.5 w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                    <span>💬</span>וואטסאפ
                  </a>
                )}
                <Link href="/dashboard/documents"
                  className="flex items-center gap-2.5 w-full bg-gold/5 hover:bg-gold/10 text-gold rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors border border-gold/20">
                  <FileText size={15} />צור חוזה עבודה
                </Link>
              </div>
            </div>

            {/* Summary stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">סיכום</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'סה״כ משמרות', val: shifts.length },
                  { label: 'משמרות שהושלמו', val: doneShifts },
                  { label: 'בוטלו', val: shifts.filter((s) => s.status === 'cancelled').length },
                  { label: 'שעות החודש', val: fmtHours(monthHours) },
                  { label: 'ימי נוכחות החודש', val: monthClock.length },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-500 font-hebrew text-xs">{label}</span>
                    <span className="font-semibold text-gray-800 text-sm" dir="ltr">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
