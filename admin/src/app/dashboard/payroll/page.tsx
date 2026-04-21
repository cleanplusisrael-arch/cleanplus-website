'use client';
import { useState, useMemo } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { CONTRACT_LABELS } from '@/lib/employee-types';
import type { Employee } from '@/lib/employee-types';
import { DollarSign, Users, TrendingDown, Download, ChevronDown, ChevronUp, X } from 'lucide-react';

// Israeli 2024 tax brackets (monthly gross, NIS)
const TAX_BRACKETS = [
  { max: 7010,   rate: 0.10 },
  { max: 10060,  rate: 0.14 },
  { max: 16150,  rate: 0.20 },
  { max: 21240,  rate: 0.31 },
  { max: 44290,  rate: 0.35 },
  { max: 56370,  rate: 0.47 },
  { max: Infinity, rate: 0.50 },
];

// Bituach Leumi employee rate (approximate, 2024)
const BL_EXEMPT = 7522;
const BL_RATE_LOW  = 0.004;
const BL_RATE_HIGH = 0.07;
const BL_CEILING   = 49030;

// Credit point value 2024
const CREDIT_POINT_VALUE = 242;

function calcIncomeTax(gross: number): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of TAX_BRACKETS) {
    const top = Math.min(gross, bracket.max);
    if (top <= prev) break;
    tax += (top - prev) * bracket.rate;
    prev = bracket.max;
    if (gross <= bracket.max) break;
  }
  return tax;
}

function calcBL(gross: number): number {
  const capped = Math.min(gross, BL_CEILING);
  if (capped <= BL_EXEMPT) return capped * BL_RATE_LOW;
  return BL_EXEMPT * BL_RATE_LOW + (capped - BL_EXEMPT) * BL_RATE_HIGH;
}

function calcNet(gross: number, nekudot: number): number {
  const taxCredit = nekudot * CREDIT_POINT_VALUE;
  const rawTax    = calcIncomeTax(gross);
  const incomeTax = Math.max(0, rawTax - taxCredit);
  const bl        = calcBL(gross);
  return Math.round(gross - incomeTax - bl);
}

function PayslipModal({ emp, onClose }: { emp: Employee; onClose: () => void }) {
  const gross    = emp.grossSalary ?? 0;
  const nekudot  = emp.nekudotZikui ?? 2.25;
  const taxCredit = nekudot * CREDIT_POINT_VALUE;
  const rawTax   = calcIncomeTax(gross);
  const tax      = Math.max(0, rawTax - taxCredit);
  const bl       = calcBL(gross);
  const net      = Math.round(gross - tax - bl);

  const month = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' }).format(new Date());

  function print() { window.print(); }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy font-hebrew">תלוש שכר — {emp.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-navy/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 font-hebrew">עובד</span>
              <span className="text-sm font-medium font-hebrew">{emp.name}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 font-hebrew">חודש שכר</span>
              <span className="text-sm font-hebrew">{month}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-hebrew">סוג חוזה</span>
              <span className="text-sm font-hebrew">{emp.contractType ? CONTRACT_LABELS[emp.contractType] : '—'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 font-hebrew">שכר ברוטו</span>
              <span className="text-sm font-medium" dir="ltr">₪{gross.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 font-hebrew">נקודות זיכוי ({nekudot})</span>
              <span className="text-sm text-green-600" dir="ltr">-₪{Math.round(Math.min(rawTax, taxCredit)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 font-hebrew">מס הכנסה</span>
              <span className="text-sm text-red-600" dir="ltr">-₪{Math.round(tax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 font-hebrew">ביטוח לאומי</span>
              <span className="text-sm text-red-600" dir="ltr">-₪{Math.round(bl).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 bg-green-50 rounded-xl px-3 mt-3">
              <span className="text-sm font-bold text-gray-800 font-hebrew">נטו לתשלום</span>
              <span className="text-base font-bold text-green-700" dir="ltr">₪{net.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-hebrew text-center">* חישוב אומדן בלבד. אינו מחליף תלוש שכר רשמי.</p>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg font-hebrew">סגור</button>
          <button onClick={print} className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-hebrew hover:bg-navy/90">
            <Download size={14} />הדפס
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PayrollPage() {
  const { employees, loading } = useEmployees();
  const [search, setSearch]   = useState('');
  const [selected, setSelected] = useState<Employee | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const active = employees.filter((e) => e.status === 'active' && (e.grossSalary ?? 0) > 0);

  const filtered = useMemo(() => active.filter((e) =>
    !search || e.name.toLowerCase().includes(search.toLowerCase())
  ), [active, search]);

  const totalGross = active.reduce((a, e) => a + (e.grossSalary ?? 0), 0);
  const totalNet   = active.reduce((a, e) => a + calcNet(e.grossSalary ?? 0, e.nekudotZikui ?? 2.25), 0);
  const totalDeductions = totalGross - totalNet;

  function exportCSV() {
    const headers = ['שם', 'ברוטו', 'מס הכנסה', 'ביטוח לאומי', 'נטו'];
    const rows = active.map((e) => {
      const gross = e.grossSalary ?? 0;
      const nek   = e.nekudotZikui ?? 2.25;
      const taxC  = Math.max(0, calcIncomeTax(gross) - nek * CREDIT_POINT_VALUE);
      const bl    = calcBL(gross);
      const net   = Math.round(gross - taxC - bl);
      return [e.name, gross, Math.round(taxC), Math.round(bl), net];
    });
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `payroll-${new Date().toISOString().slice(0, 7)}.csv`;
    a.click();
  }

  return (
    <>
      <Header title="שכר ורווחה" />
      {selected && <PayslipModal emp={selected} onClose={() => setSelected(null)} />}
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="סה״כ ברוטו" value={`₪${totalGross.toLocaleString()}`} icon={<DollarSign size={18} className="text-navy" />} accent="bg-blue-50" />
          <StatCard label="ניכויים" value={`₪${Math.round(totalDeductions).toLocaleString()}`} icon={<TrendingDown size={18} className="text-red-400" />} accent="bg-red-50" />
          <StatCard label="סה״כ נטו" value={`₪${Math.round(totalNet).toLocaleString()}`} icon={<Users size={18} className="text-green-500" />} accent="bg-green-50" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
          <input type="text" placeholder="חיפוש עובד..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 py-2 ps-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 font-hebrew" />
          <button onClick={exportCSV}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 hover:border-navy/30 px-3 py-2 rounded-lg transition-colors">
            <Download size={14} />ייצוא CSV
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {['עובד', 'ברוטו', 'מס הכנסה', 'ביט״ל', 'נטו', ''].map((h) => (
                    <th key={h} className="text-start ps-4 pe-3 py-3 text-xs font-semibold text-gray-500 font-hebrew">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={6} className="py-16 text-center text-gray-400 font-hebrew text-sm">טוען...</td></tr>}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-16 text-center text-gray-400 font-hebrew text-sm">אין עובדים פעילים עם שכר מוגדר</td></tr>
                )}
                {filtered.map((emp) => {
                  const gross = emp.grossSalary ?? 0;
                  const nek   = emp.nekudotZikui ?? 2.25;
                  const rawT  = calcIncomeTax(gross);
                  const taxC  = nek * CREDIT_POINT_VALUE;
                  const tax   = Math.max(0, rawT - taxC);
                  const bl    = calcBL(gross);
                  const net   = Math.round(gross - tax - bl);
                  const isOpen = expanded === emp.id;

                  return (
                    <>
                      <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                        <td className="ps-4 pe-3 py-3.5 font-medium text-gray-800 font-hebrew">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setExpanded(isOpen ? null : emp.id)} className="text-gray-400 hover:text-gray-600">
                              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {emp.name}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-gray-600" dir="ltr">₪{gross.toLocaleString()}</td>
                        <td className="px-3 py-3.5 text-red-500" dir="ltr">-₪{Math.round(tax).toLocaleString()}</td>
                        <td className="px-3 py-3.5 text-red-500" dir="ltr">-₪{Math.round(bl).toLocaleString()}</td>
                        <td className="px-3 py-3.5 font-semibold text-green-700" dir="ltr">₪{net.toLocaleString()}</td>
                        <td className="px-3 py-3.5">
                          <button onClick={() => setSelected(emp)}
                            className="text-xs text-gold hover:text-gold/80 border border-gold/30 rounded-lg px-2.5 py-1 font-hebrew">תלוש</button>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr key={`${emp.id}-details`} className="bg-gray-50/60 border-b border-gray-50">
                          <td colSpan={6} className="px-8 py-3">
                            <div className="grid grid-cols-4 gap-3 text-xs text-gray-600">
                              <div><span className="text-gray-400 font-hebrew">נקודות זיכוי: </span><span>{nek}</span></div>
                              <div><span className="text-gray-400 font-hebrew">ערך נקודה: </span><span dir="ltr">₪{CREDIT_POINT_VALUE}</span></div>
                              <div><span className="text-gray-400 font-hebrew">זיכוי מס: </span><span className="text-green-600" dir="ltr">₪{Math.round(Math.min(rawT, taxC)).toLocaleString()}</span></div>
                              <div><span className="text-gray-400 font-hebrew">מס לפני זיכוי: </span><span dir="ltr">₪{Math.round(rawT).toLocaleString()}</span></div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 font-hebrew text-center">
            * החישוב מבוסס על מדרגות מס 2024 ושיעורי ביטוח לאומי. אינו מחליף ייעוץ מקצועי של רואה חשבון.
          </p>
        </div>
      </div>
    </>
  );
}
