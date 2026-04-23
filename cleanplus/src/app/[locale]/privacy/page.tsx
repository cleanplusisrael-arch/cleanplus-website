import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'מדיניות פרטיות | Clean+',
    description: 'מדיניות הפרטיות של Clean+ — כיצד אנו מגנים על המידע האישי שלכם.',
  };
}

export default async function PrivacyPage() {
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
            מדיניות פרטיות
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
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>1. כללי</h2>
            <p>
              Clean+ (להלן: <strong>"החברה"</strong> או <strong>"אנחנו"</strong>) מכבדת את פרטיות המשתמשים באתר{' '}
              <span className="phone-ltr font-medium">cleanplus.co.il</span> (להלן: <strong>"האתר"</strong>).
              מדיניות פרטיות זו מסבירה אילו נתונים אישיים אנו אוספים, כיצד אנו משתמשים בהם, ומהן זכויותיכם.
            </p>
            <p className="mt-3">
              השימוש באתר ו/או מילוי טופס הפנייה מהווה הסכמה למדיניות פרטיות זו. מדיניות זו עומדת בדרישות{' '}
              <strong>חוק הגנת הפרטיות, התשמ"א-1981</strong> ותקנותיו, וכן{' '}
              <strong>תקנות האיחוד האירופי (GDPR)</strong> ככל שרלוונטי.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>2. המידע שאנו אוספים</h2>
            <p className="mb-3">אנו אוספים אך ורק את המידע שאתם מספקים לנו מרצון בעת יצירת קשר:</p>
            <ul className="space-y-2 list-none">
              {[
                ['שם מלא', 'לצורך זיהוי ופנייה מכובדת'],
                ['מספר טלפון', 'לצורך חזרה אליכם עם הצעת מחיר'],
                ['סוג השירות המבוקש', 'לצורך התאמת הצעת המחיר לצרכיכם'],
                ['הערות חופשיות', 'מידע נוסף שבחרתם לשתף'],
                ['שפת ממשק', 'לצורך מתן שירות בשפתכם'],
              ].map(([item, reason]) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  <span><strong>{item}</strong> — {reason}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-500">
              אנו <strong>אינם</strong> אוספים נתוני כרטיס אשראי, מספרי תעודת זהות, מידע רפואי, או כל מידע רגיש אחר.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>3. מטרות השימוש במידע</h2>
            <p className="mb-3">המידע האישי שנמסר לנו ישמש <strong>אך ורק</strong> למטרות הבאות:</p>
            <ul className="space-y-2 list-none">
              {[
                'יצירת קשר חוזרת לצורך מתן הצעת מחיר',
                'תיאום שירות ניקיון',
                'שיפור השירות ועמידה בציפיות הלקוח',
                'שמירת רשומות עסקיות כנדרש על פי חוק',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">←</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-500">
              אנו <strong>לא נעביר, לא נמכור ולא נשתף</strong> את המידע שלכם עם צדדים שלישיים, למעט נותני שירות חיוניים הקשורים ישירות לביצוע השירות (כגון מערכת ניהול לקוחות).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>4. אחסון ואבטחת המידע</h2>
            <p className="mb-3">
              המידע מאוחסן על שרתי <strong>Google Firebase</strong> (Firestore) בתשתיות מאובטחות ומוצפנות בתקן AES-256.
              שרתי Firebase ממוקמים באיחוד האירופי ועומדים בדרישות GDPR.
            </p>
            <ul className="space-y-2 list-none">
              {[
                'גישה למידע מוגבלת לצוות החברה המורשה בלבד',
                'תקשורת מוצפנת (HTTPS/TLS) בכל עת',
                'סיסמאות מוצפנות — אנחנו לא שומרים סיסמאות בטקסט פתוח',
                'ביקורות אבטחה שוטפות',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">🔒</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>5. שמירת מידע</h2>
            <p>
              נתוני לידים ופניות נשמרים למשך <strong>שנתיים</strong> מיום הפנייה, או עד למחיקה לפי בקשתכם.
              נתוני לקוחות פעילים נשמרים לאורך כל תקופת ההתקשרות ו-<strong>7 שנים</strong> לאחריה לצורכי חשבונאות ומס, בהתאם לחוק.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>6. זכויותיכם</h2>
            <p className="mb-3">בהתאם לחוק הגנת הפרטיות הישראלי ול-GDPR, יש לכם את הזכויות הבאות:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['📋', 'זכות עיון', 'לדעת אילו נתונים אחסנו עליכם'],
                ['✏️', 'זכות תיקון', 'לתקן נתונים שגויים או לא מעודכנים'],
                ['🗑️', 'זכות מחיקה', 'לבקש מחיקת כל הנתונים שלכם ("הזכות להישכח")'],
                ['🚫', 'זכות התנגדות', 'להתנגד לעיבוד המידע לצורכי שיווק'],
                ['📦', 'זכות ניידות', 'לקבל את הנתונים שלכם בפורמט מובנה'],
                ['⏸️', 'זכות הגבלה', 'להגביל את עיבוד המידע בנסיבות מסוימות'],
              ].map(([icon, title, desc]) => (
                <div key={title as string} className="bg-[#faf8f3] rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{icon}</span>
                    <span className="font-semibold text-[#0a1628] text-xs">{title as string}</span>
                  </div>
                  <p className="text-xs text-gray-500">{desc as string}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              לממש זכויותיכם, פנו אלינו בכתב לכתובת:{' '}
              <a href="mailto:privacy@cleanplus.co.il" className="text-[#c9a84c] hover:underline phone-ltr">privacy@cleanplus.co.il</a>.
              נשיב תוך <strong>30 יום</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>7. עוגיות (Cookies)</h2>
            <p>
              האתר משתמש בעוגיות טכניות בלבד — הנדרשות לפעולת האתר (שמירת שפה מועדפת, מניעת תקלות).
              אין שימוש בעוגיות פרסומיות או ריגול.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0a1628] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>8. שינויים במדיניות</h2>
            <p>
              אנו שומרים את הזכות לעדכן מדיניות פרטיות זו. שינויים מהותיים יפורסמו באתר עם תאריך עדכון חדש.
              המשך השימוש באתר לאחר שינוי מהווה הסכמה לנוסח המעודכן.
            </p>
          </section>

          <section className="bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>9. יצירת קשר בעניין פרטיות</h2>
            <p className="text-white/60 text-sm mb-4">
              לכל שאלה, בקשה או תלונה בנוגע לפרטיות, ניתן לפנות אלינו:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">🏢 <strong className="text-white/90">Clean+</strong> — שירותי ניקיון מקצועיים</li>
              <li className="text-white/70 phone-ltr">📞 <a href="tel:+972500000000" className="hover:text-[#c9a84c] transition-colors">050-000-0000</a></li>
              <li className="text-white/70 phone-ltr">✉️ <a href="mailto:privacy@cleanplus.co.il" className="hover:text-[#c9a84c] transition-colors">privacy@cleanplus.co.il</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
