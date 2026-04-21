'use client';

export default function Guarantee() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold/30 bg-gold/10 text-4xl mb-8 mx-auto">
          🛡️
        </div>
        <h2 className="font-display font-light text-white mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
          ערבות <span className="gold-text font-semibold">100%</span> — ללא סיכון
        </h2>
        <p className="text-white/45 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          אם אינך מרוצה מהניקיון — נחזור ונתקן <strong className="text-white/70">חינם</strong>.
          עדיין לא מרוצה? <strong className="text-white/70">החזר כספי מלא</strong>. ללא שאלות, ללא סיבוכים.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
          {['נחזור לתקן חינם', 'החזר כספי מלא אם נדרש', 'ללא שאלות מיותרות'].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-gold">✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
