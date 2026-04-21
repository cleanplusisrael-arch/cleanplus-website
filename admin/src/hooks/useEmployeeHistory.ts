'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Shift } from '@/lib/shift-types';
import type { TimeclockEntry } from '@/lib/timeclock-types';

export function useEmployeeHistory(employeeId: string) {
  const [shifts, setShifts]   = useState<Shift[]>([]);
  const [clock, setClock]     = useState<TimeclockEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) return;
    let shiftsLoaded = false;
    let clockLoaded  = false;

    const done = () => { if (shiftsLoaded && clockLoaded) setLoading(false); };

    const unsubShifts = onSnapshot(
      query(collection(db, 'shifts'), where('employeeId', '==', employeeId), orderBy('date', 'desc')),
      (snap) => { setShifts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Shift, 'id'>) }))); shiftsLoaded = true; done(); },
    );

    const unsubClock = onSnapshot(
      query(collection(db, 'timeclock'), where('employeeId', '==', employeeId), orderBy('date', 'desc')),
      (snap) => { setClock(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TimeclockEntry, 'id'>) }))); clockLoaded = true; done(); },
    );

    return () => { unsubShifts(); unsubClock(); };
  }, [employeeId]);

  return { shifts, clock, loading };
}
