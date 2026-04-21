'use client';
import { ALL_STATUSES, LEAD_STATUS_LABELS, type LeadStatus, type LeadSource } from '@/lib/types';
import { Search, X } from 'lucide-react';

export interface FiltersState {
  search: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  dateFrom: string;
  dateTo: string;
}

interface Props {
  filters: FiltersState;
  onChange: (f: FiltersState) => void;
  total: number;
  filtered: number;
}

export function LeadsFilters({ filters, onChange, total, filtered }: Props) {
  const set = (partial: Partial<FiltersState>) => onChange({ ...filters, ...partial });
  const hasFilters = filters.search || filters.status || filters.source || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3" dir="rtl">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש לפי שם או טלפון..."
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            className="w-full ps-9 pe-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => set({ status: e.target.value as LeadStatus | '' })}
          className="py-2 ps-3 pe-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew bg-white"
        >
          <option value="">כל הסטטוסים</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
          ))}
        </select>

        {/* Source */}
        <select
          value={filters.source}
          onChange={(e) => set({ source: e.target.value as LeadSource | '' })}
          className="py-2 ps-3 pe-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew bg-white"
        >
          <option value="">כל המקורות</option>
          <option value="site">אתר</option>
          <option value="ads">פרסום</option>
          <option value="whatsapp">וואטסאפ</option>
          <option value="referral">המלצה</option>
        </select>

        {/* Date range */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => set({ dateFrom: e.target.value })}
          className="py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white"
          dir="ltr"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => set({ dateTo: e.target.value })}
          className="py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white"
          dir="ltr"
        />

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={() => onChange({ search: '', status: '', source: '', dateFrom: '', dateTo: '' })}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors py-2 px-3 border border-gray-200 rounded-lg"
          >
            <X size={14} />
            נקה
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 font-hebrew">
        מציג <bdi className="font-medium text-gray-600">{filtered}</bdi> מתוך <bdi>{total}</bdi> לידים
      </p>
    </div>
  );
}
