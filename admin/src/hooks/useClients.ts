'use client';
import { useEffect, useState } from 'react';
import {
  collection, onSnapshot, orderBy, query,
  addDoc, doc, updateDoc, deleteDoc, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Client, ClientStatus } from '@/lib/client-types';

function padNum(n: number) { return `C-${String(n).padStart(5, '0')}`; }

async function nextClientNumber(): Promise<string> {
  const snap = await getDocs(collection(db, 'clients'));
  const nums = snap.docs
    .map((d) => d.data().clientNumber as string | undefined)
    .filter(Boolean)
    .map((n) => parseInt(n!.replace('C-', ''), 10))
    .filter((n) => !isNaN(n));
  return padNum(nums.length === 0 ? 1 : Math.max(...nums) + 1);
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setClients(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Client, 'id'>) })));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function createClient(data: Omit<Client, 'id' | 'createdAt' | 'clientNumber'>) {
    const clientNumber = await nextClientNumber();
    await addDoc(collection(db, 'clients'), {
      ...data,
      clientNumber,
      createdAt: new Date().toISOString(),
    });
  }

  async function updateClient(id: string, data: Partial<Omit<Client, 'id' | 'createdAt'>>) {
    await updateDoc(doc(db, 'clients', id), { ...data, updatedAt: new Date().toISOString() });
  }

  async function deleteClient(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  }

  async function toggleStatus(id: string, current: ClientStatus) {
    const next: ClientStatus = current === 'active' ? 'inactive' : 'active';
    await updateDoc(doc(db, 'clients', id), { status: next, updatedAt: new Date().toISOString() });
  }

  return { clients, loading, createClient, updateClient, deleteClient, toggleStatus };
}
