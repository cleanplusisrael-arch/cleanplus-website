'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import {
  CLIENT_TYPE_LABELS, CLIENT_STATUS_LABELS, CLIENT_STATUS_COLORS,
  ZONES,
} from '@/lib/client-types';
import type { Client, ClientType, ClientStatus } from '@/lib/client-types';
import {
  Users, UserCheck, Star, Plus, Phone, Pencil, Trash2,
  X, Save, ExternalLink, Building2, User,
} from 'lucide-react';

const EMPTY: Omit<Client, 'id' | 'createdAt' | 'clientNumber'> = {
  name: '', phone: '', email: '', address: '', city: '',
  clientType: 'private', teudatZehut: '', misparOsek: '',
  status: 'active', notes: '', internalNotes: '',
};

function ClientModal({ initial, onSave, onClose }: {
  initial?: Partial<Client>;
  onSave: (data: Omit<Client, 'id' | 'createdAt' | 'clientNumber'>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">{initial?.name ? 'עריכת לקוח' : 'לקוח חדש'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {/* Type toggle */}
          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1.5">סוג לקוח</label>
            <div className="flex gap-2">
              {(['private', 'business'] as ClientType[]).map((t) => (
                <button key={t} onClick={() => set('clientType', t)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-hebrew transition-colors ${form.clientType === t ? 'bg-navy text-white border-navy' : 'border-gray-200 text-gray-600 hover:border-navy/30'}`}>
                  {t === 'private' ? <User size={14} /> : <Building2 size={14} />}
                  {CLIENT_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {[
            { label: 'שם מלא *', key: 'name', type: 'text' },
            { label: 'טלפון *', key: 'phone', type: 'tel', dir: 'ltr' },
            { label: 'אימייל', key: 'email', type: 'email', dir: 'ltr' },
            { label: 'כתובת', key: 'address', type: 'text' },
            { label: 'עיר', key: 'city', type: 'text' },
          ].map(({ label, key, type, dir }) => (
            <div key={key}>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">{label}</label>
              <input type={type} dir={dir} value={(form as Record<string, string>)[key] ?? ''}
                onChange={(e) => set(key as keyof typeof form, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          ))}

          {form.clientType === 'private' ? (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">תעודת זהות</label>
              <input type="text" dir="ltr" maxLength={9} value={form.teudatZehut ?? ''}
                onChange={(e) => set('teudatZehut', e.target.value.replace(/\D/g, ''))}
                placeholder="000000000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">מספר עוסק / ח.פ</label>
              <input type="text" dir="ltr" value={form.misparOsek ?? ''}
                onChange={(e) => set('misparOsek', e.target.value.replace(/\D/g, ''))}
                placeholder="000000000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">סטטוס</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value as ClientStatus)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white">
              {Object.entries(CLIENT_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-hebrew mb-1">הערות</label>
            <textarea value={form.notes ?? ''} onChange={(e) => set('notes', e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg font-hebrew hover:bg-gray-50">ביטול</button>
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

export default function ClientsPage() {
  const { clients, loading, createClient, updateClient, deleteClient, toggleStatus } = useClients();
  const [modal, setModal]     = useState<'new' | Client | null>(null);
  const [search, setSearch]   = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => clients.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) || (c.teudatZehut ?? '').includes(search) ||
    (c.misparOsek ?? '').includes(search)
  ), [clients, search]);

  const active = clients.filter((c) => c.status === 'active').length;
  const vip    = clients.filter((c) => c.status === 'vip').length;

  async function handleDelete(id: string) {
    if (!confirm('למחוק לקוח זה?')) return;
    setDeleting(id);
    await deleteClient(id);
    setDeleting(null);
  }

  return (
    <>
      <Header title="לקוחות" />
      {modal && (
        <ClientModal
          initial={modal === 'new' ? undefined : modal}
          onSave={modal === 'new' ? createClient : (data) => updateClient((modal as Client).id, data)}
          onClose={() => setModal(null)}
        />
      )}
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="סה״כ לקוחות" value={clients.length} icon={<Users size={18} className="text-navy" />} accent="bg-blue-50" />
          <StatCard label="פעילים" value={active} icon={<UserCheck size={18} className="text-green-500" />} accent="bg-green-50" />
          <StatCard label="VIP" value={vip} icon={<Star size={18} className="text-yellow-500" />} accent="bg-yellow-50" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3 items-center">
          <input type="text" placeholder="חיפוש שם / טלפון / ת.ז..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 py-2 ps-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew" />
          <button onClick={() => setModal('new')}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 shrink-0">
            <Plus size={15} />הוסף לקוח
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                {['מס׳', 'שם', 'טלפון', 'ת.ז / עוסק', 'עיר', 'סטטוס', ''].map((h) => (
                  <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={7} className="py-16 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="py-16 text-center text-gray-400 font-hebrew text-sm">אין לקוחות</td></tr>
              )}
              {filtered.map((client) => (
                <tr key={client.id} className={`border-b border-gray-50 hover:bg-gray-50/40 transition-colors ${client.status === 'inactive' ? 'opacity-50' : ''}`}>
                  <td className="ps-4 pe-3 py-3.5 text-xs text-gray-400 font-mono">{client.clientNumber}</td>
                  <td className="px-3 py-3.5">
                    <Link href={`/dashboard/clients/${client.id}`}
                      className="font-medium text-gray-800 hover:text-navy hover:underline font-hebrew flex items-center gap-1.5 group">
                      {client.clientType === 'business' ? <Building2 size={12} className="text-gray-400 shrink-0" /> : <User size={12} className="text-gray-400 shrink-0" />}
                      {client.name}
                      <ExternalLink size={11} className="text-gray-300 group-hover:text-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="px-3 py-3.5">
                    <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-navy" dir="ltr">
                      <Phone size={13} className="text-gray-400" />{client.phone}
                    </a>
                  </td>
                  <td className="px-3 py-3.5 text-gray-500 text-xs font-mono" dir="ltr">
                    {client.teudatZehut || client.misparOsek || '—'}
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 font-hebrew">{client.city || '—'}</td>
                  <td className="px-3 py-3.5">
                    <button onClick={() => toggleStatus(client.id, client.status)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border font-hebrew ${CLIENT_STATUS_COLORS[client.status]}`}>
                      {CLIENT_STATUS_LABELS[client.status]}
                    </button>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModal(client)} className="text-gray-400 hover:text-navy transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(client.id)} disabled={deleting === client.id}
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
