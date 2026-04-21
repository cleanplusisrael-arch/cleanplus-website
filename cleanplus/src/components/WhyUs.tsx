'use client';

const FEATURES = [
  { icon: '👷', title: 'צוות מנוסה ומוסמך', desc: 'כל עובד עבר הכשרה מקצועית מקיפה. אנחנו לא שולחים מישהו לביתכם ללא הכנה מלאה.' },
  { icon: '🧴', title: 'ציוד מקצועי — כלול', desc: 'מגיעים עם כל הציוד והחומרים. אין צורך לדאוג לכלום מצדכם.' },
  { icon: '📅', title: 'זמינות 7 ימים', desc: 'עובדים גם בסופי שבוע ובחגים — בשעות שמתאימות לכם.' },
  { icon: '💰', title: 'מחיר שקוף מראש', desc: 'מחיר קבוע שנסגר לפני תחילת העבודה. ללא תוספות מפתיעות.' },
  { icon: '🔄', title: 'אותו צוות בכל פעם', desc: 'בחרית ממושכת? אותם אנשים יגיעו — הם מכירים את הבית ואת ההעדפות שלכם.' },
  { icon: '📍', title: 'שיבוץ לפי אזור', desc: 'הצוות שלנו מחולק לפי אזורים — מה שמבטיח הגעה בזמן ויעילות מרבית.' },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-16">
          <div className="section-label justify-center">למה Clean+</div>
          <h2 className="text-[#0a1628]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif" }}>
            הכל כלול. מחיר אחד שקוף.
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            צוות מקצועי, ציוד כלול, תיאום גמיש — כל מה שצריך כדי שהבית שלכם יהיה מושלם.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title}
              className="bg-[#faf8f3] rounded-2xl p-7 border border-[#c9a84c]/10 group hover:border-[#c9a84c]/30 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#c9a84c]/15 flex items-center justify-center text-2xl mb-5 group-hover:border-[#c9a84c]/40 transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-[#0a1628] mb-2 text-base" style={{ fontFamily: "'Rubik', sans-serif" }}>{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
