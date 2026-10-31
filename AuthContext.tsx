import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/lib/types';
import { loadUser, saveUser } from '@/lib/storage';

interface AuthCtx {
  user: User | null;
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  signIn: (provider: string) => void;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const DEMO_USERS: Record<string, User> = {
  google: { name: 'Rakib Hasan', email: 'rakib@gmail.com', provider: 'Google', avatar: 'R' },
  discord: { name: 'ShadowKnight', email: 'shadow@discord.gg', provider: 'Discord', avatar: 'S' },
  steam: { name: 'ProGamer_BD', email: 'pro@steam.com', provider: 'Steam', avatar: 'P' },
  facebook: { name: 'Tanvir Ahmed', email: 'tanvir@fb.com', provider: 'Facebook', avatar: 'T' },
  apple: { name: 'Zycron Player', email: 'player@icloud.com', provider: 'Apple', avatar: 'Z' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    setUser(loadUser());
  }, []);

  const openAuth = useCallback(() => setAuthOpen(true), []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const signIn = useCallback(
    (provider: string) => {
      const u = DEMO_USERS[provider] ?? {
        name: 'Zycron Player',
        email: 'player@zycron.shop',
        provider,
        avatar: 'Z',
      };
      setUser(u);
      saveUser(u);
      setAuthOpen(false);
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
    saveUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, authOpen, openAuth, closeAuth, signIn, signOut }),
    [user, authOpen, openAuth, closeAuth, signIn, signOut],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
