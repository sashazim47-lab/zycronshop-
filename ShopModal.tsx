import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { TAB_GROUPS } from '@/lib/products';
import type { Product, PaymentMethod, Order } from '@/lib/types';
import { PAYMENT_METHODS, getPayment } from '@/lib/payments';
import { useAuth } from '@/context/AuthContext';
import { addOrder, genOrderId } from '@/lib/storage';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Coins,
  Crown,
  Gift,
  Hash,
  Smartphone,
  User,
  Copy,
  ShieldCheck,
} from 'lucide-react';

interface ShopModalProps {
  open: boolean;
  onClose: () => void;
  onOrdered: (orders: Order[]) => void;
}

type Step = 'browse' | 'details' | 'payment' | 'confirm';

export function ShopModal({ open, onClose, onOrdered }: ShopModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('browse');
  const [tab, setTab] = useState<string>('gold');
  const [selected, setSelected] = useState<Product | null>(null);
  const [playerUid, setPlayerUid] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [trxId, setTrxId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  function reset() {
    setStep('browse');
    setSelected(null);
    setPlayerUid('');
    setPlayerName('');
    setMethod('bkash');
    setTrxId('');
    setOrderId('');
  }

  function handleClose() {
    reset();
    onClose();
  }

  function pickProduct(p: Product) {
    setSelected(p);
    setStep('details');
  }

  function proceedToPayment() {
    if (!playerUid.trim() || !playerName.trim()) return;
    setStep('payment');
  }

  function orderNow() {
    if (!trxId.trim() || !selected) return;
    const id = genOrderId();
    setOrderId(id);
    const order: Order = {
      id,
      productId: selected.id,
      productName: selected.name,
      price: selected.price,
      category: selected.category,
      playerUid: playerUid.trim(),
      playerName: playerName.trim(),
      paymentMethod: method,
      trxId: trxId.trim(),
      status: 'pending',
      createdAt: Date.now(),
      user: { name: user?.name ?? 'Guest', email: user?.email ?? 'guest@zycron.shop' },
    };
    const all = addOrder(order);
    onOrdered(all);
    setStep('confirm');
  }

  const currentTab = TAB_GROUPS.find((t) => t.key === tab)!;
  const pm = getPayment(method);

  function copyNumber() {
    navigator.clipboard?.writeText(pm.number).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-2xl" closeOnBackdrop={step !== 'confirm'}>
      {/* Header */}
      <div className="border-b border-ink-700/60 bg-ink-900/80 px-6 py-4">
        <div className="flex items-center gap-3">
          {step !== 'browse' && step !== 'confirm' && (
            <button
              onClick={() => setStep(step === 'payment' ? 'details' : 'browse')}
              className="grid h-8 w-8 place-items-center rounded-full bg-ink-800 text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-ember-500 to-blood-600">
              <Coins size={16} className="text-white" />
            </span>
            <h3 className="font-display text-lg font-bold text-white">Blood Strike Top-Up</h3>
          </div>
        </div>
        <Steps step={step} />
      </div>

      <div className="max-h-[68vh] overflow-y-auto px-5 py-5 sm:px-6">
        {/* STEP 1: BROWSE */}
        {step === 'browse' && (
          <div className="animate-fadeIn">
            {/* Tabs */}
            <div className="mb-4 grid grid-cols-3 gap-1.5 rounded-xl bg-ink-900 p-1.5">
              {TAB_GROUPS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`tab-btn ${
                    tab === t.key
                      ? 'bg-gradient-to-r from-ember-500 to-blood-600 text-white shadow-glow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {currentTab.label}
            </div>

            <div className="grid gap-2.5 stagger">
              {currentTab.products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => pickProduct(p)}
                  className="group flex items-center gap-3 rounded-2xl border border-ink-600 bg-ink-800/70 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ember-500/60 hover:bg-ink-750 active:scale-[0.99]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-ember-400 transition-colors group-hover:bg-ember-500 group-hover:text-white">
                    <CatIcon cat={p.category} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{p.name}</p>
                    {p.tag && (
                      <span className="mt-0.5 inline-block rounded bg-ember-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-ember-400">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-base font-bold text-ember-400">{p.price} BDT</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-ember-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 'details' && selected && (
          <div className="animate-fadeIn">
            <SelectedSummary product={selected} />
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">Enter Player UID</label>
                <div className="relative">
                  <Hash size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                    placeholder="e.g. 8842910"
                    className="field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">Enter In-Game Name</label>
                <div className="relative">
                  <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="e.g. ShadowKnight"
                    className="field pl-10"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={proceedToPayment}
              disabled={!playerUid.trim() || !playerName.trim()}
              className="btn-primary mt-6 w-full"
            >
              Proceed to Payment <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 'payment' && selected && (
          <div className="animate-fadeIn">
            <SelectedSummary product={selected} />
            <div className="mt-4 rounded-xl bg-ink-900/70 px-4 py-2.5 text-sm text-zinc-300">
              <span className="text-zinc-500">Player:</span> {playerName}{' '}
              <span className="text-zinc-600">·</span> UID: {playerUid}
            </div>

            {/* Method tabs */}
            <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-xl bg-ink-900 p-1.5">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={`tab-btn ${method === m.key ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  style={method === m.key ? { background: m.color } : undefined}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-ink-600 bg-ink-800/70 p-4 animate-scaleIn" key={method}>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Smartphone size={16} className="text-ember-400" />
                Send {selected.price} BDT to this {pm.label} number
              </div>
              {pm.number === '...' ? (
                <>
                  <div className="mt-3 flex items-center justify-center rounded-xl bg-ink-900 px-4 py-3">
                    <span className="font-display text-lg font-bold tracking-wider text-zinc-500">...</span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {pm.label} is temporarily unavailable. Please use bKash for now.
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-ink-900 px-4 py-3">
                    <span className="font-display text-lg font-bold tracking-wider text-white">{pm.number}</span>
                    <button
                      onClick={copyNumber}
                      className="flex items-center gap-1.5 rounded-lg bg-ember-500/15 px-3 py-1.5 text-xs font-semibold text-ember-400 transition-colors hover:bg-ember-500 hover:text-white"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    Use <span className="font-semibold text-zinc-300">Send Money</span> / Personal and note the Transaction ID.
                  </p>
                </>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">Enter Transaction ID (TrxID)</label>
              <input
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="e.g. 9F4K2L7X12"
                className="field"
              />
            </div>

            <button
              onClick={orderNow}
              disabled={!trxId.trim()}
              className="btn-primary mt-6 w-full"
            >
              <ShieldCheck size={18} /> Order Now
            </button>
          </div>
        )}

        {/* STEP 4: CONFIRM */}
        {step === 'confirm' && (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center animate-fadeIn">
            <div className="relative mb-6">
              <span className="absolute inset-0 rounded-full bg-ember-500/40 animate-ringExpand" />
              <span className="absolute inset-0 rounded-full bg-ember-500/30 animate-ringExpand" style={{ animationDelay: '0.3s' }} />
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-ember-500 to-blood-600 shadow-glow animate-checkPop">
                <Check size={48} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Order Placed!</h3>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Your top-up request has been received. Our team will process it shortly — track it under My Orders.
            </p>
            <div className="mt-5 rounded-2xl border border-ink-600 bg-ink-800/70 px-6 py-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Your Order ID</p>
              <p className="mt-1 font-display text-2xl font-bold text-ember-400">{orderId}</p>
            </div>
            <div className="mt-6 flex w-full max-w-xs flex-col gap-2.5">
              <button onClick={handleClose} className="btn-primary w-full">
                Done
              </button>
              <button
                onClick={() => { reset(); }}
                className="btn-ghost w-full"
              >
                Place Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function Steps({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'browse', label: 'Select' },
    { key: 'details', label: 'Details' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirm', label: 'Done' },
  ];
  const activeIdx = steps.findIndex((s) => s.key === step);
  return (
    <div className="mt-3 flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.key} className="flex flex-1 items-center gap-1.5">
          <div
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= activeIdx ? 'bg-gradient-to-r from-ember-500 to-blood-600' : 'bg-ink-700'
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function SelectedSummary({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ember-500/30 bg-ember-500/5 p-3.5">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ember-500/15 text-ember-400">
        <CatIcon cat={product.category} />
      </span>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Selected</p>
        <p className="font-semibold text-white">{product.name}</p>
      </div>
      <p className="font-display text-lg font-bold text-ember-400">{product.price} BDT</p>
    </div>
  );
}

function CatIcon({ cat }: { cat: Product['category'] }) {
  if (cat === 'gold') return <Coins size={18} />;
  if (cat === 'passes') return <Crown size={18} />;
  return <Gift size={18} />;
}
