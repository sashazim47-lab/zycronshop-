import type { PaymentMethod } from './types';

export const PAYMENT_METHODS: {
  key: PaymentMethod;
  label: string;
  number: string;
  color: string;
  bg: string;
}[] = [
  { key: 'bkash', label: 'bKash', number: '01971725015', color: '#e2136e', bg: '#e2136e' },
  { key: 'nagad', label: 'Nagad', number: '...', color: '#ec1c24', bg: '#f60' },
  { key: 'rocket', label: 'Rocket', number: '...', color: '#8b2994', bg: '#7b1fa2' },
];

export function getPayment(key: PaymentMethod) {
  return PAYMENT_METHODS.find((p) => p.key === key)!;
}
