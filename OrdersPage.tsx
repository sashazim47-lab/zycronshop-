import type { Order, OrderStatus } from '@/lib/types';
import { Inbox, Clock, Loader, CheckCircle2 } from 'lucide-react';

interface OrdersPageProps {
  orders: Order[];
  signedIn: boolean;
}

const STATUS_META: Record<
  OrderStatus,
  { label: string; cls: string; dot: string; icon: React.ReactNode }
> = {
  pending: {
    label: 'Pending',
    cls: 'bg-zinc-600/15 text-zinc-300 border-zinc-500/40',
    dot: 'bg-zinc-400',
    icon: <Clock size={13} />,
  },
  processing: {
    label: 'Processing',
    cls: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    dot: 'bg-amber-400',
    icon: <Loader size={13} />,
  },
  completed: {
    label: 'Completed',
    cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
    dot: 'bg-emerald-400',
    icon: <CheckCircle2 size={13} />,
  },
};

export function OrdersPage({ orders, signedIn }: OrdersPageProps) {
  const mine = orders;

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 animate-slideUp">
        <h1 className="font-display text-3xl font-bold text-white">My Orders</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Track every top-up from pending to delivered in real time.
        </p>
      </div>

      {mine.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-ink-700/60 bg-ink-850/60 py-16 text-center animate-fadeIn">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-800 text-zinc-500">
            <Inbox size={28} />
          </div>
          <p className="mt-4 font-semibold text-white">No orders yet</p>
          <p className="mt-1 text-sm text-zinc-500">
            {signedIn
              ? 'Pick a package from the Blood Strike card to get started.'
              : 'Orders placed as a guest are saved to this browser. Sign in to sync them.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-850/60 animate-fadeIn">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-700/60 bg-ink-900/60 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order ID</th>
                  <th className="px-5 py-3 font-semibold">Package</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Date / Time</th>
                  <th className="px-5 py-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700/40">
                {mine.map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-ink-800/50">
                    <td className="px-5 py-3.5 font-mono font-semibold text-white">{o.id}</td>
                    <td className="px-5 py-3.5 text-zinc-300">{o.productName}</td>
                    <td className="px-5 py-3.5 font-semibold text-ember-400">{o.price} BDT</td>
                    <td className="px-5 py-3.5 text-zinc-400">{formatTime(o.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-ink-700/40 sm:hidden">
            {mine.map((o) => (
              <div key={o.id} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-white">{o.id}</span>
                  <StatusBadge status={o.status} />
                </div>
                <p className="mt-1.5 text-sm text-zinc-300">{o.productName}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{formatTime(o.createdAt)}</span>
                  <span className="font-semibold text-ember-400">{o.price} BDT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${m.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.icon}
      {m.label}
    </span>
  );
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
