'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Candidate, CandidateStatus, StatusHistoryEntry } from '@/lib/candidate-types';

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'leads_candidates'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q,
      (snap) => {
        setCandidates(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Candidate, 'id'>) })));
        setLoading(false);
      },
      (err) => { console.error(err); setError('שגיאה בטעינת הנתונים'); setLoading(false); },
    );
    return unsub;
  }, []);

  async function updateCandidateStatus(candidateId: string, newStatus: CandidateStatus, note?: string) {
    const entry: StatusHistoryEntry = { status: newStatus, timestamp: new Date().toISOString(), ...(note ? { note } : {}) };
    const current = candidates.find((c) => c.id === candidateId);
    await updateDoc(doc(db, 'leads_candidates', candidateId), {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [...(current?.statusHistory ?? []), entry],
    });
  }

  async function addInternalNote(candidateId: string, note: string) {
    await updateDoc(doc(db, 'leads_candidates', candidateId), {
      internalNotes: note,
      updatedAt: new Date().toISOString(),
    });
  }

  return { candidates, loading, error, updateCandidateStatus, addInternalNote };
}
