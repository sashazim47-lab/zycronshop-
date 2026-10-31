import { useAuth } from '@/context/AuthContext';
import { Crosshair, LayoutGrid, ListOrdered, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'orders' | 'admin';

interface HeaderProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

export function Header({ page, onNavigate }: HeaderProps) {
  const { user, openAuth, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <>
      <NavBtn active={page === 'home'} onClick={() => { onNavigate('home'); setMobileOpen(false); }} icon={<LayoutGrid size={16} />}>
        Home
      </NavBtn>
      <NavBtn active={page === 'orders'} onClick={() => { onNavigate('orders'); setMobileOpen(false); }} icon={<ListOrdered size={16} />}>
        My Orders
      </NavBtn>
      <NavBtn active={page === 'admin'} onClick={() => { onNavigate('admin'); setMobileOpen(false); }} icon={<Crosshair size={16} />}>
        Admin
      </NavBtn>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ember-500 to-blood-600 shadow-glow">
            <Crosshair size={20} className="text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Zycron<span className="text-ember-500"> Shop</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">{nav}</nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800 py-1 pl-1 pr-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-ember-500 to-blood-600 text-xs font-bold text-white">
                  {user.avatar}
                </span>
                <span className="text-sm font-medium text-zinc-200">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={signOut}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink-600 bg-ink-800 text-zinc-400 transition-colors hover:border-blood-600 hover:text-blood-500"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={openAuth} className="btn-primary hidden sm:inline-flex !px-4 !py-2 text-sm">
              <LogIn size={16} /> Sign In
            </button>
          )}
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-600 bg-ink-800 text-zinc-300 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-700/60 bg-ink-900 px-4 py-3 md:hidden animate-fadeIn">
          <div className="flex flex-col gap-1">{nav}</div>
          {user ? (
            <button onClick={signOut} className="btn-ghost mt-2 w-full">
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <button onClick={openAuth} className="btn-primary mt-2 w-full">
              <LogIn size={16} /> Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function NavBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-ink-800 text-white shadow-card'
          : 'text-zinc-400 hover:bg-ink-800/60 hover:text-white'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
