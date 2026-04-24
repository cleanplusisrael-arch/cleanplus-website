'use client';
import { useState } from 'react';
import { useShifts } from '@/hooks/useShifts';
import { useEmployees } from '@/hooks/useEmployees';
import { Header } from '@/components/layout/Header';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS, DAYS_HE } from '@/lib/shift-types';
import type { Shift, ShiftStatus } from '@/lib/shift-types';
import { Plus, X, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { ZONES } from '@/lib/employee-types';

function getWeekDates(offset: number): Date[] {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day + offset * 7);
  return Array.from({ length: 6 }, (_, i) => { const d = new Date(sunday); d.setDate(sunday.getDate() + i); return d; });
}

function fmtDate(d: Date) { return d.toISOString().slice(0, 10); }
function fmtDisplay(d: Date) { return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit' }).format(d); }

function ShiftModal({ employees, onSave, onClose, defaultDate }: {
  employees: { id: string; name: string }[];
  onSave: (data: Omit<Shift, 'id' | 'createdAt'>) => Promise<void>;
  onClose: () => void;
  defaultDate: string;
}) {
  const [form, setForm] = useState({ employeeId: '', employeeName: '', clientName: '', address: '', date: defaultDate, startTime: '08:00', endTime: '16:00', service: '', notes: '', status: 'planned' as ShiftStatus });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">משמרת חדשה</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">עובד *</label>
            <select value={form.employeeId} onChange={(e) => { const emp = employees.find((x) => x.id === e.target.value); set('employeeId', e.target.value); if (emp) set('employeeName', emp.name); }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              <option value="">בחר עובד</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          {[{ l: 'שם לקוח *', k: 'clientName' }, { l: 'כתובת *', k: 'address' }, { l: 'שירות', k: 'service' }].map(({ l, k }) => (
            <div key={k}><label className="block text-xs text-gray-500 font-hebrew mb-1">{l}</label>
              <input value={(form as Record<string, string>)[k]} onChange={(e) => set(k, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" /></div>
          ))}
          <div className="grid grid-cols-3 gap-3">
            {[{ l: 'תאריך', k: 'date', t: 'date' }, { l: 'שעת התחלה', k: 'startTime', t: 'time' }, { l: 'שעת סיום', k: 'endTime', t: 'time' }].map(({ l, k, t }) => (
              <div key={k}><label className="block text-xs text-gray-500 font-hebrew mb-1">{l}</label>
                <input type={t} value={(form as Record<string, string>)[k]} onChange={(e) => set(k, e.target.value)}
                  dir="ltr" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" /></div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg font-hebrew">ביטול</button>
          <button onClick={async () => {
            if (!form.employeeId || !form.clientName || !form.address) return;
            setSaving(true); await onSave(form); setSaving(false); onClose();
          }} disabled={saving} className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90">
            <Save size={14} />{saving ? 'שומר...' : 'שמור'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlanningPage() {
  const { shifts, loading, createShift, updateShiftStatus, deleteShift } = useShifts();
  const { employees } = useEmployees();
  const [weekOffset, setWeekOffset] = useState(0);
  const [modal, setModal]           = useState<string | null>(null); // date string
  const weekDates = getWeekDates(weekOffset);

  const shiftsByDate = weekDates.reduce((acc, d) => {
    const k = fmtDate(d);
    return { ...acc, [k]: shifts.filter((s) => s.date === k) };
  }, {} as Record<string, Shift[]>);

  const activeEmps = employees.filter((e) => e.status === 'active');

  return (
    <>
      <Header title="תכנון משמרות" />
      {modal && <ShiftModal employees={activeEmps} onSave={createShift} onClose={() => setModal(null)} defaultDate={modal} />}
      <div className="p-6 space-y-5" dir="rtl">
        {/* Week nav */}
        <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 px-5 py-3 shadow-sm">
          <button onClick={() => setWeekOffset((w) => w - 1)} className="text-gray-400 hover:text-navy transition-colors"><ChevronRight size={20} /></button>
          <p className="flex-1 text-center text-sm font-semibold text-navy font-hebrew">
            שבוע {fmtDisplay(weekDates[0])} — {fmtDisplay(weekDates[5])}
            {weekOffset === 0 && <span className="ms-2 text-xs text-gold font-medium">השבוע</span>}
          </p>
          <button onClick={() => setWeekOffset((w) => w + 1)} className="text-gray-400 hover:text-navy transition-colors"><ChevronLeft size={20} /></button>
          <button onClick={() => setWeekOffset(0)} className="text-xs text-gray-400 hover:text-navy border border-gray-200 rounded-lg px-3 py-1.5 font-hebrew">היום</button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-6 gap-3">
          {weekDates.map((date, i) => {
            const k = fmtDate(date);
            const dayShifts = shiftsByDate[k] ?? [];
            const isToday = k === fmtDate(new Date());
            return (
              <div key={k} className={`rounded-xl border bg-white shadow-sm overflow-hidden ${isToday ? 'border-gold/40 ring-1 ring-gold/20' : 'border-gray-100'}`}>
                <div className={`px-3 py-2.5 border-b ${isToday ? 'bg-gold/10 border-gold/20' : 'border-gray-50 bg-gray-50/50'}`}>
                  <p className="text-xs font-semibold text-gray-700 font-hebrew">{DAYS_HE[i]}</p>
                  <p className={`text-xs mt-0.5 ${isToday ? 'text-gold font-medium' : 'text-gray-400'}`} dir="ltr">{fmtDisplay(date)}</p>
                </div>
                <div className="p-2 space-y-1.5 min-h-[120px]">
                  {dayShifts.map((shift) => (
                    <div key={shift.id} className={`rounded-lg px-2 py-1.5 border text-xs ${SHIFT_STATUS_COLORS[shift.status]}`}>
                      <p className="font-medium font-hebrew truncate">{shift.employeeName}</p>
                      <p className="font-hebrew truncate opacity-80">{shift.clientName}</p>
                      <p dir="ltr" className="opacity-70">{shift.startTime}–{shift.endTime}</p>
                      <div className="flex gap-1 mt-1">
                        {shift.status === 'planned' && (
                          <button onClick={() => updateShiftStatus(shift.id, 'done')} className="text-[10px] text-green-600 hover:underline font-hebrew">סיים</button>
                        )}
                        <button onClick={() => deleteShift(shift.id)} className="text-[10px] text-red-400 hover:underline font-hebrew ms-auto">בטל</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setModal(k)}
                    className="w-full mt-1 text-xs text-gray-300 hover:text-gold hover:border-gold/30 border border-dashed border-gray-200 rounded-lg py-1.5 transition-colors font-hebrew">
                    + הוסף
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(SHIFT_STATUS_LABELS).map(([k, v]) => (
            <span key={k} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${SHIFT_STATUS_COLORS[k as ShiftStatus]}`}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
