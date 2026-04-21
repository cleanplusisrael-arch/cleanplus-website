'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Lead, LeadStatus } from '@/lib/types';
import {
  LEAD_STATUS_LABELS, LEAD_SERVICE_LABELS, ALL_STATUSES,
} from '@/lib/types';
import { StatusBadge, SourceBadge } from '@/components/ui/Badge';
import { ChevronDown, Phone, Download } from 'lucide-react';

function formatDate(iso?: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
}

function exportCSV(leads: Lead[]) {
  const headers = ['שם', 'טלפון', 'שירות', 'עיר', 'מקור', 'סטטוס', 'תאריך'];
  const rows = leads.map((l) => [
    l.name, l.phone,
    l.service ? LEAD_SERVICE_LABELS[l.service] : '',
    l.city ?? '',
    l.source ?? '',
    LEAD_STATUS_LABELS[l.status],
    formatDate(l.createdAt),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
}

export function LeadsTable({ leads, onStatusChange }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  async function handleStatus(leadId: string, status: LeadStatus) {
    setOpenDropdown(null);
    await onStatusChange(leadId, status);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm" dir="rtl">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
        <p className="text-sm font-semibold text-gray-700 font-hebrew">{leads.length} לידים</p>
        <button
          onClick={() => exportCSV(leads)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 hover:border-navy/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Download size={14} />
          ייצוא CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="text-start ps-5 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">שם</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">טלפון</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">שירות</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">עיר</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">מקור</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">סטטוס</th>
              <th className="text-start px-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">תאריך</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400 font-hebrew text-sm">
                  אין לידים להצגה
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                <td className="ps-5 pe-3 py-3.5">
                  <Link href={`/dashboard/leads/${lead.id}`} className="font-medium text-gray-800 hover:text-navy hover:underline font-hebrew">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-3 py-3.5">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-navy transition-colors" dir="ltr">
                    <Phone size={13} className="text-gray-400 shrink-0" />
                    {lead.phone}
                  </a>
                </td>
                <td className="px-3 py-3.5 text-gray-600 font-hebrew">
                  {lead.service ? LEAD_SERVICE_LABELS[lead.service] : '—'}
                </td>
                <td className="px-3 py-3.5 text-gray-600 font-hebrew">{lead.city ?? '—'}</td>
                <td className="px-3 py-3.5"><SourceBadge source={lead.source} /></td>
                <td className="px-3 py-3.5">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === lead.id ? null : lead.id)}
                      className="flex items-center gap-1"
                    >
                      <StatusBadge status={lead.status} />
                      <ChevronDown size={13} className="text-gray-400 ms-0.5" />
                    </button>
                    {openDropdown === lead.id && (
                      <div className="absolute start-0 top-full mt-1 z-20 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[180px]">
                        {ALL_STATUSES.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleStatus(lead.id, s)}
                            className={`w-full text-start px-3 py-2 text-sm font-hebrew hover:bg-gray-50 transition-colors ${s === lead.status ? 'text-gold font-medium' : 'text-gray-700'}`}
                          >
                            {LEAD_STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3.5 text-gray-500 text-xs" dir="ltr">{formatDate(lead.createdAt)}</td>
                <td className="px-3 py-3.5">
                  <Link href={`/dashboard/leads/${lead.id}`} className="text-xs text-gold hover:text-gold/80 font-hebrew">
                    פרטים
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
