import { useState } from 'react';
import type { Order, OrderStatus } from '@/lib/types';
import { StatusBadge } from './OrdersPage';
import { isAdminAuthed, setAdminAuthed } from '@/lib/storage';
import { ArrowRight, CheckCircle2, Clock, Loader, Lock, ShieldCheck } from 'lucide-react';

interface AdminPageProps {
  orders: Order[];
  onAdvance: (id: string, status: OrderStatus) => void;
}

const ADMIN_CODE = 'ZS-ADMIN-2024';

export function AdminPage({ orders, onAdvance }: AdminPageProps) {
  const [authed, setAuthed] = useState(isAdminAuthed());
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);

  function tryAuth(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() === ADMIN_CODE) {
      setAdminAuthed(true);
      setAuthed(true);
    } else {
      setErr(true);
    }
  }

  if (!authed) {
    return (
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16">
        <div className="w-full animate-scaleIn rounded-3xl border border-ink-700/60 bg-ink-850/70 p-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-ember-500/15 text-ember-400">
            <Lock size={26} />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Access</h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Enter the secure admin code to manage all orders.
          </p>
          <form onSubmit={tryAuth} className="mt-5 space-y-3">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setErr(false);
              }}
              placeholder="Enter admin code"
              className="field text-center font-mono"
              autoFocus
            />
            {err && (
              <p className="text-sm font-medium text-blood-500">Invalid code. Try again.</p>
            )}
            <button type="submit" className="btn-primary w-full">
              <ShieldCheck size={18} /> Unlock Panel
            </button>
          </form>
          <p className="mt-4 text-xs text-zinc-600">Demo code: {ADMIN_CODE}</p>
        </div>
      </div>
    );
  }

  const counts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 animate-slideUp">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-zinc-400">Master list of all user orders.</p>
        </div>
        <button
          onClick={() => {
            setAdminAuthed(false);
            setAuthed(false);
          }}
          className="btn-ghost !px-4 !py-2 text-sm"
        >
          <Lock size={16} /> Lock
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-3 gap-3 animate-slideUp">
        <Stat label="Pending" value={counts.pending} icon={<Clock size={16} />} cls="text-zinc-300 bg-zinc-600/15" />
        <Stat label="Processing" value={counts.processing} icon={<Loader size={16} />} cls="text-amber-400 bg-amber-500/15" />
        <Stat label="Completed" value={counts.completed} icon={<CheckCircle2 size={16} />} cls="text-emerald-400 bg-emerald-500/15" />
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-ink-700/60 bg-ink-850/60 py-16 text-center text-zinc-500">
          No orders submitted yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-700/60 bg-ink-850/60 animate-fadeIn">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-ink-700/60 bg-ink-900/60 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Player</th>
                <th className="px-4 py-3 font-semibold">Pay / TrxID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700/40">
              {orders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-ink-800/50">
                  <td className="px-4 py-3 font-mono font-semibold text-white">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-200">{o.user.name}</p>
                    <p className="text-xs text-zinc-500">{o.user.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-200">{o.productName}</p>
                    <p className="text-xs font-semibold text-ember-400">{o.price} BDT</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-300">{o.playerName}</p>
                    <p className="text-xs text-zinc-500">UID: {o.playerUid}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-300">{o.paymentMethod}</p>
                    <p className="font-mono text-xs text-zinc-500">{o.trxId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {o.status === 'pending' && (
                      <button
                        onClick={() => onAdvance(o.id, 'processing')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-colors hover:bg-amber-500 hover:text-white"
                      >
                        Start <ArrowRight size={14} />
                      </button>
                    )}
                    {o.status === 'processing' && (
                      <button
                        onClick={() => onAdvance(o.id, 'completed')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-white"
                      >
                        Done <CheckCircle2 size={14} />
                      </button>
                    )}
                    {o.status === 'completed' && (
                      <span className="text-xs font-medium text-zinc-600">Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon, cls }: { label: string; value: number; icon: React.ReactNode; cls: string }) {
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-850/60 p-4">
      <div className={`mb-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold ${cls}`}>
        {icon} {label}
      </div>
      <p className="font-display text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
