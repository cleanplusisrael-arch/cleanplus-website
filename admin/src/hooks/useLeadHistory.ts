'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Shift } from '@/lib/shift-types';

export function useLeadHistory(clientName: string) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientName) return;
    // Single-field where only — no composite index needed
    const q = query(collection(db, 'shifts'), where('clientName', '==', clientName));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<Shift, 'id'>) }))
        .sort((a, b) => b.date.localeCompare(a.date));
      setShifts(data);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [clientName]);

  return { shifts, loading };
}
