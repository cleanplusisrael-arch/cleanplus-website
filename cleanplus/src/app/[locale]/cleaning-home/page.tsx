import type { Metadata } from 'next';
import Image from 'next/image';
import { WhatsAppCTA, FloatingWhatsAppCTA } from '@/components/WhatsAppCTA';

const PAGE = 'cleaning-home';
const WA_MSG = 'שלום Clean+! ראיתי את האתר ואני מעוניין/ת בהצעת מחיר לניקיון בית פרטי. 🏠 תוכלו לשלוח לי פרטים?';

export const metadata: Metadata = {
  title: 'ניקיון בית מקצועי | Clean+ — תל אביב, השרון, קיסריה',
  description: 'שירות ניקיון פרמיום לבתים פרטיים. צוות מיומן, ציוד כלול, מחיר הוגן. מענה תוך שעה. ✓ 500+ לקוחות מרוצים.',
  keywords: ['ניקיון בית', 'שירות ניקיון', 'תל אביב', 'הרצליה', 'קיסריה', 'ניקיון מקצועי'],
  openGraph: {
    title: 'ניקיון בית מקצועי — Clean+',
    description: 'שירות פרמיום לבתים פרטיים. הצעת מחיר חינם תוך שעה.',
    url: 'https://cleanplus.co.il/he/cleaning-home',
    siteName: 'Clean+',
    locale: 'he_IL',
    type: 'website',
    images: [{ url: 'https://cleanplus.co.il/og-home.jpg', width: 1200, height: 630, alt: 'Clean+ ניקיון בית' }],
  },
  alternates: { canonical: 'https://cleanplus.co.il/he/cleaning-home' },
};

const TESTIMONIALS = [
  { name: 'דנה כהן', city: 'הרצליה', text: 'Clean+ שינה לי את החיים. כל שבועיים הדירה מבריקה כאילו נקתה לראשונה. מקצועיים, נעימים ויסודיים.', stars: 5 },
  { name: 'אורי לוי', city: 'תל אביב', text: 'הגיעו בדיוק בזמן, עשו עבודה מדהימה ועזבו את הבית מסודר. מחיר הוגן לאיכות שמקבלים.', stars: 5 },
  { name: 'מיכל רוסנר', city: 'קיסריה', text: 'שלושה חודשים שהם מגיעים ותמיד אותה רמה גבוהה. מומלץ בחום לכל אחד שמחפש שקט נפשי.', stars: 5 },
];

const SERVICES = [
  { icon: '🏠', title: 'ניקיון שוטף', desc: 'שבועי / דו-שבועי / חודשי. אנחנו מגיעים, אתם נהנים.' },
  { icon: '✨', title: 'ניקיון כללי', desc: 'ניקוי עמוק של כל הבית — מושלם לאחר שיפוץ או לפני אירוע.' },
  { icon: '🪟', title: 'חלונות ומרפסות', desc: 'ניקוי מקצועי מבפנים ומבחוץ, עד לקומה השנייה.' },
  { icon: '🛋️', title: 'ריפוד ושטיחים', desc: 'ניקוי רטוב/יבש לרהיטים ושטיחים, מניעת אלרגנים.' },
];

const AREAS = ['תל אביב', 'הרצליה', 'נתניה', 'קיסריה', 'כפר סבא', 'רעננה', 'הוד השרון', 'ראשון לציון', 'פתח תקווה', 'חדרה'];

export default function CleaningHomePage() {
  return (
    <div dir="rtl" lang="he" style={{ fontFamily: "'Heebo', 'Assistant', sans-serif", background: '#faf8f3', color: '#1a1a2e' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-black text-[#0a1628]">Clean<span className="text-[#c9a84c]">+</span></span>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-sm font-bold px-4 py-2 rounded-full transition-all">
            <span>📱</span> קבל הצעה
          </WhatsAppCTA>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#0a1628] text-white pt-16 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #c9a84c 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            ✓ שירות מורשה ומבוטח | מרכז ישראל
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            הבית שלך ראוי<br />לטיפול הטוב ביותר
          </h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            ניקיון מקצועי לבתים פרטיים בתל אביב, השרון וקיסריה.<br />
            צוות מיומן, ציוד מתקדם, ואחריות מלאה על כל עבודה.
          </p>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-lg font-black px-8 py-4 rounded-2xl shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95">
            <svg className="w-6 h-6 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
            קבל הצעת מחיר חינם
          </WhatsAppCTA>
          <p className="text-white/40 text-xs mt-4">✓ ללא התחייבות &nbsp;✓ מענה תוך שעה &nbsp;✓ 500+ לקוחות מרוצים</p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-10 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { n: '500+', label: 'לקוחות פרטיים' },
            { n: '98%', label: 'שביעות רצון' },
            { n: '3+', label: 'שנות ניסיון' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-[#0a1628]">{n}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center text-[#0a1628] mb-2">מה אנחנו עושים בשבילך</h2>
          <p className="text-center text-gray-500 mb-10">שירותי ניקיון מקיפים לכל צורך</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-bold text-[#0a1628] mb-1 text-sm">{title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-[#0a1628] py-10 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-white">
          {[
            { icon: '🛡️', label: 'עובדים מבוטחים' },
            { icon: '🌿', label: 'מוצרים אקולוגיים' },
            { icon: '🧹', label: 'ציוד מקצועי כלול' },
            { icon: '⭐', label: 'ניסיון מוכח' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-semibold text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center text-[#0a1628] mb-10">מה אומרים עלינו</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, city, text, stars }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-[#c9a84c] text-lg mb-3">{'★'.repeat(stars)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="font-bold text-[#0a1628] text-sm">{name}</div>
                <div className="text-gray-400 text-xs">{city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-black text-[#0a1628] mb-6">אזורי שירות</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {AREAS.map((a) => (
              <span key={a} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-[#c9a84c]/10 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black text-[#0a1628] mb-3">מוכנים להתחיל?</h2>
          <p className="text-gray-600 mb-8">שלחו לנו הודעה ונחזור אליכם תוך שעה עם הצעת מחיר מותאמת.</p>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-lg font-black px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
            שלח הודעה בוואטסאפ
          </WhatsAppCTA>
          <p className="text-gray-400 text-xs mt-4">ניתן גם להתקשר: <span dir="ltr">050-000-0000</span></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628] text-white/50 text-xs text-center py-6 px-4">
        <p>© {new Date().getFullYear()} Clean+ | קמינוס הפקות בע״מ | כל הזכויות שמורות</p>
        <p className="mt-1">מרכז ישראל | info@cleanplus.co.il</p>
      </footer>

      <FloatingWhatsAppCTA page={PAGE} message={WA_MSG} />
    </div>
  );
}
