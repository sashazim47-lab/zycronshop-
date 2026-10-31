import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/8801971725015';

export function SupportWidget() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-ink-800 px-3 py-1.5 text-sm font-medium text-white shadow-card sm:block">
        Need help? Chat now
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseGlow" />
        <MessageCircle size={26} className="relative text-white" fill="white" strokeWidth={0} />
      </span>
    </a>
  );
}
