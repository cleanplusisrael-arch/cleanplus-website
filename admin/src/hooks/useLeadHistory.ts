'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Shift } from '@/lib/shift-types';

export function useLeadHistory(clientName: string) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientName) return;
    const q = query(
      collection(db, 'shifts'),
      where('clientName', '==', clientName),
      orderBy('date', 'desc'),
    );
    const unsub = onSnapshot(q, (snap) => {
      setShifts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Shift, 'id'>) })));
      setLoading(false);
    });
    return unsub;
  }, [clientName]);

  return { shifts, loading };
}
