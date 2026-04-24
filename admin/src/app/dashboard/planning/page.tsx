'use client';
import { useState, useRef, useEffect } from 'react';
import { useShifts } from '@/hooks/useShifts';
import { useEmployees } from '@/hooks/useEmployees';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/layout/Header';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS, DAYS_HE } from '@/lib/shift-types';
import type { Shift, ShiftStatus } from '@/lib/shift-types';
import type { Employee } from '@/lib/employee-types';
import type { Client, ClientType } from '@/lib/client-types';
import { X, Save, ChevronRight, ChevronLeft, Pencil, Trash2, Calendar, CalendarDays, Clock, Search, UserPlus } from 'lucide-react';

const DAYS_HE_FULL = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

function getWeekDates(offset: number): Date[] {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day + offset * 7);
  return Array.from({ length: 6 }, (_, i) => { const d = new Date(sunday); d.setDate(sunday.getDate() + i); return d; });
}

function getMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const cells: (Date | null)[] = [...Array(startDow).fill(null), ...Array.from({ length: lastDay.getDate() }, (_, i) => new Date(year, month, i + 1))];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function fmtDate(d: Date) { return d.toISOString().slice(0, 10); }
function fmtDisplay(d: Date) { return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit' }).format(d); }
function fmtDisplayFull(d: Date) { return new Intl.DateTimeFormat('he-IL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(d); }

type ModalMode = { type: 'create'; date: string } | { type: 'edit'; shift: Shift };

function sendWhatsApp(employee: Employee, shift: Omit<Shift, 'id' | 'createdAt'>) {
  if (!employee.phone) return;
  const phone = employee.phone.replace(/[^0-9]/g, '').replace(/^0/, '972');
  const date = new Intl.DateTimeFormat('he-IL', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(shift.date));
  const msg = `שלום ${employee.name}! 👋\n📋 משמרת חדשה שובצה עבורך:\n\n📅 ${date}\n⏰ ${shift.startTime} – ${shift.endTime}\n👤 לקוח: ${shift.clientName}\n📍 ${shift.address}${shift.service ? '\n🧹 שירות: ' + shift.service : ''}${shift.notes ? '\n📝 ' + shift.notes : ''}\n\nבהצלחה! ✨\nClean+`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function ShiftModal({ employees, clients, mode, onSave, onUpdate, onCreateClient, onClose }: {
  employees: Employee[];
  clients: Client[];
  mode: ModalMode;
  onSave: (data: Omit<Shift, 'id' | 'createdAt'>) => Promise<void>;
  onUpdate: (id: string, data: Partial<Omit<Shift, 'id' | 'createdAt'>>) => Promise<void>;
  onCreateClient: (data: Omit<Client, 'id' | 'createdAt' | 'clientNumber'>) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = mode.type === 'edit';
  const initial = isEdit
    ? { employeeId: mode.shift.employeeId, employeeName: mode.shift.employeeName, clientId: '', clientName: mode.shift.clientName, address: mode.shift.address, date: mode.shift.date, startTime: mode.shift.startTime, endTime: mode.shift.endTime, service: mode.shift.service ?? '', notes: mode.shift.notes ?? '', status: mode.shift.status }
    : { employeeId: '', employeeName: '', clientId: '', clientName: '', address: '', date: mode.date, startTime: '08:00', endTime: '16:00', service: '', notes: '', status: 'planned' as ShiftStatus };

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [clientSearch, setClientSearch] = useState(isEdit ? mode.shift.clientName : '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', address: '', city: '', clientType: 'private' as ClientType, status: 'active' as const });
  const [savingClient, setSavingClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setNC = (k: string, v: string) => setNewClient((f) => ({ ...f, [k]: v }));
  const selectedEmp = employees.find(e => e.id === form.employeeId);

  const filteredClients = clients.filter(c =>
    c.name.includes(clientSearch) || c.phone.includes(clientSearch) || (c.city ?? '').includes(clientSearch)
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function selectClient(c: Client) {
    set('clientId', c.id);
    set('clientName', c.name);
    set('address', [c.address, c.city].filter(Boolean).join(', '));
    setClientSearch(c.name);
    setShowDropdown(false);
  }

  async function handleCreateClient() {
    if (!newClient.name || !newClient.phone) return;
    setSavingClient(true);
    await onCreateClient(newClient);
    const justCreated = { id: '__new__', name: newClient.name, phone: newClient.phone, address: newClient.address, city: newClient.city, clientType: newClient.clientType, status: 'active' as const, clientNumber: '', createdAt: '' };
    set('clientName', newClient.name);
    set('address', [newClient.address, newClient.city].filter(Boolean).join(', '));
    setClientSearch(newClient.name);
    setSavingClient(false);
    setShowNewClient(false);
    setNewClient({ name: '', phone: '', address: '', city: '', clientType: 'private', status: 'active' });
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">{isEdit ? 'עריכת משמרת' : 'משמרת חדשה'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          {/* Employee */}
          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">עובד *</label>
            <select value={form.employeeId} onChange={(e) => { const emp = employees.find((x) => x.id === e.target.value); set('employeeId', e.target.value); if (emp) set('employeeName', emp.name); }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              <option value="">בחר עובד</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>

          {/* Client search */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-gray-500 font-hebrew">לקוח *</label>
              <button onClick={() => setShowNewClient((v) => !v)} className="flex items-center gap-1 text-xs text-gold hover:text-gold/80 font-hebrew">
                <UserPlus size={12} />{showNewClient ? 'ביטול' : 'לקוח חדש'}
              </button>
            </div>

            {/* New client inline form */}
            {showNewClient && (
              <div className="mb-3 p-3 bg-gold/5 border border-gold/20 rounded-xl space-y-2">
                <p className="text-xs font-semibold text-navy font-hebrew">הוספת לקוח חדש</p>
                {[{ l: 'שם *', k: 'name' }, { l: 'טלפון *', k: 'phone' }, { l: 'כתובת', k: 'address' }, { l: 'עיר', k: 'city' }].map(({ l, k }) => (
                  <div key={k}>
                    <label className="block text-[10px] text-gray-500 font-hebrew mb-0.5">{l}</label>
                    <input value={(newClient as Record<string, string>)[k]} onChange={(e) => setNC(k, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] text-gray-500 font-hebrew mb-0.5">סוג</label>
                  <select value={newClient.clientType} onChange={(e) => setNC('clientType', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-hebrew bg-white focus:outline-none focus:ring-2 focus:ring-gold/30">
                    <option value="private">פרטי</option>
                    <option value="business">עסקי</option>
                  </select>
                </div>
                <button onClick={handleCreateClient} disabled={savingClient || !newClient.name || !newClient.phone}
                  className="w-full flex items-center justify-center gap-1.5 bg-navy text-white px-3 py-1.5 rounded-lg text-xs font-hebrew hover:bg-navy/90 disabled:opacity-50">
                  <Save size={12} />{savingClient ? 'שומר...' : 'צור לקוח ובחר'}
                </button>
              </div>
            )}

            {/* Client search input + dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search size={14} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  value={clientSearch}
                  onChange={(e) => { setClientSearch(e.target.value); setShowDropdown(true); set('clientName', e.target.value); set('clientId', ''); }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="חפש לקוח או הקלד שם..."
                  className="w-full border border-gray-200 rounded-lg pe-8 px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
              {showDropdown && filteredClients.length > 0 && (
                <div className="absolute top-full start-0 end-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto mt-1">
                  {filteredClients.slice(0, 8).map((c) => (
                    <button key={c.id} onClick={() => selectClient(c)}
                      className="w-full text-start px-3 py-2 text-xs hover:bg-gray-50 border-b border-gray-50 last:border-0 font-hebrew">
                      <span className="font-medium">{c.name}</span>
                      {c.city && <span className="text-gray-400 ms-1">— {c.city}</span>}
                      <span className="text-gray-400 ms-1" dir="ltr">{c.phone}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">כתובת *</label>
            <input value={form.address} onChange={(e) => set('address', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>

          {/* Service + notes */}
          {[{ l: 'שירות', k: 'service' }, { l: 'הערות', k: 'notes' }].map(({ l, k }) => (
            <div key={k}>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">{l}</label>
              <input value={(form as Record<string, string>)[k]} onChange={(e) => set(k, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          ))}

          {/* Date + times */}
          <div className="grid grid-cols-3 gap-3">
            {[{ l: 'תאריך', k: 'date', t: 'date' }, { l: 'שעת התחלה', k: 'startTime', t: 'time' }, { l: 'שעת סיום', k: 'endTime', t: 'time' }].map(({ l, k, t }) => (
              <div key={k}>
                <label className="block text-xs text-gray-500 font-hebrew mb-1">{l}</label>
                <input type={t} value={(form as Record<string, string>)[k]} onChange={(e) => set(k, e.target.value)}
                  dir="ltr" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
              </div>
            ))}
          </div>

          {/* Status (edit only) */}
          {isEdit && (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">סטטוס</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
                {Object.entries(SHIFT_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg font-hebrew">ביטול</button>
          <button onClick={async () => {
            if (!form.employeeId || !form.clientName || !form.address) return;
            setSaving(true);
            const fullData = { ...form, assignedByName: 'מנהל', employeePhone: selectedEmp?.phone };
            if (isEdit) {
              await onUpdate(mode.shift.id, fullData);
            } else {
              await onSave(fullData);
              if (selectedEmp) setTimeout(() => sendWhatsApp(selectedEmp, fullData as Omit<Shift, 'id' | 'createdAt'>), 500);
            }
            setSaving(false);
            onClose();
          }} disabled={saving} className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90">
            <Save size={14} />{saving ? 'שומר...' : 'שמור'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShiftCard({ shift, detailed = false, onEdit, onDelete, onStatusChange }: {
  shift: Shift;
  detailed?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange?: (status: ShiftStatus) => void;
}) {
  return (
    <div className={`rounded-lg border text-xs ${SHIFT_STATUS_COLORS[shift.status]} ${detailed ? 'p-3 space-y-1.5' : 'px-2 py-1.5'}`}>
      {detailed ? (
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5 flex-1">
              <p className="font-bold font-hebrew text-sm text-inherit">{shift.clientName}</p>
              <p className="font-hebrew opacity-80">📍 {shift.address}</p>
              {shift.service && <p className="font-hebrew opacity-70">🧹 {shift.service}</p>}
              <p dir="ltr" className="opacity-70 font-mono text-[11px]">⏰ {shift.startTime} – {shift.endTime}</p>
              <p className="font-hebrew opacity-80 text-[11px]">👷 {shift.employeeName}</p>
              {shift.assignedByName && <p className="font-hebrew opacity-60 text-[10px]">שובץ ע"י {shift.assignedByName}</p>}
              {shift.notes && <p className="font-hebrew opacity-60 text-[10px]">📝 {shift.notes}</p>}
            </div>
            <div className="flex flex-col gap-1 items-end">
              <button onClick={onEdit} className="p-1 hover:bg-black/5 rounded"><Pencil size={12} /></button>
              <button onClick={onDelete} className="p-1 hover:bg-black/5 rounded"><Trash2 size={12} /></button>
            </div>
          </div>
          {shift.status === 'planned' && onStatusChange && (
            <button onClick={() => onStatusChange('done')} className="w-full mt-1 text-[10px] px-2 py-1 rounded bg-green-600/20 text-green-700 hover:bg-green-600/30 font-hebrew">סימון כהשלמה</button>
          )}
        </>
      ) : (
        <>
          <p className="font-medium font-hebrew truncate">{shift.employeeName}</p>
          <p className="font-hebrew truncate opacity-80 text-[10px]">{shift.clientName}</p>
          <p dir="ltr" className="opacity-70 text-[10px] font-mono">{shift.startTime}–{shift.endTime}</p>
          <div className="flex items-center gap-1 mt-1">
            <button onClick={onEdit} className="p-0.5 hover:bg-black/5 rounded"><Pencil size={10} /></button>
            <button onClick={onDelete} className="ms-auto p-0.5 hover:bg-black/5 rounded"><Trash2 size={10} /></button>
          </div>
        </>
      )}
    </div>
  );
}

export default function PlanningPage() {
  const { shifts, loading, createShift, updateShiftStatus, updateShift, deleteShift } = useShifts();
  const { employees } = useEmployees();
  const { clients, createClient } = useClients();
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [dayOffset, setDayOffset] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthYear, setMonthYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [modal, setModal] = useState<ModalMode | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const activeEmps = employees.filter((e) => e.status === 'active');
  const weekDates = getWeekDates(weekOffset);
  const dayDate = new Date();
  dayDate.setDate(dayDate.getDate() + dayOffset);
  const dayStr = fmtDate(dayDate);
  const monthGrid = getMonthGrid(monthYear.year, monthYear.month);

  const getShiftsForDate = (dateStr: string) => shifts.filter((s) => s.date === dateStr).sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (loading) return <Header title="תכנון משמרות" />;

  return (
    <>
      <Header title="תכנון משמרות" />
      {modal && <ShiftModal employees={activeEmps} clients={clients} mode={modal} onSave={createShift} onUpdate={updateShift} onCreateClient={createClient} onClose={() => setModal(null)} />}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-2xl max-w-xs shadow-2xl p-6 space-y-4">
            <p className="font-semibold text-navy font-hebrew text-center">למחוק את המשמרת?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg font-hebrew">ביטול</button>
              <button onClick={async () => { await deleteShift(confirmDelete); setConfirmDelete(null); }} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg font-hebrew hover:bg-red-600">מחק</button>
            </div>
          </div>
        </div>
      )}
      <div className="p-6 space-y-5" dir="rtl">
        {/* View toggle + navigation */}
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm flex-wrap">
          <div className="flex gap-2">
            {[{ v: 'day', l: 'יומי', i: Clock }, { v: 'week', l: 'שבועי', i: Calendar }, { v: 'month', l: 'חודשי', i: CalendarDays }].map(({ v, l, i: Icon }) => (
              <button key={v} onClick={() => { setView(v as any); if (v === 'day') setDayOffset(0); if (v === 'week') setWeekOffset(0); if (v === 'month') setMonthYear({ month: new Date().getMonth(), year: new Date().getFullYear() }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-hebrew transition-all ${view === v ? 'bg-navy text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon size={14} /> {l}
              </button>
            ))}
          </div>
          <div className="ms-auto flex items-center gap-2">
            {view === 'day' && (
              <>
                <button onClick={() => setDayOffset((d) => d - 1)} className="p-1.5 text-gray-400 hover:text-navy"><ChevronRight size={16} /></button>
                <p className="text-xs font-semibold text-navy min-w-[140px] text-center font-hebrew">{fmtDisplayFull(dayDate)}</p>
                <button onClick={() => setDayOffset((d) => d + 1)} className="p-1.5 text-gray-400 hover:text-navy"><ChevronLeft size={16} /></button>
                <button onClick={() => setDayOffset(0)} className="text-xs text-gray-400 hover:text-navy border border-gray-200 rounded-lg px-2 py-1 font-hebrew">היום</button>
              </>
            )}
            {view === 'week' && (
              <>
                <button onClick={() => setWeekOffset((w) => w - 1)} className="p-1.5 text-gray-400 hover:text-navy"><ChevronRight size={16} /></button>
                <p className="text-xs font-semibold text-navy min-w-[140px] text-center font-hebrew">{fmtDisplay(weekDates[0])} — {fmtDisplay(weekDates[5])}</p>
                <button onClick={() => setWeekOffset((w) => w + 1)} className="p-1.5 text-gray-400 hover:text-navy"><ChevronLeft size={16} /></button>
                <button onClick={() => setWeekOffset(0)} className="text-xs text-gray-400 hover:text-navy border border-gray-200 rounded-lg px-2 py-1 font-hebrew">השבוע</button>
              </>
            )}
            {view === 'month' && (
              <>
                <button onClick={() => setMonthYear((m) => ({ ...m, month: m.month === 0 ? 11 : m.month - 1, year: m.month === 0 ? m.year - 1 : m.year }))} className="p-1.5 text-gray-400 hover:text-navy"><ChevronRight size={16} /></button>
                <p className="text-xs font-semibold text-navy min-w-[140px] text-center font-hebrew">{['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'][monthYear.month]} {monthYear.year}</p>
                <button onClick={() => setMonthYear((m) => ({ ...m, month: m.month === 11 ? 0 : m.month + 1, year: m.month === 11 ? m.year + 1 : m.year }))} className="p-1.5 text-gray-400 hover:text-navy"><ChevronLeft size={16} /></button>
                <button onClick={() => { const now = new Date(); setMonthYear({ month: now.getMonth(), year: now.getFullYear() }); }} className="text-xs text-gray-400 hover:text-navy border border-gray-200 rounded-lg px-2 py-1 font-hebrew">היום</button>
              </>
            )}
          </div>
        </div>

        {/* Day view */}
        {view === 'day' && (
          <div className="space-y-3">
            {getShiftsForDate(dayStr).length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <p className="text-sm text-gray-500 font-hebrew mb-3">אין משמרות ביום זה</p>
                <button onClick={() => setModal({ type: 'create', date: dayStr })} className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90">+ הוסף משמרת</button>
              </div>
            ) : (
              <>
                {getShiftsForDate(dayStr).map((shift) => (
                  <div key={shift.id} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <ShiftCard shift={shift} detailed={true} onEdit={() => setModal({ type: 'edit', shift })} onDelete={() => setConfirmDelete(shift.id)} onStatusChange={(s) => updateShiftStatus(shift.id, s)} />
                  </div>
                ))}
                <button onClick={() => setModal({ type: 'create', date: dayStr })} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:text-gold hover:border-gold/30 font-hebrew transition-colors">+ הוסף משמרת</button>
              </>
            )}
          </div>
        )}

        {/* Week view */}
        {view === 'week' && (
          <div className="grid grid-cols-6 gap-3">
            {weekDates.map((date, i) => {
              const k = fmtDate(date);
              const dayShifts = getShiftsForDate(k);
              const isToday = k === fmtDate(new Date());
              return (
                <div key={k} className={`rounded-xl border bg-white shadow-sm overflow-hidden ${isToday ? 'border-gold/40 ring-1 ring-gold/20' : 'border-gray-100'}`}>
                  <div className={`px-3 py-2.5 border-b ${isToday ? 'bg-gold/10 border-gold/20' : 'border-gray-50 bg-gray-50/50'}`}>
                    <p className="text-xs font-semibold text-gray-700 font-hebrew">{DAYS_HE[i]}</p>
                    <p className={`text-xs mt-0.5 ${isToday ? 'text-gold font-medium' : 'text-gray-400'}`} dir="ltr">{fmtDisplay(date)}</p>
                  </div>
                  <div className="p-2 space-y-1.5 min-h-[140px]">
                    {dayShifts.map((shift) => <div key={shift.id}><ShiftCard shift={shift} onEdit={() => setModal({ type: 'edit', shift })} onDelete={() => setConfirmDelete(shift.id)} onStatusChange={(s) => updateShiftStatus(shift.id, s)} /></div>)}
                    <button onClick={() => setModal({ type: 'create', date: k })} className="w-full text-xs text-gray-300 hover:text-gold hover:border-gold/30 border border-dashed border-gray-200 rounded-lg py-1.5 transition-colors font-hebrew">+ הוסף</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Month view */}
        {view === 'month' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b bg-gray-50">
              {DAYS_HE_FULL.map((day) => <div key={day} className="px-2 py-2 text-xs font-semibold text-gray-700 font-hebrew text-center border-e border-gray-100">{day}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {monthGrid.flat().map((date, idx) => (
                <div key={idx} className={`border-e border-b border-gray-100 p-2 min-h-[100px] ${date && date.getDay() === 6 ? 'bg-gray-50' : ''} ${!date ? 'bg-gray-50' : 'bg-white'}`}>
                  {date && (
                    <>
                      <p className="text-xs font-semibold text-gray-600 mb-1 font-hebrew">{date.getDate()}</p>
                      <div className="space-y-0.5">
                        {getShiftsForDate(fmtDate(date)).map((shift) => (
                          <div key={shift.id} className="text-[9px] bg-blue-50 border border-blue-200 rounded px-1 py-0.5 cursor-pointer hover:bg-blue-100 font-hebrew truncate" onClick={() => setModal({ type: 'edit', shift })}>
                            {shift.employeeName}
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setModal({ type: 'create', date: fmtDate(date) })} className="text-[9px] text-gray-300 hover:text-gold font-hebrew mt-1">+ הוסף</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
