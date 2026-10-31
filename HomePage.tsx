import { Crosshair, Flame, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onSelectGame: () => void;
  signedIn: boolean;
}

export function HomePage({ onSelectGame, signedIn }: HomePageProps) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-10 text-center animate-slideUp">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ember-400">
          <Flame size={14} /> #1 Gaming Top-Up in Bangladesh
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Top Up Your Game.
          <br />
          <span className="bg-gradient-to-r from-ember-400 via-ember-500 to-blood-500 bg-clip-text text-transparent">
            Instant. Secure. 24/7.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
          Zycron Shop delivers in-game gold, passes, and bundles the moment your payment clears —
          powered by bKash, Nagad, and Rocket.
        </p>
      </section>

      {/* Feature strip */}
      <section className="mb-10 grid grid-cols-3 gap-3 animate-slideUp">
        <Feature icon={<Zap size={18} />} title="Instant" sub="Auto-delivery" />
        <Feature icon={<ShieldCheck size={18} />} title="Secure" sub="TrxID verified" />
        <Feature icon={<Flame size={18} />} title="24/7" sub="Always online" />
      </section>

      {/* Game card */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-600" />
          Available Games
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-600" />
        </h2>

        <button
          onClick={onSelectGame}
          className="group relative block w-full overflow-hidden rounded-3xl border border-ink-600 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-6 text-left shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-ember-500/50 hover:shadow-glow sm:p-8 animate-scaleIn"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember-500/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-60" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-blood-600/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-40" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {/* Logo emblem */}
              <div className="relative animate-floatY">
                <div className="absolute inset-0 rounded-2xl bg-ember-500/30 blur-xl" />
                <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-ember-500 via-blood-600 to-ink-950 shadow-glow sm:h-24 sm:w-24">
                  <Crosshair size={44} className="text-white" strokeWidth={2.2} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Blood Strike
                  </span>
                  <span className="rounded-md bg-ember-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ember-400">
                    Live
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-400 sm:text-base">
                  Click to Buy Gold &amp; Passes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Gold</Pill>
                  <Pill>Passes</Pill>
                  <Pill>Bundles</Pill>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end text-ember-400 sm:self-center">
              <span className="font-semibold">Top Up Now</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ember-500/15 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-ember-500 group-hover:text-white">
                <ChevronRight size={20} />
              </span>
            </div>
          </div>
        </button>
      </section>

      {!signedIn && (
        <p className="mt-6 text-center text-xs text-zinc-500">
          Tip: Sign in to keep your orders synced across sessions.
        </p>
      )}
    </div>
  );
}

function Feature({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-700/60 bg-ink-850/60 px-3 py-3 sm:px-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ember-500/15 text-ember-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white">{title}</p>
        <p className="truncate text-xs text-zinc-500">{sub}</p>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-ink-600 bg-ink-800 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
      {children}
    </span>
  );
}
