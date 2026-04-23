'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeHistory } from '@/hooks/useEmployeeHistory';
import { useIdCardUpload } from '@/hooks/useIdCardUpload';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS } from '@/lib/employee-types';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS } from '@/lib/shift-types';
import type { ShiftStatus } from '@/lib/shift-types';
import { calcHours } from '@/lib/timeclock-types';
import {
  ArrowRight, Phone, Mail, MapPin, Calendar, FileText,
  Clock, Briefcase, TrendingUp, Save, ChevronDown, ChevronUp,
  Upload, Trash2, ExternalLink, CreditCard, Navigation,
} from 'lucide-react';

const TAX_BRACKETS = [
  { max: 7010, rate: 0.10 }, { max: 10060, rate: 0.14 },
  { max: 16150, rate: 0.20 }, { max: 21240, rate: 0.31 },
  { max: 44290, rate: 0.35 }, { max: 56370, rate: 0.47 },
  { max: Infinity, rate: 0.50 },
];
function calcTax(g: number) {
  let tax = 0; let prev = 0;
  for (const b of TAX_BRACKETS) { const top = Math.min(g, b.max); if (top <= prev) break; tax += (top - prev) * b.rate; prev = b.max; if (g <= b.max) break; }
  return tax;
}
function calcBL(g: number) {
  const c = Math.min(g, 49030);
  return c <= 7522 ? c * 0.004 : 7522 * 0.004 + (c - 7522) * 0.07;
}

function str(v: unknown, fallback = '—'): string {
  if (v === null || v === undefined) return fallback;
  if (typeof v === 'string') return v || fallback;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return String(v);
  return fallback;
}

function fmtDate(v: unknown): string {
  const s = str(v, '');
  if (!s) return '—';
  const d = new Date(s);
  if (isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}
function fmtTime(v: unknown): string {
  const s = str(v, '');
  if (!s) return '—';
  const d = new Date(s);
  if (isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
}
function fmtHours(h: number | null | undefined): string {
  if (h === null || h === undefined || isNaN(h)) return '—';
  return `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
}

export default function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { employees, updateEmployee } = useEmployees();
  const emp = employees.find((e) => e.id === id);
  const { shifts, clock, loading } = useEmployeeHistory(id);
  const [tab, setTab]         = useState<'shifts' | 'clock' | 'pay'>('shifts');
  const [notes, setNotes]     = useState('');
  const [notesInit, setNotesInit] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [showMonths, setShowMonths] = useState(false);
  const { uploadIdCard, deleteIdCard, uploading, progress } = useIdCardUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize notes from emp once when loaded
  useEffect(() => {
    if (emp && !notesInit) {
      setNotes(str(emp.notes, ''));
      setNotesInit(true);
    }
  }, [emp, notesInit]);

  if (!emp && employees.length > 0) return (
    <>
      <Header title="פרטי עובד" />
      <div className="p-6 text-center py-20">
        <p className="text-gray-400 font-hebrew mb-4">העובד לא נמצא</p>
        <Link href="/dashboard/employees" className="text-gold font-hebrew text-sm">חזרה לרשימה</Link>
      </div>
    </>
  );

  if (!emp) return <><Header title="פרטי עובד" /><div className="p-6 py-20 text-center text-gray-400 font-hebrew text-sm">טוען...</div></>;

  const gross   = Number(emp.grossSalary) || 0;
  const hourly  = Number(emp.hourlyRate) || 0;
  const nek     = Number(emp.nekudotZikui) || 2.25;
  const rawTax  = calcTax(gross);
  const tax     = Math.max(0, rawTax - nek * 242);
  const bl      = calcBL(gross);
  const net     = Math.round(gross - tax - bl);

  const doneShifts = shifts.filter((s) => s.status === 'done').length;
  const thisMonth  = new Date().toISOString().slice(0, 7);
  const monthClock = clock.filter((e) => str(e.date, '').startsWith(thisMonth));
  const monthHours = monthClock.reduce((a, e) => a + (calcHours(e) ?? 0), 0);
  const hourlyPay  = hourly > 0 ? Math.round(monthHours * hourly) : 0;

  const clockByMonth = clock.reduce((acc, e) => {
    const m = str(e.date, '').slice(0, 7);
    if (!m) return acc;
    if (!acc[m]) acc[m] = [];
    acc[m].push(e);
    return acc;
  }, {} as Record<string, typeof clock>);

  async function saveNotes() {
    if (!emp) return;
    setSaving(true);
    await updateEmployee(emp.id, { notes });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  async function handleIdCardUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!emp || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    if (file.size > 10 * 1024 * 1024) { alert('הקובץ גדול מדי (מקסימום 10MB)'); return; }
    const url = await uploadIdCard(emp.id, file);
    await updateEmployee(emp.id, { idCardUrl: url });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleDeleteIdCard() {
    if (!emp || !confirm('למחוק את תעודת הזהות?')) return;
    await deleteIdCard(emp.id);
    await updateEmployee(emp.id, { idCardUrl: '' });
  }

  const contractLabel = emp.contractType && emp.contractType in CONTRACT_LABELS
    ? CONTRACT_LABELS[emp.contractType]
    : '—';

  return (
    <>
      <Header title="פרטי עובד" />
      <div className="p-6 space-y-5" dir="rtl">
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/dashboard/employees" className="text-gray-400 hover:text-navy"><ArrowRight size={20} className="rtl:rotate-180" /></Link>
          <h2 className="text-xl font-bold text-navy font-hebrew">{str(emp.name)}</h2>
          {emp.employeeNumber && (
            <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">{str(emp.employeeNumber)}</span>
          )}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${emp.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
            {emp.status === 'active' ? 'פעיל' : 'לא פעיל'}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: emp.contractType === 'hourly' ? 'תעריף שעתי' : 'ברוטו חודשי',
              value: emp.contractType === 'hourly' ? (hourly ? `₪${hourly}` : '—') : (gross ? `₪${gross.toLocaleString()}` : '—'),
              icon: <TrendingUp size={16} className="text-navy" />,
              bg: 'bg-blue-50',
            },
            {
              label: emp.contractType === 'hourly' ? 'שכר צפוי החודש' : 'נטו חודשי',
              value: emp.contractType === 'hourly'
                ? (hourlyPay ? `₪${hourlyPay.toLocaleString()}` : '—')
                : (gross ? `₪${net.toLocaleString()}` : '—'),
              icon: <TrendingUp size={16} className="text-green-500" />,
              bg: 'bg-green-50',
            },
            { label: 'משמרות שהושלמו', value: String(doneShifts), icon: <Briefcase size={16} className="text-purple-500" />, bg: 'bg-purple-50' },
            { label: `שעות ${thisMonth.replace('-', '/')}`, value: fmtHours(monthHours), icon: <Clock size={16} className="text-amber-500" />, bg: 'bg-amber-50' },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-white`}>
              <div className="flex items-center gap-2 mb-1">{card.icon}<p className="text-xs text-gray-500 font-hebrew">{card.label}</p></div>
              <p className="text-xl font-bold text-gray-800" dir="ltr">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">פרטים אישיים</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <InfoRow icon={<Phone size={13} />} label="טלפון" val={str(emp.phone)} href={`tel:${str(emp.phone, '')}`} dir="ltr" />
                <InfoRow icon={<Mail size={13} />} label="אימייל" val={str(emp.email)} href={emp.email ? `mailto:${emp.email}` : undefined} dir="ltr" />
                <InfoRow icon={<FileText size={13} />} label="תעודת זהות" val={str(emp.teudatZehut)} dir="ltr" />
                <InfoRow icon={<MapPin size={13} />} label="אזור" val={str(emp.zone)} />
                <InfoRow icon={<Calendar size={13} />} label="תחילת עבודה" val={fmtDate(emp.hireDate)} dir="ltr" />
                <InfoRow icon={<Briefcase size={13} />} label="סוג חוזה" val={contractLabel} />
                <InfoRow icon={<FileText size={13} />} label="נקודות זיכוי" val={String(nek)} dir="ltr" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {([['shifts', 'משמרות'], ['clock', 'נוכחות'], ['pay', 'שכר']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setTab(key)}
                    className={`flex-1 py-3 text-sm font-hebrew transition-colors ${tab === key ? 'text-navy border-b-2 border-navy font-semibold' : 'text-gray-400 hover:text-gray-600'}`}>
                    {label}
                  </button>
                ))}
              </div>

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
                          <td className="px-3 py-3 font-hebrew text-gray-700">{str(s.clientName)}</td>
                          <td className="px-3 py-3 text-gray-600" dir="ltr">{str(s.startTime)}–{str(s.endTime)}</td>
                          <td className="px-3 py-3">
                            {s.status && s.status in SHIFT_STATUS_LABELS && (
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-hebrew ${SHIFT_STATUS_COLORS[s.status as ShiftStatus]}`}>
                                {SHIFT_STATUS_LABELS[s.status as ShiftStatus]}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'clock' && (
                <div className="p-4 space-y-3">
                  {loading && <p className="text-center text-gray-400 font-hebrew text-sm py-8">טוען...</p>}
                  {!loading && clock.length === 0 && <p className="text-center text-gray-400 font-hebrew text-sm py-8">אין רשומות נוכחות</p>}
                  {Object.entries(clockByMonth).sort(([a], [b]) => b.localeCompare(a)).slice(0, showMonths ? undefined : 3).map(([month, entries]) => {
                    const totalH = entries.reduce((a, e) => a + (calcHours(e) ?? 0), 0);
                    const monthDate = new Date(`${month}-01`);
                    const monthLabel = isNaN(monthDate.getTime()) ? month : new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' }).format(monthDate);
                    return (
                      <div key={month} className="border border-gray-100 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/50">
                          <p className="text-sm font-semibold text-gray-700 font-hebrew">{monthLabel}</p>
                          <span className="text-xs text-gray-500" dir="ltr">סה״כ: <strong>{fmtHours(totalH)}</strong></span>
                        </div>
                        <table className="w-full text-xs">
                          <tbody>
                            {entries.map((e) => {
                              const lat = e.clockInLat ?? e.lat;
                              const lng = e.clockInLng ?? e.lng;
                              const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : null;
                              return (
                                <tr key={e.id} className="border-t border-gray-50">
                                  <td className="ps-4 py-2 text-gray-500" dir="ltr">{fmtDate(e.date)}</td>
                                  <td className="px-3 py-2 text-gray-600" dir="ltr">{fmtTime(e.clockIn)}</td>
                                  <td className="px-3 py-2 text-gray-600" dir="ltr">{fmtTime(e.clockOut)}</td>
                                  <td className="px-3 py-2 font-medium text-gray-700" dir="ltr">{fmtHours(calcHours(e))}</td>
                                  <td className="pe-4 py-2">
                                    {mapsUrl ? (
                                      <a href={mapsUrl} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-700 font-hebrew">
                                        <Navigation size={10} />מיקום
                                      </a>
                                    ) : (
                                      <span className="text-[10px] text-gray-300">—</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
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

              {tab === 'pay' && (
                <div className="p-5 space-y-3">
                  {emp.contractType === 'hourly' ? (
                    hourly === 0
                      ? <p className="text-center text-gray-400 font-hebrew text-sm py-8">לא הוגדר תעריף שעתי</p>
                      : <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-600 font-hebrew">תעריף שעתי</span>
                          <span className="font-medium" dir="ltr">₪{hourly}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-600 font-hebrew">שעות החודש</span>
                          <span className="font-medium" dir="ltr">{fmtHours(monthHours)}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-green-50 rounded-xl px-4 mt-2">
                          <span className="font-bold text-gray-800 font-hebrew">סה״כ צפוי</span>
                          <span className="font-bold text-green-700 text-lg" dir="ltr">₪{hourlyPay.toLocaleString()}</span>
                        </div>
                      </div>
                  ) : gross === 0 ? (
                    <p className="text-center text-gray-400 font-hebrew text-sm py-8">לא הוגדר שכר לעובד זה</p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      {[
                        { label: 'שכר ברוטו', val: `₪${gross.toLocaleString()}`, color: '' },
                        { label: 'מס הכנסה', val: `-₪${Math.round(tax).toLocaleString()}`, color: 'text-red-500' },
                        { label: 'ביטוח לאומי', val: `-₪${Math.round(bl).toLocaleString()}`, color: 'text-red-500' },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-600 font-hebrew">{row.label}</span>
                          <span className={`font-medium ${row.color}`} dir="ltr">{row.val}</span>
                        </div>
                      ))}
                      <div className="flex justify-between py-3 bg-green-50 rounded-xl px-4 mt-2">
                        <span className="font-bold text-gray-800 font-hebrew">נטו לתשלום</span>
                        <span className="font-bold text-green-700 text-lg" dir="ltr">₪{net.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  <Link href="/dashboard/documents" className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:border-navy/30 hover:text-navy font-hebrew mt-3">
                    <FileText size={14} />צור חוזה עבודה
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">הערות פנימיות</h3>
              <textarea
                value={notes}
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

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">פעולות מהירות</h3>
              <div className="space-y-2">
                {emp.phone && (
                  <>
                    <a href={`tel:${emp.phone}`}
                      className="flex items-center gap-2.5 w-full bg-navy/5 hover:bg-navy/10 text-navy rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                      <Phone size={15} />התקשר
                    </a>
                    <a href={`https://wa.me/972${emp.phone.replace(/^0/, '').replace(/-/g, '')}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2.5 w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                      <span>💬</span>וואטסאפ
                    </a>
                  </>
                )}
                <Link href="/dashboard/documents"
                  className="flex items-center gap-2.5 w-full bg-gold/5 hover:bg-gold/10 text-gold rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors border border-gold/20">
                  <FileText size={15} />צור חוזה עבודה
                </Link>
              </div>
            </div>

            {/* ID Card upload */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew flex items-center gap-2">
                <CreditCard size={14} className="text-gray-400" />תעודת זהות
              </h3>
              {emp.idCardUrl ? (
                <div className="space-y-2">
                  {/\.(jpg|jpeg|png|webp)$/i.test(emp.idCardUrl) ? (
                    <a href={emp.idCardUrl} target="_blank" rel="noreferrer">
                      <img src={emp.idCardUrl} alt="ת.ז" className="w-full rounded-lg border border-gray-100 object-cover max-h-36 hover:opacity-90 transition-opacity" />
                    </a>
                  ) : (
                    <a href={emp.idCardUrl} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm font-hebrew hover:bg-blue-100 transition-colors">
                      <FileText size={15} />פתח קובץ
                      <ExternalLink size={12} className="mr-auto" />
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-navy border border-gray-200 rounded-lg py-1.5 transition-colors disabled:opacity-40">
                      <Upload size={12} />החלף
                    </button>
                    <button onClick={handleDeleteIdCard} disabled={uploading}
                      className="flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-red-600 border border-red-100 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-40">
                      <Trash2 size={12} />מחק
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                  className="w-full flex flex-col items-center gap-2 border-2 border-dashed border-gray-200 hover:border-gold/40 rounded-xl p-5 text-gray-400 hover:text-gold transition-colors disabled:opacity-40">
                  {uploading ? (
                    <>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs font-hebrew">מעלה... {progress}%</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      <span className="text-xs font-hebrew text-center">העלה תמונה / PDF<br />של תעודת הזהות</span>
                    </>
                  )}
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleIdCardUpload} />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">סיכום</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'סה״כ משמרות', val: String(shifts.length) },
                  { label: 'משמרות שהושלמו', val: String(doneShifts) },
                  { label: 'בוטלו', val: String(shifts.filter((s) => s.status === 'cancelled').length) },
                  { label: 'שעות החודש', val: fmtHours(monthHours) },
                  { label: 'ימי נוכחות החודש', val: String(monthClock.length) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-gray-500 font-hebrew text-xs">{row.label}</span>
                    <span className="font-semibold text-gray-800 text-sm" dir="ltr">{row.val}</span>
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

function InfoRow({ icon, label, val, href, dir }: {
  icon: React.ReactNode; label: string; val: string; href?: string; dir?: 'ltr' | 'rtl';
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-hebrew mb-0.5 flex items-center gap-1">{icon}{label}</p>
      {href && val !== '—'
        ? <a href={href} className="text-sm text-navy hover:underline font-hebrew" dir={dir}>{val}</a>
        : <p className="text-sm text-gray-700 font-hebrew" dir={dir}>{val}</p>}
    </div>
  );
}
