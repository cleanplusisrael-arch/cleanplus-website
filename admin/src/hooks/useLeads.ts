'use client';
import { useEffect, useState } from 'react';
import {
  collection, onSnapshot, orderBy, query,
  doc, updateDoc, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Lead, LeadStatus, StatusHistoryEntry } from '@/lib/types';

export function useLeads() {
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'leads_clients'), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data: Lead[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, 'id'>) }));
        setLeads(data);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError('שגיאה בטעינת הנתונים');
        setLoading(false);
      },
    );

    return unsub;
  }, []);

  async function updateLeadStatus(leadId: string, newStatus: LeadStatus, note?: string) {
    const entry: StatusHistoryEntry = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      ...(note ? { note } : {}),
    };

    await updateDoc(doc(db, 'leads_clients', leadId), {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [...(leads.find((l) => l.id === leadId)?.statusHistory ?? []), entry],
    });
  }

  async function addInternalNote(leadId: string, note: string) {
    await updateDoc(doc(db, 'leads_clients', leadId), {
      internalNotes: note,
      updatedAt: new Date().toISOString(),
    });
  }

  return { leads, loading, error, updateLeadStatus, addInternalNote };
}
