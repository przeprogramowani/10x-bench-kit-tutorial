import type { LineItem, InvoiceSummary } from './types.ts';
import { roundCents } from './money.ts';

export function calculateSubtotal(items: LineItem[]): number {
  return items
    .filter((item) => item.quantity > 0)
    .reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export function calculateInvoiceTotal(
  items: LineItem[],
  discountCents = 0,
): InvoiceSummary {
  const validItems = items.filter((item) => item.quantity > 0);
  const subtotalCents = calculateSubtotal(validItems);
  const effectiveDiscount = Math.min(Math.max(0, discountCents), subtotalCents);
  const netCents = subtotalCents - effectiveDiscount;
  const taxCents = validItems.reduce((sum, item) => {
    const rate = item.taxRate ?? 0;
    return sum + roundCents(item.unitPriceCents * item.quantity * rate);
  }, 0);
  const totalCents = Math.max(0, netCents + taxCents);

  return {
    subtotalCents,
    discountCents: effectiveDiscount,
    taxCents,
    totalCents,
  };
}
