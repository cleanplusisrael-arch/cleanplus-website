'use client';
import { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useLeads } from '@/hooks/useLeads';
import { Header } from '@/components/layout/Header';
import { CONTRACT_LABELS } from '@/lib/employee-types';
import type { Employee } from '@/lib/employee-types';
import type { Lead } from '@/lib/types';
import { LEAD_SERVICE_LABELS } from '@/lib/types';
import { FileText, Download, ChevronDown } from 'lucide-react';

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

function EmploymentContract({ emp }: { emp: Employee }) {
  const today = fmtDate(new Date());
  return (
    <div id="doc-print" className="bg-white p-10 max-w-2xl mx-auto font-hebrew" dir="rtl" style={{ fontFamily: 'Heebo, Arial, sans-serif', lineHeight: 1.8 }}>
      <div className="text-center mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">חוזה העסקה</h1>
        <p className="text-gray-500 text-sm">Clean+ — ניקיון ואחזקה</p>
      </div>

      <div className="mb-6 space-y-1 text-sm">
        <p><strong>תאריך:</strong> {today}</p>
        <p><strong>שם העובד:</strong> {emp.name}</p>
        <p><strong>טלפון:</strong> <span dir="ltr">{emp.phone}</span></p>
        {emp.email && <p><strong>אימייל:</strong> <span dir="ltr">{emp.email}</span></p>}
        {emp.zone && <p><strong>אזור פעילות:</strong> {emp.zone}</p>}
        {emp.hireDate && <p><strong>תחילת עבודה:</strong> <span dir="ltr">{emp.hireDate}</span></p>}
        {emp.contractType && <p><strong>סוג משרה:</strong> {CONTRACT_LABELS[emp.contractType]}</p>}
        {emp.grossSalary && <p><strong>שכר ברוטו:</strong> <span dir="ltr">₪{emp.grossSalary.toLocaleString()}</span> לחודש</p>}
      </div>

      <div className="space-y-4 text-sm text-gray-700">
        <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-1">סעיפי החוזה</h2>

        <div><p className="font-semibold mb-1">1. היקף המשרה</p>
          <p>העובד מועסק בהתאם לסוג החוזה המפורט לעיל, בכפוף לצורכי החברה ובהתאם להסכמות שיידונו מעת לעת.</p>
        </div>

        <div><p className="font-semibold mb-1">2. שכר ותנאים</p>
          <p>השכר ישולם בסוף כל חודש קלנדרי. יתרות שעות נוספות ייחושבו בהתאם לחוק שעות עבודה ומנוחה, התשי״א-1951.</p>
        </div>

        <div><p className="font-semibold mb-1">3. ימי חופשה ומחלה</p>
          <p>העובד יהיה זכאי לימי חופשה ומחלה בהתאם לחוק חופשה שנתית, התשי״א-1951, וחוק דמי מחלה, התשל״ו-1976.</p>
        </div>

        <div><p className="font-semibold mb-1">4. סודיות ואי-תחרות</p>
          <p>העובד מתחייב לשמור בסוד כל מידע עסקי, רשימות לקוחות ונהלים פנימיים של החברה, הן במהלך תקופת ההעסקה והן לאחריה.</p>
        </div>

        <div><p className="font-semibold mb-1">5. סיום העסקה</p>
          <p>כל אחד מהצדדים רשאי לסיים את יחסי העבודה בהודעה מוקדמת של 30 יום, בהתאם לחוק הודעה מוקדמת לפיטורים ולהתפטרות, התשס״א-2001.</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="text-sm text-gray-600">חתימת המעסיק</p>
            <p className="text-xs text-gray-400 mt-1">Clean+ — ניקיון ואחזקה</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-400 pt-2">
            <p className="text-sm text-gray-600">חתימת העובד</p>
            <p className="text-xs text-gray-400 mt-1">{emp.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientQuote({ lead }: { lead: Lead }) {
  const today = fmtDate(new Date());
  const validUntil = fmtDate(new Date(Date.now() + 30 * 24 * 3600000));

  return (
    <div id="doc-print" className="bg-white p-10 max-w-2xl mx-auto font-hebrew" dir="rtl" style={{ fontFamily: 'Heebo, Arial, sans-serif', lineHeight: 1.8 }}>
      <div className="text-center mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">הצעת מחיר</h1>
        <p className="text-gold font-semibold text-sm">Clean+ — ניקיון ואחזקה מקצועי</p>
        <p className="text-gray-400 text-xs mt-1">cleanplus.co.il | info@cleanplus.co.il</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div className="space-y-1">
          <p className="font-bold text-gray-600 text-xs uppercase tracking-wide mb-2">פרטי הלקוח</p>
          <p><strong>שם:</strong> {lead.name}</p>
          <p><strong>טלפון:</strong> <span dir="ltr">{lead.phone}</span></p>
          {lead.city && <p><strong>עיר:</strong> {lead.city}</p>}
        </div>
        <div className="space-y-1">
          <p className="font-bold text-gray-600 text-xs uppercase tracking-wide mb-2">פרטי ההצעה</p>
          <p><strong>תאריך:</strong> {today}</p>
          <p><strong>תוקף:</strong> {validUntil}</p>
          {lead.service && <p><strong>שירות:</strong> {LEAD_SERVICE_LABELS[lead.service]}</p>}
          {lead.city && <p><strong>עיר:</strong> {lead.city}</p>}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-start px-4 py-3 font-hebrew">תיאור השירות</th>
              <th className="text-center px-4 py-3 font-hebrew">כמות</th>
              <th className="text-end px-4 py-3 font-hebrew">מחיר ליח׳</th>
              <th className="text-end px-4 py-3 font-hebrew">סה״כ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 font-hebrew">{(lead.service ? LEAD_SERVICE_LABELS[lead.service] : 'שירותי ניקיון')}</td>
              <td className="px-4 py-3 text-center">1</td>
              <td className="px-4 py-3 text-end" dir="ltr">—</td>
              <td className="px-4 py-3 text-end font-medium" dir="ltr">לפי סיכום</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td colSpan={3} className="px-4 py-3 font-bold text-end font-hebrew">סה״כ לתשלום (כולל מע״מ):</td>
              <td className="px-4 py-3 font-bold text-end text-navy" dir="ltr">לפי הסכם</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {lead.notes && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
          <p className="font-semibold mb-1 font-hebrew">הערות:</p>
          <p className="text-gray-600 font-hebrew">{lead.notes}</p>
        </div>
      )}

      <div className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-4">
        <p>• ההצעה בתוקף עד: {validUntil}</p>
        <p>• התשלום יבוצע עם קבלת העבודה, אלא אם הוסכם אחרת.</p>
        <p>• החברה מחזיקה בכיסוי ביטוחי מלא לנזקי רכוש ואחריות צד שלישי.</p>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const { employees } = useEmployees();
  const { leads } = useLeads();
  const [docType, setDocType] = useState<'contract' | 'quote'>('contract');
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [preview, setPreview] = useState(false);

  const activeEmps = employees.filter((e) => e.status === 'active');
  const wonLeads   = leads.filter((l) => l.status === 'won' || l.status === 'contacted' || l.status === 'quote_sent');

  const selectedEmp  = activeEmps.find((e) => e.id === selectedEmpId);
  const selectedLead = wonLeads.find((l) => l.id === selectedLeadId);

  function printDoc() {
    window.print();
  }

  return (
    <>
      <Header title="מסמכים" />
      <div className="p-6 space-y-5" dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          {[
            { type: 'contract' as const, label: 'חוזה העסקה', sub: 'לעובדים', icon: '📋' },
            { type: 'quote' as const, label: 'הצעת מחיר', sub: 'ללקוחות', icon: '💼' },
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
            {docType === 'contract' ? 'בחר עובד לחוזה' : 'בחר לקוח להצעת מחיר'}
          </h3>

          {docType === 'contract' ? (
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
                <select value={selectedLeadId} onChange={(e) => { setSelectedLeadId(e.target.value); setPreview(false); }}
                  className="w-full border border-gray-200 rounded-lg ps-3 pe-8 py-2.5 text-sm font-hebrew focus:outline-none focus:ring-2 focus:ring-gold/30 bg-white appearance-none">
                  <option value="">בחר לקוח...</option>
                  {wonLeads.map((l) => <option key={l.id} value={l.id}>{l.name} {l.phone ? `— ${l.phone}` : ''}</option>)}
                </select>
                <ChevronDown size={14} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setPreview(true)}
              disabled={(docType === 'contract' && !selectedEmpId) || (docType === 'quote' && !selectedLeadId)}
              className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-hebrew hover:bg-navy/90 disabled:opacity-40">
              <FileText size={15} />תצוגה מקדימה
            </button>
            {preview && (
              <button onClick={printDoc}
                className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-hebrew hover:border-navy/30 hover:text-navy">
                <Download size={15} />הדפס / שמור PDF
              </button>
            )}
          </div>
        </div>

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

        {preview && docType === 'quote' && selectedLead && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-hebrew">תצוגה מקדימה — הצעת מחיר</p>
              <button onClick={printDoc} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-hebrew">
                <Download size={13} />הדפס
              </button>
            </div>
            <ClientQuote lead={selectedLead} />
          </div>
        )}
      </div>
    </>
  );
}
