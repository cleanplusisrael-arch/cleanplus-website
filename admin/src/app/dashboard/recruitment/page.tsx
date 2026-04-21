'use client';
import { useState, useMemo } from 'react';
import { useCandidates } from '@/hooks/useCandidates';
import { Header } from '@/components/layout/Header';
import { CandidatesTable } from '@/components/recruitment/CandidatesTable';
import { CandidateKanban } from '@/components/recruitment/CandidateKanban';
import { StatCard } from '@/components/ui/StatCard';
import { LayoutList, Kanban, UserCheck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { CandidateStatus } from '@/lib/candidate-types';

export default function RecruitmentPage() {
  const { candidates, loading, error, updateCandidateStatus } = useCandidates();
  const [view, setView]       = useState<'table' | 'kanban'>('table');
  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState<CandidateStatus | ''>('');

  const filtered = useMemo(() => candidates.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false;
    if (status && c.status !== status) return false;
    return true;
  }), [candidates, search, status]);

  return (
    <>
      <Header title="CRM גיוס" />
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="סה״כ מועמדים" value={candidates.length} icon={<UserCheck size={18} className="text-navy" />} accent="bg-blue-50" />
          <StatCard label="חדשים" value={candidates.filter((c) => c.status === 'new').length} icon={<Clock size={18} className="text-amber-500" />} accent="bg-amber-50" />
          <StatCard label="התקבלו" value={candidates.filter((c) => c.status === 'hired').length} icon={<CheckCircle2 size={18} className="text-green-500" />} accent="bg-green-50" />
          <StatCard label="לא מתאים" value={candidates.filter((c) => c.status === 'rejected').length} icon={<XCircle size={18} className="text-gray-400" />} accent="bg-gray-100" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3" dir="rtl">
          <input type="text" placeholder="חיפוש שם / טלפון..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] py-2 ps-4 pe-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew" />
          <select value={status} onChange={(e) => setStatus(e.target.value as CandidateStatus | '')}
            className="py-2 ps-3 pe-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew bg-white">
            <option value="">כל הסטטוסים</option>
            <option value="new">חדש</option><option value="called">בוצעה שיחה</option>
            <option value="interview">ראיון מתוכנן</option><option value="hired">התקבל</option><option value="rejected">לא מתאים</option>
          </select>
        </div>

        <div className="flex gap-2">
          {(['table', 'kanban'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hebrew transition-colors border ${view === v ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy/30'}`}>
              {v === 'table' ? <><LayoutList size={15} />טבלה</> : <><Kanban size={15} />קנבן</>}
            </button>
          ))}
        </div>

        {loading ? <div className="bg-white rounded-xl border border-gray-100 py-20 text-center text-gray-400 font-hebrew text-sm shadow-sm">טוען...</div>
          : view === 'table' ? <CandidatesTable candidates={filtered} onStatusChange={updateCandidateStatus} />
          : <CandidateKanban candidates={filtered} onStatusChange={updateCandidateStatus} />}
      </div>
    </>
  );
}
