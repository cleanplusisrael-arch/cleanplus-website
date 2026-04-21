'use client';
import { useState } from 'react';
import {
  DndContext, DragOverlay, closestCenter, PointerSensor,
  useSensor, useSensors, DragStartEvent, DragEndEvent,
} from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import Link from 'next/link';
import type { Lead, LeadStatus } from '@/lib/types';
import { LEAD_STATUS_LABELS, LEAD_STATUS_DOT, LEAD_SERVICE_LABELS, ALL_STATUSES } from '@/lib/types';
import { Phone } from 'lucide-react';

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit' }).format(new Date(iso));
}

/* ── Draggable lead card ── */
function LeadCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: lead.id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg border border-gray-100 p-3 shadow-sm cursor-grab active:cursor-grabbing select-none
        hover:border-gold/30 hover:shadow-md transition-all
        ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link
          href={`/dashboard/leads/${lead.id}`}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-sm text-gray-800 hover:text-navy font-hebrew leading-tight"
        >
          {lead.name}
        </Link>
        <span className="text-[10px] text-gray-400 shrink-0" dir="ltr">{formatDate(lead.createdAt)}</span>
      </div>
      {lead.service && (
        <p className="text-xs text-gray-500 font-hebrew mb-2">{LEAD_SERVICE_LABELS[lead.service]}</p>
      )}
      <a
        href={`tel:${lead.phone}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy transition-colors"
        dir="ltr"
      >
        <Phone size={11} className="text-gray-400 shrink-0" />
        {lead.phone}
      </a>
      {lead.city && (
        <p className="text-xs text-gray-400 font-hebrew mt-1">{lead.city}</p>
      )}
    </div>
  );
}

/* ── Droppable column ── */
function KanbanColumn({
  status, leads, activeId,
}: {
  status: LeadStatus;
  leads: Lead[];
  activeId: string | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const dotColor = LEAD_STATUS_DOT[status];
  const colBg: Record<LeadStatus, string> = {
    new:        'border-t-blue-400',
    contacted:  'border-t-amber-400',
    quote_sent: 'border-t-purple-400',
    won:        'border-t-green-400',
    lost:       'border-t-gray-300',
  };

  return (
    <div className={`flex flex-col rounded-xl border-t-4 ${colBg[status]} bg-gray-50/60 border border-gray-100 min-w-[220px] max-w-[260px] w-full`}>
      {/* Column header */}
      <div className="px-3 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="text-sm font-semibold text-gray-700 font-hebrew">{LEAD_STATUS_LABELS[status]}</span>
        </div>
        <span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-500 font-medium" dir="ltr">
          {leads.length}
        </span>
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-2 space-y-2 min-h-[120px] rounded-b-xl transition-colors ${isOver ? 'bg-gold/5 ring-2 ring-inset ring-gold/20' : ''}`}
      >
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} isDragging={activeId === lead.id} />
        ))}
        {leads.length === 0 && (
          <div className="h-16 flex items-center justify-center">
            <p className="text-xs text-gray-300 font-hebrew">גרור לידים לכאן</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Kanban Board ── */
interface Props {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => Promise<void>;
}

export function LeadKanban({ leads, onStatusChange }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id));
  }

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const newStatus = over.id as LeadStatus;
    const lead = leads.find((l) => l.id === active.id);
    if (lead && lead.status !== newStatus) {
      await onStatusChange(String(active.id), newStatus);
    }
  }

  const byStatus = ALL_STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: leads.filter((l) => l.status === s) }),
    {} as Record<LeadStatus, Lead[]>,
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4" dir="rtl">
        {ALL_STATUSES.map((status) => (
          <KanbanColumn key={status} status={status} leads={byStatus[status]} activeId={activeId} />
        ))}
      </div>

      <DragOverlay>
        {activeLead && (
          <div className="bg-white rounded-lg border border-gold/40 shadow-xl p-3 w-56 rotate-1 opacity-95">
            <p className="font-medium text-sm text-gray-800 font-hebrew">{activeLead.name}</p>
            <p className="text-xs text-gray-500 mt-1" dir="ltr">{activeLead.phone}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
