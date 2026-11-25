import type { DiscountRule } from './types.ts';

export function calculateDiscount(subtotalCents: number, rule: DiscountRule): number {
  if (subtotalCents <= 0 || rule.percent <= 0) return 0;
  if (rule.minSubtotalCents && subtotalCents < rule.minSubtotalCents) return 0;
  return Math.round((subtotalCents * rule.percent) / 100);
}
