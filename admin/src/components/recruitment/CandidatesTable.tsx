'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Candidate, CandidateStatus } from '@/lib/candidate-types';
import { CANDIDATE_STATUS_LABELS, ALL_CANDIDATE_STATUSES } from '@/lib/candidate-types';
import { ChevronDown, Phone, Download } from 'lucide-react';

function StatusBadge({ status }: { status: CandidateStatus }) {
  const colors: Record<CandidateStatus, string> = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    called: 'bg-amber-50 text-amber-700 border-amber-200',
    interview: 'bg-purple-50 text-purple-700 border-purple-200',
    hired: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  const dots: Record<CandidateStatus, string> = {
    new: 'bg-blue-500', called: 'bg-amber-500', interview: 'bg-purple-500', hired: 'bg-green-500', rejected: 'bg-gray-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {CANDIDATE_STATUS_LABELS[status]}
    </span>
  );
}

function fmt(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
}

function exportCSV(candidates: Candidate[]) {
  const headers = ['שם', 'טלפון', 'זמינות', 'אזור', 'סטטוס', 'תאריך'];
  const rows = candidates.map((c) => [c.name, c.phone, c.availability ?? '', c.zone ?? '', CANDIDATE_STATUS_LABELS[c.status], fmt(c.createdAt)]);
  const csv = [headers, ...rows].map((r) => r.map((x) => `"${x}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = `candidates-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
}

export function CandidatesTable({ candidates, onStatusChange }: { candidates: Candidate[]; onStatusChange: (id: string, s: CandidateStatus) => Promise<void> }) {
  const [openDD, setOpenDD] = useState<string | null>(null);
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" dir="rtl">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
        <p className="text-sm font-semibold text-gray-700 font-hebrew">{candidates.length} מועמדים</p>
        <button onClick={() => exportCSV(candidates)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 hover:border-navy/30 px-3 py-1.5 rounded-lg transition-colors">
          <Download size={14} />ייצוא CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              {['שם', 'טלפון', 'זמינות', 'אזור', 'סטטוס', 'תאריך', ''].map((h) => (
                <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 && <tr><td colSpan={7} className="py-16 text-center text-gray-400 font-hebrew text-sm">אין מועמדים</td></tr>}
            {candidates.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                <td className="ps-4 pe-3 py-3.5">
                  <Link href={`/dashboard/recruitment/${c.id}`} className="font-medium text-gray-800 hover:text-navy hover:underline font-hebrew">{c.name}</Link>
                </td>
                <td className="px-3 py-3.5"><a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-navy" dir="ltr"><Phone size={13} className="text-gray-400" />{c.phone}</a></td>
                <td className="px-3 py-3.5 text-gray-600 font-hebrew">{c.availability ?? '—'}</td>
                <td className="px-3 py-3.5 text-gray-600 font-hebrew">{c.zone ?? '—'}</td>
                <td className="px-3 py-3.5">
                  <div className="relative inline-block">
                    <button onClick={() => setOpenDD(openDD === c.id ? null : c.id)} className="flex items-center gap-1">
                      <StatusBadge status={c.status} /><ChevronDown size={13} className="text-gray-400" />
                    </button>
                    {openDD === c.id && (
                      <div className="absolute start-0 top-full mt-1 z-20 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[180px]">
                        {ALL_CANDIDATE_STATUSES.map((s) => (
                          <button key={s} onClick={() => { setOpenDD(null); onStatusChange(c.id, s); }}
                            className={`w-full text-start px-3 py-2 text-sm font-hebrew hover:bg-gray-50 ${s === c.status ? 'text-gold font-medium' : 'text-gray-700'}`}>
                            {CANDIDATE_STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3.5 text-gray-500 text-xs" dir="ltr">{fmt(c.createdAt)}</td>
                <td className="px-3 py-3.5"><Link href={`/dashboard/recruitment/${c.id}`} className="text-xs text-gold hover:text-gold/80 font-hebrew">פרטים</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
