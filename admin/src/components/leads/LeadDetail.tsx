'use client';
import { useState } from 'react';
import type { Lead, LeadStatus } from '@/lib/types';
import {
  LEAD_STATUS_LABELS, LEAD_SERVICE_LABELS, LEAD_SOURCE_LABELS,
  ALL_STATUSES,
} from '@/lib/types';
import { SHIFT_STATUS_LABELS, SHIFT_STATUS_COLORS } from '@/lib/shift-types';
import type { ShiftStatus } from '@/lib/shift-types';
import { StatusBadge, SourceBadge } from '@/components/ui/Badge';
import { Phone, ChevronDown, Save, ArrowRight, Clock, FileText, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { useLeadHistory } from '@/hooks/useLeadHistory';

function formatDateTime(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

interface Props {
  lead: Lead;
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
}

export function LeadDetail({ lead, onStatusChange, onSaveNotes }: Props) {
  const [notes, setNotes]             = useState(lead.internalNotes ?? '');
  const [saving, setSaving]           = useState(false);
  const [showStatus, setShowStatus]   = useState(false);
  const [savedMsg, setSavedMsg]       = useState(false);
  const { shifts } = useLeadHistory(lead.name);

  async function handleSaveNotes() {
    setSaving(true);
    await onSaveNotes(lead.id, notes);
    setSaving(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  async function handleStatus(s: LeadStatus) {
    setShowStatus(false);
    await onStatusChange(lead.id, s);
  }

  return (
    <div dir="rtl" className="space-y-5">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/leads" className="text-gray-400 hover:text-navy transition-colors">
          <ArrowRight size={20} className="rtl:rotate-180" />
        </Link>
        <h2 className="text-xl font-bold text-navy font-hebrew">{lead.name}</h2>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">

          {/* Info card */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">פרטי הליד</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <InfoRow label="שם מלא" value={lead.name} />
              <InfoRow label="טלפון">
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-navy hover:underline" dir="ltr">
                  <Phone size={13} /> {lead.phone}
                </a>
              </InfoRow>
              <InfoRow label="שירות" value={lead.service ? LEAD_SERVICE_LABELS[lead.service] : '—'} />
              <InfoRow label="עיר" value={lead.city ?? '—'} />
              <InfoRow label="מקור"><SourceBadge source={lead.source} /></InfoRow>
              <InfoRow label="תאריך" value={formatDateTime(lead.createdAt)} dir="ltr" />
            </div>

            {lead.notes && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-500 mb-1.5 font-hebrew">הערות הלקוח</p>
                <p className="text-sm text-gray-700 font-hebrew leading-hebrew">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Missions history */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 font-hebrew flex items-center gap-2">
                <CalendarDays size={15} className="text-gray-400" />משמרות אצל לקוח זה
              </h3>
              <span className="text-xs text-gray-400 font-hebrew">{shifts.length} משמרות</span>
            </div>
            {shifts.length === 0
              ? <p className="py-8 text-center text-gray-400 font-hebrew text-sm">אין משמרות עדיין</p>
              : <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50/50 border-b border-gray-50">
                    {['תאריך', 'עובד', 'שעות', 'סטטוס'].map((h) => (
                      <th key={h} className="text-start ps-4 pe-3 py-2.5 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {shifts.slice(0, 10).map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/40">
                        <td className="ps-4 pe-3 py-3 text-gray-600 text-xs" dir="ltr">{s.date}</td>
                        <td className="px-3 py-3 text-gray-700 font-hebrew text-xs">{s.employeeName}</td>
                        <td className="px-3 py-3 text-gray-600 text-xs" dir="ltr">{s.startTime}–{s.endTime}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-hebrew ${SHIFT_STATUS_COLORS[s.status as ShiftStatus]}`}>
                            {SHIFT_STATUS_LABELS[s.status as ShiftStatus]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            }
          </div>

          {/* Internal notes */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">הערות פנימיות</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="הוסף הערות פנימיות — גלויות רק לצוות הניהול..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-hebrew leading-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              {savedMsg && <p className="text-xs text-green-600 font-hebrew">✓ נשמר בהצלחה</p>}
              <div className="ms-auto">
                <button
                  onClick={handleSaveNotes}
                  disabled={saving}
                  className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 transition-colors disabled:opacity-60"
                >
                  <Save size={14} />
                  {saving ? 'שומר...' : 'שמור הערות'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: status + history */}
        <div className="space-y-5">
          {/* Change status */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">שינוי סטטוס</h3>
            <div className="relative">
              <button
                onClick={() => setShowStatus((v) => !v)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 text-sm hover:border-gold/40 transition-colors"
              >
                <StatusBadge status={lead.status} />
                <ChevronDown size={15} className="text-gray-400" />
              </button>
              {showStatus && (
                <div className="absolute start-0 top-full mt-1 z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  {ALL_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(s)}
                      className={`w-full text-start px-3 py-2.5 text-sm font-hebrew hover:bg-gray-50 transition-colors ${s === lead.status ? 'text-gold font-semibold' : 'text-gray-700'}`}
                    >
                      {LEAD_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status history */}
          {(lead.statusHistory?.length ?? 0) > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                היסטוריית סטטוסים
              </h3>
              <div className="space-y-3">
                {[...( lead.statusHistory ?? [])].reverse().map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                      {i < (lead.statusHistory!.length - 1) && (
                        <div className="w-px flex-1 bg-gray-100 mt-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="text-sm font-medium text-gray-700 font-hebrew">{LEAD_STATUS_LABELS[entry.status]}</p>
                      <p className="text-xs text-gray-400 mt-0.5" dir="ltr">{formatDateTime(entry.timestamp)}</p>
                      {entry.note && <p className="text-xs text-gray-500 mt-1 font-hebrew">{entry.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">פעולות מהירות</h3>
            <div className="space-y-2">
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2.5 w-full bg-navy/5 hover:bg-navy/10 text-navy rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors"
              >
                <Phone size={15} />
                התקשר ל{lead.name}
              </a>
              <a
                href={`https://wa.me/972${lead.phone.replace(/^0/, '').replace(/-/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors"
              >
                <span className="text-base">💬</span>
                שלח וואטסאפ
              </a>
              <Link
                href="/dashboard/documents"
                className="flex items-center gap-2.5 w-full bg-gold/5 hover:bg-gold/10 text-gold rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors border border-gold/20"
              >
                <FileText size={15} />
                צור הצעת מחיר
              </Link>
            </div>
          </div>

          {/* Lead stats */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">סיכום</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'סה״כ משמרות', val: shifts.length },
                { label: 'הושלמו', val: shifts.filter((s) => s.status === 'done').length },
                { label: 'מתוכננות', val: shifts.filter((s) => s.status === 'planned').length },
                { label: 'בוטלו', val: shifts.filter((s) => s.status === 'cancelled').length },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-500 font-hebrew text-xs">{label}</span>
                  <span className="font-semibold text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label, value, children, dir,
}: {
  label: string; value?: string; children?: React.ReactNode; dir?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-hebrew mb-0.5">{label}</p>
      {children ? children : (
        <p className="text-sm text-gray-700 font-hebrew" dir={dir}>{value}</p>
      )}
    </div>
  );
}
