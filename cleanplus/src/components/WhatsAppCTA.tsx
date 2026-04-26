'use client';
import { trackWhatsAppClick } from '@/lib/tracking';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '972500000000';

interface Props {
  page: string;
  message: string;
  children: React.ReactNode;
  className?: string;
}

export function WhatsAppCTA({ page, message, children, className }: Props) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(page, message)}
      className={className}
    >
      {children}
    </a>
  );
}

export function FloatingWhatsAppCTA({ page, message }: { page: string; message: string }) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(page, message)}
      className="fixed bottom-6 end-6 z-50"
      aria-label="WhatsApp Clean+"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbe5e] text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-black/25 transition-all duration-300 hover:scale-105 active:scale-95">
        <WhatsAppIcon />
        <span className="hidden sm:inline">צרו קשר עכשיו</span>
      </span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
    </svg>
  );
}
