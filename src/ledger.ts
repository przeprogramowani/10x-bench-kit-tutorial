import type { LineItem } from './types.ts';
import { calculateInvoiceTotal } from './pricing.ts';

export interface LedgerEntry {
  invoiceId: string;
  totalCents: number;
  currency: 'PLN' | 'USD' | 'EUR';
}

export function createLedgerEntry(
  invoiceId: string,
  items: LineItem[],
  currency: 'PLN' | 'USD' | 'EUR' = 'PLN',
  discountCents = 0,
): LedgerEntry {
  const summary = calculateInvoiceTotal(items, discountCents);
  return {
    invoiceId,
    totalCents: summary.totalCents,
    currency,
  };
}
