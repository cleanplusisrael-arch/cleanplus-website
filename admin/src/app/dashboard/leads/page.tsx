'use client';
import { useState, useMemo } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Header } from '@/components/layout/Header';
import { LeadsFilters, type FiltersState } from '@/components/leads/LeadsFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { LeadKanban } from '@/components/leads/LeadKanban';
import { StatCard } from '@/components/ui/StatCard';
import { LayoutList, Kanban, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { LeadStatus } from '@/lib/types';

type View = 'table' | 'kanban';

const DEFAULT_FILTERS: FiltersState = { search: '', status: '', source: '', dateFrom: '', dateTo: '' };

export default function LeadsPage() {
  const { leads, loading, error, updateLeadStatus } = useLeads();
  const [view, setView]       = useState<View>('table');
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.phone.includes(q)) return false;
      }
      if (filters.status && l.status !== filters.status) return false;
      if (filters.source && l.source !== filters.source) return false;
      if (filters.dateFrom && l.createdAt < filters.dateFrom) return false;
      if (filters.dateTo && l.createdAt > filters.dateTo + 'T23:59:59') return false;
      return true;
    });
  }, [leads, filters]);

  async function handleStatusChange(id: string, status: LeadStatus) {
    await updateLeadStatus(id, status);
  }

  return (
    <>
      <Header title="CRM לידים" />
      <div className="p-6 space-y-5" dir="rtl">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="סה״כ לידים"    value={leads.length}                                    icon={<Users size={18} className="text-navy" />}         accent="bg-blue-50" />
          <StatCard label="חדשים"          value={leads.filter((l) => l.status === 'new').length}  icon={<Clock size={18} className="text-amber-500" />}    accent="bg-amber-50" sub="ממתינים לטיפול" />
          <StatCard label="זכייה"          value={leads.filter((l) => l.status === 'won').length}  icon={<CheckCircle2 size={18} className="text-green-500" />} accent="bg-green-50" />
          <StatCard label="הפסד"           value={leads.filter((l) => l.status === 'lost').length} icon={<XCircle size={18} className="text-gray-400" />}   accent="bg-gray-100" />
        </div>

        {/* Filters */}
        <LeadsFilters filters={filters} onChange={setFilters} total={leads.length} filtered={filtered.length} />

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hebrew transition-colors border
              ${view === 'table' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy/30'}`}
          >
            <LayoutList size={15} />
            טבלה
          </button>
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hebrew transition-colors border
              ${view === 'kanban' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy/30'}`}
          >
            <Kanban size={15} />
            קנבן
          </button>
        </div>

        {/* Content */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-hebrew">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-100 py-20 text-center text-gray-400 font-hebrew text-sm shadow-sm">
            טוען לידים...
          </div>
        ) : view === 'table' ? (
          <LeadsTable leads={filtered} onStatusChange={handleStatusChange} />
        ) : (
          <LeadKanban leads={filtered} onStatusChange={handleStatusChange} />
        )}
      </div>
    </>
  );
}
