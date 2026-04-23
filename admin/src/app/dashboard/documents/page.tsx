'use client';
import { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeads } from '@/hooks/useLeads';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS } from '@/lib/employee-types';
import type { Employee } from '@/lib/employee-types';
import { LEAD_SERVICE_LABELS } from '@/lib/types';
import { FileText, Download, ChevronDown, ExternalLink, Plus, Trash2, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { useQuotePDF } from '@/hooks/useQuotePDF';

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

function fmtMoney(n: number) {
  return `₪${n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

type QuoteLine = { description: string; qty: number; unitPrice: number };

function EmploymentContract({ emp }: { emp: Employee }) {
  const today = fmtDate(new Date());
  const salary = emp.grossSalary ?? 0;
  const hireDateObj = emp.hireDate ? new Date(emp.hireDate) : new Date();
  const seniorityYears = Math.floor((new Date().getTime() - hireDateObj.getTime()) / (365.25 * 24 * 3600 * 1000));
  const empPension = salary ? Math.round(salary * 0.06) : 0;
  const emplrPension = salary ? Math.round(salary * 0.065) : 0;
  const severanceComp = salary ? Math.round(salary * 0.0833) : 0;
  const emplrHishtalmut = salary ? Math.round(salary * 0.075) : 0;
  const empHishtalmut = salary ? Math.round(salary * 0.025) : 0;
  const leaveDays = seniorityYears < 4 ? 12 : seniorityYears === 4 ? 16 : seniorityYears === 5 ? 18 : 21;
  const havraaDays = seniorityYears < 1 ? 5 : seniorityYears < 3 ? 6 : seniorityYears < 10 ? 7 : seniorityYears < 15 ? 8 : seniorityYears < 19 ? 9 : 10;
  const havraaAmount = havraaDays * 470;

  return (
    <div id="doc-print" className="bg-white p-10 max-w-4xl mx-auto" dir="rtl" style={{ fontFamily: 'Heebo, Arial, sans-serif', lineHeight: 1.7 }}>
      <div className="text-center mb-6 border-b-2 border-[#0a1628] pb-4">
        <div className="text-2xl font-black tracking-tight text-[#0a1628] mb-1">Clean<span className="text-[#c9a84c]">+</span></div>
        <h1 className="text-xl font-bold text-[#0a1628] mb-2">חוזה העסקה</h1>
        <p className="text-xs text-gray-500">קמינוס הפקות בע״מ | ח.פ 516820826</p>
        <p className="text-xs text-gray-400">שד׳ דוד המלך 509, אור עקיבא</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div className="border-l-4 border-[#c9a84c] pl-4">
          <p className="text-xs text-gray-500 mb-0.5">המעסיק</p>
          <p className="font-semibold text-gray-800">קמינוס הפקות בע״מ</p>
          <p className="text-xs text-gray-600">ח.פ 516820826</p>
        </div>
        <div className="border-l-4 border-[#c9a84c] pl-4">
          <p className="text-xs text-gray-500 mb-0.5">העובד</p>
          <p className="font-semibold text-gray-800">{emp.name}</p>
          {emp.teudatZehut && <p className="text-xs text-gray-600" dir="ltr">{emp.teudatZehut}</p>}
        </div>
      </div>

      <div className="space-y-3 text-xs text-gray-700 mb-6">
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 1: הצדדים</p><p>בין קמינוס הפקות בע״מ (המעסיק) לבין {emp.name} (העובד), ביום {today}.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 2: מקום עבודה</p><p>עבודות ניקיון ותחזוקה. אזור: {emp.zone || 'כמפורט בהנחיה'}</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 3: תחילת עבודה וניסיון</p><p>תחילה: {emp.hireDate || 'כמפורט'}. תקופת ניסיון: 6 חודשים (הודעה של שבוע מספיקה).</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 4: שעות עבודה</p><p>42 שעות/שבוע בנוסח חוק שעות עבודה ומנוחה. שעות נוספות: 125% (2 ראשונות), 150% (לאחר).</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 5: שכר</p>{salary ? <p>ברוטו: <span dir="ltr">₪{salary.toLocaleString()}</span>/חודש. תשלום עד ה-9 בחודש הבא בהעברה בנקאית.</p> : <p>כמפורט בהודעה.</p>}</div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 6: קרן פנסיה וסעיף 14</p>{salary ? <p>תרומה: {emplrPension}₪ מעסיק + {empPension}₪ עובד. סעיף 14: {severanceComp}₪ חודשי לכיסוי סיום (במקום פיצויים).</p> : <p>פרטים בהודעה נפרדת.</p>}</div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 7: קרן השתלמות</p><p className="text-[10px]">{salary ? `${emplrHishtalmut}₪ מעסיק + ${empHishtalmut}₪ עובד (6 שנים זיכויים)` : 'לא מוצעת'}</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 8: דמי הבראה</p><p>{havraaDays} ימים/שנה × ₪470/יום (יוני-יולי). סה״כ: ₪{havraaAmount.toLocaleString()}/שנה.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 9: חופשה שנתית</p><p>מינימום {leaveDays} ימים/שנה בתשלום מלא בהתאם לחוק.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 10: דמי מחלה</p><p>יום 1: חינם. ימים 2-3: 50%. יום 4+: 100%. צבירה 1.5/חודש, מקסימום 90 יום.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 11: הודעה מוקדמת</p><p>30 יום (סימטרית). בניסיון: שבוע מספיק.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 12: סודיות</p><p>שמירת סוד על מידע עסקי, רשימות לקוחות, מחירים. התחייבות לאחר סיום: 24 חודשים.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 13: זכויות יוצר</p><p>כל יצירה, שיפור או תוכנה שנוצרו בעבודה שייכים למעסיק בעלות מלאה.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 14: אי-תחרות</p><p>6 חודשים לאחר סיום: אין תחרות בניקיון באותה עיר. הפרה: פיצוי 3 חודשי שכר.</p></div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100"><p className="font-semibold text-[#0a1628] mb-1">סעיף 15: דיני חוק</p><p>חוק ישראל בלבד. בתי דין לעבודה בתל אביב. זה הסכם שלם וסופי.</p></div>
      </div>

      <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 mb-6"><p className="font-semibold">⚠️ סעיף 14 — סיום העסקה</p><p>על ידי חתימה, העובד מאשר קבלה והבנת סעיף 14: פקדונות המעסיק לקרן כוללים סיום העסקה.</p></div>

      <div className="mt-8 space-y-6 text-sm">
        <div className="border-t-4 border-[#0a1628] pt-4">
          <p className="font-semibold text-[#0a1628] mb-3">אישור סעיף 14</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center"><p className="mb-6 min-h-[32px]">________________</p><p className="text-xs text-gray-600">חתימת המעסיק</p></div>
            <div className="text-center"><p className="mb-6 min-h-[32px]">________________</p><p className="text-xs text-gray-600">חתימת העובד</p></div>
          </div>
        </div>

        <div className="border-t-4 border-[#c9a84c] pt-4">
          <p className="font-semibold text-[#0a1628] mb-3">חתימה סופית</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center"><p className="mb-6 min-h-[32px]">________________</p><p className="text-xs text-gray-600">קמינוס הפקות בע״מ</p><p className="text-xs text-gray-500">{today}</p></div>
            <div className="text-center"><p className="mb-6 min-h-[32px]">________________</p><p className="text-xs text-gray-600">{emp.name}</p><p className="text-xs text-gray-500">{today}</p></div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400 border-t pt-2">שתי עותקים — אחד למעסיק, אחד לעובד. חוקי לאחר חתימה משתי הצדדים.</div>
    </div>
  );
}

type QuoteSubject = { name: string; phone: string; city?: string; notes?: string; service?: string };

function ClientQuote({ subject, lines, extraNotes, quoteNum }: {
  subject: QuoteSubject;
  lines: QuoteLine[];
  extraNotes: string;
  quoteNum: string;
}) {
  const today = fmtDate(new Date());
  const validUntil = fmtDate(new Date(Date.now() + 30 * 24 * 3600000));
  const filledLines = lines.filter((l) => l.description.trim());
  const subtotal = filledLines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
  const vat = Math.round(subtotal * 0.18);
  const total = subtotal + vat;

  return (
    <div id="doc-print" className="bg-white p-10 max-w-2xl mx-auto font-hebrew" dir="rtl"
      style={{ fontFamily: 'Heebo, Arial, sans-serif', lineHeight: 1.7 }}>

      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-[#0a1628]">
        <div>
          <div className="text-3xl font-black tracking-tight text-[#0a1628]">
            Clean<span className="text-[#c9a84c]">+</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">קמינוס הפקות בע״מ</p>
          <p className="text-xs text-gray-400">ח.פ 516820826</p>
          <p className="text-xs text-gray-400">שד׳ דוד המלך 509, אור עקיבא</p>
          <p className="text-xs text-gray-400">info@cleanplus.co.il | cleanplus.co.il</p>
        </div>
        <div className="text-start">
          <h1 className="text-2xl font-bold text-[#0a1628] mb-1">הצעת מחיר</h1>
          <p className="text-xs text-gray-500">מספר: <span className="font-mono font-semibold">{quoteNum}</span></p>
          <p className="text-xs text-gray-500">תאריך: {today}</p>
          <p className="text-xs text-gray-500">בתוקף עד: {validUntil}</p>
        </div>
      </div>

      {/* Client */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-semibold">לכבוד</p>
        <p className="font-bold text-gray-800">{subject.name}</p>
        <p className="text-gray-600" dir="ltr">{subject.phone}</p>
        {subject.city && <p className="text-gray-600">{subject.city}</p>}
      </div>

      {/* Lines table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-1">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: '#0a1628' }} className="text-white">
              <th className="text-start px-4 py-2.5 font-hebrew font-medium">תיאור השירות / המוצר</th>
              <th className="text-center px-3 py-2.5 font-hebrew font-medium w-16">יח׳</th>
              <th className="text-end px-3 py-2.5 font-hebrew font-medium w-24">מחיר</th>
              <th className="text-end px-4 py-2.5 font-hebrew font-medium w-24">סה״כ</th>
            </tr>
          </thead>
          <tbody>
            {filledLines.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-4 text-center text-gray-400 font-hebrew text-xs">אין פריטים</td></tr>
            ) : filledLines.map((l, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                <td className="px-4 py-2.5 font-hebrew text-gray-800">{l.description}</td>
                <td className="px-3 py-2.5 text-center text-gray-600">{l.qty}</td>
                <td className="px-3 py-2.5 text-end text-gray-600" dir="ltr">{fmtMoney(l.unitPrice)}</td>
                <td className="px-4 py-2.5 text-end font-medium text-gray-800" dir="ltr">{fmtMoney(l.qty * l.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div className="w-56 text-sm space-y-1 mt-2">
          <div className="flex justify-between text-gray-600 py-1 border-b border-gray-100">
            <span className="font-hebrew">סכום ביניים</span>
            <span dir="ltr">{fmtMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600 py-1 border-b border-gray-100">
            <span className="font-hebrew">מע״מ 18%</span>
            <span dir="ltr">{fmtMoney(vat)}</span>
          </div>
          <div className="flex justify-between font-bold text-[#0a1628] py-2 text-base">
            <span className="font-hebrew">סה״כ לתשלום</span>
            <span dir="ltr" style={{ color: '#c9a84c' }}>{fmtMoney(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {(extraNotes || subject.notes) && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm">
          <p className="font-semibold mb-1 font-hebrew text-gray-700">הערות:</p>
          {extraNotes && <p className="text-gray-600 font-hebrew">{extraNotes}</p>}
          {subject.notes && <p className="text-gray-500 font-hebrew mt-1">{subject.notes}</p>}
        </div>
      )}

      {/* Footer terms */}
      <div className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-4">
        <p>• ההצעה בתוקף עד: {validUntil}</p>
        <p>• התשלום יבוצע עם קבלת העבודה, אלא אם הוסכם אחרת.</p>
        <p>• החברה מחזיקה בכיסוי ביטוחי מלא לנזקי רכוש ואחריות צד שלישי.</p>
        <p>• מחירים כוללים מע״מ כחוק.</p>
      </div>

      {/* Signatures */}
      <div className="mt-10 grid grid-cols-2 gap-10">
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className="text-xs text-gray-500">חתימת החברה</p>
            <p className="text-xs text-gray-400 mt-0.5">קמינוס הפקות בע״מ</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-300 pt-2">
            <p className="text-xs text-gray-500">חתימת הלקוח</p>
            <p className="text-xs text-gray-400 mt-0.5">{subject.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tofes101Form({ emp }: { emp: Employee }) {
  const today = fmtDate(new Date());
  return (
    <div id="doc-print" className="bg-white p-10 max-w-2xl mx-auto font-hebrew" dir="rtl" style={{ fontFamily: 'Heebo, Arial, sans-serif', lineHeight: 1.8 }}>
      <div className="text-center mb-6 border-b border-gray-200 pb-5">
        <p className="text-xs text-gray-400 mb-1">מס הכנסה — טופס</p>
        <h1 className="text-2xl font-bold text-gray-900">101</h1>
        <p className="text-sm text-gray-600 font-semibold mt-1">כרטיס עובד ובקשה לפטור / שינוי מניכוי מס במקור</p>
        <p className="text-xs text-gray-400 mt-1">יש למלא טופס זה בתחילת עבודה ובכל שינוי</p>
      </div>

      {/* Section A - Employee details */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-white bg-navy px-3 py-1.5 rounded-t-md">א. פרטי העובד</h2>
        <div className="border border-gray-200 border-t-0 rounded-b-md p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שם משפחה</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">{emp.name.split(' ').slice(-1)[0] || ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שם פרטי</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">{emp.name.split(' ').slice(0, -1).join(' ') || emp.name}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">מספר תעודת זהות</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] font-mono text-gray-800" dir="ltr">{emp.teudatZehut || '_______________'}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">תאריך לידה</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]" dir="ltr">{emp.birthDate || ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">כתובת מגורים</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">טלפון</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]" dir="ltr">{emp.phone || ''}</div>
          </div>
        </div>
      </div>

      {/* Section B - Employment */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-white bg-navy px-3 py-1.5 rounded-t-md">ב. פרטי ההעסקה</h2>
        <div className="border border-gray-200 border-t-0 rounded-b-md p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שם המעסיק</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">קמינוס הפקות בע״מ</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">ח.פ מעסיק</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800" dir="ltr">516820826</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">כתובת המעסיק</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">שד׳ דוד המלך 509, אור עקיבא</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">תאריך תחילת עבודה</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]" dir="ltr">{emp.hireDate || ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">סוג משרה</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">{emp.contractType ? CONTRACT_LABELS[emp.contractType] : ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שכר ברוטו חודשי</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]" dir="ltr">{emp.grossSalary ? `₪${emp.grossSalary.toLocaleString()}` : ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שכר שעתי</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]" dir="ltr">{emp.hourlyRate ? `₪${emp.hourlyRate}` : ''}</div>
          </div>
        </div>
      </div>

      {/* Section C - Tax credits */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-white bg-navy px-3 py-1.5 rounded-t-md">ג. נקודות זיכוי</h2>
        <div className="border border-gray-200 border-t-0 rounded-b-md p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">סה״כ נקודות זיכוי מבוקשות</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px] text-gray-800">{emp.nekudotZikui ?? ''}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">מצב משפחתי</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
          </div>
        </div>
      </div>

      {/* Section D - Bank */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-white bg-navy px-3 py-1.5 rounded-t-md">ד. פרטי חשבון בנק להעברת שכר</h2>
        <div className="border border-gray-200 border-t-0 rounded-b-md p-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">שם הבנק</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">מספר סניף</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">מספר חשבון</p>
            <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">תאריך מילוי הטופס</p>
          <div className="border-b border-gray-300 pb-1">{today}</div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">חתימת העובד</p>
          <div className="border-b border-gray-300 pb-1 min-h-[24px]"></div>
        </div>
      </div>

      {/* ID Card scan */}
      {emp.idCardUrl && (
        <div className="mt-6">
          <h2 className="text-xs font-bold text-white bg-navy px-3 py-1.5 rounded-t-md">ה. צילום תעודת זהות</h2>
          <div className="border border-gray-200 border-t-0 rounded-b-md p-3 text-center">
            <img src={emp.idCardUrl} alt="תעודת זהות" className="max-w-full max-h-48 mx-auto rounded object-contain" />
            <p className="text-xs text-gray-400 mt-1">מצורף לצרכי זיהוי בלבד — לשימוש פנימי</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
        <p className="font-semibold mb-1">הנחיות למילוי:</p>
        <p>יש להדפיס, למלא את הפרטים החסרים ולחתום. ניתן גם למלא את הטופס המקוון באתר מס הכנסה.</p>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const { employees } = useEmployees();
  const { leads } = useLeads();
  const { clients } = useClients();
  const [docType, setDocType] = useState<'contract' | 'quote' | 'tofes101'>('contract');
  const [selectedEmpId, setSelectedEmpId] = useState('');
  // prefixed: "lead:<id>" or "client:<id>"
  const [selectedQuoteId, setSelectedQuoteId] = useState('');
  const [preview, setPreview] = useState(false);
  const { downloadPDF, downloadAndEmail, generating } = useQuotePDF();
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>([{ description: '', qty: 1, unitPrice: 0 }]);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [quoteNum] = useState(() => `Q-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 8999) + 1000)}`);

  function addLine() { setQuoteLines((l) => [...l, { description: '', qty: 1, unitPrice: 0 }]); }
  function removeLine(i: number) { setQuoteLines((l) => l.filter((_, idx) => idx !== i)); }
  function updateLine(i: number, field: keyof QuoteLine, value: string | number) {
    setQuoteLines((l) => l.map((row, idx) => idx === i ? { ...row, [field]: value } : row));
  }

  const activeEmps  = employees.filter((e) => e.status === 'active');
  const wonLeads    = leads.filter((l) => ['won', 'contacted', 'quote_sent'].includes(l.status));
  const activeClients = clients.filter((c) => c.status !== 'inactive');

  const selectedEmp = activeEmps.find((e) => e.id === selectedEmpId);

  // Resolve the selected quote subject from prefixed id
  const quoteSubject: QuoteSubject | null = (() => {
    if (!selectedQuoteId) return null;
    if (selectedQuoteId.startsWith('lead:')) {
      const lead = wonLeads.find((l) => l.id === selectedQuoteId.slice(5));
      return lead ? { name: lead.name, phone: lead.phone, city: lead.city, notes: lead.notes, service: lead.service } : null;
    }
    if (selectedQuoteId.startsWith('client:')) {
      const client = activeClients.find((c) => c.id === selectedQuoteId.slice(7));
      return client ? { name: client.name, phone: client.phone, city: client.city, notes: client.notes } : null;
    }
    return null;
  })();

  function printDoc() {
    window.print();
  }

  return (
    <>
      <Header title="מסמכים" />
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-3 gap-4">
          {[
            { type: 'contract' as const, label: 'חוזה העסקה', sub: 'לעובדים', icon: '📋' },
            { type: 'quote' as const, label: 'הצעת מחיר', sub: 'ללקוחות', icon: '💼' },
            { type: 'tofes101' as const, label: 'טופס 101', sub: 'כרטיס עובד', icon: '🗂️' },
          ].map(({ type, label, sub, icon }) => (
            <button key={type} onClick={() => { setDocType(type); setPreview(false); }}
              className={`rounded-xl border p-5 text-start transition-all ${docType === type ? 'border-gold/40 bg-gold/5 ring-1 ring-gold/20' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-semibold text-gray-800 font-hebrew">{label}</p>
              <p className="text-xs text-gray-400 font-hebrew mt-0.5">{sub}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 font-hebrew">
            {docType === 'contract' ? 'בחר עובד לחוזה' : docType === 'tofes101' ? 'בחר עובד לטופס 101' : 'בחר לקוח להצעת מחיר'}
          </h3>

          {(docType === 'contract' || docType === 'tofes101') ? (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">עובד</label>
              <div className="relative">
                <select value={selectedEmpId} onChange={(e) => { setSelectedEmpId(e.target.value); setPreview(false); }}
                  className="w-full border border-gray-200 rounded-lg ps-3 pe-8 py-2.5 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white appearance-none">
                  <option value="">בחר עובד...</option>
                  {activeEmps.map((e) => <option key={e.id} value={e.id}>{e.name} {e.zone ? `— ${e.zone}` : ''}</option>)}
                </select>
                <ChevronDown size={14} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-500 font-hebrew mb-1">לקוח / ליד</label>
              <div className="relative">
                <select value={selectedQuoteId} onChange={(e) => { setSelectedQuoteId(e.target.value); setPreview(false); }}
                  className="w-full border border-gray-200 rounded-lg ps-3 pe-8 py-2.5 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white appearance-none">
                  <option value="">בחר לקוח...</option>
                  {activeClients.length > 0 && (
                    <optgroup label="לקוחות">
                      {activeClients.map((c) => (
                        <option key={c.id} value={`client:${c.id}`}>{c.name}{c.phone ? ` — ${c.phone}` : ''}</option>
                      ))}
                    </optgroup>
                  )}
                  {wonLeads.length > 0 && (
                    <optgroup label="לידים">
                      {wonLeads.map((l) => (
                        <option key={l.id} value={`lead:${l.id}`}>{l.name}{l.phone ? ` — ${l.phone}` : ''}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <ChevronDown size={14} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setPreview(true)}
              disabled={((docType === 'contract' || docType === 'tofes101') && !selectedEmpId) || (docType === 'quote' && !selectedQuoteId)}
              className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-40">
              <FileText size={15} />תצוגה מקדימה
            </button>
            {preview && docType !== 'quote' && (
              <button onClick={printDoc}
                className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-hebrew hover:border-navy/30 hover:text-navy">
                <Download size={15} />הדפס / PDF
              </button>
            )}
            {preview && docType === 'quote' && (
              <button onClick={() => downloadPDF()} disabled={generating}
                className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-hebrew hover:border-navy/30 hover:text-navy disabled:opacity-50">
                {generating ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                {generating ? 'מייצר PDF...' : 'הורד PDF'}
              </button>
            )}
            {preview && docType === 'quote' && quoteSubject && (() => {
              const filled = quoteLines.filter((l) => l.description.trim());
              const sub = filled.reduce((s, l) => s + l.qty * l.unitPrice, 0);
              const tot = sub + Math.round(sub * 0.18);
              const linesSummary = filled.map((l) => `• ${l.description} × ${l.qty} = ₪${(l.qty * l.unitPrice).toLocaleString()}`).join('\n');
              const waText = [
                `שלום ${quoteSubject.name},`,
                `מצורף פירוט הצעת מחיר מספר ${quoteNum} מ-Clean+:`,
                '',
                linesSummary,
                '',
                `סה״כ לתשלום (כולל מע״מ 18%): ₪${tot.toLocaleString()}`,
                '',
                'להדפסת המסמך המלא, אנא פנו אלינו.',
                'קמינוס הפקות בע״מ | info@cleanplus.co.il',
              ].join('\n');
              const mailBody = [
                `שלום ${quoteSubject.name},`,
                '',
                `מצורפת הצעת מחיר מספר ${quoteNum}:`,
                '',
                linesSummary,
                '',
                `סה״כ לתשלום (כולל מע״מ 18%): ₪${tot.toLocaleString()}`,
                '',
                'ניתן להדפיס את המסמך המלא ישירות מהמערכת.',
                '',
                'קמינוס הפקות בע״מ — Clean+',
                'info@cleanplus.co.il',
              ].join('\n');
              return (
                <>
                  <a href={`https://wa.me/972${quoteSubject.phone.replace(/^0/, '').replace(/\D/g, '')}?text=${encodeURIComponent(waText)}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-hebrew transition-colors">
                    <MessageCircle size={15} />WhatsApp
                  </a>
                  <button
                    onClick={() => downloadAndEmail(`הצעת מחיר ${quoteNum} — Clean+`, mailBody)}
                    disabled={generating}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-hebrew transition-colors disabled:opacity-50">
                    {generating ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
                    {generating ? 'מייצר...' : 'שלח מייל + PDF'}
                  </button>
                </>
              );
            })()}
          </div>
        </div>

        {/* Quote line-items editor */}
        {docType === 'quote' && quoteSubject && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 font-hebrew">פירוט השירותים</h3>
              <button onClick={addLine}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                <Plus size={13} />הוסף שורה
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_64px_96px_32px] gap-2 text-xs text-gray-400 font-hebrew px-1">
                <span>תיאור</span><span className="text-center">כמות</span><span className="text-center">מחיר ₪</span><span />
              </div>
              {quoteLines.map((line, i) => (
                <div key={i} className="grid grid-cols-[1fr_64px_96px_32px] gap-2 items-center">
                  <input value={line.description} onChange={(e) => updateLine(i, 'description', e.target.value)}
                    placeholder="תיאור השירות..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  <input type="number" min={1} value={line.qty} onChange={(e) => updateLine(i, 'qty', Math.max(1, Number(e.target.value)))}
                    className="border border-gray-200 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  <input type="number" min={0} value={line.unitPrice} onChange={(e) => updateLine(i, 'unitPrice', Math.max(0, Number(e.target.value)))}
                    className="border border-gray-200 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  <button onClick={() => removeLine(i)} disabled={quoteLines.length === 1}
                    className="flex items-center justify-center text-gray-300 hover:text-red-400 disabled:opacity-20 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <textarea value={quoteNotes} onChange={(e) => setQuoteNotes(e.target.value)} rows={2}
              placeholder="הערות להצעה (אופציונלי)..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none" />
          </div>
        )}

        {preview && docType === 'contract' && selectedEmp && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — חוזה העסקה</p>
              <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                <Download size={13} />הדפס
              </button>
            </div>
            <EmploymentContract emp={selectedEmp} />
          </div>
        )}

        {preview && docType === 'quote' && quoteSubject && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — הצעת מחיר</p>
              <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                <Download size={13} />הדפס
              </button>
            </div>
            <ClientQuote subject={quoteSubject} lines={quoteLines} extraNotes={quoteNotes} quoteNum={quoteNum} />
          </div>
        )}

        {preview && docType === 'tofes101' && selectedEmp && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — טופס 101</p>
              <div className="flex items-center gap-3">
                <a href="https://tofes101.co.il/forms/itc-101/submit/" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-hebrew">
                  <ExternalLink size={13} />מילוי מקוון
                </a>
                <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                  <Download size={13} />הדפס
                </button>
              </div>
            </div>
            <Tofes101Form emp={selectedEmp} />
          </div>
        )}
      </div>
    </>
  );
}
