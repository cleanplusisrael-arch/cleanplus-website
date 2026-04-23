'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useClients } from '@/hooks/useClients';
import { useLeadHistory } from '@/hooks/useLeadHistory';
import { Header } from '@/components/layout/Header';
import { CLIENT_TYPE_LABELS, CLIENT_STATUS_LABELS, CLIENT_STATUS_COLORS } from '@/lib/client-types';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS } from '@/lib/shift-types';
import type { ShiftStatus } from '@/lib/shift-types';
import {
  ArrowRight, Phone, Mail, MapPin, Building2, User,
  FileText, Save, Star, Clock,
} from 'lucide-react';

function str(v: unknown, fallback = '—'): string {
  if (v === null || v === undefined) return fallback;
  if (typeof v === 'string') return v || fallback;
  if (typeof v === 'number') return String(v);
  return fallback;
}

function fmtDate(v: unknown): string {
  const s = str(v, '');
  if (!s) return '—';
  const d = new Date(s);
  if (isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { clients, updateClient } = useClients();
  const client = clients.find((c) => c.id === id);
  const { shifts, loading } = useLeadHistory(client?.name ?? '');

  const [notes, setNotes] = useState('');
  const [notesInit, setNotesInit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (client && !notesInit) {
      setNotes(str(client.notes, ''));
      setNotesInit(true);
    }
  }, [client, notesInit]);

  if (!client && clients.length > 0) return (
    <>
      <Header title="פרטי לקוח" />
      <div className="p-6 text-center py-20">
        <p className="text-gray-400 font-hebrew mb-4">הלקוח לא נמצא</p>
        <Link href="/dashboard/clients" className="text-gold font-hebrew text-sm">חזרה לרשימה</Link>
      </div>
    </>
  );

  if (!client) return <><Header title="פרטי לקוח" /><div className="p-6 py-20 text-center text-gray-400 font-hebrew text-sm">טוען...</div></>;

  const doneShifts = shifts.filter((s) => s.status === 'done').length;

  async function saveNotes() {
    if (!client) return;
    setSaving(true);
    await updateClient(client.id, { notes });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Header title="פרטי לקוח" />
      <div className="p-6 space-y-5" dir="rtl">

        {/* Title row */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/dashboard/clients" className="text-gray-400 hover:text-navy">
            <ArrowRight size={20} className="rtl:rotate-180" />
          </Link>
          <h2 className="text-xl font-bold text-navy font-hebrew">{str(client.name)}</h2>
          <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">{str(client.clientNumber)}</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${CLIENT_STATUS_COLORS[client.status]}`}>
            {client.status === 'vip' ? '★ ' : ''}{CLIENT_STATUS_LABELS[client.status]}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-200">
            {client.clientType === 'business' ? <Building2 size={11} /> : <User size={11} />}
            {CLIENT_TYPE_LABELS[client.clientType]}
          </span>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-white">
            <p className="text-xs text-gray-500 font-hebrew mb-1 flex items-center gap-1"><Clock size={13} />משמרות</p>
            <p className="text-2xl font-bold text-gray-800">{shifts.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-white">
            <p className="text-xs text-gray-500 font-hebrew mb-1 flex items-center gap-1"><Star size={13} />הושלמו</p>
            <p className="text-2xl font-bold text-gray-800">{doneShifts}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-white">
            <p className="text-xs text-gray-500 font-hebrew mb-1 flex items-center gap-1"><MapPin size={13} />עיר</p>
            <p className="text-lg font-bold text-gray-800 truncate">{str(client.city)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">

            {/* Info card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">פרטי הלקוח</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <InfoRow icon={<Phone size={13} />} label="טלפון" val={str(client.phone)} href={`tel:${str(client.phone, '')}`} dir="ltr" />
                <InfoRow icon={<Mail size={13} />} label="אימייל" val={str(client.email)} href={client.email ? `mailto:${client.email}` : undefined} dir="ltr" />
                <InfoRow icon={<MapPin size={13} />} label="כתובת" val={str(client.address)} />
                <InfoRow icon={<MapPin size={13} />} label="עיר" val={str(client.city)} />
                {client.clientType === 'private'
                  ? <InfoRow icon={<FileText size={13} />} label="תעודת זהות" val={str(client.teudatZehut)} dir="ltr" />
                  : <InfoRow icon={<Building2 size={13} />} label="מספר עוסק / ח.פ" val={str(client.misparOsek)} dir="ltr" />
                }
              </div>
            </div>

            {/* Shifts history */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 font-hebrew">היסטוריית משמרות</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50">
                      {['תאריך', 'עובד', 'שעות', 'סטטוס'].map((h) => (
                        <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
                    {!loading && shifts.length === 0 && (
                      <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-hebrew text-sm">אין משמרות עדיין</td></tr>
                    )}
                    {shifts.slice(0, 30).map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/40">
                        <td className="ps-4 pe-3 py-3 text-gray-600" dir="ltr">{fmtDate(s.date)}</td>
                        <td className="px-3 py-3 font-hebrew text-gray-700">{str(s.employeeName)}</td>
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
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">הערות פנימיות</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="הערות על הלקוח..."
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

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">פעולות מהירות</h3>
              <div className="space-y-2">
                {client.phone && (
                  <>
                    <a href={`tel:${client.phone}`}
                      className="flex items-center gap-2.5 w-full bg-navy/5 hover:bg-navy/10 text-navy rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                      <Phone size={15} />התקשר
                    </a>
                    <a href={`https://wa.me/972${client.phone.replace(/^0/, '').replace(/-/g, '')}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2.5 w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors">
                      <span>💬</span>וואטסאפ
                    </a>
                  </>
                )}
                <Link href="/dashboard/documents"
                  className="flex items-center gap-2.5 w-full bg-gold/5 hover:bg-gold/10 text-gold rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors border border-gold/20">
                  <FileText size={15} />צור הצעת מחיר
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">סיכום</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'סה״כ משמרות', val: String(shifts.length) },
                  { label: 'הושלמו', val: String(doneShifts) },
                  { label: 'בוטלו', val: String(shifts.filter((s) => s.status === 'cancelled').length) },
                  { label: 'לקוח מאז', val: fmtDate(client.createdAt) },
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
