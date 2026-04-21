'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TimeclockEntry } from '@/lib/timeclock-types';

export function useTimeclock(dateFilter?: string) {
  const [entries, setEntries] = useState<TimeclockEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const today = dateFilter ?? new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const q = query(
      collection(db, 'timeclock'),
      where('date', '==', today),
      orderBy('createdAt', 'desc'),
    );
    const unsub = onSnapshot(q, (snap) => {
      setEntries(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TimeclockEntry, 'id'>) })));
      setLoading(false);
    });
    return unsub;
  }, [today]);

  async function clockIn(employeeId: string, employeeName: string, lat?: number, lng?: number) {
    const now = new Date().toISOString();
    await addDoc(collection(db, 'timeclock'), {
      employeeId, employeeName,
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
