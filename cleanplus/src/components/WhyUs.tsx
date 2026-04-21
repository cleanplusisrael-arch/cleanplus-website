'use client';

const FEATURES = [
  { icon: '👷', title: 'צוות מנוסה ומבוטח', desc: 'כל הצוות שלנו עבר הכשרה מקצועית ומבוטח במלואו לשקט נפשי שלך.' },
  { icon: '🧴', title: 'ציוד מקצועי כלול', desc: 'אנו מגיעים עם כל הציוד והחומרים — אין צורך לדאוג לכלום מצדך.' },
  { icon: '📅', title: 'זמינות 7 ימים', desc: 'גמישות מלאה בתיאום — עובדים בהתאם לשעות הנוחות לך.' },
  { icon: '💰', title: 'מחיר ברור ללא הפתעות', desc: 'מחיר קבוע מראש. אין תוספות מפתיעות ואין חיובים נסתרים.' },
  { icon: '🔄', title: 'אותו מנקה כל פעם', desc: 'בחרית מתמשכת — המנקה לומד את הבית שלך ואת ההעדפות שלך.' },
  { icon: '🛡️', title: 'ערבות החזרה חינם', desc: 'לא מרוצה מהתוצאה? נחזור ונתקן ללא עלות נוספת.' },
];

export default function WhyUs() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-16">
          <div className="section-label justify-center">למה Clean+</div>
          <h2 className="font-display font-light text-navy"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            הכל כלול. מחיר אחד שקוף.
          </h2>
          <p className="text-slate-500 font-light text-lg mt-4 max-w-xl mx-auto">
            כמו Maid Marines בניו יורק — רק שאנחנו כאן, בישראל, עם הצוות שלנו.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="card bg-cream p-7 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gold/15 flex items-center justify-center text-2xl mb-5 group-hover:border-gold/40 transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-semibold text-navy mb-2 text-base">{title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
