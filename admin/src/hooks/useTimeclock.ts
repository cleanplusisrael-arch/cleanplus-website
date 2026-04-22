'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TimeclockEntry } from '@/lib/timeclock-types';

export function useTimeclock(dateFilter?: string) {
  const [entries, setEntries] = useState<TimeclockEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const today = dateFilter ?? new Date().toISOString().slice(0, 10);

  useEffect(() => {
    // Single-field where only — no composite index needed, sort client-side
    const q = query(collection(db, 'timeclock'), where('date', '==', today));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<TimeclockEntry, 'id'>) }))
        .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
      setEntries(data);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [today]);

  async function clockIn(employeeId: string, employeeName: string, lat?: number, lng?: number) {
    const now = new Date().toISOString();
    await addDoc(collection(db, 'timeclock'), {
      employeeId,
      employeeName,
      date: now.slice(0, 10),
      clockIn: now,
      ...(lat && lng ? { lat, lng } : {}),
      createdAt: now,
    });
  }

  async function clockOut(entryId: string) {
    await updateDoc(doc(db, 'timeclock', entryId), { clockOut: new Date().toISOString() });
  }

  return { entries, loading, clockIn, clockOut };
}
