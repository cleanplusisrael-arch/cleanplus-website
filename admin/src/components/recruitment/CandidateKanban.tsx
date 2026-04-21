'use client';
import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import Link from 'next/link';
import type { Candidate, CandidateStatus } from '@/lib/candidate-types';
import { CANDIDATE_STATUS_LABELS, CANDIDATE_STATUS_DOT, ALL_CANDIDATE_STATUSES } from '@/lib/candidate-types';
import { Phone } from 'lucide-react';

function CandidateCard({ c, isDragging }: { c: Candidate; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: c.id });
  const style = transform ? { transform: `translate(${transform.x}px,${transform.y}px)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={`bg-white rounded-lg border border-gray-100 p-3 shadow-sm cursor-grab active:cursor-grabbing select-none hover:border-gold/30 hover:shadow-md transition-all ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <Link href={`/dashboard/recruitment/${c.id}`} onClick={(e) => e.stopPropagation()}
          className="font-medium text-sm text-gray-800 hover:text-navy font-hebrew">{c.name}</Link>
        <span className="text-[10px] text-gray-400 shrink-0" dir="ltr">
          {c.createdAt ? new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit' }).format(new Date(c.createdAt)) : ''}
        </span>
      </div>
      {c.zone && <p className="text-xs text-gray-500 font-hebrew mb-1.5">{c.zone}</p>}
      {c.availability && <p className="text-xs text-gray-400 font-hebrew mb-1.5">זמינות: {c.availability}</p>}
      <a href={`tel:${c.phone}`} onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy" dir="ltr">
        <Phone size={11} className="text-gray-400 shrink-0" />{c.phone}
      </a>
    </div>
  );
}

function KanbanCol({ status, candidates, activeId }: { status: CandidateStatus; candidates: Candidate[]; activeId: string | null }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const dot = CANDIDATE_STATUS_DOT[status];
  const topColor: Record<CandidateStatus, string> = {
    new: 'border-t-blue-400', called: 'border-t-amber-400', interview: 'border-t-purple-400',
    hired: 'border-t-green-400', rejected: 'border-t-gray-300',
  };
  return (
    <div className={`flex flex-col rounded-xl border-t-4 ${topColor[status]} bg-gray-50/60 border border-gray-100 min-w-[200px] max-w-[240px] w-full`}>
      <div className="px-3 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <span className="text-sm font-semibold text-gray-700 font-hebrew">{CANDIDATE_STATUS_LABELS[status]}</span>
        </div>
        <span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-500" dir="ltr">{candidates.length}</span>
      </div>
      <div ref={setNodeRef} className={`flex-1 p-2 space-y-2 min-h-[100px] rounded-b-xl transition-colors ${isOver ? 'bg-gold/5 ring-2 ring-inset ring-gold/20' : ''}`}>
        {candidates.map((c) => <CandidateCard key={c.id} c={c} isDragging={activeId === c.id} />)}
        {candidates.length === 0 && <div className="h-12 flex items-center justify-center"><p className="text-xs text-gray-300 font-hebrew">גרור לכאן</p></div>}
      </div>
    </div>
  );
}

export function CandidateKanban({ candidates, onStatusChange }: { candidates: Candidate[]; onStatusChange: (id: string, s: CandidateStatus) => Promise<void> }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const active = activeId ? candidates.find((c) => c.id === activeId) : null;
  const byStatus = ALL_CANDIDATE_STATUSES.reduce((acc, s) => ({ ...acc, [s]: candidates.filter((c) => c.status === s) }), {} as Record<CandidateStatus, Candidate[]>);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}
      onDragStart={({ active }: DragStartEvent) => setActiveId(String(active.id))}
      onDragEnd={async ({ active, over }: DragEndEvent) => {
        setActiveId(null);
        if (!over) return;
        const c = candidates.find((x) => x.id === active.id);
        if (c && c.status !== over.id) await onStatusChange(String(active.id), over.id as CandidateStatus);
      }}>
      <div className="flex gap-3 overflow-x-auto pb-4" dir="rtl">
        {ALL_CANDIDATE_STATUSES.map((s) => <KanbanCol key={s} status={s} candidates={byStatus[s]} activeId={activeId} />)}
      </div>
      <DragOverlay>
        {active && (
          <div className="bg-white rounded-lg border border-gold/40 shadow-xl p-3 w-52 rotate-1 opacity-95">
            <p className="font-medium text-sm text-gray-800 font-hebrew">{active.name}</p>
            <p className="text-xs text-gray-500 mt-1" dir="ltr">{active.phone}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
