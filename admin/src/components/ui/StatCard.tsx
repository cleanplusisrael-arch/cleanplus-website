interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, sub, icon, accent = 'bg-gold/10' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
      {icon && (
        <div className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-navy font-hebrew" dir="ltr">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
