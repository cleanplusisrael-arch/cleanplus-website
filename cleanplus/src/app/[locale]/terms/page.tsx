import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'תנאי שימוש | Clean+',
    description: 'תנאי השימוש של אתר Clean+ — שירותי ניקיון מקצועיים.',
  };
}

export default async function TermsPage() {
  const today = new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#faf8f3]" dir="rtl">
      {/* Header */}
      <div className="bg-[#0a1628] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            ← חזרה לדף הבית
          </Link>
          <div className="inline-block bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] text-xs px-3 py-1 rounded-full mb-4">
            עדכון אחרון: {today}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>
            תנאי שימוש
          </h1>
          <p className="text-white/45 text-base" style={{ fontWeight: 300 }}>
            Clean+ — שירותי ניקיון מקצועיים
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-10 text-sm leading-relaxed text-gray-700"
          style={{ fontFamily: "'Heebo', sans-serif" }}>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>1. קבלת התנאים</h2>
            <p>
              השימוש באתר <span className="phone-ltr font-medium">cleanplus.co.il</span> (להלן: <strong>"האתר"</strong>)
              מהווה הסכמה מלאה לתנאי שימוש אלה. אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באתר.
              תנאי שימוש אלה חלים בנוסף ל<Link href="/privacy" className="text-[#c9a84c] hover:underline">מדיניות הפרטיות</Link> של החברה.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>2. הגדרות</h2>
            <div className="space-y-2">
              {[
                ['"החברה"', 'Clean+ — שירותי ניקיון מקצועיים'],
                ['"המשתמש"', 'כל אדם או גוף המשתמש באתר'],
                ['"השירות"', 'שירותי ניקיון מקצועיים המסופקים על ידי החברה'],
                ['"הפנייה"', 'טופס יצירת קשר המועבר דרך האתר'],
              ].map(([term, def]) => (
                <div key={term as string} className="flex gap-3 py-2 border-b border-gray-50">
                  <span className="font-bold text-[#0a1628] w-28 shrink-0">{term as string}</span>
                  <span className="text-gray-600">{def as string}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>3. מטרת האתר</h2>
            <p>
              האתר משמש כאמצעי לקבלת מידע על שירותי הניקיון של החברה ולהעברת פנייה לקבלת הצעת מחיר.
              האתר אינו פלטפורמת מסחר אלקטרוני — לא מתבצעות עסקאות כספיות באתר.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>4. הגשת פנייה ויצירת קשר</h2>
            <p className="mb-3">בעת מילוי טופס הפנייה, המשתמש מאשר כי:</p>
            <ul className="space-y-2 list-none">
              {[
                'הפרטים שמסר נכונים ומדויקים',
                'הינו מעל גיל 18, או פועל בהסכמת הורה/אפוטרופוס',
                'הוא מסכים לקבל חזרה שיחת טלפון ו/או הודעת WhatsApp מנציג החברה',
                'הוא מסכים למדיניות הפרטיות של האתר',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>5. שירותי הניקיון — תנאים כלליים</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#0a1628] mb-1">5.1 הצעות מחיר</h3>
                <p>הצעת מחיר שתתקבל מהחברה תהא בתוקף למשך <strong>30 יום</strong> מיום הנפקתה, אלא אם צוין אחרת.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0a1628] mb-1">5.2 ביטול</h3>
                <p>
                  ניתן לבטל שירות שתואם ללא עלות עד <strong>24 שעות לפני</strong> מועד הביצוע.
                  ביטול בפחות מ-24 שעות עשוי לחייב בדמי ביטול בגובה 30% ממחיר השירות.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0a1628] mb-1">5.3 ערבות שביעות רצון</h3>
                <p>
                  החברה מתחייבת לחזור ולתקן ליקויים שדווחו תוך <strong>48 שעות</strong> מסיום השירות, ללא תשלום נוסף.
                  במקרה של אי-שביעות רצון מוצדקת, החברה תשיב את התשלום במלואו.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0a1628] mb-1">5.4 ביטוח</h3>
                <p>
                  החברה מחזיקה ביטוח אחריות מקצועית וצד שלישי. במקרה של נזק לרכוש שנגרם על ידי צוות החברה
                  במהלך מתן השירות, יש לדווח תוך <strong>24 שעות</strong>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>6. הגבלת אחריות</h2>
            <p className="mb-3">החברה לא תהא אחראית לנזקים שנגרמו עקב:</p>
            <ul className="space-y-2 list-none">
              {[
                'מידע שגוי שמסר המשתמש בטופס הפנייה',
                'הפרעות בזמינות האתר עקב תחזוקה או כוח עליון',
                'שימוש לרעה בנתוני קשר שנמסרו',
                'נזקים שנגרמו עקב חפצי ערך שלא הוצהרו מראש',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-red-400 mt-0.5 shrink-0">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>7. קניין רוחני</h2>
            <p>
              כל תוכן האתר — לרבות טקסטים, עיצוב, לוגו, תמונות וקוד — מוגן בזכויות יוצרים ושייך לחברה.
              אין להעתיק, לפרסם מחדש או להשתמש בתוכן ללא אישור מפורש בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>8. שינויים בתנאים</h2>
            <p>
              החברה רשאית לשנות תנאים אלה בכל עת. שינויים מהותיים יפורסמו באתר.
              המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לנוסח המעודכן.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>9. דין וסמכות שיפוט</h2>
            <p>
              תנאי שימוש אלה כפופים לדיני מדינת ישראל. כל מחלוקת תובא בפני בתי המשפט המוסמכים
              במחוז תל אביב-יפו.
            </p>
          </section>

          <section className="bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Rubik', sans-serif" }}>יצירת קשר</h2>
            <p className="text-white/60 text-sm mb-4">לשאלות בנוגע לתנאי השימוש:</p>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70 phone-ltr">📞 <a href="tel:+972500000000" className="hover:text-[#c9a84c] transition-colors">050-000-0000</a></li>
              <li className="text-white/70 phone-ltr">✉️ <a href="mailto:info@cleanplus.co.il" className="hover:text-[#c9a84c] transition-colors">info@cleanplus.co.il</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
