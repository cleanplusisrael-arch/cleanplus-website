'use client';
import { useEffect, useState } from 'react';
import {
  collection, onSnapshot, orderBy, query,
  doc, updateDoc, addDoc, deleteDoc, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Employee } from '@/lib/employee-types';

async function nextEmployeeNumber(): Promise<string> {
  const snap = await getDocs(collection(db, 'employees'));
  const nums = snap.docs
    .map((d) => d.data().employeeNumber as string | undefined)
    .filter(Boolean)
    .map((n) => parseInt(n!.replace('E-', ''), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length === 0 ? 1 : Math.max(...nums) + 1;
  return `E-${String(next).padStart(5, '0')}`;
}

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

  async function createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'employeeNumber'>) {
    const employeeNumber = await nextEmployeeNumber();
    await addDoc(collection(db, 'employees'), {
      ...data,
      employeeNumber,
      createdAt: new Date().toISOString(),
    });
  }

  async function updateEmployee(id: string, data: Partial<Employee>) {
    await updateDoc(doc(db, 'employees', id), { ...data, updatedAt: new Date().toISOString() });
  }

  async function deleteEmployee(id: string) {
    await deleteDoc(doc(db, 'employees', id));
  }

  async function toggleStatus(id: string, current: 'active' | 'inactive') {
    await updateDoc(doc(db, 'employees', id), {
      status: current === 'active' ? 'inactive' : 'active',
      updatedAt: new Date().toISOString(),
    });
  }

  return { employees, loading, createEmployee, updateEmployee, deleteEmployee, toggleStatus };
}
