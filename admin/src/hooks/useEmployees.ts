'use client';
import { useEffect, useState } from 'react';
import {
  collection, onSnapshot, orderBy, query,
  doc, updateDoc, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Employee } from '@/lib/employee-types';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'employees'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setEmployees(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Employee, 'id'>) })));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function createEmployee(data: Omit<Employee, 'id' | 'createdAt'>) {
    await addDoc(collection(db, 'employees'), { ...data, createdAt: new Date().toISOString() });
  }

  async function updateEmployee(id: string, data: Partial<Employee>) {
    await updateDoc(doc(db, 'employees', id), { ...data, updatedAt: new Date().toISOString() });
  }

  async function toggleStatus(id: string, current: 'active' | 'inactive') {
    await updateDoc(doc(db, 'employees', id), {
      status: current === 'active' ? 'inactive' : 'active',
      updatedAt: new Date().toISOString(),
    });
  }

  return { employees, loading, createEmployee, updateEmployee, toggleStatus };
}
