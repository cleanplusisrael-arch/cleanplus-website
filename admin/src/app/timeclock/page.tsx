'use client';
import { useState } from 'react';
import Image from 'next/image';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Employee } from '@/lib/employee-types';
import type { TimeclockEntry } from '@/lib/timeclock-types';
import { LogIn, LogOut, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

function fmtTime(iso: string) {
  return new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
}

type Step = 'input' | 'confirm' | 'done';
type Action = 'in' | 'out';

export default function PublicTimeclock() {
  const [tz, setTz]           = useState('');
  const [step, setStep]       = useState<Step>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [openEntry, setOpenEntry] = useState<TimeclockEntry | null>(null);
  const [action, setAction]   = useState<Action>('in');
  const [doneTime, setDoneTime] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  async function handleLookup() {
    if (tz.length < 5) { setError('יש להזין מספר תעודת זהות תקין'); return; }
    setLoading(true); setError('');
    try {
      // Find employee by teudat zehut
      const empSnap = await getDocs(query(collection(db, 'employees'), where('teudatZehut', '==', tz)));
      if (empSnap.empty) { setError('לא נמצא עובד עם מספר זהות זה'); setLoading(false); return; }
      const empDoc = empSnap.docs[0];
      const emp = { id: empDoc.id, ...(empDoc.data() as Omit<Employee, 'id'>) };
      if (emp.status !== 'active') { setError('חשבון העובד אינו פעיל. פנה למנהל.'); setLoading(false); return; }
      setEmployee(emp);

      // Check for open timeclock entry today
      const clockSnap = await getDocs(
        query(collection(db, 'timeclock'),
          where('employeeId', '==', empDoc.id),
          where('date', '==', today)
        )
      );
      const entries = clockSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TimeclockEntry, 'id'>) }));
      const open = entries.find((e) => e.clockIn && !e.clockOut);
      setOpenEntry(open ?? null);
      setAction(open ? 'out' : 'in');
      setStep('confirm');
    } catch {
      setError('שגיאה בחיבור. נסה שוב.');
    }
    setLoading(false);
  }

  async function handleConfirm() {
    if (!employee) return;
    setLoading(true);
    const now = new Date().toISOString();
    try {
      if (action === 'in') {
        await addDoc(collection(db, 'timeclock'), {
          employeeId: employee.id,
          employeeName: employee.name,
          date: today,
          clockIn: now,
          createdAt: now,
        });
      } else if (openEntry) {
        await updateDoc(doc(db, 'timeclock', openEntry.id), { clockOut: now });
      }
      setDoneTime(fmtTime(now));
      setStep('done');
    } catch {
      setError('שגיאה בשמירה. נסה שוב.');
    }
    setLoading(false);
  }

  function reset() { setTz(''); setStep('input'); setEmployee(null); setOpenEntry(null); setError(''); setDoneTime(''); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-navy/90 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Image src="/logo.png" alt="Clean+" width={68} height={68} className="object-contain" />
          </div>
          <h1 className="text-white font-bold text-xl font-hebrew">Clean+</h1>
          <p className="text-white/50 text-sm font-hebrew mt-0.5">דיווח נוכחות</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Step: input teudat zehut */}
          {step === 'input' && (
            <div className="p-7 space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock size={22} className="text-navy" />
                </div>
                <h2 className="text-lg font-bold text-navy font-hebrew">כניסה / יציאה</h2>
                <p className="text-sm text-gray-400 font-hebrew mt-1">הזן את מספר תעודת הזהות שלך</p>
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-hebrew mb-1.5">מספר תעודת זהות</label>
                <input
                  type="text" inputMode="numeric" dir="ltr" maxLength={9}
                  value={tz} onChange={(e) => { setTz(e.target.value.replace(/\D/g, '')); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                  placeholder="000000000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy/30"
                />
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-xs font-hebrew">
                    <AlertCircle size={13} />{error}
                  </div>
                )}
              </div>

              <button onClick={handleLookup} disabled={loading || tz.length < 5}
                className="w-full bg-navy text-white py-3.5 rounded-xl font-hebrew font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 text-sm">
                {loading ? 'מחפש...' : 'המשך'}
              </button>
            </div>
          )}

          {/* Step: confirm action */}
          {step === 'confirm' && employee && (
            <div className="p-7 space-y-5">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${action === 'in' ? 'bg-green-50' : 'bg-red-50'}`}>
                  {action === 'in' ? <LogIn size={22} className="text-green-600" /> : <LogOut size={22} className="text-red-500" />}
                </div>
                <h2 className="text-lg font-bold text-navy font-hebrew">{employee.name}</h2>
                <p className="text-xs text-gray-400 font-hebrew mt-0.5">{employee.employeeNumber}</p>
              </div>

              <div className={`rounded-xl p-4 text-center ${action === 'in' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                <p className={`font-semibold font-hebrew text-sm ${action === 'in' ? 'text-green-700' : 'text-red-600'}`}>
                  {action === 'in' ? '✓ רישום כניסה' : '✓ רישום יציאה'}
                </p>
                {action === 'out' && openEntry?.clockIn && (
                  <p className="text-xs text-gray-500 font-hebrew mt-1">כניסה הוקלטה בשעה {fmtTime(openEntry.clockIn)}</p>
                )}
                <p className="text-xs text-gray-400 mt-1" dir="ltr">
                  {new Intl.DateTimeFormat('he-IL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())}
                </p>
              </div>

              {error && <p className="text-red-500 text-xs font-hebrew text-center flex items-center justify-center gap-1"><AlertCircle size={13} />{error}</p>}

              <div className="flex gap-3">
                <button onClick={reset} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 font-hebrew hover:bg-gray-50">ביטול</button>
                <button onClick={handleConfirm} disabled={loading}
                  className={`flex-1 py-3 rounded-xl text-sm text-white font-hebrew font-semibold disabled:opacity-50 ${action === 'in' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
                  {loading ? 'שומר...' : action === 'in' ? 'אשר כניסה' : 'אשר יציאה'}
                </button>
              </div>
            </div>
          )}

          {/* Step: done */}
          {step === 'done' && (
            <div className="p-7 text-center space-y-5">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy font-hebrew mb-1">
                  {action === 'in' ? 'כניסה נרשמה!' : 'יציאה נרשמה!'}
                </h2>
                <p className="text-2xl font-bold text-gray-800 font-mono" dir="ltr">{doneTime}</p>
                <p className="text-sm text-gray-400 font-hebrew mt-1">{employee?.name}</p>
              </div>
              <button onClick={reset}
                className="w-full bg-navy text-white py-3 rounded-xl text-sm font-hebrew font-semibold hover:bg-navy/90">
                סיום
              </button>
            </div>
          )}
        </div>

        <p className="text-white/25 text-xs text-center mt-6 font-hebrew">Clean+ — ניקיון ואחזקה מקצועי</p>
      </div>
    </div>
  );
}
