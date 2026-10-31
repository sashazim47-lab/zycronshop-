import { Crosshair, ShieldCheck, Zap, Lock } from 'lucide-react';

interface FooterProps {
  onAdmin: () => void;
}

export function Footer({ onAdmin }: FooterProps) {
  return (
    <footer className="relative z-10 mt-12 border-t border-ink-700/60 bg-ink-950/80">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-ember-500 to-blood-600">
              <Crosshair size={16} className="text-white" />
            </span>
            <span className="font-display font-bold text-white">
              Zycron<span className="text-ember-500"> Shop</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-ember-500" /> Instant Delivery</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-ember-500" /> Secure Payments</span>
            <span className="flex items-center gap-1.5"><Lock size={13} className="text-ember-500" /> 100% Ad-Free</span>
          </div>

          <button
            onClick={onAdmin}
            className="flex items-center gap-1.5 text-xs text-zinc-600 transition-colors hover:text-ember-400"
          >
            <Lock size={12} /> Admin
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Zycron Shop. Not affiliated with any game publisher. Prices in BDT.
        </p>
      </div>
    </footer>
  );
}
