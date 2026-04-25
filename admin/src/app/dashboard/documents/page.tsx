'use client';
import { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeads } from '@/hooks/useLeads';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS, MARITAL_LABELS, GENDER_LABELS, calcNekudotZikui } from '@/lib/employee-types';
import type { Employee } from '@/lib/employee-types';
import { LEAD_SERVICE_LABELS } from '@/lib/types';
import { FileText, Download, ChevronDown, ExternalLink, Plus, Trash2, Mail, MessageCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useQuotePDF } from '@/hooks/useQuotePDF';
import { useDocumentSigning } from '@/hooks/useDocumentSigning';
import type { SignatureRecord } from '@/hooks/useDocumentSigning';

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

function fmtMoney(n: number) {
  return `₪${n.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

type QuoteLine = { description: string; qty: number; unitPrice: number };

function EmploymentContract({ emp, signature }: { emp: Employee; signature?: SignatureRecord }) {
  const today = fmtDate(new Date());
  const salary = emp.grossSalary ?? 0;
  const hireDateObj = emp.hireDate ? new Date(emp.hireDate) : new Date();
  const seniorityYears = Math.floor((new Date().getTime() - hireDateObj.getTime()) / (365.25 * 24 * 3600 * 1000));
  const emplrPension = salary ? Math.round(salary * 0.065) : 0;
  const empPension = salary ? Math.round(salary * 0.06) : 0;
  const severanceComp = salary ? Math.round(salary * 0.0833) : 0;
  const emplrHishtalmut = salary ? Math.round(salary * 0.075) : 0;
  const empHishtalmut = salary ? Math.round(salary * 0.025) : 0;
  const leaveDays = seniorityYears < 4 ? 12 : seniorityYears === 4 ? 16 : seniorityYears === 5 ? 18 : 21;
  const havraaDays = seniorityYears < 1 ? 5 : seniorityYears < 3 ? 6 : seniorityYears < 10 ? 7 : seniorityYears < 15 ? 8 : seniorityYears < 19 ? 9 : 10;

  return (
    <div id="doc-print" className="bg-white p-8 max-w-4xl mx-auto space-y-4" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      {/* HEBREW VERSION */}
      <div dir="rtl" className="mb-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">חוזה העסקה</h1>
          <p className="text-xs text-gray-600">על פי חוק הודעה לעובד, התשס"ב-2002</p>
        </div>

        <p className="text-xs mb-4 text-gray-700">
          על פי חוק, המעסיק חייב להעניק לעובד סיכום בכתב של תנאי העסקתו בתוך שלושים יום מתחילת עבודתו.
        </p>

        <div className="border-t-2 border-gray-300 pt-4 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-2">המעסיק</p>
              <p><strong>שם:</strong> קמינוס הפקות בע״מ</p>
              <p><strong>ת.ז./ח.פ:</strong> 516820826</p>
              <p><strong>כתובת:</strong> שד׳ דוד המלך 509, אור עקיבא</p>
            </div>
            <div>
              <p className="font-bold mb-2">העובד</p>
              <p><strong>שם:</strong> {emp.name}</p>
              {emp.teudatZehut && <p><strong>ת.ז.:</strong> {emp.teudatZehut}</p>}
              {emp.birthDate && <p><strong>תאריך לידה:</strong> {emp.birthDate}</p>}
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-bold mb-2">1. תיאור התפקיד ותחום עבודה</p>
            <p>התפקיד: עובד ניקיון ותחזוקה | אזור: {emp.zone || '________'}</p>
          </div>

          <div><p className="font-bold mb-1">2. ימים ושעות עבודה</p>
            <p>• ימים בשבוע: _________ מ-_____h ל-_____h</p>
            <p>• ימי שישי וערבי חגים: מ-_____h ל-_____h</p>
            <p>• בסה״כ 42 שעות בשבוע (חוק שעות עבודה ומנוחה, התשי״א-1951)</p>
          </div>

          <div><p className="font-bold mb-1">3. תקופת העסקה</p>
            <p>• התחלה: {emp.hireDate || '________'}</p>
            <p>• תקופת ניסיון: 6 חודשים | הודעה מוקדמת בניסיון: 1 שבוע</p>
            <p>• סיום: 30 יום הודעה מוקדמת משתי הצדדים</p>
          </div>

          <div><p className="font-bold mb-1">4. שכר</p>
            {salary ? (
              <>
                <p>• שכר ברוטו חודשי: ₪{salary.toLocaleString()}</p>
                <p>• שעות נוספות: 125% (שתי שעות ראשונות), 150% (הנוסף)</p>
                <p>• תשלום: עד ה-9 בחודש הבא, בהעברה בנקאית</p>
              </>
            ) : (
              <p>• _________ ₪</p>
            )}
          </div>

          <div><p className="font-bold mb-1">5. הוצאות נסיעה</p>
            <p>• סך הכל: _________ ₪ / חודש (או כפי שמוסכם)</p>
          </div>

          <div><p className="font-bold mb-1">6. קרן פנסיה וסעיף 14</p>
            {salary ? (
              <>
                <p>• תרומה חודשית: {emplrPension}₪ מעסיק + {empPension}₪ עובד (מנוכה משכר)</p>
                <p>• <strong>סעיף 14 - ביטוח סיום:</strong> המעסיק יפקיד {severanceComp}₪ נוסף לכיסוי התחייבות סיום העסקה (במקום פיצויים)</p>
              </>
            ) : (
              <p>• כמפורט בהודעה נפרדת</p>
            )}
          </div>

          <div><p className="font-bold mb-1">7. קרן השתלמות</p>
            {salary ? (
              <p>• תרומה: {emplrHishtalmut}₪ מעסיק + {empHishtalmut}₪ עובד | זיכויים: 6 שנים</p>
            ) : (
              <p>• לא מוצעת בהסכם זה</p>
            )}
          </div>

          <div><p className="font-bold mb-1">8. דמי הבראה (Convalescence Pay)</p>
            <p>• {havraaDays} ימים בשנה × ₪470/יום (משולם ביוני-יולי)</p>
          </div>

          <div><p className="font-bold mb-1">9. חופשה שנתית</p>
            <p>• {leaveDays} ימים בתשלום מלא בשנה (חוק חופשה שנתית, התשי״א-1951)</p>
          </div>

          <div><p className="font-bold mb-1">10. דמי מחלה</p>
            <p>• יום 1: חינם | ימים 2-3: 50% משכר | יום 4 ואילך: 100%</p>
            <p>• צבירה: 1.5 יום לחודש, מקסימום 90 ימים</p>
          </div>

          <div><p className="font-bold mb-1">11. מיסים וחיובים חובה</p>
            <p>• המעסיק משלם דמי ביטוח לאומי</p>
            <p>• העובד אחראי לדיווח למס הכנסה וביטוח לאומי</p>
          </div>

          <div><p className="font-bold mb-1">12. סודיות ומידע עסקי</p>
            <p>• העובד מתחייב לשמור בסוד כל מידע עסקי, רשימות לקוחות ונהלים</p>
            <p>• התחייבות זו תוקפה גם לאחר סיום העסקה (24 חודשים)</p>
          </div>

          <div><p className="font-bold mb-1">13. זכויות יוצר ורכוש רוחני</p>
            <p>• כל יצירה, שיפור, תוכנה או חומר שנוצרו בעבודה שייכים למעסיק</p>
          </div>

          <div><p className="font-bold mb-1">14. אי-תחרות</p>
            <p>• 6 חודשים לאחר סיום: אין עסקה תחרותית בתחום הניקיון באותה עיר</p>
          </div>

          <div><p className="font-bold mb-1">15. דיני חוק וסיום</p>
            <p>• דיני ישראל בלבד | בתי דין לעבודה בתל אביב</p>
            <p>• זה הסכם שלם וחוקי לאחר חתימה משתי הצדדים</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-amber-50 p-3 border border-amber-200 rounded text-xs">
            <p className="font-bold mb-1">⚠️ אישור סעיף 14</p>
            <p>על ידי חתימה, העובד מאשר קבלה והבנה כי פקדונות המעסיק לקרן פנסיה מכסים את התחייבות סיום העסקה.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="text-center border-t-2 border-gray-400 pt-3">
              <p className="min-h-[40px]">________________</p>
              <p className="font-bold">חתימת המעסיק</p>
              <p className="text-xs text-gray-600">{today}</p>
            </div>
            <div className="text-center border-t-2 border-gray-400 pt-3">
              <p className="min-h-[40px]">________________</p>
              <p className="font-bold">חתימת העובד</p>
              <p className="text-xs text-gray-600">{today}</p>
            </div>
          </div>
        </div>
      </div>


      {signature && <SignatureBadge sig={signature} />}
    </div>
  );
}

type QuoteSubject = { name: string; phone: string; city?: string; notes?: string; service?: string };

function ClientQuote({ subject, lines, extraNotes, quoteNum, signature }: {
  subject: QuoteSubject;
  lines: QuoteLine[];
  extraNotes: string;
  quoteNum: string;
  signature?: SignatureRecord;
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
      {signature && <SignatureBadge sig={signature} />}
    </div>
  );
}

function Field({ label, value, dir }: { label: string; value?: string | number; dir?: string }) {
  return (
    <div>
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <div className={`border-b border-gray-400 pb-0.5 min-h-[22px] text-sm text-gray-900 ${!value ? 'text-gray-300' : ''}`} dir={dir}>
        {value ?? '________________'}
      </div>
    </div>
  );
}

function CheckBox({ checked, label }: { checked?: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-700 me-4">
      <span className={`inline-block w-3.5 h-3.5 border border-gray-500 rounded-sm text-center leading-3 text-[10px] ${checked ? 'bg-navy text-white' : ''}`}>
        {checked ? '✓' : ''}
      </span>
      {label}
    </span>
  );
}

function Tofes101Form({ emp, signature }: { emp: Employee; signature?: SignatureRecord }) {
  const today = fmtDate(new Date());
  const firstName = emp.name.split(' ').slice(0, -1).join(' ') || emp.name;
  const lastName  = emp.name.split(' ').slice(-1)[0] || '';
  const { total: nekTotal, breakdown } = calcNekudotZikui(emp);
  const nekudot = emp.nekudotZikui ?? nekTotal;
  const taxSaving = Math.round(nekudot * 242);
  const children = emp.children ?? [];

  return (
    <div id="doc-print" className="bg-white p-8 max-w-2xl mx-auto" dir="rtl"
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: 1.6 }}>

      {/* Header */}
      <div className="text-center mb-5 pb-4 border-b-2 border-navy">
        <p className="text-xs text-gray-500">רשות המסים בישראל</p>
        <div className="flex items-center justify-center gap-3 my-1">
          <span className="text-3xl font-black text-navy">101</span>
          <div className="text-right">
            <p className="text-sm font-bold text-navy">כרטיס עובד</p>
            <p className="text-xs text-gray-600">בקשה לפטור / שינוי ניכוי מס במקור</p>
          </div>
        </div>
        <p className="text-[10px] text-gray-400">יש למלא בתחילת עבודה ובכל שינוי במצב המשפחתי / הכנסות | תקנות מס הכנסה (ניכוי ממשכורת), תשנ״ג-1993</p>
      </div>

      {/* A — Employee Details */}
      <div className="mb-4">
        <div className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-t">א. פרטי העובד</div>
        <div className="border border-navy/30 border-t-0 rounded-b p-3 space-y-2">
          <div className="grid grid-cols-3 gap-3">
            <Field label="שם משפחה" value={lastName} />
            <Field label="שם פרטי" value={firstName} />
            <Field label="מספר ת.ז." value={emp.teudatZehut} dir="ltr" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="תאריך לידה" value={emp.birthDate} dir="ltr" />
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">מגדר</p>
              <div className="pt-1">
                <CheckBox checked={emp.gender === 'male'}   label="זכר" />
                <CheckBox checked={emp.gender === 'female'} label="נקבה" />
              </div>
            </div>
            <Field label="טלפון" value={emp.phone} dir="ltr" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="כתובת מגורים" value={emp.address} />
            <Field label="עיר / ישוב" value={emp.city} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 mb-0.5">מצב משפחתי</p>
            <div className="pt-1">
              <CheckBox checked={emp.maritalStatus === 'single'}   label="רווק/ה" />
              <CheckBox checked={emp.maritalStatus === 'married'}  label="נשוי/אה" />
              <CheckBox checked={emp.maritalStatus === 'divorced'} label="גרוש/ה" />
              <CheckBox checked={emp.maritalStatus === 'widowed'}  label="אלמן/ה" />
            </div>
          </div>
        </div>
      </div>

      {/* B — Employment */}
      <div className="mb-4">
        <div className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-t">ב. פרטי ההעסקה</div>
        <div className="border border-navy/30 border-t-0 rounded-b p-3 space-y-2">
          <div className="grid grid-cols-3 gap-3">
            <Field label="שם המעסיק" value="קמינוס הפקות בע״מ" />
            <Field label="ח.פ / ע.מ מעסיק" value="516820826" dir="ltr" />
            <Field label="תאריך תחילת עבודה" value={emp.hireDate} dir="ltr" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="כתובת המעסיק" value="שד׳ דוד המלך 509, אור עקיבא" />
            <Field label="סוג משרה" value={emp.contractType ? CONTRACT_LABELS[emp.contractType] : undefined} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="שכר ברוטו חודשי" value={emp.grossSalary ? `₪${emp.grossSalary.toLocaleString()}` : undefined} dir="ltr" />
            <Field label="שכר שעתי" value={emp.hourlyRate ? `₪${emp.hourlyRate}` : undefined} dir="ltr" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 mb-0.5">האם מעסיק יחיד?</p>
            <CheckBox checked={emp.isOnlyEmployer === true}  label="כן — מעסיק יחיד" />
            <CheckBox checked={emp.isOnlyEmployer === false} label="לא — יש מעסיק נוסף" />
          </div>
        </div>
      </div>

      {/* C — Tax Credits */}
      <div className="mb-4">
        <div className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-t">ג. נקודות זיכוי — פירוט (ערך נקודה: ₪242/חודש)</div>
        <div className="border border-navy/30 border-t-0 rounded-b p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {breakdown.map((b, i) => (
              <div key={i} className="flex justify-between border-b border-dashed border-gray-200 pb-0.5">
                <span className="text-gray-700">{b.label}</span>
                <span className="font-mono font-semibold text-navy">{b.points}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-navy/5 rounded px-3 py-2 mt-2">
            <span className="text-xs font-bold text-navy">סה״כ נקודות זיכוי מבוקשות</span>
            <span className="text-lg font-black text-navy">{nekudot}</span>
          </div>
          <p className="text-[10px] text-gray-500 text-left" dir="ltr">
            Monthly tax saving: ₪{taxSaving.toLocaleString()} | Annual: ₪{(taxSaving * 12).toLocaleString()}
          </p>

          {/* Children table */}
          {children.length > 0 && (
            <div className="mt-2">
              <p className="text-[10px] font-semibold text-gray-600 mb-1">פרטי ילדים:</p>
              <table className="w-full text-[11px] border border-gray-200 rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">שם</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">תאריך לידה</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">גיל</th>
                    <th className="text-right px-2 py-1 font-medium text-gray-600">נקודות</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((child, i) => {
                    const bd = new Date(child.birthDate);
                    const ageYears = (new Date().getTime() - bd.getTime()) / (365.25 * 24 * 3600 * 1000);
                    const pts = ageYears < 18 ? (ageYears < 5 && emp.gender === 'female' ? 1.5 : 1.0) : 0;
                    return (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-2 py-1">{child.name || '—'}</td>
                        <td className="px-2 py-1" dir="ltr">{child.birthDate}</td>
                        <td className="px-2 py-1">{Math.floor(ageYears)}</td>
                        <td className="px-2 py-1 font-semibold text-navy">{pts > 0 ? pts : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Disability */}
          {(emp.disabilityPercent ?? 0) > 0 && (
            <Field label="אחוז נכות" value={`${emp.disabilityPercent}%`} />
          )}

          {/* New immigrant */}
          {emp.isNewImmigrant && (
            <div className="flex gap-4">
              <Field label="עלייה חדשה" value="כן" />
              {emp.immigrationDate && <Field label="תאריך עלייה" value={emp.immigrationDate} dir="ltr" />}
            </div>
          )}
        </div>
      </div>

      {/* D — Bank */}
      <div className="mb-4">
        <div className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-t">ד. פרטי חשבון בנק להעברת שכר</div>
        <div className="border border-navy/30 border-t-0 rounded-b p-3">
          <div className="grid grid-cols-3 gap-3">
            <Field label="שם הבנק" value={emp.bankName} />
            <Field label="מספר סניף" value={emp.bankBranch} dir="ltr" />
            <Field label="מספר חשבון" value={emp.bankAccount} dir="ltr" />
          </div>
        </div>
      </div>

      {/* E — ID scan */}
      {emp.idCardUrl && (
        <div className="mb-4">
          <div className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-t">ה. צילום תעודת זהות</div>
          <div className="border border-navy/30 border-t-0 rounded-b p-3 text-center">
            <img src={emp.idCardUrl} alt="תעודת זהות" className="max-w-full max-h-48 mx-auto rounded object-contain" />
            <p className="text-[10px] text-gray-400 mt-1">מצורף לצרכי זיהוי בלבד — לשימוש פנימי</p>
          </div>
        </div>
      )}

      {/* Declaration */}
      <div className="mb-5 p-3 border border-gray-300 rounded text-[10px] text-gray-600 bg-gray-50">
        <p className="font-semibold mb-1">הצהרה:</p>
        <p>אני החתום/ה מטה מצהיר/ה כי הפרטים המפורטים בטופס זה נכונים ומלאים. ידוע לי שמסירת פרטים כוזבים מהווה עבירה לפי חוק.
        אני מסכים/ה שהמעסיק ינכה ממשכורתי את המס בהתאם לפרטים שמסרתי.</p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="text-[10px] text-gray-500 mb-1">תאריך מילוי הטופס</p>
          <div className="border-b border-gray-400 pb-1 font-medium">{today}</div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 mb-1">חתימת העובד</p>
          <div className="border-b border-gray-400 pb-1 min-h-[28px]">
            {signature && <span className="text-navy font-bold text-xs">{emp.name} ✓</span>}
          </div>
        </div>
      </div>

      {signature && <SignatureBadge sig={signature} />}
    </div>
  );
}

function SignatureBadge({ sig }: { sig: SignatureRecord }) {
  const dt = new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(sig.signedAt));
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-blue-400 rounded-xl bg-blue-50/60 mt-6" dir="rtl">
      <img src="/digital-stamp.png" alt="Digital stamp" className="w-24 h-24 flex-shrink-0" />
      <div className="text-xs text-blue-800 space-y-0.5" dir="rtl">
        <p className="font-bold text-sm text-blue-900">מסמך חתום דיגיטלית ✓</p>
        <p>נחתם על ידי: <span className="font-semibold">{sig.signedBy}</span></p>
        <p>תאריך: <span className="font-semibold">{dt}</span></p>
        <p className="font-mono text-blue-700 tracking-wider mt-1">קוד אימות: {sig.verificationCode}</p>
        <p className="text-[10px] text-blue-500 mt-1">מאומת ע״י SHA-256 | קמינוס הפקות בע״מ</p>
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
  const [selectedQuoteId, setSelectedQuoteId] = useState('');
  const [preview, setPreview] = useState(false);
  const { downloadPDF, downloadAndEmail, generating } = useQuotePDF();
  const { signDocument, signing, signature, setSignature } = useDocumentSigning();
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
                <select value={selectedEmpId} onChange={(e) => { setSelectedEmpId(e.target.value); setPreview(false); setSignature(null); }}
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
                <select value={selectedQuoteId} onChange={(e) => { setSelectedQuoteId(e.target.value); setPreview(false); setSignature(null); }}
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
            {preview && docType !== 'quote' && selectedEmp && (
              <>
                <button
                  onClick={() => downloadPDF(`${selectedEmp.name}-${docType === 'contract' ? 'חוזה-העסקה' : 'טופס-101'}.pdf`)}
                  disabled={generating}
                  className="flex items-center gap-2 bg-[#0a1628] text-white px-5 py-2.5 rounded-lg text-sm font-hebrew hover:bg-[#0a1628]/90 disabled:opacity-50">
                  {generating ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                  {generating ? 'שומר...' : 'שמור PDF'}
                </button>
                <button onClick={printDoc}
                  className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-hebrew hover:border-navy/30 hover:text-navy">
                  <FileText size={15} />הדפס
                </button>
              </>
            )}
            {preview && docType === 'quote' && (
              <button
                onClick={() => downloadPDF(quoteSubject ? `${quoteSubject.name}-הצעת-מחיר-${quoteNum}.pdf` : undefined)}
                disabled={generating}
                className="flex items-center gap-2 bg-[#0a1628] text-white px-5 py-2.5 rounded-lg text-sm font-hebrew hover:bg-[#0a1628]/90 disabled:opacity-50">
                {generating ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                {generating ? 'שומר...' : 'שמור PDF'}
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
              <div className="flex items-center gap-3">
                {!signature && (
                  <button
                    onClick={() => signDocument({ docType: 'contract', signedBy: 'קמינוס הפקות בע״מ', signedById: selectedEmp.id })}
                    disabled={signing}
                    className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-hebrew transition-colors disabled:opacity-50">
                    {signing ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
                    {signing ? 'חותם...' : 'חתום דיגיטלית - קמינוס'}
                  </button>
                )}
                {signature && <span className="text-xs text-green-600 font-hebrew flex items-center gap-1"><ShieldCheck size={12} />חתום על ידי קמינוס ✓</span>}
                <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                  <Download size={13} />הדפס
                </button>
              </div>
            </div>
            <EmploymentContract emp={selectedEmp} signature={signature ?? undefined} />
          </div>
        )}

        {preview && docType === 'quote' && quoteSubject && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — הצעת מחיר</p>
              <div className="flex items-center gap-3">
                {!signature && (
                  <button
                    onClick={() => signDocument({ docType: 'quote', signedBy: quoteSubject.name, signedById: selectedQuoteId })}
                    disabled={signing}
                    className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-hebrew transition-colors disabled:opacity-50">
                    {signing ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
                    {signing ? 'חותם...' : 'חתום דיגיטלית'}
                  </button>
                )}
                {signature && <span className="text-xs text-green-600 font-hebrew flex items-center gap-1"><ShieldCheck size={12} />חתום ✓</span>}
                <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                  <Download size={13} />הדפס
                </button>
              </div>
            </div>
            <ClientQuote subject={quoteSubject} lines={quoteLines} extraNotes={quoteNotes} quoteNum={quoteNum} signature={signature ?? undefined} />
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
                {!signature && (
                  <button
                    onClick={() => signDocument({ docType: 'tofes101', signedBy: selectedEmp.name, signedById: selectedEmp.id })}
                    disabled={signing}
                    className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-hebrew transition-colors disabled:opacity-50">
                    {signing ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
                    {signing ? 'חותם...' : 'חתום דיגיטלית'}
                  </button>
                )}
                {signature && <span className="text-xs text-green-600 font-hebrew flex items-center gap-1"><ShieldCheck size={12} />חתום ✓</span>}
                <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                  <Download size={13} />הדפס
                </button>
              </div>
            </div>
            <Tofes101Form emp={selectedEmp} signature={signature ?? undefined} />
          </div>
        )}
      </div>
    </>
  );
}
