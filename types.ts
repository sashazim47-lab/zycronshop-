export type OrderStatus = 'pending' | 'processing' | 'completed';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket';

export interface Product {
  id: string;
  name: string;
  price: number;
  tag?: string;
  category: 'gold' | 'passes' | 'bundles';
}

export interface User {
  name: string;
  email: string;
  provider: string;
  avatar: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  category: Product['category'];
  playerUid: string;
  playerName: string;
  paymentMethod: PaymentMethod;
  trxId: string;
  status: OrderStatus;
  createdAt: number;
  user: { name: string; email: string };
}
