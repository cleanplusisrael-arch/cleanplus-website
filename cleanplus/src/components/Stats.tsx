'use client';

const STATS = [
  { val: '+500', label: 'לקוחות מרוצים', icon: '👥' },
  { val: '+3',   label: 'שנות ניסיון',   icon: '🏆' },
  { val: '100%', label: 'ביטוח מקצועי',  icon: '🛡️' },
  { val: '7/7',  label: 'זמינות מלאה',   icon: '⚡' },
];

export default function Stats() {
  return (
    <section className="bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 rtl:divide-x-reverse">
          {STATS.map(({ val, label, icon }, i) => (
            <div key={label} className={`py-12 px-8 text-center ${i < 2 ? 'border-b md:border-b-0 border-white/5' : ''}`}>
              <div className="text-2xl mb-3">{icon}</div>
              <div className="text-4xl md:text-5xl font-bold gold-text mb-2 phone-ltr"
                style={{ fontFamily: "'Rubik', sans-serif" }}>{val}</div>
              <div className="text-white/40 text-xs" style={{ letterSpacing: '0.08em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
