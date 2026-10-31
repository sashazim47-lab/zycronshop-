import type { Product } from './types';

export const GOLD_PACKAGES: Product[] = [
  { id: 'gold-51', name: '51 Golds', price: 60, category: 'gold' },
  { id: 'gold-105', name: '105 Golds', price: 115, category: 'gold' },
  { id: 'gold-320', name: '320 Golds', price: 340, category: 'gold' },
  { id: 'gold-540', name: '540 Golds', price: 560, category: 'gold' },
  { id: 'gold-1100', name: '1100 Golds', price: 1110, category: 'gold' },
  { id: 'gold-2260', name: '2260 Golds', price: 2205, category: 'gold' },
  { id: 'gold-5800', name: '5800 Golds', price: 5495, category: 'gold' },
];

export const PASSES_DEALS: Product[] = [
  { id: 'season-pass', name: 'Season Pass', price: 115, category: 'passes' },
  { id: 'value-season-pass', name: 'Value Season Pass', price: 115, category: 'passes' },
  { id: 'annual-pass', name: 'Annual Pass', price: 105, category: 'passes' },
  { id: 'strike-pass-elite', name: 'Strike Pass Elite', price: 450, category: 'passes', tag: 'Elite' },
  { id: 'strike-pass-premium', name: 'Strike Pass Premium', price: 1000, category: 'passes', tag: 'Premium' },
  { id: 'level-up-pass', name: 'Level Up Pass', price: 225, category: 'passes' },
];

export const WEEKLY_BUNDLES: Product[] = [
  { id: '099deal', name: '099deal', price: 115, category: 'bundles' },
  { id: '7ds-featured-valor', name: '7DS Featured Valor...', price: 120, category: 'bundles' },
  { id: 'seven-deadly-sins', name: 'Seven Deadly Sins ...', price: 235, category: 'bundles' },
  { id: 'ultra-skin-lucky-ch', name: 'Ultra Skin Lucky Ch...', price: 60, category: 'bundles' },
  { id: 'lucky-bag-week', name: 'Lucky Bag Week', price: 115, category: 'bundles' },
  { id: 'rags-to-riches', name: 'Rags to Riches (299/399/499/199)', price: 105, category: 'bundles' },
];

export const TAB_GROUPS = [
  { key: 'gold', label: 'Gold Packages', products: GOLD_PACKAGES },
  { key: 'passes', label: 'Passes & Special Deals', products: PASSES_DEALS },
  { key: 'bundles', label: 'Weekly/Bundle Deals', products: WEEKLY_BUNDLES },
] as const;

export function findProduct(id: string): Product | undefined {
  return [...GOLD_PACKAGES, ...PASSES_DEALS, ...WEEKLY_BUNDLES].find((p) => p.id === id);
}
