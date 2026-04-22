'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useEmployees } from '@/hooks/useEmployees';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { CONTRACT_LABELS, ZONES } from '@/lib/employee-types';
import type { Employee, ContractType } from '@/lib/employee-types';
import { Users, UserCheck, UserX, Plus, Phone, Pencil, X, Save, Trash2, ExternalLink } from 'lucide-react';

const EMPTY: Omit<Employee, 'id' | 'createdAt' | 'employeeNumber'> = {
  name: '', teudatZehut: '', phone: '', email: '', zone: '', hireDate: '',
  status: 'active', contractType: 'full_time',
  nekudotZikui: 2.25, grossSalary: 0, hourlyRate: 0, notes: '',
};

function EmployeeModal({ initial, onSave, onClose }: {
  initial?: Partial<Employee>;
  onSave: (data: Omit<Employee, 'id' | 'createdAt' | 'employeeNumber'>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));
  const isHourly = form.contractType === 'hourly';

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">{initial?.name ? 'עריכת עובד' : 'עובד חדש'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {[
            { label: 'שם מלא *', key: 'name', type: 'text' },
            { label: 'תעודת זהות *', key: 'teudatZehut', type: 'text', dir: 'ltr', placeholder: '000000000', maxLength: 9 },
            { label: 'טלפון *', key: 'phone', type: 'tel', dir: 'ltr' },
            { label: 'אימייל', key: 'email', type: 'email', dir: 'ltr' },
            { label: 'תאריך תחילת עבודה', key: 'hireDate', type: 'date', dir: 'ltr' },
          ].map(({ label, key, type, dir, placeholder, maxLength }) => (
            <div key={key}>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">{label}</label>
              <input type={type} dir={dir} placeholder={placeholder} maxLength={maxLength}
                value={(form as Record<string, unknown>)[key] as string ?? ''}
                onChange={(e) => set(key as keyof typeof form,
                  key === 'teudatZehut' ? e.target.value.replace(/\D/g, '') : e.target.value
                )}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          ))}

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">אזור פעילות</label>
            <select value={form.zone} onChange={(e) => set('zone', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              <option value="">בחר אזור</option>
              {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">סוג חוזה</label>
            <select value={form.contractType} onChange={(e) => set('contractType', e.target.value as ContractType)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              {Object.entries(CONTRACT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          {isHourly ? (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">תעריף שעתי (₪)</label>
              <input type="number" dir="ltr" min={0} value={form.hourlyRate ?? 0}
                onChange={(e) => set('hourlyRate', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
              <p className="text-xs text-gray-400 mt-1 font-hebrew">* החישוב יבוצע לפי שעות נוכחות בפועל</p>
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">שכר ברוטו (₪)</label>
              <input type="number" dir="ltr" min={0} value={form.grossSalary ?? 0}
                onChange={(e) => set('grossSalary', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">נקודות זיכוי</label>
            <input type="number" dir="ltr" step={0.25} min={0} value={form.nekudotZikui ?? 2.25}
              onChange={(e) => set('nekudotZikui', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">הערות</label>
            <textarea value={form.notes ?? ''} onChange={(e) => set('notes', e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 font-hebrew">ביטול</button>
          <button onClick={async () => {
            if (!form.name || !form.phone) return;
            setSaving(true); await onSave(form); setSaving(false); onClose();
          }} disabled={saving}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-60">
            <Save size={14} />{saving ? 'שומר...' : 'שמור'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmployeesPage() {
  const { employees, loading, createEmployee, updateEmployee, deleteEmployee, toggleStatus } = useEmployees();
  const [modal, setModal]     = useState<'new' | Employee | null>(null);
  const [search, setSearch]   = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = employees.filter((e) =>
    !search || e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.phone.includes(search) || (e.teudatZehut ?? '').includes(search)
  );
  const active = employees.filter((e) => e.status === 'active').length;

  async function handleDelete(id: string, name: string) {
    if (!confirm(`למחוק את ${name}? פעולה זו אינה ניתנת לביטול.`)) return;
    setDeleting(id);
    await deleteEmployee(id);
    setDeleting(null);
  }

  return (
    <>
      <Header title="עובדים" />
      {modal && (
        <EmployeeModal
          initial={modal === 'new' ? undefined : modal}
          onSave={modal === 'new' ? createEmployee : (data) => updateEmployee((modal as Employee).id, data)}
          onClose={() => setModal(null)}
        />
      )}
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="סה״כ עובדים" value={employees.length} icon={<Users size={18} className="text-navy" />} accent="bg-blue-50" />
          <StatCard label="פעילים" value={active} icon={<UserCheck size={18} className="text-green-500" />} accent="bg-green-50" />
          <StatCard label="לא פעילים" value={employees.length - active} icon={<UserX size={18} className="text-gray-400" />} accent="bg-gray-100" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3 items-center" dir="rtl">
          <input type="text" placeholder="חיפוש שם / טלפון / ת.ז..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 py-2 ps-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew" />
          <button onClick={() => setModal('new')}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 shrink-0">
            <Plus size={15} />הוסף עובד
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" dir="rtl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                {['מס׳', 'שם', 'ת.ז', 'טלפון', 'אזור', 'שכר', 'סטטוס', ''].map((h) => (
                  <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={8} className="py-16 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
              {filtered.map((emp) => (
                <tr key={emp.id} className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${emp.status === 'inactive' ? 'opacity-50' : ''}`}>
                  <td className="ps-4 pe-2 py-3.5 text-xs text-gray-400 font-mono">{emp.employeeNumber ?? '—'}</td>
                  <td className="px-2 py-3.5">
                    <Link href={`/dashboard/employees/${emp.id}`}
                      className="font-medium text-gray-800 hover:text-navy hover:underline font-hebrew flex items-center gap-1.5 group">
                      {emp.name}
                      <ExternalLink size={11} className="text-gray-300 group-hover:text-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="px-2 py-3.5 text-gray-400 text-xs font-mono" dir="ltr">{emp.teudatZehut || '—'}</td>
                  <td className="px-2 py-3.5">
                    <a href={`tel:${emp.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-navy" dir="ltr">
                      <Phone size={12} className="text-gray-400" />{emp.phone}
                    </a>
                  </td>
                  <td className="px-2 py-3.5 text-gray-600 font-hebrew text-xs">{emp.zone ?? '—'}</td>
                  <td className="px-2 py-3.5 text-gray-600 text-xs" dir="ltr">
                    {emp.contractType === 'hourly'
                      ? emp.hourlyRate ? `₪${emp.hourlyRate}/ש` : '—'
                      : emp.grossSalary ? `₪${emp.grossSalary.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-2 py-3.5">
                    <button onClick={() => toggleStatus(emp.id, emp.status)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border font-hebrew ${emp.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {emp.status === 'active' ? 'פעיל' : 'לא פעיל'}
                    </button>
                  </td>
                  <td className="px-2 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setModal(emp)} className="text-gray-400 hover:text-navy transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(emp.id, emp.name)} disabled={deleting === emp.id}
                        className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
