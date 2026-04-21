import type { LeadStatus } from '@/lib/types';
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, LEAD_STATUS_DOT } from '@/lib/types';

export function StatusBadge({ status }: { status: LeadStatus }) {
  const { bg, text, border } = LEAD_STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${LEAD_STATUS_DOT[status]}`} />
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}

export function SourceBadge({ source }: { source?: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    site:     { label: 'אתר',      cls: 'bg-sky-50 text-sky-700 border-sky-200' },
    ads:      { label: 'פרסום',    cls: 'bg-orange-50 text-orange-700 border-orange-200' },
    whatsapp: { label: 'וואטסאפ', cls: 'bg-green-50 text-green-700 border-green-200' },
    referral: { label: 'המלצה',   cls: 'bg-rose-50 text-rose-700 border-rose-200' },
  };
  const item = source ? map[source] : null;
  if (!item) return <span className="text-gray-400 text-xs">—</span>;
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.cls}`}>
      {item.label}
    </span>
  );
}
