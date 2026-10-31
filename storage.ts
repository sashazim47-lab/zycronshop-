import type { Order, OrderStatus, User } from './types';

const ORDERS_KEY = 'zycron_orders';
const USER_KEY = 'zycron_user';
const ADMIN_KEY = 'zycron_admin_authed';

export function genOrderId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `#ZS-${n}`;
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order): Order[] {
  const all = [order, ...loadOrders()];
  saveOrders(all);
  return all;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order[] {
  const all = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(all);
  return all;
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User | null): void {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export function isAdminAuthed(): boolean {
  return localStorage.getItem(ADMIN_KEY) === '1';
}

export function setAdminAuthed(v: boolean): void {
  if (v) localStorage.setItem(ADMIN_KEY, '1');
  else localStorage.removeItem(ADMIN_KEY);
}
