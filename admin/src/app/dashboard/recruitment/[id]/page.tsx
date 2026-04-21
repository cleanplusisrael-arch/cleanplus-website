'use client';
import { use, useState } from 'react';
import { useCandidates } from '@/hooks/useCandidates';
import { Header } from '@/components/layout/Header';
import { CANDIDATE_STATUS_LABELS, CANDIDATE_STATUS_DOT, ALL_CANDIDATE_STATUSES } from '@/lib/candidate-types';
import type { CandidateStatus } from '@/lib/candidate-types';
import { ArrowRight, Phone, Save, Clock, ChevronDown } from 'lucide-react';
import Link from 'next/link';

function fmt(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
}

export default function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { candidates, loading, updateCandidateStatus, addInternalNote } = useCandidates();
  const c = candidates.find((x) => x.id === id);
  const [notes, setNotes]       = useState(c?.internalNotes ?? '');
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [showDD, setShowDD]     = useState(false);

  if (loading) return <><Header title="פרטי מועמד" /><div className="p-6 text-center text-gray-400 font-hebrew py-20">טוען...</div></>;
  if (!c) return <><Header title="פרטי מועמד" /><div className="p-6 text-center"><p className="text-gray-400 font-hebrew mb-4">לא נמצא</p><Link href="/dashboard/recruitment" className="text-gold font-hebrew text-sm">חזרה לרשימה</Link></div></>;

  const colors = { new: 'bg-blue-50 text-blue-700 border-blue-200', called: 'bg-amber-50 text-amber-700 border-amber-200', interview: 'bg-purple-50 text-purple-700 border-purple-200', hired: 'bg-green-50 text-green-700 border-green-200', rejected: 'bg-gray-100 text-gray-500 border-gray-200' };

  return (
    <>
      <Header title="פרטי מועמד" />
      <div className="p-6 space-y-5" dir="rtl">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/recruitment" className="text-gray-400 hover:text-navy"><ArrowRight size={20} className="rtl:rotate-180" /></Link>
          <h2 className="text-xl font-bold text-navy font-hebrew">{c.name}</h2>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[c.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${CANDIDATE_STATUS_DOT[c.status]}`} />{CANDIDATE_STATUS_LABELS[c.status]}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew">פרטי מועמד</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[['שם מלא', c.name], ['זמינות', c.availability ?? '—'], ['אזור', c.zone ?? '—'], ['ניסיון', c.experience ?? '—']].map(([l, v]) => (
                  <div key={l}><p className="text-xs text-gray-400 font-hebrew mb-0.5">{l}</p><p className="text-sm text-gray-700 font-hebrew">{v}</p></div>
                ))}
                <div><p className="text-xs text-gray-400 font-hebrew mb-0.5">טלפון</p>
                  <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-navy text-sm" dir="ltr"><Phone size={13} />{c.phone}</a>
                </div>
                <div><p className="text-xs text-gray-400 font-hebrew mb-0.5">תאריך הגשה</p><p className="text-sm text-gray-700" dir="ltr">{fmt(c.createdAt)}</p></div>
              </div>
              {c.notes && <div className="mt-4 pt-4 border-t border-gray-50"><p className="text-xs text-gray-500 mb-1.5 font-hebrew">הערות המועמד</p><p className="text-sm text-gray-700 font-hebrew leading-hebrew">{c.notes}</p></div>}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">הערות פנימיות</h3>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="הוסף הערות פנימיות..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-hebrew leading-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none" />
              <div className="flex justify-between items-center mt-3">
                {saved && <p className="text-xs text-green-600 font-hebrew">✓ נשמר</p>}
                <button onClick={async () => { setSaving(true); await addInternalNote(c.id, notes); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                  disabled={saving} className="ms-auto flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-60">
                  <Save size={14} />{saving ? 'שומר...' : 'שמור'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">שינוי סטטוס</h3>
              <div className="relative">
                <button onClick={() => setShowDD((v) => !v)} className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 text-sm hover:border-gold/40">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[c.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${CANDIDATE_STATUS_DOT[c.status]}`} />{CANDIDATE_STATUS_LABELS[c.status]}
                  </span>
                  <ChevronDown size={15} className="text-gray-400" />
                </button>
                {showDD && (
                  <div className="absolute start-0 top-full mt-1 z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                    {ALL_CANDIDATE_STATUSES.map((s) => (
                      <button key={s} onClick={() => { setShowDD(false); updateCandidateStatus(c.id, s); }}
                        className={`w-full text-start px-3 py-2.5 text-sm font-hebrew hover:bg-gray-50 ${s === c.status ? 'text-gold font-semibold' : 'text-gray-700'}`}>
                        {CANDIDATE_STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {(c.statusHistory?.length ?? 0) > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 font-hebrew flex items-center gap-2"><Clock size={14} className="text-gray-400" />היסטוריה</h3>
                <div className="space-y-3">
                  {[...(c.statusHistory ?? [])].reverse().map((e, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
                        {i < c.statusHistory!.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                      </div>
                      <div className="pb-3">
                        <p className="text-sm font-medium text-gray-700 font-hebrew">{CANDIDATE_STATUS_LABELS[e.status]}</p>
                        <p className="text-xs text-gray-400 mt-0.5" dir="ltr">{fmt(e.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 font-hebrew">פעולות</h3>
              <a href={`tel:${c.phone}`} className="flex items-center gap-2.5 w-full bg-navy/5 hover:bg-navy/10 text-navy rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors"><Phone size={15} />התקשר</a>
              <a href={`https://wa.me/972${c.phone.replace(/^0/, '').replace(/-/g, '')}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-lg px-4 py-2.5 text-sm font-hebrew transition-colors"><span>💬</span>וואטסאפ</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
