'use client';
import { useState } from 'react';
import { useTimeclock } from '@/hooks/useTimeclock';
import { useEmployees } from '@/hooks/useEmployees';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { calcHours, type TimeclockEntry } from '@/lib/timeclock-types';
import { Clock, LogIn, LogOut, Plus, X, AlertTriangle, CheckCircle2, Users } from 'lucide-react';

function fmtTime(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
}

function fmtHours(h: number | null) {
  if (h === null) return '—';
  const hrs = Math.floor(h);
  const mins = Math.round((h - hrs) * 60);
  return `${hrs}:${String(mins).padStart(2, '0')}`;
}

function ClockInModal({ employees, onSave, onClose }: {
  employees: { id: string; name: string }[];
  onSave: (employeeId: string, employeeName: string) => Promise<void>;
  onClose: () => void;
}) {
  const [employeeId, setEmployeeId] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedEmp = employees.find((e) => e.id === employeeId);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">כניסה ידנית</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">עובד *</label>
            <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              <option value="">בחר עובד</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <p className="text-xs text-gray-400 font-hebrew">שעת הכניסה תירשם כעת: {fmtTime(new Date().toISOString())}</p>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg font-hebrew">ביטול</button>
          <button onClick={async () => {
            if (!employeeId || !selectedEmp) return;
            setSaving(true);
            await onSave(employeeId, selectedEmp.name);
            setSaving(false);
            onClose();
          }} disabled={saving || !employeeId}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-60">
            <LogIn size={14} />{saving ? 'שומר...' : 'רשום כניסה'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TimeclockPage() {
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().slice(0, 10));
  const [showModal, setShowModal] = useState(false);
  const { entries, loading, clockIn, clockOut } = useTimeclock(dateFilter);
  const { employees } = useEmployees();
  const activeEmps = employees.filter((e) => e.status === 'active');

  const clocked = entries.filter((e) => e.clockIn);
  const done    = entries.filter((e) => e.clockIn && e.clockOut);
  const active  = entries.filter((e) => e.clockIn && !e.clockOut);

  const totalHours = done.reduce((acc, e) => acc + (calcHours(e) ?? 0), 0);

  function isLate(entry: TimeclockEntry) {
    if (entry.clockIn) return false;
    return false;
  }

  return (
    <>
      <Header title="נוכחות ושעות" />
      {showModal && (
        <ClockInModal employees={activeEmps} onSave={clockIn} onClose={() => setShowModal(false)} />
      )}
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="נכנסו היום" value={clocked.length} icon={<LogIn size={18} className="text-navy" />} accent="bg-blue-50" />
          <StatCard label="בעבודה כעת" value={active.length} icon={<Clock size={18} className="text-amber-500" />} accent="bg-amber-50" />
          <StatCard label="סיימו משמרת" value={done.length} icon={<CheckCircle2 size={18} className="text-green-500" />} accent="bg-green-50" />
          <StatCard label="שעות כולל" value={fmtHours(totalHours)} icon={<Users size={18} className="text-purple-500" />} accent="bg-purple-50" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center" dir="rtl">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-hebrew">תאריך:</label>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} dir="ltr"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <button onClick={() => setDateFilter(new Date().toISOString().slice(0, 10))}
            className="text-xs text-gray-400 hover:text-navy border border-gray-200 rounded-lg px-3 py-2 font-hebrew">היום</button>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 me-auto">
            <Plus size={14} />כניסה ידנית
          </button>
        </div>

        {active.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-amber-600" />
              <p className="text-sm font-semibold text-amber-800 font-hebrew">בעבודה כעת — {active.length} עובדים</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {active.map((e) => (
                <div key={e.id} className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-1.5">
                  <span className="text-sm font-hebrew text-gray-700">{e.employeeName}</span>
                  <span className="text-xs text-amber-600 font-medium" dir="ltr">{fmtTime(e.clockIn)}</span>
                  <button onClick={() => clockOut(e.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-hebrew border border-red-200 rounded px-2 py-0.5">
                    <LogOut size={11} />יציאה
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-700 font-hebrew">{entries.length} רשומות נוכחות</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {['עובד', 'כניסה', 'יציאה', 'שעות', 'סטטוס', ''].map((h) => (
                    <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={6} className="py-16 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
                {!loading && entries.length === 0 && (
                  <tr><td colSpan={6} className="py-16 text-center text-gray-400 font-hebrew text-sm">אין רשומות לתאריך זה</td></tr>
                )}
                {entries.map((entry) => {
                  const hours = calcHours(entry);
                  const isActive = entry.clockIn && !entry.clockOut;
                  return (
                    <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                      <td className="ps-4 pe-3 py-3.5 font-medium text-gray-800 font-hebrew">{entry.employeeName}</td>
                      <td className="px-3 py-3.5 text-gray-600 font-medium" dir="ltr">{fmtTime(entry.clockIn)}</td>
                      <td className="px-3 py-3.5 text-gray-600" dir="ltr">{fmtTime(entry.clockOut)}</td>
                      <td className="px-3 py-3.5 text-gray-700 font-medium" dir="ltr">{fmtHours(hours)}</td>
                      <td className="px-3 py-3.5">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />בעבודה
                          </span>
                        ) : entry.clockOut ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />סיים
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">טרם נכנס</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5">
                        {isActive && (
                          <button onClick={() => clockOut(entry.id)}
                            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-2.5 py-1 font-hebrew">
                            <LogOut size={12} />יציאה
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800 font-hebrew mb-1">קישור כניסה מהטלפון</p>
              <p className="text-xs text-blue-600 font-hebrew mb-2">שלח לעובדים קישור לדיווח נוכחות מהנייד:</p>
              <code className="text-xs bg-white border border-blue-200 rounded px-2 py-1 text-blue-700 select-all" dir="ltr">
                https://admin.cleanplus.co.il/timeclock
              </code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
