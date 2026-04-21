'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Shift, ShiftStatus } from '@/lib/shift-types';

export function useShifts() {
  const [shifts, setShifts]   = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'shifts'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setShifts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Shift, 'id'>) })));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function createShift(data: Omit<Shift, 'id' | 'createdAt'>) {
    await addDoc(collection(db, 'shifts'), { ...data, createdAt: new Date().toISOString() });
  }

  async function updateShiftStatus(id: string, status: ShiftStatus) {
    await updateDoc(doc(db, 'shifts', id), { status, updatedAt: new Date().toISOString() });
  }

  async function deleteShift(id: string) {
    await updateDoc(doc(db, 'shifts', id), { status: 'cancelled', updatedAt: new Date().toISOString() });
  }

  return { shifts, loading, createShift, updateShiftStatus, deleteShift };
}
