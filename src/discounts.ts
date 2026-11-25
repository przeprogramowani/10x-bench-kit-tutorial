import type { DiscountRule, TieredDiscountOptions } from './types.ts';

export function calculateDiscount(subtotalCents: number, rule: DiscountRule): number {
  if (subtotalCents <= 0 || rule.percent <= 0) return 0;
  if (rule.minSubtotalCents && subtotalCents < rule.minSubtotalCents) return 0;
  return Math.round((subtotalCents * rule.percent) / 100);
}

export function calculateTieredDiscount(
  subtotalCents: number,
  options: TieredDiscountOptions,
): number {
  if (subtotalCents <= 0 || options.tiers.length === 0) return 0;

  const eligible = options.tiers.filter(
    (tier) => tier.percent > 0 && subtotalCents >= (tier.minSubtotalCents ?? 0),
  );
  if (eligible.length === 0) return 0;

  const bestPercent = Math.max(...eligible.map((tier) => tier.percent));
  const cappedPercent =
    options.maxDiscountPercent !== undefined
      ? Math.min(bestPercent, Math.max(0, options.maxDiscountPercent))
      : bestPercent;

  return Math.round((subtotalCents * cappedPercent) / 100);
}
