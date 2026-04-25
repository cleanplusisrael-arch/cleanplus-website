'use client';
import { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeads } from '@/hooks/useLeads';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS, MARITAL_LABELS, GENDER_LABELS, calcNekudotZikui } from '@/lib/employee-types';
import type { Employee, Gender, MaritalStatus, Child } from '@/lib/employee-types';
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
  const taxYear = new Date().getFullYear();
  const firstName = emp.name.split(' ').slice(0, -1).join(' ') || emp.name;
  const lastName = emp.name.split(' ').slice(-1)[0] || '';
  const children = emp.children ?? [];

  const isNewImmigrant = emp.isNewImmigrant ?? false;
  const isDisabled100 = (emp.disabilityPercent ?? 0) >= 100;
  const spouseNoIncome = emp.maritalStatus === 'married' && emp.spouseHasIncome === false;
  const isSingleParentFamily = (emp.maritalStatus === 'divorced' || emp.maritalStatus === 'widowed') && children.length > 0;
  const noOtherIncome = emp.isOnlyEmployer === true;
  const hasOtherIncome = emp.isOnlyEmployer === false;

  const childAgeGroups = { newborn: 0, age1_2: 0, age3: 0, age4_5: 0, age6_17: 0, age18: 0 };
  for (const child of children) {
    if (!child.birthDate) continue;
    const ageThisYear = taxYear - new Date(child.birthDate).getFullYear();
    if (ageThisYear === 0) childAgeGroups.newborn++;
    else if (ageThisYear <= 2) childAgeGroups.age1_2++;
    else if (ageThisYear === 3) childAgeGroups.age3++;
    else if (ageThisYear <= 5) childAgeGroups.age4_5++;
    else if (ageThisYear <= 17) childAgeGroups.age6_17++;
    else if (ageThisYear === 18) childAgeGroups.age18++;
  }

  const CB = ({ checked }: { checked?: boolean }) => (
    <span className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-gray-700 text-[9px] flex-shrink-0 ${checked ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {checked ? '✓' : ''}
    </span>
  );

  const BlankLine = ({ w }: { w?: string }) => (
    <span className={`inline-block border-b border-gray-600 ${w || 'w-24'}`}>&nbsp;</span>
  );

  return (
    <div id="doc-print" className="bg-white max-w-3xl mx-auto" dir="rtl"
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: 1.5 }}>

      {/* ===== PAGE 1 ===== */}
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-3 pb-2 border-b-2 border-gray-800">
          <div>
            <div className="text-[10px] text-gray-500">0101/130</div>
            <div className="text-[10px] text-gray-500">דף 1 מתוך 2</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-gray-900">כרטיס עובד</div>
            <div className="text-[11px] font-bold">ובקשה להקלה ולתיאום מס על ידי המעסיק</div>
            <div className="text-[10px] text-gray-600">לפי תקנות מס הכנסה (ניכוי ממשכורת ומשכר עבודה), התשנ"ג 1993</div>
          </div>
          <div className="text-end">
            <div className="text-[10px] text-gray-500">שנת המס</div>
            <div className="text-lg font-black">{taxYear}</div>
          </div>
        </div>

        <div className="text-[10px] text-gray-600 mb-3">
          טופס זה ימולא על-ידי כל עובד עם תחילת עבודתו, וכן בתחילת כל שנת מס (אא"כ המנהל אישר אחרת).
          הטופס מהווה אסמכתא למעסיק למתן הקלות במס ולעריכת תיאומי מס בחישוב משכורת העובד.
          אם חל שינוי בפרטים — יש להצהיר על כך תוך שבוע ימים.
        </div>

        {/* Section א - Employer */}
        <div className="border border-gray-700 mb-2">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">א. פרטי המעסיק</span>
            <span className="text-[10px] text-gray-500 me-1"> (למילוי ע"י המעסיק)</span>
          </div>
          <div className="p-2 grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-3 gap-y-1">
            <div>
              <div className="text-[10px] text-gray-500 mb-0.5">שם</div>
              <div className="border-b border-gray-600 text-[11px] pb-px">קמינוס הפקות בע״מ</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-0.5">כתובת</div>
              <div className="border-b border-gray-600 text-[11px] pb-px">שד׳ דוד המלך 509, אור עקיבא</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-0.5">מספר טלפון</div>
              <div className="border-b border-gray-600 text-[11px] pb-px">&nbsp;</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 mb-0.5">מספר תיק ניכויים</div>
              <div className="border-b border-gray-600 text-[11px] pb-px text-gray-600" dir="ltr">516820826</div>
            </div>
          </div>
        </div>

        {/* Section ב - Employee */}
        <div className="border border-gray-700 mb-2">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">ב. פרטי העובד/ת</span>
            <span className="text-[10px] text-gray-500 me-1"> (יש לצרף צילום תעודת זהות כולל ספח)</span>
          </div>
          <div className="p-2 space-y-1.5 text-[11px]">
            <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr] gap-x-3">
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">מספר זהות (9 ספרות)</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.teudatZehut || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">שם משפחה</div>
                <div className="border-b border-gray-600 pb-px">{lastName}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">שם פרטי</div>
                <div className="border-b border-gray-600 pb-px">{firstName}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">תאריך לידה</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.birthDate || ''}</div>
              </div>
            </div>
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-3">
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">כתובת — רחוב/שכונה ומספר</div>
                <div className="border-b border-gray-600 pb-px">{emp.address || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">עיר/ישוב</div>
                <div className="border-b border-gray-600 pb-px">{emp.city || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">מיקוד</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.postalCode || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">דרכון</div>
                <div className="border-b border-gray-600 pb-px">&nbsp;</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-3 items-start">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">מין</div>
                <div className="flex gap-2 text-[11px]">
                  <span className="flex items-center gap-0.5"><CB checked={emp.gender === 'male'} /><span>זכר</span></span>
                  <span className="flex items-center gap-0.5"><CB checked={emp.gender === 'female'} /><span>נקבה</span></span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] text-gray-500 mb-1">מצב משפחתי</div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px]">
                  {[
                    { val: 'single', label: 'רווק/ה' },
                    { val: 'married', label: 'נשוי/אה' },
                    { val: 'divorced', label: 'גרוש/ה' },
                    { val: 'widowed', label: 'אלמן/ה' },
                  ].map(({ val, label }) => (
                    <span key={val} className="flex items-center gap-0.5">
                      <CB checked={emp.maritalStatus === val} /><span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">תושב ישראל</div>
                <div className="flex gap-1 text-[11px]">
                  <span className="flex items-center gap-0.5"><CB checked={true} /><span>כן</span></span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-3">
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">מספר טלפון</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.phone || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">מספר טלפון נייד</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.phone || ''}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">כתובת דואר אלקטרוני</div>
                <div className="border-b border-gray-600 pb-px" dir="ltr">{emp.email || ''}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections ג and ד side by side */}
        <div className="grid grid-cols-[3fr_2fr] gap-0 border border-gray-700 mb-2">
          {/* Section ג - Children */}
          <div className="border-e border-gray-600">
            <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
              <span className="font-bold text-[11px]">ג. פרטים על ילדיי</span>
              <span className="text-[10px] text-gray-500"> שטרם מלאו להם 19 שנה</span>
            </div>
            <div className="p-1">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="w-5 text-center pb-0.5">1</th>
                    <th className="w-5 text-center pb-0.5">2</th>
                    <th className="text-right pb-0.5 px-1">שם</th>
                    <th className="text-right pb-0.5 px-1">ת.ז.</th>
                    <th className="text-right pb-0.5 px-1">תאריך לידה</th>
                  </tr>
                </thead>
                <tbody>
                  {children.length === 0 ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-1 text-center"><CB /></td>
                        <td className="py-1 text-center"><CB /></td>
                        <td className="py-1 px-1 border-b border-dashed border-gray-300">&nbsp;</td>
                        <td className="py-1 px-1 border-b border-dashed border-gray-300">&nbsp;</td>
                        <td className="py-1 px-1 border-b border-dashed border-gray-300">&nbsp;</td>
                      </tr>
                    ))
                  ) : (
                    children.map((child, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-0.5 text-center"><CB checked={true} /></td>
                        <td className="py-0.5 text-center"><CB /></td>
                        <td className="py-0.5 px-1">{child.name}</td>
                        <td className="py-0.5 px-1 text-gray-300">—</td>
                        <td className="py-0.5 px-1" dir="ltr">{child.birthDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section ד - Income */}
          <div>
            <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
              <span className="font-bold text-[11px]">ד. הכנסות ממעסיק זה</span>
            </div>
            <div className="p-2 space-y-1">
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">תאריך תחילת עבודה</div>
                <div className="border-b border-gray-600 pb-px text-[11px]" dir="ltr">{emp.hireDate || ''}</div>
              </div>
              <div className="text-[10px] text-gray-500 mb-0.5">אני מקבל/ת:</div>
              {[
                { key: 'full_time', label: 'משכורת חודש' },
                { key: 'part_time', label: 'משכורת חלקית' },
                { key: 'hourly', label: 'שכר עבודה יומי' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1 text-[11px]">
                  <CB checked={
                    (key === 'full_time' && emp.contractType === 'full_time') ||
                    (key === 'part_time' && emp.contractType === 'part_time') ||
                    (key === 'hourly' && emp.contractType === 'hourly')
                  } />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section ה - Other income */}
        <div className="border border-gray-700 mb-2">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">ה. הכנסות אחרות</span>
          </div>
          <div className="p-2 space-y-1 text-[11px]">
            <div className="flex items-start gap-1">
              <CB checked={noOtherIncome || emp.isOnlyEmployer === undefined} />
              <span>אין לי הכנסות אחרות ממשכורת, מקצבה וממלגה</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={hasOtherIncome} />
              <span>יש לי הכנסות אחרות</span>
            </div>
          </div>
        </div>

        {/* Section ו - Spouse */}
        {emp.maritalStatus === 'married' && (
          <div className="border border-gray-700 mb-2">
            <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
              <span className="font-bold text-[11px]">ו. פרטים על בן/בת הזוג</span>
            </div>
            <div className="p-2 space-y-1.5 text-[11px]">
              <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr] gap-x-3">
                <div className="text-[10px] text-gray-500">מספר זהות</div>
                <div className="text-[10px] text-gray-500">שם משפחה</div>
                <div className="text-[10px] text-gray-500">שם פרטי</div>
                <div className="text-[10px] text-gray-500">תאריך לידה</div>
              </div>
              <div className="flex gap-3 text-[10px]">
                <span className="flex items-center gap-1"><CB checked={emp.spouseHasIncome === false} /><span>אין הכנסה</span></span>
                <span className="flex items-center gap-1"><CB checked={emp.spouseHasIncome === true} /><span>יש הכנסה</span></span>
              </div>
            </div>
          </div>
        )}

        {/* Section ז - Changes */}
        <div className="border border-gray-700 mb-3">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">ז. שינויים במהלך השנה</span>
          </div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-right px-2 py-0.5 w-20">תאריך השינוי</th>
                <th className="text-right px-2 py-0.5 flex-1">פרטי השינוי</th>
                <th className="text-right px-2 py-0.5 w-20">תאריך ההודעה</th>
                <th className="text-right px-2 py-0.5 w-20">חתימה</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100 h-7">
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PAGE 2 ===== */}
      <div className="p-6" style={{ pageBreakBefore: 'always' }}>

        {/* Page 2 header */}
        <div className="flex justify-between items-center mb-3 pb-1 border-b border-gray-700">
          <div className="text-[10px] text-gray-500">דף 2 מתוך 2 | טופס 101</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500">מספר זהות</span>
            <div className="border-b border-gray-600 w-36 text-[11px] pb-px" dir="ltr">{emp.teudatZehut}</div>
          </div>
        </div>

        {/* Section ח - Tax credits */}
        <div className="border border-gray-700 mb-2">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">ח. אני מבקש/ת פטור או זיכוי ממס</span>
            <span className="text-[10px] text-gray-500 me-1"> (סמן/י √ בריבוע המתאים)</span>
          </div>
          <div className="p-2 space-y-1.5 text-[11px]">
            <div className="flex items-start gap-1">
              <CB checked={true} />
              <span><strong>1</strong> אני תושב/ת ישראל.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={isDisabled100} />
              <span><strong>2א</strong> אני נכה 100% / עיוור/ת לצמיתות.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={emp.settlementZaka === true} />
              <span><strong>3</strong> אני תושב/ת קבוע/ה בישוב מזכה.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={isNewImmigrant} />
              <span><strong>4</strong> אני עולה חדש/ה מתאריך <span className="font-medium">{isNewImmigrant && emp.immigrationDate ? emp.immigrationDate : '__________'}</span>.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={spouseNoIncome} />
              <span><strong>5</strong> בגין בן/בת זוגי שאין לו/לה הכנסות בשנת המס.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={isSingleParentFamily} />
              <span><strong>6</strong> אני הורה במשפחה חד הורית החי בנפרד.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={children.length > 0 && (emp.gender === 'female' || isSingleParentFamily)} />
              <span><strong>7</strong> בגין ילדיי שבחזקתי — סה״כ <strong>{children.length}</strong> ילדים.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={false} />
              <span><strong>9</strong> אני הורה יחיד לילדיי שבחזקתי.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={false} />
              <span><strong>14</strong> אני חייל/ת משוחרר/ת / שירתתי בשירות לאומי.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={false} />
              <span><strong>15</strong> בגין סיום לימודים לתואר אקדמי או התמחות.</span>
            </div>
          </div>
        </div>

        {/* Section ט - Tax coordination */}
        <div className="border border-gray-700 mb-2">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">ט. תיאום מס</span>
            <span className="text-[10px] text-gray-500 me-1"> (סמן/י √ בריבוע המתאים)</span>
          </div>
          <div className="p-2 space-y-1 text-[11px]">
            <div className="flex items-start gap-1">
              <CB checked={false} />
              <span><strong>1</strong> לא היתה לי הכנסה מתחילת שנת המס עד לתחילת עבודתי אצל מעסיק זה.</span>
            </div>
            <div className="flex items-start gap-1">
              <CB checked={hasOtherIncome} />
              <span><strong>2</strong> יש לי הכנסות נוספות ממשכורת כמפורט להלן.</span>
            </div>
          </div>
        </div>

        {/* Section י - Declaration */}
        <div className="border border-gray-700 mb-3">
          <div className="bg-gray-100 border-b border-gray-600 px-2 py-0.5">
            <span className="font-bold text-[11px]">י. הצהרה</span>
          </div>
          <div className="p-3">
            <p className="text-[11px] text-gray-700 mb-4">
              אני מצהיר/ה כי הפרטים שמסרתי בטופס זה הינם מלאים ונכונים. ידוע לי שהשמטה או מסירת פרטים לא נכונים הינה עבירה על פקודת מס הכנסה.
              אני מתחייב/ת להודיע למעסיק על כל שינוי בפרטיי תוך שבוע ימים מתאריך השינוי.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="border-b border-gray-600 pb-1 min-h-[40px]">
                  {signature && <span className="text-navy font-bold text-sm">{emp.name} ✓</span>}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">חתימת העובד/ת</p>
              </div>
              <div>
                <div className="border-b border-gray-600 pb-1 font-medium">{today}</div>
                <p className="text-[10px] text-gray-500 mt-1">תאריך</p>
              </div>
            </div>
          </div>
        </div>

        {signature && <SignatureBadge sig={signature} />}

        {/* Footer explanations */}
        <div className="mt-4 border-t border-gray-200 pt-3 text-[9px] text-gray-500">
          <p className="font-bold text-[10px] mb-1">דברי הסבר למילוי טופס 101</p>
          <p className="mb-0.5">(1) "עובד" יחיד המקבל משכורת. "משכורת" הכנסת עבודה, קיצבה, מלגה וכיו"ב.</p>
          <p className="mb-0.5">(2) משכורת חודש — משכורת בעד עבודה של לא פחות מ-18 יום בחודש.</p>
          <p className="mb-0.5">(11) הורה במשפחה חד הורית: רווק, גרוש, אלמן.</p>
          <p className="mb-0.5">(12) הורה יחיד — הורה שהיה לו ילד שנפטר ההורה השני או שהילד רשום בלא פרטי ההורה השני.</p>
          <p className="mb-0.5">(13) ישוב מזכה — ישוב שחל עליו סעיף 11 לפקודה או סעיף 11 לחוק אס"ח.</p>
          <p className="text-[8px] text-gray-400 mt-2">ר"י, אגף בכיר טכנולוגיות דיגיטליות ומידע (מעודכן ל-11.2025)</p>
        </div>
      </div>
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

  // Tofes 101 — editable overrides before printing
  const [tofes101Edits, setTofes101Edits] = useState<Partial<Employee>>({});

  function setT101(updates: Partial<Employee>) {
    setTofes101Edits((prev) => ({ ...prev, ...updates }));
  }

  function addLine() { setQuoteLines((l) => [...l, { description: '', qty: 1, unitPrice: 0 }]); }
  function removeLine(i: number) { setQuoteLines((l) => l.filter((_, idx) => idx !== i)); }
  function updateLine(i: number, field: keyof QuoteLine, value: string | number) {
    setQuoteLines((l) => l.map((row, idx) => idx === i ? { ...row, [field]: value } : row));
  }

  const activeEmps  = employees.filter((e) => e.status === 'active');
  const wonLeads    = leads.filter((l) => ['won', 'contacted', 'quote_sent'].includes(l.status));
  const activeClients = clients.filter((c) => c.status !== 'inactive');

  const selectedEmp = activeEmps.find((e) => e.id === selectedEmpId);
  const tofes101Emp: Employee | null = selectedEmp ? { ...selectedEmp, ...tofes101Edits } : null;

  // Children helpers for tofes101 edit panel
  const t101Children: Child[] = (tofes101Edits.children !== undefined ? tofes101Edits.children : (selectedEmp?.children ?? []));
  function addT101Child() { setT101({ children: [...t101Children, { name: '', birthDate: '' }] }); }
  function removeT101Child(i: number) { setT101({ children: t101Children.filter((_, idx) => idx !== i) }); }
  function updateT101Child(i: number, field: keyof Child, val: string) {
    setT101({ children: t101Children.map((c, idx) => idx === i ? { ...c, [field]: val } : c) });
  }

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
                <select value={selectedEmpId} onChange={(e) => { setSelectedEmpId(e.target.value); setPreview(false); setSignature(null); setTofes101Edits({}); }}
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

        {/* Tofes 101 — fill-before-print edit panel */}
        {docType === 'tofes101' && selectedEmpId && selectedEmp && !preview && (
          <div className="bg-white rounded-xl border border-gold/20 p-5 shadow-sm space-y-5" dir="rtl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 font-hebrew">השלמת פרטים לטופס 101</h3>
              <span className="text-xs text-gray-400 font-hebrew">מלא/י את הפרטים החסרים לפני ההדפסה</span>
            </div>

            {/* Section A — Personal */}
            <div>
              <p className="text-xs font-semibold text-navy font-hebrew mb-2 pb-1 border-b border-navy/10">א. פרטי העובד</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">כתובת מגורים</label>
                  <input value={tofes101Edits.address ?? selectedEmp.address ?? ''}
                    onChange={(e) => setT101({ address: e.target.value })}
                    placeholder="רחוב ומספר..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">עיר / ישוב</label>
                  <input value={tofes101Edits.city ?? selectedEmp.city ?? ''}
                    onChange={(e) => setT101({ city: e.target.value })}
                    placeholder="עיר..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">מגדר</label>
                  <div className="flex gap-4 pt-1.5">
                    {(['male', 'female'] as Gender[]).map((g) => (
                      <label key={g} className="flex items-center gap-1.5 text-sm font-hebrew cursor-pointer">
                        <input type="radio" name="t101Gender" value={g}
                          checked={(tofes101Edits.gender ?? selectedEmp.gender) === g}
                          onChange={() => setT101({ gender: g })}
                          className="accent-navy" />
                        {GENDER_LABELS[g]}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">מצב משפחתי</label>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
                    {(['single', 'married', 'divorced', 'widowed'] as MaritalStatus[]).map((m) => (
                      <label key={m} className="flex items-center gap-1 text-xs font-hebrew cursor-pointer">
                        <input type="radio" name="t101Marital" value={m}
                          checked={(tofes101Edits.maritalStatus ?? selectedEmp.maritalStatus) === m}
                          onChange={() => setT101({ maritalStatus: m })}
                          className="accent-navy" />
                        {MARITAL_LABELS[m]}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section C — Family & Tax */}
            <div>
              <p className="text-xs font-semibold text-navy font-hebrew mb-2 pb-1 border-b border-navy/10">ג. ילדים ומס</p>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600 font-hebrew">ילדים</p>
                  <button onClick={addT101Child}
                    className="text-xs text-gold hover:text-gold/80 font-hebrew flex items-center gap-1">
                    <Plus size={12} />הוסף ילד
                  </button>
                </div>
                {t101Children.length === 0 && (
                  <p className="text-xs text-gray-400 font-hebrew py-1 italic">אין ילדים רשומים</p>
                )}
                {t101Children.map((child, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_32px] gap-2 mb-2 items-center">
                    <input value={child.name} onChange={(e) => updateT101Child(i, 'name', e.target.value)}
                      placeholder="שם הילד/ה..."
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30" />
                    <input type="date" value={child.birthDate} onChange={(e) => updateT101Child(i, 'birthDate', e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                    <button onClick={() => removeT101Child(i)} className="text-gray-300 hover:text-red-400 transition-colors flex justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">אחוז נכות</label>
                  <input type="number" min={0} max={100}
                    value={tofes101Edits.disabilityPercent ?? selectedEmp.disabilityPercent ?? ''}
                    onChange={(e) => setT101({ disabilityPercent: e.target.value === '' ? undefined : Number(e.target.value) })}
                    placeholder="0–100"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">עולה חדש/ה</label>
                  <div className="flex gap-4 pt-1.5">
                    {([{ val: true, label: 'כן' }, { val: false, label: 'לא' }]).map((opt) => (
                      <label key={String(opt.val)} className="flex items-center gap-1.5 text-sm font-hebrew cursor-pointer">
                        <input type="radio" name="t101Immigrant"
                          checked={(tofes101Edits.isNewImmigrant ?? selectedEmp.isNewImmigrant) === opt.val}
                          onChange={() => setT101({ isNewImmigrant: opt.val })}
                          className="accent-navy" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                {(tofes101Edits.isNewImmigrant ?? selectedEmp.isNewImmigrant) && (
                  <div>
                    <label className="block text-xs text-gray-500 font-hebrew mb-1">תאריך עלייה</label>
                    <input type="date"
                      value={tofes101Edits.immigrationDate ?? selectedEmp.immigrationDate ?? ''}
                      onChange={(e) => setT101({ immigrationDate: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                )}
                {(tofes101Edits.maritalStatus ?? selectedEmp.maritalStatus) === 'married' && (
                  <div>
                    <label className="block text-xs text-gray-500 font-hebrew mb-1">האם לבן/בת הזוג יש הכנסה?</label>
                    <div className="flex gap-4 pt-1.5">
                      {([{ val: true, label: 'כן' }, { val: false, label: 'לא' }]).map((opt) => (
                        <label key={String(opt.val)} className="flex items-center gap-1.5 text-sm font-hebrew cursor-pointer">
                          <input type="radio" name="t101SpouseIncome"
                            checked={(tofes101Edits.spouseHasIncome ?? selectedEmp.spouseHasIncome) === opt.val}
                            onChange={() => setT101({ spouseHasIncome: opt.val })}
                            className="accent-navy" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Live nekudot preview */}
              {tofes101Emp && (
                <div className="mt-3 p-3 bg-navy/5 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-hebrew text-gray-600">נקודות זיכוי מחושבות</p>
                    <p className="text-[10px] text-gray-400 font-hebrew mt-0.5">
                      {calcNekudotZikui(tofes101Emp).breakdown.map((b) => b.label).join(' · ')}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-2xl font-black text-navy">{calcNekudotZikui(tofes101Emp).total}</p>
                    <p className="text-[10px] text-gray-500">₪{Math.round(calcNekudotZikui(tofes101Emp).total * 242).toLocaleString()}/חודש</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional personal info */}
            <div>
              <p className="text-xs font-semibold text-navy font-hebrew mb-2 pb-1 border-b border-navy/10">מידע נוסף</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">מיקוד</label>
                  <input value={tofes101Edits.postalCode ?? selectedEmp.postalCode ?? ''}
                    onChange={(e) => setT101({ postalCode: e.target.value })}
                    placeholder="מיקוד..."
                    dir="ltr"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">דואר אלקטרוני</label>
                  <input value={tofes101Edits.email ?? selectedEmp.email ?? ''}
                    onChange={(e) => setT101({ email: e.target.value })}
                    placeholder="דואר אלקטרוני..."
                    dir="ltr"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">ישוב מזכה?</label>
                  <div className="flex gap-3 pt-1.5">
                    {[{val: true, label: 'כן'}, {val: false, label: 'לא'}].map(opt => (
                      <label key={String(opt.val)} className="flex items-center gap-1.5 text-sm font-hebrew cursor-pointer">
                        <input type="radio" name="t101Settlement"
                          checked={(tofes101Edits.settlementZaka ?? selectedEmp.settlementZaka) === opt.val}
                          onChange={() => setT101({ settlementZaka: opt.val })}
                          className="accent-navy" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section B — Employment */}
            <div>
              <p className="text-xs font-semibold text-navy font-hebrew mb-2 pb-1 border-b border-navy/10">ב. פרטי ההעסקה</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">תאריך תחילת עבודה</label>
                  <input type="date"
                    value={tofes101Edits.hireDate ?? selectedEmp.hireDate ?? ''}
                    onChange={(e) => setT101({ hireDate: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-hebrew mb-1">מעסיק יחיד?</label>
                  <div className="flex gap-4 pt-1.5">
                    {([{ val: true, label: 'כן' }, { val: false, label: 'לא' }]).map((opt) => (
                      <label key={String(opt.val)} className="flex items-center gap-1.5 text-sm font-hebrew cursor-pointer">
                        <input type="radio" name="t101OnlyEmployer"
                          checked={(tofes101Edits.isOnlyEmployer ?? selectedEmp.isOnlyEmployer) === opt.val}
                          onChange={() => setT101({ isOnlyEmployer: opt.val })}
                          className="accent-navy" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {preview && docType === 'tofes101' && tofes101Emp && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — טופס 101</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setPreview(false)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy border border-gray-200 px-3 py-1.5 rounded-lg font-hebrew transition-colors">
                  ✏️ חזור לעריכה
                </button>
                <a href="https://tofes101.co.il/forms/itc-101/submit/" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-hebrew">
                  <ExternalLink size={13} />מילוי מקוון
                </a>
                {!signature && (
                  <button
                    onClick={() => signDocument({ docType: 'tofes101', signedBy: tofes101Emp.name, signedById: tofes101Emp.id })}
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
            <Tofes101Form emp={tofes101Emp} signature={signature ?? undefined} />
          </div>
        )}
      </div>
    </>
  );
}
