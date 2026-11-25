import type { LineItem, SubscriptionPlan } from './types.ts';
import { calculateInvoiceTotal } from './pricing.ts';
import { roundCents } from './money.ts';

export interface LedgerEntry {
  invoiceId: string;
  totalCents: number;
  currency: 'PLN' | 'USD' | 'EUR';
}

export interface ProrationResult {
  creditCents: number;
  chargeCents: number;
  netDueCents: number;
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

export function calculateProration(
  currentPlan: SubscriptionPlan,
  newPlan: SubscriptionPlan,
  daysRemaining: number,
  daysInCycle: number,
): ProrationResult {
  if (daysInCycle <= 0 || daysRemaining <= 0) {
    return { creditCents: 0, chargeCents: 0, netDueCents: 0 };
  }
  const clampedDays = Math.min(daysRemaining, daysInCycle);
  const ratio = clampedDays / daysInCycle;
  const creditCents = roundCents(currentPlan.monthlyPriceCents * ratio);
  const chargeCents = roundCents(newPlan.monthlyPriceCents * ratio);
  const netDueCents = chargeCents - creditCents;
  return { creditCents, chargeCents, netDueCents };
}
