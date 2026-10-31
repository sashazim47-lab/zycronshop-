import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { NoticeBar } from '@/components/NoticeBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SupportWidget } from '@/components/SupportWidget';
import { AuthModal } from '@/components/AuthModal';
import { ShopModal } from '@/components/ShopModal';
import { HomePage } from '@/pages/HomePage';
import { OrdersPage } from '@/pages/OrdersPage';
import { AdminPage } from '@/pages/AdminPage';
import type { Order, OrderStatus } from '@/lib/types';
import { loadOrders, updateOrderStatus } from '@/lib/storage';

type Page = 'home' | 'orders' | 'admin';

function Shell() {
  const { user } = useAuth();
  const [page, setPage] = useState<Page>('home');
  const [shopOpen, setShopOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
    // keep orders fresh if another tab changes them
    const onStorage = () => setOrders(loadOrders());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function navigate(p: Page) {
    setPage(p);
    setShopOpen(false);
  }

  function advanceOrder(id: string, status: OrderStatus) {
    setOrders(updateOrderStatus(id, status));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NoticeBar />
      <Header page={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage onSelectGame={() => setShopOpen(true)} signedIn={!!user} />
        )}
        {page === 'orders' && <OrdersPage orders={orders} signedIn={!!user} />}
        {page === 'admin' && <AdminPage orders={orders} onAdvance={advanceOrder} />}
      </main>

      <Footer onAdmin={() => navigate('admin')} />
      <SupportWidget />

      <ShopModal
        open={shopOpen}
        onClose={() => setShopOpen(false)}
        onOrdered={(all) => setOrders(all)}
      />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
