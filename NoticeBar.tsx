import { Megaphone } from 'lucide-react';

const NOTICE =
  'Welcome to Zycron Shop! Instant Blood Strike Top-Up 24/7. Payment via bKash, Nagad, Rocket.';

export function NoticeBar() {
  return (
    <div className="relative z-20 overflow-hidden border-b border-ember-500/30 bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900">
      <div className="flex items-center gap-2 py-2">
        <div className="ml-3 flex shrink-0 items-center gap-2 rounded-full bg-ember-500/15 px-3 py-1 text-ember-400">
          <Megaphone size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Live</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm font-medium text-zinc-300">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex items-center gap-12">
                <span>{NOTICE}</span>
                <span className="text-ember-500">✦</span>
                <span>{NOTICE}</span>
                <span className="text-ember-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
