import type { Metadata } from 'next';
import { WhatsAppCTA, FloatingWhatsAppCTA } from '@/components/WhatsAppCTA';

const PAGE = 'recruiting';
const WA_MSG = 'שלום Clean+! ראיתי את המודעה ואני מעוניין/ת להצטרף לצוות. אפשר לשמוע פרטים? 💼';

export const metadata: Metadata = {
  title: 'דרושים | Clean+ — עבודה בניקיון, מרכז ישראל',
  description: 'הצטרפו לצוות Clean+. שכר 45-55 ₪ לשעה, שעות גמישות, הכשרה מלאה. מתאים לעולים חדשים. Вакансии для уборщиков, центральный Израиль.',
  keywords: ['דרושים ניקיון', 'עבודה עולים חדשים', 'משרות ניקיון', 'работа уборщик Израиль', 'Вакансии Израиль'],
  openGraph: {
    title: 'עבודה ב-Clean+ — הצטרפו לצוות שלנו',
    description: 'שכר גבוה, שעות גמישות, הכשרה מלאה. מתאים לעולים חדשים.',
    url: 'https://cleanplus.co.il/he/recruiting',
    siteName: 'Clean+',
    locale: 'he_IL',
    type: 'website',
    images: [{ url: 'https://cleanplus.co.il/og-recruiting.jpg', width: 1200, height: 630, alt: 'Clean+ דרושים' }],
  },
  alternates: { canonical: 'https://cleanplus.co.il/he/recruiting' },
};

const PERKS = [
  { icon: '💰', title: '45–55 ₪ לשעה', titleRu: '45–55 ₪/час', desc: 'שכר תחרותי מעל השוק, משולם בזמן כל חודש', descRu: 'Конкурентная зарплата выше рынка, выплачивается вовремя каждый месяц' },
  { icon: '🕐', title: 'שעות גמישות', titleRu: 'Гибкий график', desc: 'בחר/י את המשמרות המתאימות לך — בוקר, אחה"צ, ערב', descRu: 'Выбирай удобные смены — утро, день или вечер' },
  { icon: '🎓', title: 'הכשרה מלאה בתשלום', titleRu: 'Обучение оплачивается', desc: 'אין ניסיון? לא בעיה. אנחנו מלמדים הכל מאפס', descRu: 'Нет опыта? Не проблема. Мы всему обучим с нуля' },
  { icon: '🤝', title: 'צוות תומך', titleRu: 'Дружная команда', desc: 'סביבת עבודה נעימה, מנהלים קשובים ועמיתים טובים', descRu: 'Приятная рабочая среда, отзывчивые менеджеры' },
  { icon: '📄', title: 'חוזה עבודה מסודר', titleRu: 'Официальный договор', desc: 'זכויות מלאות: ביטוח לאומי, פנסיה, חופשות', descRu: 'Все права: нацстрах, пенсия, отпуск' },
  { icon: '🚗', title: 'אזורים קרובים לבית', titleRu: 'Работа рядом с домом', desc: 'נסיון לשבץ אותך לאזור מגוריך', descRu: 'Стараемся назначать работу рядом с твоим районом' },
];

const REQUIREMENTS = [
  { he: 'מוטיבציה גבוהה ואמינות', ru: 'Высокая мотивация и надёжность' },
  { he: 'זמינות לפחות 3 ימים בשבוע', ru: 'Доступность минимум 3 дня в неделю' },
  { he: 'תעודת זהות ישראלית / ויזת עבודה בתוקף', ru: 'Удостоверение личности / действующая рабочая виза' },
  { he: 'נסיון בניקיון — יתרון (לא חובה)', ru: 'Опыт уборки — преимущество (не обязательно)' },
];

const TESTIMONIALS = [
  { name: 'נטלי ק.', origin: 'עלתה מרוסיה 2022', text: 'הגעתי לארץ בלי עברית ובלי ניסיון. Clean+ לקחו אותי, לימדו אותי הכל, ועכשיו אני קניינית ראשית. ממליצה לכל עולה חדש!', textRu: 'Приехала в страну без иврита и без опыта. Clean+ взяли меня, всему научили, и теперь я старший специалист. Рекомендую каждому!' },
  { name: 'מישה ד.', origin: 'עלה מאוקראינה 2023', text: 'עובד שנה ב-Clean+. השכר מגיע בזמן, השעות נוחות לי, והמנהלים מכבדים אותי. הכי חשוב לי — שמרתי על כבוד בעבודה.', textRu: 'Работаю год в Clean+. Зарплата вовремя, удобный график, уважительные менеджеры. Самое важное — достоинство в работе.' },
];

export default function RecruitingPage() {
  return (
    <div dir="rtl" lang="he" style={{ fontFamily: "'Heebo', 'Assistant', sans-serif", background: '#faf8f3', color: '#1a1a2e' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-black text-[#0a1628]">Clean<span className="text-[#c9a84c]">+</span></span>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-sm font-bold px-4 py-2 rounded-full transition-all">
            <span>📱</span> שלח קו"ח
          </WhatsAppCTA>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#0a1628] text-white pt-16 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #c9a84c 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            ✓ מתאים לעולים חדשים | Подходит для новых репатриантов
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-2">
            הצטרף לצוות Clean+
          </h1>
          <p className="text-white/50 text-base mb-2" dir="ltr">Присоединяйся к команде Clean+</p>
          <p className="text-white/70 text-lg mb-8 leading-relaxed mt-4">
            עבודה מכובדת, שכר הוגן, הכשרה מלאה.<br />
            <span className="text-white/50 text-base">Достойная работа, честная зарплата, полное обучение.</span>
          </p>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-lg font-black px-8 py-4 rounded-2xl shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95">
            <svg className="w-6 h-6 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
            שלח הודעה — отправь сообщение
          </WhatsAppCTA>
          <p className="text-white/40 text-xs mt-4">✓ מענה תוך 24 שעות &nbsp;✓ אין צורך בניסיון &nbsp;✓ Без опыта — можно!</p>
        </div>
      </section>

      {/* SALARY BANNER */}
      <section className="bg-[#c9a84c] py-5 px-4 text-center">
        <p className="text-[#0a1628] font-black text-xl">
          שכר 45–55 ₪ לשעה &nbsp;|&nbsp; <span className="font-normal text-[#0a1628]/70 text-lg">Зарплата 45–55 ₪ в час</span>
        </p>
      </section>

      {/* PERKS */}
      <section className="py-16 px-4 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center text-[#0a1628] mb-2">למה לעבוד ב-Clean+?</h2>
          <p className="text-center text-gray-500 mb-2">Почему стоит работать в Clean+?</p>
          <p className="text-center text-gray-400 text-sm mb-10">כל מה שחשוב לך בעבודה — אנחנו מספקים</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map(({ icon, title, titleRu, desc, descRu }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#c9a84c]/30 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-bold text-[#0a1628] mb-0.5">{title}</div>
                <div className="text-gray-400 text-xs mb-2">{titleRu}</div>
                <div className="text-gray-600 text-sm">{desc}</div>
                <div className="text-gray-400 text-xs mt-1">{descRu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center text-[#0a1628] mb-2">מה אנחנו מחפשים</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Кого мы ищем</p>
          <div className="space-y-3">
            {REQUIREMENTS.map(({ he, ru }) => (
              <div key={he} className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[#c9a84c] font-black mt-0.5">✓</span>
                <div>
                  <div className="text-[#0a1628] font-medium text-sm">{he}</div>
                  <div className="text-gray-400 text-xs">{ru}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 bg-[#faf8f3]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-[#0a1628] mb-2">מה אומרים העובדים שלנו</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">Что говорят наши сотрудники</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {TESTIMONIALS.map(({ name, origin, text, textRu }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-[#c9a84c] text-lg mb-3">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">"{text}"</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 italic">"{textRu}"</p>
                <div className="font-bold text-[#0a1628] text-sm">{name}</div>
                <div className="text-gray-400 text-xs">{origin}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#0a1628] mb-2">איך להגיש מועמדות?</h2>
          <p className="text-gray-500 mb-8 text-sm">Как подать заявку?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            {[
              { n: '1', he: 'שלח הודעה בוואטסאפ', ru: 'Отправь сообщение в WhatsApp' },
              { n: '2', he: 'ראיון קצר (טלפוני)', ru: 'Короткое собеседование (телефон)' },
              { n: '3', he: 'התחלת עבודה תוך שבוע', ru: 'Начало работы в течение недели' },
            ].map(({ n, he, ru }) => (
              <div key={n} className="flex-1 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#c9a84c]/15 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#c9a84c] font-black">{n}</span>
                </div>
                <div className="font-bold text-[#0a1628] text-sm">{he}</div>
                <div className="text-gray-400 text-xs mt-1">{ru}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-[#c9a84c]/10 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black text-[#0a1628] mb-1">מוכן/ה להתחיל?</h2>
          <p className="text-gray-500 text-sm mb-5">Готов начать? Пиши прямо сейчас!</p>
          <p className="text-gray-600 mb-8">שלח לנו הודעה ב-WhatsApp ונחזור אליך תוך 24 שעות עם כל הפרטים.</p>
          <WhatsAppCTA page={PAGE} message={WA_MSG}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbe5e] text-white text-lg font-black px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
            שלח הודעה / Написать
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
